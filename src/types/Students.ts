export interface Students {
  _id: string;
  name: string;
  classesPerWeek: number;
  trainingClasses: {
    class: string;
    _id: string;
  }[]
}
