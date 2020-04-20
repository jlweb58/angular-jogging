# AngularJogging

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.5.

## Known bugs
- (FIXED) On editing a run the shoes are not saved - seems to be due to a CORS problem on loading the shoes while editing.
   -- needed to select on shoes.id, not shoes
- (FIXED) If a run doesn't already have shoes it can't be edited (the selectedShoe ref is null)   
- (FIXED) The monthly totals in the chart are incorrect. Must be a logic error in the tabulation. (Fixed by implementing proper
   map sort function)   
- (FIXED Yearly chart totals also incorrect. (e.g. only 885 for 2019 instead of 1200+)
- Default shoes are not pre-selected on new run
- Fonts are much smaller on production, why is this?

## TODOS
- Construct a better date picker for the chart range picker (especially for yearly) (probably must be manually implemented)
- Implement a calendar view like Garmin Connect (should replace Query Runs)
- Come up with a replacement for Chart This
- Implement Find Runs
- Dockerize the application(s)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build,
with base-href argument, e.g. ng build --prod --base-href https://www.webber-jogging.de

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
