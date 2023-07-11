interface WeekDateMenuProps {
  weekDateSelected: string;
  onWeekSelected: (weekDateId: string) => void;
}

export default function WeekDateMenu({ weekDateSelected, onWeekSelected }: WeekDateMenuProps){

	const weekDates = [
		{id: 'Segunda-feira', label: 'SEG'},
		{id: 'Terça-feira', label: 'TER'},
		{id: 'Quarta-feira', label: 'QUA'},
		{id: 'Quinta-feira', label: 'QUI'},
		{id: 'Sexta-feira', label: 'SEX'},
		{id: 'Sábado', label: 'SAB'}
	];

	return(
		<header
			className="flex items-center justify-center w-full py-2 mt-2"
		>
			<nav className="flex gap-3 font-semibold">
				{weekDates.map((weekDate, index) => {
					return(
						<button
							key={index}
							onClick={() => onWeekSelected(weekDate.id)}
							className={`${weekDateSelected === weekDate.id &&
                'text-pink-700'
							}`}
						>
							{weekDate.label}
						</button>
					);
				})}
			</nav>
		</header>
	);
}
