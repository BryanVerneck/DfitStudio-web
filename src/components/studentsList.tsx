import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

export default function StudentsList(){
	return(
		<div className="flex justify-between items-center mb-3">
			<p>Bryan Verneck</p>
			<div className="flex gap-2">
				<button className="border-1 p-1 px-2 rounded">
					<PencilSquareIcon className="h-5 w-5 text-blue-500"/>
				</button>
				<button className="border-1 p-1 px-2 rounded">
					<TrashIcon className="h-5 w-5 text-red-500"/>
				</button>
			</div>
		</div>
	);
}
