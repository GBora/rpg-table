export const getRandom = <T>(options: T[]): T => {
  let index: number = Math.floor(Math.random() * options.length);
  return options[index];
} 

export const getMaxLength = (arrays: Array<any[]>): number => {
  let longest = 0;
  arrays.forEach((arr) => {
    if (arr.length > longest) {
      longest = arr.length;
    } 
  });
  return longest;
}

export const getRandomSubject = (options: any[], headers: any[]): any[] => {
  let generated = [];

  options.forEach((optionList, index) => {
    generated.push({
      name: headers[index],
      value: getRandom<string>(optionList)
    }) 
  })

  return generated;
}

export const initTable = (source: any, tableData: any, headers: any, options: any, rows: any, generated: any): any[] => {
  if (source) {
    // Reset data 
    tableData = null;
    headers = [];
    options = [];
    rows = [];

    try {
      tableData = window[source];
      // Extract the headers
      headers = Object.keys(tableData);
      // Extract each option, options[1] is the array of options for headers[1] 
      headers.forEach((header) => {
        options.push(tableData[header]);
      })
      let longestOption = getMaxLength(options);

      for (let i = 0; i < longestOption; i++) {
        let newRow = [];
        options.forEach((optionArray) => {
          if (optionArray[i]) {
            newRow.push(optionArray[i]);
          } else {
            newRow.push("");
          }
        });
        rows.push(newRow);
      }
      // Build random
      if (generated.length === 0) {
        generated = getRandomSubject(options, headers);
      }
    } catch (e) {
      console.error(e);
    }

    return [tableData, headers, options, rows, generated]
  }
}
