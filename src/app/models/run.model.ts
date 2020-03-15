export interface Run {
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
}
