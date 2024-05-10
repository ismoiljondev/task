"use client";
import React, { useEffect, useState } from "react";
import plus from "@/logo/plus.svg";
import nodata from "@/logo/noitem.svg";
import Image from "next/image";
import trash from "@/logo/trash.svg";
import logo from "@/logo/Logo.svg";
import logout from "@/logo/logout.svg";
import {
	FieldPath,
	Timestamp,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase";
import { SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Tasks from "../tasks/tasks";
import Todolist from "../todolist/todolist";
import { useRouter } from "next/navigation";
type Todo = {
	desc: string;
	todo: string;
	completed: boolean;
	createdAt: Timestamp;
	deadline: Timestamp | string;
};

const CreateCopy: React.FC = () => {
	const [todos, setTodos] = useState<any>([]);
	const [title, setTitle] = useState<string>("");
	const [desc, setDesc] = useState<string>("");
	const [deadline, setDeadline] = useState<number | string>("");
	const [editValue, setEditValue] = useState(-1);
	const [sortBy, setSortBy] = useState<string>("todo" || "completed");
	const [userDetail, setUserDetail] = useState<any>(null);
	const router = useRouter();
	const fetchUserData = async () => {
		const user = auth.currentUser;
		if (user) {
			try {
				const userRef: any = doc(db, "Users", user.uid); // Assuming "Users" is the collection where user data is stored
				const userSnap: any = await getDoc(userRef); // Use getDoc instead of getDocs for a single document
				if (userSnap.exists()) {
					setUserDetail(userSnap.data());
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		} else {
			console.log("User not logged in");
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	console.log(userDetail);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(db, `Users/${auth?.currentUser?.uid}/todos`),
				orderBy(sortBy)
			),
			(snapshot) => {
				const todosData: any = [];
				snapshot.forEach((doc) => {
					todosData.push({
						id: doc.id,
						...doc.data(),
					} as unknown as Todo);
				});
				setTodos(todosData);
			}
		);
		return () => unsubscribe();
	}, [sortBy]);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		reset,
	} = useForm<Todo>();
	const onSubmit: SubmitHandler<Todo> = async (data) => {
		try {
			if (editValue !== -1) {
				const todoDocRef = doc(
					db,
					`Users/${auth?.currentUser?.uid}/todos`,
					todos[editValue].id
				);
				await updateDoc(todoDocRef, data);
				setEditValue(-1);
			} else {
				await addDoc(
					collection(db, `Users/${auth?.currentUser?.uid}/todos`),
					{
						...data,
						completed: false,
						desc: desc ? desc : "",
						createdAt: new Date().toLocaleString(),
						deadline: deadline ? deadline : "",
					}
				);
			}
			reset();
		} catch (err) {
			console.error(err);
		}
	};

	const setEdit = (index: number) => {
		setTitle(todos[index].todo);
		setDesc(todos[index].desc);
		setDeadline(todos[index].deadline);
		setEditValue(index);
		router.push("#edit");
	};

	const addTodo = () => {
		try {
			if (title?.trim() !== "") {
				addDoc(
					collection(db, `Users/${auth?.currentUser?.uid}/todos`),
					{
						todo: title,
						completed: false,
						desc: desc ? desc : "",
						createdAt: new Date().toLocaleString(),
						deadline: deadline ? deadline : "",
					}
				);
			}
		} catch (err: any) {
			console.error(err.message);
		}
		setDesc("");
		setTitle("");
		setDeadline("");
	};

	const updateTodo = () => {
		try {
			if (title?.trim() !== "") {
				const todoDocRef = doc(
					db,
					`Users/${auth?.currentUser?.uid}/todos`,
					todos[editValue].id
				);
				updateDoc(todoDocRef, {
					todo: title,
					desc: desc,
					deadline: deadline,
				});
				setEditValue(-1);
				setDesc("");
				setTitle("");
				setDeadline("");
			}
		} catch (err: any) {
			console.error(err.message);
		}
	};

	const deleteTodo = (id: any) => {
		if (window.confirm("Are you sure you want to todo?")) {
			try {
				deleteDoc(doc(db, `Users/${auth?.currentUser?.uid}/todos`, id));
			} catch (err) {
				console.log(err);
			}
		}
	};
	const deleteAllTodos = async () => {
		if (todos.length > 1) {
			if (window.confirm("Are you sure you want to delete all todos?")) {
				try {
					const todoCollectionRef = collection(
						db,
						`Users/${auth?.currentUser?.uid}/todos`
					);
					const querySnapshot = await getDocs(todoCollectionRef);
					querySnapshot.forEach(async (doc) => {
						await deleteDoc(doc.ref);
					});
				} catch (err) {
					console.error(err);
				}
			}
		}
	};
	const changeStatus = (index: number) => {
		try {
			const todoDocRef = doc(
				db,
				`Users/${auth?.currentUser?.uid}/todos`,
				todos[index].id
			);
			updateDoc(todoDocRef, { completed: !todos[index].completed });
		} catch (err: any) {
			console.error(err.message);
		}
	};
	const handleSort = (sortKey: string) => {
		setSortBy(sortKey);
	};
	const logOut = async () => {
		try {
			await auth.signOut();
			router.push("/");
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="flex flex-col min-h-screen w-4/6 py-10 max-lg:w-4/5 my-10 max-md:w-5/6 max-md:p-4 max-sm:w-full justify-center  m-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
			<form onSubmit={handleSubmit(onSubmit)} className="" id="edit">
				<div className="flex flex-col w-full gap-10 items-center">
					<div className="flex justify-between items-center w-full">
						<div></div>
						<Image src={logo} alt="logo" />
						<div className="flex gap-2 items-center ">
							<p className="font-medium text-xl">
								{userDetail?.firstName}
							</p>
							<Button
								variant={"customBtn"}
								className="cursor-pointer p-2 max-md:p-1 max-md:text-xs max-md:w-10 max- flex items-center"
								onClick={logOut}
							>
								<Image src={logout} alt="logout" />
							</Button>
						</div>
					</div>
					<div className="w-full flex flex-col gap-3">
						<Input
							type="text"
							className="w-full font-medium text-lg py-6 border-2 outline-none border-r-0 border-none focus-visible:none max-md:py-6 col-span-3"
							placeholder="Enter task"
							{...register("todo", {
								required: "This field is required",
							})}
							value={title}
							onChange={(e: any) => setTitle(e.target.value)}
						/>

						<Textarea
							className="w-full font-medium text-lg border-2 outline-none  border-r-0 border-none focus-visible:none max-md:py-6"
							placeholder="Type your message here."
							{...register("desc", {
								required: "This field is required",
							})}
							value={desc}
							onChange={(e: any) => setDesc(e.target.value)}
						/>
						<div className="w-fit">
							<Input
								type="datetime-local"
								className="w-fit font-medium text-lg py-6 border-2 outline-none border-r-0 border-none text-neutral-400 focus-visible:none max-md:py-6"
								{...register("deadline", {
									required: "This field is required",
								})}
								value={`${deadline}`}
								onChange={(e: any) =>
									setDeadline(e.target.value)
								}
							/>
						</div>
					</div>
					<div>
						<Button
							variant={"customBtn"}
							type="submit"
							className="flex relative group/btn py-3"
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
							<BottomGradient />
						</Button>
					</div>
				</div>
			</form>
			<div className="flex flex-col gap-4 scroll-smooth my-5">
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
			<div
				className="rounded-md mt-auto p-5 flex justify-center gap-20 text-lg max-md:gap-10 max-sm:gap-6 py-2 px-3  
					items-center w-full text-black font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
			>
				<div>
					<Button
						variant="customBtn"
						className="relative group/btn"
						onClick={() => handleSort("todo")}
					>
						Sort A-Z
						<BottomGradient />
					</Button>
				</div>
				<div>
					<Button
						className="relative group/btn"
						variant="customBtn"
						onClick={() => handleSort("completed")}
					>
						Sort by Completed
						<BottomGradient />
					</Button>
				</div>
				<Button
					className="w-fit relative group/btn flex items-center"
					variant="customBtn"
					onClick={() => deleteAllTodos()}
				>
					<Image
						src={trash}
						alt="trash"
						className=" cursor-pointer"
					/>
				</Button>
			</div>
		</div>
	);
};

export default CreateCopy;

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};
