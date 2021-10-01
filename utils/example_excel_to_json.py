import json

from openpyxl import load_workbook

wb = load_workbook("examples.xlsx")

cols = list(wb["Sheet1"].columns)
headers = [x.value for x in cols[0]]
entries = [[str(y.value) for y in x] for x in cols[2:] if x[0] != None]

examples = list(dict(zip(headers, entry)) for entry in entries)

examples[-1]

base_index = 1000

for (i, x) in enumerate(examples):
    x["supportedProts"] = [{"protocol": x["supportedProts"]}]
    x["id"] = base_index + i
    x["credentialType"] = x["name"] + "Credential"
    x["category"] = "category-two"
    x["organization"] = []
    x["location"] = ""
    x["visibility"] = "unclassified"
    x["constituents"] = []
    x["reviews"] = []
    x["offers"] = []
    x["deploymentRequirements"] = None

with open("examples.json", "w") as out_file:
    json.dump(examples, out_file, indent=2)
