interface HeaderProps {
  weekDateSelected: string;
  onWeekSelected: (weekDateId: string) => void;
}

export default function Header({ weekDateSelected, onWeekSelected }: HeaderProps){

	const weekDates = [
		{id: 'SEGUNDA', label: 'SEG'},
		{id: 'TERÇA', label: 'TER'},
		{id: 'QUARTA', label: 'QUA'},
		{id: 'QUINTA', label: 'QUI'},
		{id: 'SEXTA', label: 'SEX'},
		{id: 'SABADO', label: 'SAB'}
	];

	return(
		<header className="flex items-center justify-center w-full p-4 border-b-1 border-gray-300">
			<nav className="flex gap-4">
				{weekDates.map((weekDate, index) => {
					return(
						<button
							key={index}
							onClick={() => onWeekSelected(weekDate.id)}
							className={`${weekDateSelected === weekDate.id && 'text-green-500'}`}
						>
							{weekDate.label}
						</button>
					);
				})}
			</nav>
		</header>
	);
}
