##Map View Feature

* Component that can be reused
* The component has a run (or just the GPX track? Maybe better)
* The component displays the run's GPX track (is possible?)
    * If necessary, convert to GeoJSON


## Run View Feature

* New component in run module
* Has a run reference
* Contains run details (exact display TBD)
* If the run has a GPX track, displays the *Map View*
* Has a button to Edit (_Edit Dialog as now, including add GPX Track_)
    * Nice to have: add GPX track via URL

##Changes to run features

### Run Table
* Clicking on run in run table opens new **Run View**
* Add edit widget to table rows for fast edit
### New Run
* Works as before, with GPX file uploader button
* After saving, opens **Run View** for the new run
### Edit Run
* Works as before, need to be able to delete GPX

