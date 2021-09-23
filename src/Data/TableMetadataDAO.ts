import Database from './Database';
import { TableMetadata } from "../TableMetadata";



export class TableMetadataDAO {

  private db = Database.getInstance();
  private _columns: TableMetadata[] = [];


  public async getOne(tablename: string): Promise<TableMetadataDAO> {
    const query = `
        SELECT table_name, column_name, data_type
        FROM information_schema.columns
        WHERE table_name = '${tablename}';
    `;

    const {rows} = await this.db.getConnection().query(query);

    const dao = new TableMetadataDAO();
    dao.columns = rows.map(row => new TableMetadata(row.column_name, row.data_type));

    return dao;
  }

  get columns(): TableMetadata[] {
    return this._columns;
  }

  set columns(value: TableMetadata[]) {
    this._columns = value;
  }
}
