import { PostgreRepository } from './Data/PostgreRepository';
var Eta = require('eta')
import * as fs from 'fs';


export class DaoGenerator {
  private repo = new PostgreRepository();

  public constructor() {}

  public async execute(tablename: string) {
    const tableMetadata = await this.repo.getTableColumns(tablename);
    const template = fs.readFileSync(`${process.cwd()}/src/Templates/BaseTemplate.eta`, {encoding: 'utf-8'});

    const dao = Eta.render(Eta.compile(template), { name: tablename, columns: tableMetadata.columns });
    fs.writeFileSync(`${tablename}.ts`,dao);
  }

}
// select *
// from INFORMATION_SCHEMA.TABLE_CONSTRAINTS
// where constraint_schema ='public'
// and constraint_type ='FOREIGN KEY';
