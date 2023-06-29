import StudentsList from './studentsList';

export default function ClassDetails() {
	return(
		<div className="">
			<div className="flex text-xl w-full items-center justify-center">
				<h2 className="border-r-2 px-3">06:00 - 07:00</h2>
				<h2 className="px-3">8 alunos</h2>
			</div>

			<div className="flex m-4 gap-1 items-center justify-center">
				<input type="text" placeholder="Nome" className="p-1 border-1 rounded"/>
				<button className="border-1 rounded px-2 py-1">Adicionar</button>
			</div>

			<StudentsList/>
			<StudentsList/>
			<StudentsList/>
			<StudentsList/>
			<StudentsList/>
			<StudentsList/>
			<StudentsList/>
		</div>
	);
}
