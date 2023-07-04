import { Students } from '@/types/Students';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

interface StudentListProps {
  student: Students;
}

export default function StudentsList({ student } : StudentListProps){
	return(
		<div className="flex justify-between items-center mb-3">
			<p>{student.name}</p>
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
