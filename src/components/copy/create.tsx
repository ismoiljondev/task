"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import plus from "@/logo/plus.svg";
import nodata from "@/logo/noitem.svg";
import Image from "next/image";
import info from "@/logo/info.svg";
import share from "@/logo/share.svg";
import filter from "@/logo/filter.svg";
import trash from "@/logo/trash.svg";
import logo from "@/logo/Logo.svg";
import {
	FieldPath,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { SubmitHandler, useForm } from "react-hook-form";
import Todolist from "../todolist/todolist";
import Tasks from "../tasks/tasks";
import { Textarea } from "../ui/textarea";
type Todo = {
	desc: string;
	todo: string;
	completed: boolean;
};

const CreateCopy: React.FC = () => {
	const [todos, setTodos] = useState<any>([]);
	const [title, setTitle] = useState<string>("");
	const [desc, setDesc] = useState<string>("");
	const [editValue, setEditValue] = useState(-1);
	const [sortBy, setSortBy] = useState<string>("todo" || "completed");
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		reset,
	} = useForm<Todo>();

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, "todos"), orderBy(sortBy)),
			(snapshot) => {
				const todosData: any = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setTodos(todosData);
			}
		);
		return () => unsubscribe();
	}, [sortBy]);

	const onSubmit: SubmitHandler<Todo> = async (data) => {
		try {
			if (editValue !== -1) {
				const todoDocRef = doc(db, "todos", todos[editValue].id);
				await updateDoc(todoDocRef, data);
				setEditValue(-1);
			} else {
				await addDoc(collection(db, "todos"), {
					...data,
					completed: false,
				});
			}
			reset();
		} catch (err) {
			console.error(err);
		}
	};

	const setEdit = (index: number) => {
		setTitle(todos[index].todo);
		setDesc(todos[index].desc);
		setEditValue(index);
	};

	const addTodo = () => {
		try {
			if (title?.trim() !== "" && desc.trim() !== "") {
				addDoc(collection(db, "todos"), {
					todo: title,
					completed: false,
					desc: desc,
				});
			}
		} catch (err: any) {
			console.error(err.message);
		}
		setDesc("");
		setTitle("");
	};

	const updateTodo = () => {
		try {
			if (title?.trim() !== "") {
				const todoDocRef = doc(db, "todos", todos[editValue].id);
				updateDoc(todoDocRef, { todo: title, desc: desc });
				setEditValue(-1);
				setDesc("");
				setTitle("");
			}
		} catch (err: any) {
			console.error(err.message);
		}
	};

	const deleteTodo = (id: any) => {
		if (window.confirm("Are you sure you want to todo?")) {
			try {
				deleteDoc(doc(db, "todos", id));
			} catch (err) {
				console.log(err);
			}
		}
	};
	const deleteAllTodos = async () => {
		if (window.confirm("Are you sure you want to delete all todos?")) {
			try {
				const todoCollectionRef = collection(db, "todos");
				const querySnapshot = await getDocs(todoCollectionRef);
				querySnapshot.forEach(async (doc) => {
					await deleteDoc(doc.ref);
				});
			} catch (err) {
				console.error(err);
			}
		}
	};
	const changeStatus = (index: number) => {
		try {
			const todoDocRef = doc(db, "todos", todos[index].id);
			updateDoc(todoDocRef, { completed: !todos[index].completed });
		} catch (err: any) {
			console.error(err.message);
		}
	};
	const handleSort = (sortKey: string) => {
		setSortBy(sortKey);
	};
	return (
		<div className="flex flex-col min-h-screen rounded-md w-4/6 py-10 max-lg:w-4/5 max-md:w-5/6 max-md:p-4 max-sm:w-full ">
			<form onSubmit={handleSubmit(onSubmit)} className="">
				<div className="flex flex-col w-full gap-10 items-center">
					<div>
						<Image src={logo} alt="logo" />
					</div>
					<div className="w-full flex flex-col gap-3">
						<Input
							type="text"
							className="w-full font-medium text-lg py-8 border-2 outline-none border-r-0 bg-[#262626] text-[#808080] border-none focus-visible:none max-md:py-6"
							placeholder="Enter task"
							{...register("todo", {
								required: "This field is required",
							})}
							value={title}
							onChange={(e: any) => setTitle(e.target.value)}
						/>
						<Textarea
							className="w-full font-medium text-lg border-2 outline-none border-r-0 bg-[#262626] text-[#808080] border-none focus-visible:none max-md:py-6"
							placeholder="Type your message here."
							{...register("desc", {
								required: "This field is required",
							})}
							value={desc}
							onChange={(e: any) => setDesc(e.target.value)}
						/>
					</div>
					<Button
						variant={"customBtn"}
						type="submit"
						className="flex "
						size={"custom"}
						onClick={editValue === -1 ? addTodo : updateTodo}
					>
						{editValue === -1 ? (
							<>
								Add <Image src={plus} alt="plus" />
							</>
						) : (
							<>Update</>
						)}
					</Button>
				</div>
			</form>
			<div className="flex flex-col gap-4 scroll-smooth mb-5">
				{<Tasks todos={todos} />}
				{todos.length === 0 ? (
					<div>
						<hr className="border-[#333333]" />
						<div className="flex flex-col items-center justify-center mt-20">
							<div>
								<Image
									src={nodata}
									alt="noitem"
									width={100}
									height={100}
								/>
							</div>
							<div className="flex flex-col text-[#808080] items-center">
								<h3 className="font-bold text-xl text-center">
									You do not have tasks registered yet Create
									tasks
								</h3>
								<p>and organize your to-do items</p>
							</div>
						</div>
					</div>
				) : (
					<Todolist
						todos={todos}
						changeStatus={changeStatus}
						deleteTodo={deleteTodo}
						setEdit={setEdit}
					/>
				)}
			</div>
			<div className="rounded-md mt-auto p-5 flex justify-center gap-20 text-lg bg-[#262626] max-md:gap-10">
				<Image src={info} alt="inf" />
				{/* <Image src={share} alt="share" /> */}
				<Button variant="customBtn" onClick={() => handleSort("todo")}>
					Sort A-Z
				</Button>
				<Button
					variant="customBtn"
					onClick={() => handleSort("completed")}
				>
					Sort by Completed
				</Button>
				<Image
					src={trash}
					alt="trash"
					className="cursor-pointer"
					onClick={() => deleteAllTodos()}
				/>
			</div>
		</div>
	);
};

export default CreateCopy;
