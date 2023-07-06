'use client';
import ClassHour from '@/components/classHour';
import ClassDetails from '@/components/classDetails';
import Header from '@/components/header';
import { TrainingClasses } from '@/types/TrainingClasses';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	const user = JSON.parse(localStorage.getItem('user')!);

	const [ weekDateSelected, setWeekDateSelected ] = useState('SEGUNDA');
	const [ selectedClassHour, setSelectedClassHour ] = useState<TrainingClasses | null>();
	const [ trainingClasses, setTrainingClasses ] = useState<TrainingClasses[]>([]);
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		if(!user){
			router.push('/signIn');
		}
		handleGetTrainingClasses();
	}, []);

	async function handleGetTrainingClasses(){
		await api.get('/trainingClasses').then((response) => {
			setTrainingClasses(response.data);
		});
	}

	function handleWeekDateSelected(weekDate: string){
		setWeekDateSelected(weekDate);
		setSelectedClassHour(null);
	}

	function handleSelectedClassHour(trainingClass: TrainingClasses){
		setSelectedClassHour(trainingClass);
	}

	return (
		<>
			<Header weekDateSelected={weekDateSelected} onWeekSelected={handleWeekDateSelected}/>

			<main className="flex flex-col w-full items-center justify-center">
				<div className="grid grid-cols-4 gap-1 items-center justify-center border-b-1 py-4">
					{trainingClasses.map(trainingClass => {
						if(trainingClass.weekDate != weekDateSelected) return null;

						return(
							<ClassHour
								key={trainingClass._id}
								trainingClass={trainingClass}
								onClassHourSelected={handleSelectedClassHour}
							/>
						);
					})}

				</div>

				<ClassDetails
					selectedClassHour={selectedClassHour}
					onStudentListUpdate={handleGetTrainingClasses}
					onSelectedClassHourUpdate={handleSelectedClassHour}
				/>

			</main>

		</>
	);
}
