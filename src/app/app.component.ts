import {Component, OnInit} from '@angular/core';
import {DialogService, MenuItem, DialogModule} from 'primeng';
import {RunDialogComponent} from './run-dialog/run-dialog.component';

@Component({
  selector: 'app-root',
  providers: [DialogService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/primeflex/primeflex.css'],

})
export class AppComponent implements OnInit {
  title = 'Jogging';
  items: MenuItem[];
  runDialog: RunDialogComponent;
  display: boolean;

  constructor(private dialogService: DialogService) {
    this.display = false;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home'
      },
      {
        label: 'New Run',
        icon: 'pi pi-fw pi-plus-circle',
        command: (event) => this.showNewRunDialog()
      },
      {
        label: 'Tools',
        icon: 'pi pi-fw pi-cog',
        items: [
          {label: 'Find runs', icon: 'pi pi-fw pi-search'},
          {label: 'Chart this', icon: 'pi pi-fw pi-chart-line'},
          {label: 'Monthly chart', icon: 'pi pi-fw pi-chart-bar'},
          {label: 'Yearly chart', icon: 'pi pi-fw pi-chart-bar'}
        ]
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-user',
        items: [
          {label: 'Shoes', icon: 'pi pi-fw pi-pencil'},
          {label: 'Change password', icon: 'pi pi-fw pi-lock'},
          {label: 'What\'s new', icon: 'pi pi-fw pi-info'}
        ]
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out'
      }
    ];
  }

  showNewRunDialog() {
    console.log('New run dialog works');
    this.display = true;
    }

  onDialogClose(event) {
    this.display = event;
  }
}
