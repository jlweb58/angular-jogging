export class Run {
  id: number;
  date: string;
  course: string;
  distance: number;
  runDuration: {
    time: string;
  };
  weather: string;
  comments: string;
  avgHeartRate: number;

  constructor() {
    this.runDuration = {
      time: ''
    };
  }
}
