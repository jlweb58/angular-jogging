import {ActivityType} from '../core/models/activity-type.model';

export class CalendarFilter {

  selectedActivityTypes: ActivityType[];

  constructor() {
    this.selectedActivityTypes = [];
  }

  addSelection(activityType: ActivityType): void {
    this.selectedActivityTypes.push(activityType);
  }

  removeSelection(activityType: ActivityType): void {
    this.selectedActivityTypes.forEach( (item, index) => {
      if (item === activityType) {
        this.selectedActivityTypes.splice(index, 1);
      }
    });
  }

}

