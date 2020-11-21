##Map View Feature

* Component that can be reused
* The component has a run (or just the GPX track? Maybe better)
* The component displays the run's GPX track (is possible?)
    * If necessary, convert to GeoJSON


## Run View Feature

* New component in run module (X)
* Has a run reference (X)
* Contains run details (exact display TBD) (X)
* If the run has a GPX track, displays the *Map View* (X)
    * If not, show a nice message instead of empty space
* Has a button to Edit (_Edit Dialog as now, including add GPX Track_) (X)
    * Nice to have: add GPX track via URL
* After editing in the run view, the map reloads if needed

##Changes to run features

### Run Table
* Clicking on run in run table opens new **Run View** (X)
* Add edit widget to table rows for fast edit
### New Run
* Works as before, with GPX file uploader button (currently broken, run id is null)
* After saving, opens **Run View** for the new run
### Edit Run
* Works as before, need to be able to delete or change GPX
