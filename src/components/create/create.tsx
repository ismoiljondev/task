import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Create: React.FC = () => {
	function getData() {
		let data: any = localStorage.getItem("todos");
		let json = JSON.parse(data);

		if (json) {
			return json;
		}
		return [];
	}
	const [todos, setTodos] = useState(getData());
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [editValue, setEditValue] = useState("");

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let task = e.currentTarget.task.value;

		if (!task) {
			alert("Please provide a valid task");
			return;
		}

		setTodos([...todos, { task: task, completed: true }]);

		e.currentTarget.reset();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditValue(e.target.value);
	};

	const handleUpdate = () => {
		if (!editValue.trim()) {
			alert("Please provide a valid task");
			return;
		}

		const updatedTodos = [...todos];
		updatedTodos[editingIndex!].task = editValue;
		setTodos(updatedTodos);
		setEditingIndex(null);
		setEditValue("");
	};

	function changeTaskStatus(index: number) {
		let newTodos = [...todos];
		newTodos[index].completed = !newTodos[index].completed;
		setTodos(newTodos);
	}
	function deleteTask(index: number) {
		let newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	}
	return (
		<div className="flex flex-col bg-[#151515] p-8 rounded-md w-3/6">
			<form
				onSubmit={handleSubmit}
				className="flex w-full gap-2 items-center"
			>
				<Input
					type="text"
					className="w-full py-6 border-2 outline-none border-r-0 bg-[#262626] text-[#808080] border-none focus-visible:none"
					placeholder="Enter task"
					name="task"
				/>
				<Button
					variant={"customBtn"}
					type="submit"
					className="flex "
					size={"custom"}
				>
					Add{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
				</Button>
			</form>
			{todos.length === 0 ? (
				<div className="flex justify-between">
					<h2 className="text-[#4EA8DE]">
						Tasks created {todos.length}
					</h2>
					<h2 className="text-[#8284FA]">
						Completed{" "}
						{todos.filter((e: any) => e.completed === true).length}
					</h2>
				</div>
			) : (
				todos.map((todo: any, index: number) => (
					<div
						key={index}
						className={`rounded mt-4 p-2 flex bg-[#201F1F]  ${
							todo.completed
								? "text-[#F5F5F5]"
								: "text-[#7A7777] line-through"
						}`}
					>
						{editingIndex === index ? (
							<>
								<Input
									type="text"
									value={editValue}
									onChange={handleChange}
									autoFocus
									className="text-black"
								/>
								<Button
									onClick={handleUpdate}
									variant={"customBtn"}
								>
									Update
								</Button>
							</>
						) : (
							<>
								<div onClick={() => changeTaskStatus(index)}>
									<div
										className={`${
											todo.completed
												? "cursor-pointer"
												: "hidden"
										}`}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											className="w-6 h-6 text-[#F5F5F5]"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
											/>
										</svg>
									</div>
									<div
										className={`${
											todo.completed
												? "hidden"
												: "cursor-pointer"
										}`}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											className="w-6 h-6 "
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
											/>
										</svg>
									</div>
								</div>
								<div className={`m-auto`}>{todo.task}</div>
								<div
									className={`cursor-pointer text-[#F5F5F5]  ${
										todo.completed
											? "text-[#F5F5F5]"
											: "text-[#7A7777] line-through"
									}`}
									onClick={() => {
										setEditingIndex(index);
										setEditValue(todo.task);
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
										/>
									</svg>
								</div>
								<div
									className="cursor-pointer"
									onClick={() => deleteTask(index)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										className="w-6 h-6 text-red-700"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
										/>
									</svg>
								</div>
							</>
						)}
					</div>
				))
			)}
		</div>
	);
};

export default Create;
