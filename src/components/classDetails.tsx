import { useEffect, useState } from 'react';
import StudentsList from './studentsList';
import { TrainingClasses } from '@/types/TrainingClasses';
import { api } from '@/utils/api';
import { Students } from '@/types/Students';
import { notifyYellow } from './notification';

interface ClassDetailProps {
  selectedClassHour? : null | TrainingClasses;
  onStudentListUpdate: () => void;
  onSelectedClassHourUpdate: (trainingClass : TrainingClasses) => void;
  notifyGreen: (message: string) => void;
  notifyRed: (message: string) => void;
  loading: (messageStatus: boolean) => void;
}

export default function ClassDetails({
	selectedClassHour,
	onStudentListUpdate,
	onSelectedClassHourUpdate,
	notifyGreen,
	notifyRed,
	loading } : ClassDetailProps) {

	const [ user, setUser ] = useState<Students>();
	const [ userInClass, setUserInClass ] = useState(false);

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('user')!));
	}, []);

	useEffect(() => {
		handleUserInClass();
	}, [user]);

	function handleUserInClass(){
		// caso não exista estudantes na lista retorna false
		if(selectedClassHour == null || selectedClassHour.students.length <= 0){
			setUserInClass(false);
			return false;
		}

		selectedClassHour?.students.some((student) => {
			if (student?.student?._id === user?._id) {
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
		if((user!.trainingClasses.length >= user!.classesPerWeek)){
			return notifyRed('Você atingiu o seu limite de aulas.');
		} else if((selectedClassHour!.students.length >= 8)) {
			return notifyRed('Esta aula esta cheia.');
		}

		loading(true);
		await api.put(`/addStudentToClass/${selectedClassHour?._id}`, {
			student: user!._id
		}).then((response) => {
			onStudentListUpdate();
			onSelectedClassHourUpdate(selectedClassHour!);
			setUser(response.data);
			localStorage.setItem('user', JSON.stringify(response.data));
			// getTrainingClassById();
			notifyGreen('Você foi adicionado(a) em uma aula.');
		});
	}

	async function handleRemoveStudent(){
		loading(true);
		await api.put(`/removeStudentFromClass/${selectedClassHour?._id}`, {
			student: user!._id
		}).then((response) => {
			onStudentListUpdate();
			onSelectedClassHourUpdate(selectedClassHour!);
			setUser(response.data);
			localStorage.setItem('user', JSON.stringify(response.data));
			// getTrainingClassById();
			notifyYellow('Você foi removido(a) desta aula.');
		});
	}

	return(
		<>
			{!selectedClassHour && <div className='m-8'>Selecione seu horário</div>}

			{selectedClassHour && user && (
				<div className="mt-5 w-80">
					<div className="flex text-xl items-center justify-center">
						<h2 className="">{selectedClassHour?.classHour}, {selectedClassHour?.weekDate}</h2>
					</div>

					<div className="flex text-xs items-center justify-center mt-1">
						<div className='border-r-2 px-3'>{selectedClassHour.trainingType}</div>
						<h2 className="px-3">{selectedClassHour?.students.length} alunos</h2>
					</div>

					<div className="flex my-3 gap-1 items-center justify-center mt-5 ">
						{!userInClass ?
							<button
								className="border-1 text-green-600 rounded px-2 py-1 hover:bg-pink-700 hover:text-white"
								onClick={handleAddStudent}
							>
                Entrar na aula
							</button>
							:
							<button
								className="border-1 text-red-600 rounded px-2 py-1 hover:bg-pink-700 hover:text-white"
								onClick={handleRemoveStudent}>
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
