import json

from openpyxl import load_workbook

wb = load_workbook("examples.xlsx")

cols = list(wb["Sheet1"].columns)
headers = [x.value for x in cols[0]]
entries = [[str(y.value) for y in x] for x in cols[2:]]

examples = list(dict(zip(headers, entry)) for entry in entries)

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


print(json.dumps(examples, indent=2))
