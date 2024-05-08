import React from "react";
import { Badge } from "../ui/badge";

const Tasks = ({ todos }: any) => {
	return (
		<div className="flex justify-between">
			<h2 className="text-[#4EA8DE]">
				Tasks created <Badge>{todos.length}</Badge>
			</h2>
			<h2 className="text-[#8284FA]">
				Completed{" "}
				<Badge>
					{todos.filter((e: any) => e.completed === true).length} of{" "}
					{todos.length}
				</Badge>
			</h2>
		</div>
	);
};

export default Tasks;
