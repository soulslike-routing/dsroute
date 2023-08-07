import sys, json

print("Extracting item names to file...")

print("Loading map file...")
with open("map.json", "r") as file:
  data = json.load(file)

print("Iterating over map json...")
items = dict()
for location in data["locations"]:
  for item in location["items"]:
    items[str(item["id"])] = str(item["name"])


print("Exporting created dictionary...")
with open("items.json", "w") as out:
  json.dump(items, out, indent=4)
print("Done!\n\n")
