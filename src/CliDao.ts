import { PostgreRepository } from "./Data/PostgreRepository";
import { DaoGenerator } from "./DaoGenerator";
import { Config } from "./Config";
import { CommandLine } from "./CommandLine";
import { ConsoleInteractions } from "./Data/ConsoleInteractions";
import { EnquirerQuestions } from "./Data/EnquirerQuestions";
import {
  ConsoleInteraction,
  EnquirerAskForDeletionResponse,
  EnquirerAskForTablesRequest,
  EnquirerAskForTablesResponse
} from "./types";
import enquirer from "enquirer";

export default class CliDao {

  public constructor(
    private readonly commandLine: CommandLine,
    private readonly generator: DaoGenerator,
    private readonly repository: PostgreRepository,
    private readonly interactions: Map<string, ConsoleInteraction>,
    private readonly questions: Map<string, any>
  ) {
  }

  public async init(): Promise<void> {
    const checkConfigInteraction = this.interactions.get(ConsoleInteractions.CHECK_CONFIG)!;
    const config = await this.commandLine.prompt<Config>(checkConfigInteraction, Config.loadConfigFile.bind(Config));

    if (!config) {
      await this.commandLine.prompt(this.interactions.get(ConsoleInteractions.GENERATE_CONFIG)!);
      await this.commandLine.prompt(this.interactions.get(ConsoleInteractions.PRIVACY)!);
      await Config.create();
    }
  }

  public async remove(): Promise<void> {
    const permission = await this.commandLine.ask<EnquirerAskForDeletionResponse, any>(
      enquirer.prompt,
      this.questions.get(EnquirerQuestions.DELETE_CONFIG)
    );
    console.log(permission)
    if (permission.delete) {
      console.log('me cargo todo')
    }
  }

  public async generate(): Promise<void> {
    const whichTableQuestion = this.questions.get(EnquirerQuestions.GENERATE_DAO);
    const tableNames = await this.commandLine.prompt<string[]>(
      this.interactions.get(ConsoleInteractions.GET_TABLES)!,
      this.repository.getDbTableNames
    ) as string[];

    whichTableQuestion.choices = [...tableNames];

    const {tablename} = await this.commandLine.ask<EnquirerAskForTablesResponse, EnquirerAskForTablesRequest>(
      enquirer.prompt,
      whichTableQuestion
    )
    const generatorFn = this.generator.execute.bind(DaoGenerator.bind(PostgreRepository))
    await this.commandLine.prompt(this.interactions.get(ConsoleInteractions.CREATING_DAO)!, generatorFn, tablename);

  }
}