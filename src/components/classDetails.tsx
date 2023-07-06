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
					<div className="flex text-xl w-full items-center justify-center gap-2">
						<h2 className="">{selectedClassHour?.classHour} AM</h2>
						<p>-</p>
						<h2 className="">{selectedClassHour?.weekDate}</h2>
					</div>

					<div className="flex text-xs w-full items-center justify-center">
						<div className='border-r-2 px-3'>{selectedClassHour.trainingType}</div>
						<h2 className="px-3">{selectedClassHour?.students.length} alunos</h2>
					</div>

					<div className="flex my-3 gap-1 items-center justify-center">
						<button className="border-1 rounded px-2 py-1">Entrar na aula</button>
						<button className="border-1 text-red-500 rounded px-2 py-1">Sair da aula</button>
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
