import XLSX from 'xlsx'

export const buildXlsx = (
  data,
  sheetName = 'Sheet',
  fileName = `Table - ${new Date().toLocaleDateString('en-US')}.xlsx`
) => {
  var wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(data) // convert data to sheet
  console.log(ws)
  XLSX.utils.book_append_sheet(wb, ws, sheetName) // add sheet to workbook
  XLSX.writeFile(wb, fileName)
}

export const readXlsxToJson = async file => {
  const data = await file.arrayBuffer()
  const workbook = XLSX.read(data)
  var firstSheet = workbook.SheetNames[0]
  var sheet = workbook.Sheets[firstSheet]
  var jsonData = XLSX.utils.sheet_to_json(sheet).map(itm => {
    const { __rowNum__, ...result } = itm
    return result
  })
  return jsonData
}
