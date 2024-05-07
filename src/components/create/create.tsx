import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

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
		<div className="flex flex-col rounded-md w-4/6 pt-0 -m-6 max-lg:w-4/5 max-md:w-5/6 max-md:p-4 max-sm:w-full">
			<form
				onSubmit={handleSubmit}
				className="flex w-full gap-2 items-center mb-14"
			>
				<Input
					type="text"
					className="w-full font-medium text-lg py-8 border-2 outline-none border-r-0 bg-[#262626] text-[#808080] border-none focus-visible:none max-md:py-6"
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
			<div className="flex flex-col gap-4 scroll-smooth">
				{
					<div className="flex justify-between">
						<h2 className="text-[#4EA8DE]">
							Tasks created <Badge>{todos.length}</Badge>
						</h2>
						<h2 className="text-[#8284FA]">
							Completed{" "}
							<Badge>
								{
									todos.filter(
										(e: any) => e.completed === false
									).length
								}{" "}
								of {todos.length}
							</Badge>
						</h2>
					</div>
				}
				{todos.length === 0 ? (
					<div>
						<hr className="border-[#333333]" />
						<div className="flex flex-col items-center justify-center mt-20">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									className="w-20 h-20 text-[#808080]"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
									/>
								</svg>
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
					todos.map((todo: any, index: number) => (
						<div
							key={index}
							className={`rounded-md mt-4 p-5 flex justify-between text-lg bg-[#262626]  ${
								todo.completed
									? "text-[#F5F5F5]"
									: "text-[#7A7777] line-through"
							}`}
						>
							{editingIndex === index ? (
								<div className="flex gap-3 w-full">
									<Input
										type="text"
										value={editValue}
										onChange={handleChange}
										autoFocus
										className="text-black w-full"
									/>
									<Button
										onClick={handleUpdate}
										variant={"customBtn"}
									>
										Update
									</Button>
								</div>
							) : (
								<div className="flex gap-3 justify-between w-full">
									<div className="flex gap-4">
										<div
											onClick={() =>
												changeTaskStatus(index)
											}
										>
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
										<div>
											<p className="break-all">
												{todo.task}
											</p>
										</div>
									</div>
									<div className="flex gap-4">
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
												className="w-6 h-6 "
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
												/>
											</svg>
										</div>
									</div>
								</div>
							)}
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Create;
