export interface TrainingClasses {
  _id: string;
  weekDate: string;
  classHour: string,
  trainingType: string,
  students: {
    _id: string;
    student: {
      _id: string;
      name: string;
      classesPerWeek: number;
    }
  }[]
}
