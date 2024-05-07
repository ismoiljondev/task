"use client";
import Create from "@/components/create/create";
import Image from "next/image";
import logo from "@/logo/Logo.svg";
export default function Home() {
	return (
		<div className="flex flex-col items-center bg-[#0D0D0D] gap-5 h-fit m-auto pt-20">
			<div className="mb-10">
				<Image src={logo} alt="logo" />
			</div>
			<div className="bg-[#1A1A1A] w-full flex justify-center h-full">
				<Create />
			</div>
		</div>
	);
}
