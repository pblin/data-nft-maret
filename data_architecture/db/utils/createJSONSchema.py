import xlrd
import sys
import json

loc = ("/Users/bernardlin/Downloads/Cherre_Data_Dictionary_Master.xlsx")

schemaJson =open ("nyc_building.json", "w")

wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(1)
print ("total rows -> " + str(sheet.nrows) )

fieldList = []
for i in range (1,sheet.nrows):
    field = {"name": "", "type": "", "label":"","description": ""};
    if str(sheet.cell_value(i, 1)).find("_id") == -1:
        field["name"] = sheet.cell_value(i, 1)
        field["label"] = sheet.cell_value(i, 2)
        if sheet.cell_value(i, 0) != "USER-DEFINED" :
            field["type"] = sheet.cell_value(i, 0)
        else:
            field["type"] = "text"
        field["description"] = sheet.cell_value(i, 3).replace('\t',' ').replace ('"','U+0022').replace('\n',' ')
        fieldList.append (field)

schemaJson.write (json.dumps(fieldList))

