import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";

const withAuth = (WrappedComponent: any) => {
	const ComponentWithAuth = (props: any) => {
		const router = useRouter();

		useEffect(() => {
			const unsubscribe = auth.onAuthStateChanged((user) => {
				if (!user) {
					// User is not logged in, redirect to login page
					router.replace("/login");
				}
			});

			return () => {
				unsubscribe();
			};
		}, [router]);

		return <WrappedComponent {...props} />;
	};

	// Add display name for the HOC
	ComponentWithAuth.displayName = `WithAuth(${
		WrappedComponent.displayName || WrappedComponent.name || "Component"
	})`;

	return ComponentWithAuth;
};

export default withAuth;
