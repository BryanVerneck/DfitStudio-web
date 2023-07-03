'use client';
import ClassHour from '@/components/classHour';
import ClassDetails from '@/components/classDetails';
import Header from '@/components/header';
import { TrainingClasses } from '@/types/TrainingClasses';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { Students } from '@/types/Students';

export default function Home() {

	const [ weekDateSelected, setWeekDateSelected ] = useState('SEGUNDA');
	const [ trainingClasses, setTrainingClasses ] = useState<TrainingClasses[]>([]);
	const [ students, setStudents ] = useState<Students[]>([]);
	const [ isLoading, setIsLoading ] = useState(true);

	function handleWeekDateSelected(weekDate: string){
		setWeekDateSelected(weekDate);
	}

	useEffect(() => {
		Promise.all([
			api.get('/trainingClasses'),
			api.get('/students'),
		]).then(([trainingClassResponse, studentsResponse]) => {
			setTrainingClasses(trainingClassResponse.data);
			setStudents(studentsResponse.data);
			setIsLoading(false);
		});
	}, []);

	return (
		<>
			<Header weekDateSelected={weekDateSelected} onWeekSelected={handleWeekDateSelected}/>

			<main className="flex flex-col w-full items-center justify-center">
				<div className="grid grid-cols-4 gap-2 items-center justify-center border-b-1 py-4">
					{trainingClasses.map(trainingClass => {
						if(trainingClass.weekDate != weekDateSelected){
							return <></>;
						}

						return(
							<ClassHour key={trainingClass._id} hour={trainingClass.classHour} studentsQuantity={trainingClass.students.length}/>
						);
					})}

				</div>

				<ClassDetails />

			</main>

		</>
	);
}
