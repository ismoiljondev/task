"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";

const withAuth = (WrappedComponent: any) => {
	return (props: any) => {
		const router = useRouter();

		useEffect(() => {
			const unsubscribe = auth.onAuthStateChanged((user) => {
				if (!user) {
					router.replace("/login");
				}
			});

			return () => {
				unsubscribe();
			};
		}, []);

		return <WrappedComponent {...props} />;
	};
};

export default withAuth;
