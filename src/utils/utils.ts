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
