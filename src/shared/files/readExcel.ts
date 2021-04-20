import * as XLSX from 'xlsx';

export const readBuffer = (file): any => {
  const workbook = XLSX.read(file.buffer, { type: 'buffer' });
  const sheet_name_list = workbook.SheetNames;
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return xlData;
};

export const convertToSave = (data: any): any => {
  //   const name = data[1].__EMPTY;
  //   const instruction = data[1].__EMPTY_1;
  //   const month = data[1].__EMPTY_2;
  //   const question = data.map((item, index) => {
  //     const title = item.__EMPTY;
  //     const question = item.__EMPTY_3;
  //     const optionA = item.__EMPTY_4;
  //     const optionB = item.__EMPTY_5;
  //     const optionC = item.__EMPTY_6;
  //     const optionD = item.__EMPTY_7;
  //     const optionE = item.__
  //   });
  //   return {
  //     data,
  //   };
};
