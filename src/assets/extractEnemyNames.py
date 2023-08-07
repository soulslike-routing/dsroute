import sys, json

print("Extracting enemy names to file...")

print("Loading map file...")
with open("map.json", "r") as file:
  data = json.load(file)

print("Iterating over map json...")
enemies = dict()
for location in data["locations"]:
  for enemy in location["enemies"]:
    enemies[str(enemy["id"])] = str(enemy["name"])

print("Exporting created dictionary...")
with open("enemies.json", "w") as out:
  json.dump(enemies, out, indent=4)
print("Done!\n\n")

