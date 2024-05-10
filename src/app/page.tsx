"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useRouter } from "next/navigation";
export default function Home() {
	const router = useRouter();
	const words = [
		{
			text: "Manage",
		},
		{
			text: "your",
		},
		{
			text: "day",
		},
		{
			text: "with",
		},
		{
			text: "TODO.",
			className: "text-blue-500 dark:text-blue-500",
		},
	];
	return (
		<div className="flex flex-col items-center justify-center h-[40rem] ">
			<p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
				The road to freedom starts from here
			</p>
			<TypewriterEffectSmooth words={words} />
			<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
				<button
					className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
					onClick={() => router.push("/create")}
				>
					Create Todo
				</button>
				<button
					onClick={() => router.push("/register")}
					className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm"
				>
					Signup
				</button>
			</div>
		</div>
	);
}
