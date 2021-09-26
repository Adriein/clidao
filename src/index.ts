#!/usr/bin/env node

import { ConsoleInteractions } from "./Data/ConsoleInteractions";

require('dotenv').config();
import CliDao from "./CliDao";
import { Command } from 'commander';
import { EnquirerQuestions } from "./Data/EnquirerQuestions";
import { FileExplorer } from "./FileExplorer";
import { CommandLine } from "./CommandLine";
import { DaoGenerator } from "./DaoGenerator";
import { PostgreRepository } from "./Data/PostgreRepository";

const program = new Command();
const fileManager = new FileExplorer();
const interactions = new ConsoleInteractions();
const commandLine = new CommandLine();
const repository = new PostgreRepository();
const generator = new DaoGenerator(repository);
const questions = new EnquirerQuestions(fileManager);

const cli = new CliDao(commandLine, generator, repository, interactions.storage(), questions.storage());

const options = program
  .version('CliDAO v.1.0.0')
  .option('-c, --configure', 'Configure the db connection options')
  .option('-r, --remove', 'Delete actual config')
  .option('-g, --generate', 'Generate DAO')
  .parse(process.argv)
  .opts();


if (options.configure) {
  cli.init().catch(() => commandLine.prompt(interactions.storage().get(ConsoleInteractions.ERROR)!));
}
if (options.generate) {
  cli.generate().catch(() => commandLine.prompt(interactions.storage().get(ConsoleInteractions.ERROR)!));
}
if (options.remove) {
  cli.remove().catch(() => commandLine.prompt(interactions.storage().get(ConsoleInteractions.ERROR)!));
}

