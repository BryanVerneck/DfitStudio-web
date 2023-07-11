'use client';
import ClassHour from '@/components/classHour';
import ClassDetails from '@/components/classDetails';
import Header from '@/components/header';
import { TrainingClasses } from '@/types/TrainingClasses';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WeekDateMenu from '@/components/weekDateMenu';
import { GridLoader } from 'react-spinners';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyGreen, notifyRed } from '@/components/notification';

export default function Home() {
	const router = useRouter();

	const [ weekDateSelected, setWeekDateSelected ] = useState('Segunda-feira');
	const [ selectedClassHour, setSelectedClassHour ] = useState<TrainingClasses | null>(null);
	const [ trainingClasses, setTrainingClasses ] = useState<TrainingClasses[]>([]);
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user')!);
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

	async function handleSelectedClassHour(trainingClass: TrainingClasses){
		setLoading(true);
		await api.get(`/getTrainingClassById/${trainingClass._id}`).then((response) => {
			setSelectedClassHour(response.data);
			// handleGetTrainingClasses();
		});
		setLoading(false);
	}

	function handleLoading(loadingStatus: boolean){
		setLoading(loadingStatus);
	}

	return (
		<>
			<Header/>

			<main className="flex flex-col w-full items-center justify-center">
				<WeekDateMenu weekDateSelected={weekDateSelected} onWeekSelected={handleWeekDateSelected}/>

				<div className="grid grid-cols-4 gap-1 justify-center border-b-1 pb-3 px-3 mt-2">
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

				{!loading ?
					<ClassDetails
						selectedClassHour={selectedClassHour}
						onStudentListUpdate={handleGetTrainingClasses}
						onSelectedClassHourUpdate={handleSelectedClassHour}
						notifyGreen={notifyGreen}
						notifyRed={notifyRed}
						loading={handleLoading}
					/>
					:
					<div className='mt-14'>
						<GridLoader
							color={'#BE185D'}
							loading={loading}
							// cssOverride={override}
							size={10}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				}

				<ToastContainer limit={2}/>
			</main>

		</>
	);
}
