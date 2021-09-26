import { PostgreRepository } from './Data/PostgreRepository';
import { Strings } from "./Strings";
import * as fs from 'fs';
import Ejs from 'ejs';

export class DaoGenerator {
  public constructor(private readonly repository: PostgreRepository) {}

  public execute = async (tablename: string): Promise<void> => {
    const tableMetadata = await this.repository.getTableColumns(tablename);
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
