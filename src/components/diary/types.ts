export interface IApproach {
  weight: string;
  repetitions: string;
  index: number;
}

export interface IWorkout {
  id: string;
  date: string;
  approaches: IApproach[];
}
