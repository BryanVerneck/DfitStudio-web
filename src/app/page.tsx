import ClassHour from '@/components/class';
import ClassDetails from '@/components/classDetails';

export default function Home() {
	return (
		<>
			<header className="flex items-center justify-center w-full p-4 border-b-1 border-gray-300">
				<nav className="flex gap-4">
					<a href="">DOM</a>
					<a href="">SEG</a>
					<a href="">TER</a>
					<a href="">QUA</a>
					<a href="">QUI</a>
					<a href="">SEX</a>
					<a href="">SAB</a>
				</nav>
			</header>

			<main className="flex flex-col w-full items-center justify-center">
				<div className="grid grid-cols-4 gap-2 items-center justify-center border-b-1 py-4">
					<ClassHour hour="06:00" studentsQuantity={8}/>
					<ClassHour hour="07:00" studentsQuantity={5}/>
					<ClassHour hour="08:00" studentsQuantity={4}/>
					<ClassHour hour="09:00" studentsQuantity={6}/>
					<ClassHour hour="10:00" studentsQuantity={2}/>
					<ClassHour hour="11:00" studentsQuantity={3}/>
					<ClassHour hour="18:00" studentsQuantity={5}/>
					<ClassHour hour="19:00" studentsQuantity={7}/>
					<ClassHour hour="20:00" studentsQuantity={8}/>
				</div>

				<div className="m-5 w-80">
					<ClassDetails/>
				</div>

			</main>

		</>
	);
}
