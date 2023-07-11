'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { api } from '@/utils/api';

export default function SignUp(){

	const router = useRouter();

	const [ name, setName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ classesPerWeek, setClassesPerWeek ] = useState(0);
	const [ signUpFailed, setSignUpFailed ] = useState(false);

	function handleSignIn(){
		api.post('/createStudent', {
			name: name + ' ' + lastName,
			classesPerWeek: classesPerWeek
		}).then((response) => {
			localStorage.setItem('user', JSON.stringify(response.data));
			router.push('/');
		}).catch((error) => {
			setSignUpFailed(true);
			console.log(error);
		});
	}

	return(
		<>
			<main className="flex justify-center py-20 h-screen">

				<div className="flex flex-col w-fit gap-3">
					<button
						className='mb-2 border-1 rounded-full w-fit p-1'
						onClick={() => router.push('/signIn')}
					>
						<ArrowLeftIcon className="h-6 w-6"/>
					</button>

					<h1>Cadastre-se</h1>
					<input
						type="text"
						placeholder="Nome"
						className={signUpFailed ?
							'border-1 border-red-500 py-1 px-2 rounded text-black' :
							'border-1 py-1 px-2 rounded text-black'}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Sobrenome"
						className={signUpFailed ?
							'border-1 border-red-500 py-1 px-2 rounded text-black' :
							'border-1 py-1 px-2 rounded text-black'}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<select
						value={classesPerWeek}
						name="NumberOfClasses"
						id="NumberOfClasses"
						className='border-1 p-1 rounded text-black'
						onChange={(e) => setClassesPerWeek(Number(e.target.value))}
					>
						<option value={0} disabled>
              Aulas por semana
						</option>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
						<option value={5}>5</option>
					</select>

					{signUpFailed ?
						<p className='flex justify-center text-red-500'>
            Nome já cadastrado.
						</p> : <></>}

					<div className="w-full flex justify-end">
						<button
							className={`${name && lastName && classesPerWeek > 0 ?
								'border-1 px-2 py-1 rounded' :
								'border-1 px-2 py-1 rounded opacity-50'
							}`}
							disabled={!name || !lastName || classesPerWeek <= 0}
							onClick={handleSignIn}
						>
              Cadastrar
						</button>
					</div>
				</div>
			</main>
		</>
	);
}
