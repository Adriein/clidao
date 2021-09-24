export type EnquirerAskForTablesResponse = { tablename: string };
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

export type ChalkColors = {
  blue: 'blue';
  magenta: 'magenta';
}