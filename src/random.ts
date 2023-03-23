export const randomChoice = <T>(list: T[]): T => list[Math.floor(Math.random() * list.length)];

export const nRandomChoices = (n: number) => <T>(list: T[]): T[] =>
    Array.from({ length: n }).map(() => randomChoice(list));

export const randomNumber = (mean: number): number =>
    Math.random() * mean * 2;