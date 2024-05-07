"use client";
import Create from "@/components/create/create";
import { useState } from "react";

export default function Home() {
	return (
		<div className="flex flex-col items-center bg-[#0D0D0D] min-h-svh">
			<h2>Todo list</h2>
			<Create />
		</div>
	);
}
