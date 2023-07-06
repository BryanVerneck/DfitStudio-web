import { useEffect, useState } from 'react';
import StudentsList from './studentsList';
import { TrainingClasses } from '@/types/TrainingClasses';
import { api } from '@/utils/api';
import { Students } from '@/types/Students';

interface ClassDetailProps {
  selectedClassHour? : null | TrainingClasses;
  onStudentListUpdate: () => void;
  onSelectedClassHourUpdate: (trainingClass : TrainingClasses) => void;
}

export default function ClassDetails({ selectedClassHour, onStudentListUpdate, onSelectedClassHourUpdate } : ClassDetailProps) {

	const user: Students = JSON.parse(localStorage.getItem('user')!);
	const [ userInClass, setUserInClass ] = useState(false);

	function handleUserInClass(){
		selectedClassHour?.students.some((student) => {
			if (student.student._id === user._id) {
				setUserInClass(true);
				return true; // Encerra a iteração assim que encontrar o primeiro valor true
			} else {
				setUserInClass(false);
				return false;
			}
		});
	}

	async function getTrainingClassById(){
		await api.get(`/getTrainingClassById/${selectedClassHour?._id}`).then((response) => {
			onSelectedClassHourUpdate(response.data);
		});
	}

	async function handleAddStudent(){
		await api.put(`/addStudentToClass/${selectedClassHour?._id}`, {
			student: user._id
		}).then(() => {
			onStudentListUpdate();
			getTrainingClassById();
		});
	}

	async function handleRemoveStudent(){
		await api.put(`/removeStudentFromClass/${selectedClassHour?._id}`, {
			student: user._id
		}).then(() => {
			onStudentListUpdate();
			getTrainingClassById();
		});
	}

	useEffect(() => {
		handleUserInClass();
	}, [selectedClassHour]);

	return(
		<>
			{!selectedClassHour && <div className='m-8'>Selecione seu horário</div>}

			{selectedClassHour && (
				<div className="m-5 w-80">
					<div className="flex text-xl w-full items-center justify-center gap-2">
						<h2 className="">{selectedClassHour?.classHour}</h2>
						<p>-</p>
						<h2 className="">{selectedClassHour?.weekDate}</h2>
					</div>

					<div className="flex text-xs w-full items-center justify-center">
						<div className='border-r-2 px-3'>{selectedClassHour.trainingType}</div>
						<h2 className="px-3">{selectedClassHour?.students.length} alunos</h2>
					</div>

					<div className="flex my-3 gap-1 items-center justify-center">
						{!userInClass ?
							<button className="border-1 rounded px-2 py-1" onClick={handleAddStudent}>
                Entrar na aula
							</button> :
							<button className="border-1 text-red-500 rounded px-2 py-1" onClick={handleRemoveStudent}>
                Sair da aula
							</button>
						}
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
