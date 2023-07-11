import { ArrowRightOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function Header(){

	const router = useRouter();

	return(
		<header
			className="flex items-center justify-center w-full p-3 px-3 border-b-1 border-zinc-700"
		>
			<div className="flex w-80 justify-between items-center">
				<h1 className='font-extrabold'>D<span className='text-pink-700'>FIT</span>STUDIO</h1>
				<button onClick={() => router.push('/signIn')}>
					<ArrowRightOnRectangleIcon className='h-5 w-5 text-red-500'/>
				</button>
			</div>
		</header>
	);
}
