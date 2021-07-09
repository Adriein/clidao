import { PostgreRepository } from './Data/PostgreRepository';
import * as fs from 'fs';

export class DaoGenerator {
  private repo = new PostgreRepository();

  public constructor(private tablename: string) {}

  public generate() {
    //const tableMetadata = this.repo.getTableMetadata(this.tablename);

    const className = this.toCamelCase(this.tablename);

    fs.writeFileSync(`${className}.ts`, this.constructClass());
  }

  private capitalizeFirstLetter(word: string): string {
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  }

  private toCamelCase(tableName: string): string {
    const words = tableName.split('_');

    const sanitizedTableName = word;

    return `${this.capitalizeFirstLetter(tableName)}`;
  }

  private constructClass(): string {
    return `export class ${this.toCamelCase(this.tablename)}{

    }`;
  }
}
// select *
// from INFORMATION_SCHEMA.TABLE_CONSTRAINTS
// where constraint_schema ='public'
// and constraint_type ='FOREIGN KEY';
