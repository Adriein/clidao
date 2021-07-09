#!/usr/bin/env node

require('dotenv').config();
import { PostgreRepository } from './Data/PostgreRepository';
import enquirer from 'enquirer';
import { DaoGenerator } from './DaoGenerator';

const repo = new PostgreRepository();

(async () => {
  const tables = await repo.getAllTablesMetadata();

  const response = await enquirer.prompt<{ tablename: string }>({
    type: 'select',
    name: 'tablename',
    message: 'From what table do you want to generate DAO?',
    choices: tables.map((table) => table.tablename),
  });

  //await repo.getTableMetadata(response.tablename);

  const generator = new DaoGenerator(response.tablename);
  generator.generate();
})();
