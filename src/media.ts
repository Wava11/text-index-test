import { nRandomChoices, randomChoice, randomNumber } from "./random";

export interface Media {
    name: string;
    tags: string[];
    description: string;
}

export const mockMedias = (names: string[], tags: string[], descriptions: string[]) =>
    (amount: number): Media[] => Array.from({ length: amount }).map(() => ({
        description: randomChoice(descriptions),
        name: randomChoice(names),
        tags: [...new Set(nRandomChoices(randomNumber(3))(tags))]
    }));