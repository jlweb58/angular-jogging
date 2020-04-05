import {Shoes} from './shoes.model';

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
  shoes: Shoes;

  constructor() {
    this.runDuration = {
      time: ''
    };
    this.shoes = new Shoes();
  }
}
