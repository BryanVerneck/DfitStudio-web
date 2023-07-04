import StudentsList from './studentsList';
import { TrainingClasses } from '@/types/TrainingClasses';

interface ClassDetailProps {
  selectedClassHour? : null | TrainingClasses;
}

export default function ClassDetails({ selectedClassHour } : ClassDetailProps) {
	return(
		<>
			{!selectedClassHour && <div className='m-8'>Selecione seu horário</div>}

			{selectedClassHour && (
				<div className="m-5 w-80">
					<div className="flex text-xl w-full items-center justify-center">
						<h2 className="border-r-2 px-3">{selectedClassHour?.classHour} AM</h2>
						<h2 className="px-3">{selectedClassHour?.students.length} alunos</h2>
					</div>

					<div className='flex items-center justify-center m-2'>{selectedClassHour.trainingType}</div>

					<div className="flex m-4 gap-1 items-center justify-center">
						<input type="text" placeholder="Nome" className="p-1 border-1 rounded"/>
						<button className="border-1 rounded px-2 py-1">Adicionar</button>
					</div>

					{selectedClassHour.students.map(studentInClass => {
						return(
							<StudentsList key={studentInClass._id} student={studentInClass.student}/>
						);
					})}

				</div>
			)}
		</>
	);
}
