<!--START_SECTION:{section-name}-->
Coverage
<!--END_SECTION:{section-name}-->

# Dsroute
Angular app to plan a Dark Souls Remastered Playthrough. The goal of this project is, to make brainstorming a route for stuff like a no-death-run easier. Ideally, one could integrate this with some kind of autosplitter, that automatically tracks your progress in game, but that will be another project.

Once this planner reaches an acceptable stage, it will be hosted publicly on my website.

# TODO

## Development
- [x] Refactor locked to accept multiple conditions (incl. removing current workarounds, i.e. sens unlocked by gargoyles and queelag  
- [x] Setup testing framework  
- [x] CUSTOM_ELEMENTS_SCHEMA for cleaner tests  
- [x] write frontend tests  
- [ ] write backend tests  
- [ ] write system tests  
- [x] Integrate CICD into github actions  
- [ ] Display test status and coverage on readme for the flex  
- [ ] refactor code  
- [ ] Switch to overall TDD
- [ ] Implement overall consistent error handling

## Features
- [ ] Export as json  
- [ ] Load from json  
- [ ] Undo functionalit
      
## Looks
- [ ] Make it look nice :)

## Other
- [ ] Deploy to [my homepage](https://www.sailsman.xyz)

# Testing progress
## UI
### Location Card
- [x] Creation
- [x] Displays correct location name
### Movement component
- [x] Creation
- [x] Only renders button container when there are locations
- [x] Displays correct text without locations
- [x] Displays n buttons when given n locations
- [x] Passes correct data to buttons
- [x] Emits event when moveTo is called
### Items Component
- [x] Creation
- [x] Only renders button container when there are items
- [x] Displays correct text without items
- [x] Displays n buttons when given n items
- [x] Passes correct data to buttons
- [x] Emits event when collect is called
### Enemies Component
- [x] Creation
- [x] Only renders button container when there are enemies
- [x] Displays correct text without enemies
- [x] Displays n buttons when given n enemies
- [x] Passes correct data to buttons
- [x] Passes empty string for icon for respawning enemies
- [x] Passes skull emoji for non-respawning enemies
- [x] Emits event when kill is called
### Button Component
- [x] Creation
- [x] Stores displayable correctly
- [x] Displays button with correct displayable name
- [x] Has no icon by default
- [x] Has icon when specified
- [x] Emits event no click
- [x] Dynamically reacts to changing ids

## Logic
### Map & Route
- [x] Loads location data from json file
- [x] Starts with empty route
- [x] Starts at Undead Asylum
- [x] getLocationAtIndex returns correct locations
- [ ] Correctly stores movements in route
