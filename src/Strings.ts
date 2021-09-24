export class Strings {
  private static capitalize(word: string, position?: number[]): string {
    if(!position) {
      return word.toUpperCase();
    }

    const letters = word.split('').reduce((word: string[], letter: string, index: number) => {
      const mutatedLetter = position.includes(index)? letter.toUpperCase() : letter;
      return [...word, mutatedLetter];
    }, []);

    return letters.join('');
  }

  private static occurrencePosition(word: string, needle: string): number[] {
    return word.split('').reduce((occurrences: number[], letter: string, index: number) => {
      const position = letter === needle? index : -1;

      if(position !== -1) {
        return [...occurrences, position];
      }

      return occurrences;
    }, [])
  }

  public static camelize(word: string, className: boolean = false): string {
    const underscorePosition = Strings.occurrencePosition(word, '_');

    if(className) {
      return Strings.capitalize(word, [0, ...underscorePosition]);
    }

    return Strings.capitalize(word, underscorePosition)
  }
}