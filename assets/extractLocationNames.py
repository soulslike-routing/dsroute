import sys, json

print("Extracting location names to file...")

print("Loading map file...")
with open("map.json", "r") as file:
  data = json.load(file)

print("Iterating over map json...")
locations = dict()
for location in data["locations"]:
  locations[str(location["id"])] = str(location["name"])

print("Exporting created dictionary...")
with open("locations.json", "w") as out:
  json.dump(locations, out, indent=4)
print("Done!\n\n")
