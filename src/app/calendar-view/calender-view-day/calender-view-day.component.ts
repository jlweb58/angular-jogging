import {Component, Input, OnInit} from '@angular/core';
import {CalendarDay} from '../../core/models/calendar.day';
import {Activity} from '../../core/models/activity.model';
import {Router} from '@angular/router';
import {ActivityType} from '../../core/models/activity-type.model';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {DurationPipe} from '../../shared/pipes/duration.pipe';

@Component({
  selector: 'app-calender-view-day',
  templateUrl: './calender-view-day.component.html',
  styleUrls: ['./calender-view-day.component.css'],
  imports: [
    NgClass,
    MatIcon,
    NgIf,
    NgForOf,
    DurationPipe
  ]
})
export class CalenderViewDayComponent implements OnInit {

  @Input() calendarDay: CalendarDay;
  @Input() currentMonth: number;

  constructor(private router: Router, ) { }

  ngOnInit(): void {
    this.calendarDay.activities.sort((a, b) => a.date.localeCompare(b.date));
  }

  showActivity(activity: Activity): void {
    this.router.navigate(['/activity'], {state: {activity}});
  }

  getIcon(activity: Activity): string {
    switch (activity.activityType) {
      case ActivityType.Bike: {
        return 'directions_bike';
      }
      case ActivityType.Run: {
        return 'directions_run';
      }
      case ActivityType.Swim: {
        return 'pool';
      }
      case ActivityType.Hike: {
        return 'hiking';
      }
      default: {
        return 'sports_and_outdoors';
      }
    }
  }

  getClassForActivity(activity: Activity): string {
    switch (activity.activityType) {
      case ActivityType.Bike: {
        return 'activity-bike';
      }
      case ActivityType.Run: {
        return 'activity-run';
      }
      case ActivityType.Swim: {
        return 'activity-swim';
      }
      case ActivityType.Hike: {
        return 'activity-hike';
      }
      default: {
        return 'activity-default';
      }
    }
  }

  getClassForDate(date: Date): string {
    if (date.getMonth() === this.currentMonth) {
      return 'calendar-table-cell';
    }
    return 'calendar-table-cell other-month';
  }



}
