interface ClassHourProps {
  hour: string;
  studentsQuantity: number;
}

export default function ClassHour({hour, studentsQuantity} : ClassHourProps) {
	return(
		<div className="border-1 px-3 py-2 hover:cursor-pointer hover:bg-slate-500 text-center rounded">
			{hour}
			<p className="text-1">Alunos: {studentsQuantity}</p>
		</div>
	);
}
