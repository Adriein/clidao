import { PostgreRepository } from "./Data/PostgreRepository";
import { DaoGenerator } from "./DaoGenerator";
import { FileExplorer } from "./FileExplorer";
import { Config } from "./Config";
import { CommandLine } from "./CommandLine";


const repo = new PostgreRepository();
const generator = new DaoGenerator();
const explorer = new FileExplorer();

export default class CliDao {
  private readonly commandLine = new CommandLine();

  public async init(): Promise<void> {
    this.commandLine.prompt(`Checking for config file 📂`, 'magenta', CommandLine.INFO_STATUS);

    const config = Config.loadConfigFile();

    if (!config) {
      this.commandLine.prompt(
        `Since we didn't found any (${Config.CONFIG_FILE}) lets create one 😎`,
        'magenta',
        CommandLine.INFO_STATUS
      );
      this.commandLine.prompt(
        `This file will only be generated inside your root and will be added to your git ignore to prevent unwanted commits`,
        'magenta',
        CommandLine.INFO_STATUS
      );
      await Config.create();
    }

    //await repo.getDbTableNames();
  }
}