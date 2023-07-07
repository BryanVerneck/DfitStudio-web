import { TrainingClasses } from '@/types/TrainingClasses';

interface ClassHourProps {
  trainingClass: TrainingClasses;
  onClassHourSelected: (trainingClassId: TrainingClasses) => void;
}

export default function ClassHour({ trainingClass, onClassHourSelected } : ClassHourProps) {
	return(
		<button
			className="border-1 px-2 py-1 hover:cursor-pointer hover:bg-blue-400 text-center rounded"
			onClick={() => onClassHourSelected(trainingClass)}
		>
			{trainingClass.classHour}
			<p className="text-1">Vagas: {8 - trainingClass.students.length}/8</p>
		</button>
	);
}
