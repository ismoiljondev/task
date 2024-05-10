"use client";
import CreateCopy from "@/components/copy/create";
import withAuth from "@/app/utils/withAuth";
const CreatPage = () => {
	return (
		<div className="flex flex-col items-center m-auto">
			<CreateCopy />
		</div>
	);
};

export default withAuth(CreatPage);
