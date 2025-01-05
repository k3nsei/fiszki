export type Fiszka = {
  word: string;
  translation: string;
  backgrounds: [imageBackground: string, wordBackground: string, translationBackground: string];
  image: string | null;
};
