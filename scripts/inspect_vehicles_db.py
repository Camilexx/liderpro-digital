import re

with open("src/data/vehicles.ts", "r", encoding="utf-8") as f:
    text = f.read()

makes = re.findall(r'make:\s*"([^"]+)"', text)
print("Makes in vehicles.ts:", makes)

models = re.findall(r'model:\s*"([^"]+)"', text)
print(f"Total models: {len(models)}")
for m in models:
    print(" -", m)
