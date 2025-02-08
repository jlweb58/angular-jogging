# AngularJogging

It runs together with the jogging3 project as a Java/SpringBoot backend

## Known bugs
- For any future bugs open an issue on the Jira board, https://jlweb58.atlassian.net/jira/software/c/projects/FAT/boards/2

## TODOS
- Lots of cleanup in the run/map view component
- Get some more unit tests
- Implement a chart showing average pulse rate over time
- Come up with a replacement for Chart This
- Implement Find Runs (same as monthly/yearly chart, but with course parameter)
- 
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

The index.html file is no longer under version control, due to the presence of the Google API key.
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build,
with base-href argument, e.g. `ng build --configuration production --base-href https://www.webber-jogging.de`
If you run into an Error: error:0308010C:digital envelope routines::unsupported
do this: `export NODE_OPTIONS=--openssl-legacy-provider`

It is generally not necessary to build the project locally - pushing the main branch to GitHub will trigger an action that buildss and deploys everything
to the production server.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
