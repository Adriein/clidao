import { PostgreRepository } from './Data/PostgreRepository';
import { Strings } from "./Strings";
import * as fs from 'fs';
import Ejs from 'ejs';

export class DaoGenerator {
  private repo = new PostgreRepository();

  public constructor() {}

  public async execute(tablename: string) {
    const tableMetadata = await this.repo.getTableColumns(tablename);
    const template = fs.readFileSync(`${process.cwd()}/src/Templates/BaseTemplate.dao.ejs`, {encoding: 'utf-8'});

    const className = Strings.camelize(tablename, true);

    const dao = Ejs.render(
      template,
      {
        name: className,
        columns: tableMetadata.columns,
        lowerCaseName: tablename.toLowerCase()
      }
    );

    fs.writeFileSync(`./${className}.ts`, dao);
  }
}

// select *
// from INFORMATION_SCHEMA.TABLE_CONSTRAINTS
// where constraint_schema ='public'
// and constraint_type ='FOREIGN KEY';
