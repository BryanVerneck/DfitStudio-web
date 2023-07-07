import { Students } from './Students';

export interface TrainingClasses {
  _id: string;
  weekDate: string;
  classHour: string,
  trainingType: string,
  students: {
    _id: string;
    student: Students
  }[]
}
