import { Students } from '@/types/Students';

interface StudentListProps {
  student: Students;
}

export default function StudentsList({ student } : StudentListProps){
	return(
		<div className="flex justify-center items-center mb-3">
			<p>{student.name}</p>
		</div>
	);
}
