export default class String {
  public static capitalizeFirstLetter(word: string): string {
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  }

  public static camelCase(
    tableName: string,
    firstLetterCapitalized: boolean
  ): string {
    const words = tableName.split('_');

    if (firstLetterCapitalized) {
      return words.reduce(
        String.joinStringArrayWithCamelCase(firstLetterCapitalized),
        ''
      );
    }

    return `${String.capitalizeFirstLetter(tableName)}`;
  }

  private static joinStringArrayWithCamelCase(
    firstLetterCapitalized: boolean = false
  ) {
    return (finalString: string, word: string): string => {
      if (!finalString.length && firstLetterCapitalized) {
        return String.capitalizeFirstLetter(word);
      }

      if (!finalString.length && !firstLetterCapitalized) {
        return word;
      }

      return `${finalString}${String.capitalizeFirstLetter(word)}`;
    };
  }
}
