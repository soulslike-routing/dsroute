# Dsroute
Angular app to plan a Dark Souls Remastered Playthrough. The goal of this project is, to make brainstorming a route for stuff like a no-death-run easier. Ideally, one could integrate this with some kind of autosplitter, that automatically tracks your progress in game, but that will be another project.

Once this planner reaches an acceptable stage, it will be hosted publicly on my website.

# TODO

## Development
- [x] Refactor locked to accept multiple conditions (incl. removing current workarounds, i.e. sens unlocked by gargoyles and queelag  
- [x] Setup testing framework  
- [x] CUSTOM_ELEMENTS_SCHEMA for cleaner tests  
- [x] write UI tests  
- [ ] write logic tests  
- [ ] write system tests  
- [x] Integrate CICD into github actions  
- [ ] Display test status and coverage on readme for the flex  
- [x] refactor route service code duplication
- [ ] refactor css for background black / transparent
- [ ] Refactor route scroller maybe
- [ ] Implement overall consistent error handling
- [ ] Refactor testnames to use other verbs than 'should' in test name
- [ ] Create different test suites for different kinds of tests in one file on same topic
- [ ] Build a pipeline for image creation that makes it possible to easily track the author and create copies in different sizes / layouts for different use cases of an image

## Features
- [x] Big location image in background of location card (experiment with that, does it look good?)
- [x] Design route display
- [ ] Actually display current route
- [ ] Make route editable from route screen (maybe popup on click on action)
- [ ] Soul counter
- [ ] Character editor
- [ ] Possibility to level character (spend souls)
- [ ] Integrate npcs / merchants
- [ ] Design settings area next to route display
- [ ] Export as json  
- [ ] Load from json  
- [ ] Undo functionality
- [ ] Add support for mobile devices (horizontal mode)
- [ ] Display some kind of "back" indicator next to previous location
- [ ] Preload all assets
- [ ] Displays loading animation while preloading
      
## Looks
- [ ] Make it look nice :)
- [x] Nice favicon(s) and title
- [x] Implement banner images
- [ ] Get nice and fitting images for all regions (movement card)
- [ ] Get nice and fitting images for all items
- [ ] Get nice and fitting images for all enemies
- [ ] Get nice and big images for all regions (big background)

## Other
- [x] Deploy to [my homepage](https://www.sailsman.xyz) (only linked)

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
- [x] Correctly stores basic movements in route
- [x] Correctly refuses to store invalid movements in route


