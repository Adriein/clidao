import { FileExplorer } from "./FileExplorer";
import { EnquirerAskForConfigResponse, EnquirerAskForTablesRequest } from "./types";
import enquirer from "enquirer";
import { EnquirerQuestions } from "./Data/EnquirerQuestions";
import { CommandLine } from "./CommandLine";

export class Config {
  public static readonly CONFIG_FILE: string = 'clidao.config.json';
  public static readonly GIT_IGNORE: string = '.gitignore';

  private static fileManager = new FileExplorer();
  private static commandLine = new CommandLine();
  private static questions = new EnquirerQuestions(Config.fileManager);

  constructor(
    private readonly _dbUserName: string,
    private readonly _dbPassword: string,
    private readonly _dbName: string,
    private readonly _dbPort: string,
    private readonly _dbHost: string,
  ) {
  }

  private static hasConfigFile(): boolean {
    return this.fileManager.exist(`${process.cwd()}/${Config.CONFIG_FILE}`);
  }

  private static overrideGitIgnore(): void {
    this.fileManager.appendLine(Config.CONFIG_FILE, `${process.cwd()}/${Config.GIT_IGNORE}`);
  }

  public static loadConfigFile(): Config {
    if (!this.hasConfigFile()) {
      throw new Error('No config found');
    }

    const configJSON = JSON.parse(this.fileManager.load(`${process.cwd()}/${Config.CONFIG_FILE}`));

    return new Config(
      configJSON.db_username,
      configJSON.db_password,
      configJSON.db_name,
      configJSON.db_port,
      configJSON.db_host
    );
  }

  public static async create(): Promise<void> {
    const response = await Config.commandLine.ask<EnquirerAskForConfigResponse, EnquirerAskForTablesRequest>(
      enquirer.prompt,
      Config.questions.storage().get(EnquirerQuestions.GENERATE_CONFIG)!
    )

    const input = JSON.stringify(response.config.values, null, 2);

    if (Config.isEmpty(JSON.parse(input))) {
      const template = this.fileManager.load(`${process.cwd()}/src/Templates/GenerateConfigTemplate.ejs`);

      this.fileManager.write(template, `${process.cwd()}/${Config.CONFIG_FILE}`);
      this.overrideGitIgnore();
      return;
    }

    this.fileManager.write(input, `${process.cwd()}/${Config.CONFIG_FILE}`);
    this.overrideGitIgnore();
  }

  private static isEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }


  get dbUserName(): string {
    return this._dbUserName;
  }

  get dbPassword(): string {
    return this._dbPassword;
  }

  get dbName(): string {
    return this._dbName;
  }

  get dbPort(): string {
    return this._dbPort;
  }

  get dbHost(): string {
    return this._dbHost;
  }
}