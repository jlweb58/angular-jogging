export class Gear {
  id: number;
  name: string;
  mileageOffset: number;
  mileage: number;
  active: boolean;
  preferred: boolean;

  constructor() {
    this.mileageOffset = 0;
    this.mileage = 0;
    this.active = true;
    this.preferred = false;
  }

}
