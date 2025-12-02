import { runSolution } from '../utils.ts';

const chunkArray = <T>(array: T[], chunkSize: number) => {
  const numberOfChunks = Math.ceil(array.length / chunkSize);

  return [...Array(numberOfChunks)].map((_, index) => {
    return array.slice(index * chunkSize, (index + 1) * chunkSize);
  });
};

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  const idString = data.join('');
  const ids = idString.split(',');
  let password = 0;

  ids.forEach((idPair) => {
    const [id1, id2] = idPair.split('-').map((val) => parseInt(val, 10));
    if (isNaN(id1) || isNaN(id2)) {
      return;
    }
    for (let i = id1; i <= id2; i++) {
      const numberString = i.toString();
      const numberLength = numberString.length;

      if (numberLength < 2) {
        continue;
      }

      const isAllSameDigit = numberString
        .split('')
        .every((char) => char === numberString[0]);

      if (isAllSameDigit) {
        password += i;
        continue;
      }

      const splitNumber = numberString.split('');
      for (let p = 2; p <= numberLength / 2; p++) {
        const chunks = chunkArray(splitNumber, p);

        const isEqual = chunks
          .map((chunk) => chunk.join(''))
          .every((val) => {
            return val === chunks[0].join('');
          });

        if (isEqual) {
          password += i;
          break;
        }
      }
    }
  });

  return password;
}

await runSolution(day2a);
