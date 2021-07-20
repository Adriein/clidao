import { PostgreRepository } from './Data/PostgreRepository';
import * as fs from 'fs';
import String from './String';

export class DaoGenerator {
  private repo = new PostgreRepository();

  public constructor(private tablename: string) {}

  public generate() {
    const tableMetadata = this.repo.getTableMetadata(this.tablename);

    const className = String.camelCase(this.tablename, true);

    fs.writeFileSync(`${className}.ts`, this.constructClass(className));
  }

  

  private constructClass(className: string): string {
    return `export class ${className}{
        
    }`;
  }
}
// select *
// from INFORMATION_SCHEMA.TABLE_CONSTRAINTS
// where constraint_schema ='public'
// and constraint_type ='FOREIGN KEY';
