export type EnquirerAskForTablesResponse = { tablename: string };
export type EnquirerAskForDeletionResponse = { delete: boolean };
export type EnquirerAskForConfigResponse = {
  config: {
    values: {
      db_username: string,
      db_password: string,
      db_host: string,
      db_port: string,
      db_name: string,
    }
  }
};
export type EnquirerAskForTablesRequest = {
  type: string,
  name: string,
  message: string,
  choices: string[],
};

type ForegroundColor = {
  black: 'black'
  red: 'red'
  green: 'green'
  yellow: 'yellow'
  blue: 'blue'
  magenta: 'magenta'
  cyan: 'cyan'
  white: 'white'
  gray: 'gray'
  grey: 'grey'
  blackBright: 'blackBright'
  redBright: 'redBright'
  greenBright: 'greenBright'
  yellowBright: 'yellowBright'
  blueBright: 'blueBright'
  magentaBright: 'magentaBright'
  cyanBright: 'cyanBright'
  whiteBright: 'whiteBright'
}
export type Color = ForegroundColor;

export type ConsoleInteraction = {
  message: string;
  color: keyof Color;
  prefix: string;
}
