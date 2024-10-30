# AngularJogging

It runs together with the jogging3 project as a Java/SpringBoot backend

## Known bugs
- For any future bugs open an issue at GitHub

## TODOS
- Lots of cleanup in the run/map view component
- Get some more unit tests
- Implement a chart showing average pulse rate over time
- Come up with a replacement for Chart This
- Implement Find Runs (same as monthly/yearly chart, but with course parameter)
- Use local storage so we don't have to keep reloading the runs (started)
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

The index.html file is no longer under version control, due to the presence of the Google API key. The build will copy index.env.html to index.html
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build,
with base-href argument, e.g. `ng build --configuration production --base-href https://www.webber-jogging.de`
If you run into an Error: error:0308010C:digital envelope routines::unsupported
do this: `export NODE_OPTIONS=--openssl-legacy-provider`


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
