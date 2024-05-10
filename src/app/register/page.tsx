"use client";
import React, { useState } from "react";

import { cn } from "@/app/utils/cn";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
	firstName: string;
	email: string;
	password: string;
	twitterPassword: string;
}

export default function SignupFormDemo() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fname, setFname] = useState("");
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			const user = auth.currentUser;
			if (user) {
				await setDoc(doc(db, "Users", user.uid), {
					email: user.email,
					firstName: fname,
				});
			}
			router.push("/create");
			toast.success("User Registered Successfully!", {
				position: "top-center",
			});
		} catch (err: any) {
			toast.success(err.message, {
				position: "bottom-right",
			});
		}
	};
	function googleLogin() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider).then(async (result) => {
			if (result.user) {
				await setDoc(doc(db, "Users", result.user.uid), {
					email: result.user.email,
					firstName: result.user.displayName,
				});
				toast.success("User login successfuly!", {
					position: "top-center",
				});
				router.push("/create");
			}
		});
	}

	return (
		<div className="flex flex-col h-screen items-center justify-center">
			<div className="max-w-md w-full rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
				<h2 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200">
					Register
				</h2>

				<form className="my-8" onSubmit={handleSubmit(onSubmit)}>
					<LabelInputContainer className="mb-4">
						<Label htmlFor="firstname">First name</Label>
						<Input
							id="firstname"
							placeholder="Tyler"
							type="text"
							{...register("firstName", {
								required: "This field is required",
							})}
							onChange={(e) => setFname(e.target.value)}
						/>
					</LabelInputContainer>
					<LabelInputContainer className="mb-4">
						<Label htmlFor="email">Email Address</Label>
						<Input
							id="email"
							placeholder="projectmayhem@fc.com"
							type="email"
							{...register("email", {
								required: "This field is required",
							})}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</LabelInputContainer>
					<LabelInputContainer className="mb-4">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							placeholder="••••••••"
							type="password"
							{...register("password", {
								required: "This field is required",
							})}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</LabelInputContainer>
					<button
						className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
						type="submit"
					>
						Sign up &rarr;
						<BottomGradient />
					</button>
					<p className="text-neutral-600 text-sm text-right max-w-sm mt-2 dark:text-neutral-300">
						Already have an account?{" "}
						<Link
							href={"/login"}
							className="underline text-blue-400"
						>
							Sign in
						</Link>
					</p>
					<div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

					<div className="flex flex-col space-y-4">
						<button
							className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
							type="submit"
							onClick={googleLogin}
						>
							<IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
							<span className="text-neutral-700 dark:text-neutral-300 text-sm">
								Google
							</span>
							<BottomGradient />
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("flex flex-col space-y-2 w-full", className)}>
			{children}
		</div>
	);
};
