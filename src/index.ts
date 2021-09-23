#!/usr/bin/env node

require('dotenv').config();
import { PostgreRepository } from './Data/PostgreRepository';
import { EnquirerAskForTablePrompt } from "./types";
import enquirer from 'enquirer';
import { DaoGenerator } from './DaoGenerator';

const repo = new PostgreRepository();
const generator = new DaoGenerator();

(async () => {
  const tables = await repo.getDbTableNames();

  const { tablename } = await enquirer.prompt<EnquirerAskForTablePrompt>({
    type: 'select',
    name: 'tablename',
    message: 'From what table do you want to generate DAO?',
    choices: tables.map((table) => table.tablename),
  });

  await generator.execute(tablename);
})();
