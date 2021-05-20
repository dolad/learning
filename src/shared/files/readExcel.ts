import * as XLSX from 'xlsx';

export const readBuffer = (file): any => {
  const workbook = XLSX.read(file.buffer, { type: 'buffer' });
  const sheet_name_list = workbook.SheetNames;
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return xlData;
};
