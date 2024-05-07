"use client";
import Create from "@/components/ui/create/create";
import { useState } from "react";

export default function Home() {
	return (
		<div className="flex flex-col items-center">
			<h2>Todo list</h2>
			<Create />
		</div>
	);
}
