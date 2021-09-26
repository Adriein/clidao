import { PostgreRepository } from "./Data/PostgreRepository";
import { DaoGenerator } from "./DaoGenerator";
import { FileExplorer } from "./FileExplorer";
import { Config } from "./Config";
import { CommandLine } from "./CommandLine";
import { ConsoleInteractions } from "./Data/ConsoleInteractions";
import { EnquirerQuestions } from "./Data/EnquirerQuestions";
import { EnquirerAskForTablesRequest, EnquirerAskForTablesResponse } from "./types";
import enquirer from "enquirer";


const repo = new PostgreRepository();
const generator = new DaoGenerator();
const explorer = new FileExplorer();

export default class CliDao {
  private readonly commandLine = new CommandLine();
  private readonly interactions = new ConsoleInteractions();
  private readonly questions = new EnquirerQuestions(explorer);

  public async init(): Promise<void> {
    const checkConfigInteraction = this.interactions.storage().get(ConsoleInteractions.CHECK_CONFIG)!;
    const config = await this.commandLine.prompt<Config>(checkConfigInteraction, Config.loadConfigFile.bind(Config));

    if (!config) {
      await this.commandLine.prompt(this.interactions.storage().get(ConsoleInteractions.GENERATE_CONFIG)!);
      await this.commandLine.prompt(this.interactions.storage().get(ConsoleInteractions.PRIVACY)!);
      await Config.create();
    }

    const whichTableQuestion = this.questions.storage().get(EnquirerQuestions.GENERATE_DAO);
    const tableNames = await repo.getDbTableNames();

    whichTableQuestion.choices = [...tableNames];

    const {tablename} = await this.commandLine.ask<EnquirerAskForTablesResponse, EnquirerAskForTablesRequest>(
      enquirer.prompt,
      whichTableQuestion
    )

    await generator.execute(tablename);

  }
}