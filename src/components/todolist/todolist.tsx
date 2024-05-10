import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import trash from "@/logo/trash.svg";
import Image from "next/image";
import check from "@/logo/check.svg";
import x from "@/logo/x.svg";
import edit from "@/logo/edit.svg";
import { Button } from "../ui/button";
type todoProps = {
	todos: any;
	changeStatus: any;
	setEdit: any;
	deleteTodo: any;
};

const Todolist = ({ todos, changeStatus, deleteTodo, setEdit }: todoProps) => {
	return (
		<>
			{todos.map((todo: any, index: number) => (
				<Accordion
					type="single"
					collapsible
					key={index}
					className={`mt-4 py-2 px-3 justify-between text-lg 
					relative group/btn flex space-x-2 items-center w-full  rounded-md font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]
					 ${todo.completed ? "text-[#7A7777] line-through" : "text-black"}`}
				>
					<AccordionItem
						value="item-1"
						className="w-full border-none"
					>
						<AccordionTrigger className="w-full flex justify-between">
							<div className="flex gap-4">
								<div onClick={() => changeStatus(index)}>
									<div
										className={`${
											todo.completed
												? "cursor-pointer"
												: "hidden"
										}`}
									>
										<Image src={check} alt="check" />
									</div>
									<div
										className={`${
											todo.completed
												? "hidden"
												: "cursor-pointer"
										}`}
									>
										<Image src={x} alt="x" />
									</div>
								</div>
								<div>
									<p className="break-all">{todo.todo}</p>
								</div>
							</div>
							<div className="flex gap-4 self-end items-center max-md:gap-1">
								<Button
									variant={"customBtn"}
									className={`cursor-pointer text-[#F5F5F5] p-2 max-md:p-1 max-md:text-xs max-md:w-10 max- flex items-center ${
										todo.completed
											? "hidden"
											: "text-[#F5F5F5]"
									}`}
									onClick={() => {
										setEdit(index);
									}}
								>
									<Image src={edit} alt="edit" />
								</Button>
								<Button
									variant={"customBtn"}
									className="cursor-pointer p-2 max-md:p-1 max-md:text-xs max-md:w-10 max- flex items-center"
									onClick={() => deleteTodo(todo.id)}
								>
									<Image
										src={trash}
										alt="trash"
										style={{ color: "white" }}
									/>
								</Button>
								<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
							</div>
						</AccordionTrigger>
						<AccordionContent
							className={`${
								todo.desc || todo.deadline ? "" : "hidden"
							}`}
						>
							<p>{todo.desc}</p>
							<p className="text-[#808080] text-xs">
								Created at:{" "}
								{new Date(todo.createdAt).toLocaleString()}
							</p>
							{todo.deadline && (
								<p className="text-[#808080] text-xs">
									Deadline:{" "}
									{new Date(todo.deadline).toLocaleString()}
								</p>
							)}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			))}
		</>
	);
};

export default Todolist;
