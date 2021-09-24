#!/usr/bin/env node

import CliDao from "./CliDao";

require('dotenv').config();

const cli = new CliDao();

cli.init();
//const tables = await repo.getDbTableNames();

//await generator.execute(tablename);

