import { Students } from '@/types/Students';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

interface StudentListProps {
  student: Students;
}

export default function StudentsList({ student } : StudentListProps){
	return(
		<div className="flex justify-center items-center mb-3">
			<p>{student.name}</p>
			<div className="flex gap-2">
				{/* <button className="border-1 p-1 px-2 rounded">
					<PencilSquareIcon className="h-5 w-5 text-blue-500"/>
				</button> */}
				{/* {student.name == user.name && (
					<button className="border-1 p-1 px-2 rounded">
						<ArrowRightOnRectangleIcon className="h-5 w-5 text-red-500"/>
					</button>
				)} */}
			</div>
		</div>
	);
}
