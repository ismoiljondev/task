"use client";
import React, { useState } from "react";
import { Input } from "../input";
import { Button } from "../button";

const Create: React.FC = () => {
	const [todos, setTodos] = useState([
		{ task: "My first task", completed: false },
		{ task: "My second task", completed: true },
		{ task: "My third task", completed: false },
	]);
	const handleAdd = () => {};
	const handeSubmit = (e: any) => {
		e.preventDefault();
		let task = e.target.task.value;

		alert("new task" + " " + task);

		e.target.reset();
	};
	return (
		<div className="flex flex-col">
			<form onSubmit={handeSubmit} className="flex">
				<Input
					type="text"
					className="w-[300px] p-2.5 border-2 border-solid outline-none border-r-0"
					placeholder="Enter task"
					name="task"
				/>
				<Button variant={"customBtn"} type="submit">
					Add
				</Button>
			</form>
			{todos.length === 0 ? (
				<div>
					<h2>No record</h2>
				</div>
			) : (
				todos.map((todo, index) => (
					<div
						key={index}
						className={`rounded mt-4 p-2 flex ${
							todo.completed ? "bg-green-700" : "bg-gray-700"
						}`}
					>
						<div className="m-auto">{todo.task}</div>
						<div className={`${todo.completed ? "" : "hidden"}`}>
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
									d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
						</div>
						<div className={`${todo.completed ? "hidden" : ""}`}>
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
									d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
						</div>
						<div>
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
									d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
								/>
							</svg>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default Create;
