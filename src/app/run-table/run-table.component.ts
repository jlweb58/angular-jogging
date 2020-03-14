import { Component, OnInit } from '@angular/core';
import { RunService} from '../run.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Run} from '../models/run.model';

@Component({
  selector: 'app-run-table',
  templateUrl: './run-table.component.html',
  styleUrls: ['./run-table.component.css']
})
export class RunTableComponent implements OnInit {
  dataSource = new RunDataSource(this.runService);
  displayedColumns = ['date', 'course', 'distance', 'time', 'weather', 'comments', 'avgheartrate'];

  constructor(
    private runService: RunService
  ) { }

  ngOnInit(): void {
  }

}
export class RunDataSource extends DataSource<any> {
  constructor(private runService: RunService) {
    super();
  }
  connect(): Observable<Run[]> {
    alert('connected');
    return this.runService.getRuns();
  }
  disconnect() {}
}

