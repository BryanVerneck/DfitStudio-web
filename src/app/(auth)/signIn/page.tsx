'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';

export default function SignUp() {

	const router = useRouter();

	const [name, setName] = useState('');
	const [signInFailed, setSignInFailed] = useState(false);

	function handleSignIn() {
		api.get(`/getStudentByName/${name}`).then((response) => {
			console.log(response.data);
			localStorage.setItem('user', JSON.stringify(response.data));
			router.push('/');
		}).catch((error) => {
			setSignInFailed(true);
			console.log(error);
		});
	}

	return (
		<>
			<main className="flex justify-center py-20 h-screen">
				<div className="flex flex-col w-fit gap-3 items-center">
					<h1>Bem vindo(a)!</h1>
					<input type="text" placeholder="Nome e sobrenome"
						className={`${signInFailed ?
							'border-1 border-red-500 py-1 px-2 rounded' :
							'border-1 py-1 px-2 rounded'
						}`}
						onChange={(e) => setName((e.target.value).toLowerCase())}
					/>
					{signInFailed ?
						<p className='text-red-500 w-44'>
              Aluno não encontrado.
						</p>
						: <></>
					}
					<div className="w-full flex justify-end gap-1">
						<button
							className='border-1 px-2 py-1 rounded'
							onClick={() => router.push('/signUp')}
						>
              Criar conta
						</button>
						<button
							className={`${name ?
								'border-1 px-2 py-1 rounded' :
								'border-1 px-2 py-1 rounded opacity-50'
							}`}
							disabled={!name}
							onClick={handleSignIn}
						>
              Entrar
						</button>
					</div>
				</div>
			</main>
		</>
	);
}
