import Database from './Database';

export class TableMetadataDAO {
  private db = Database.getInstance();

  public async getOne(tablename: string): Promise<TableMetadataDAO> {
    const query = `
      SELECT table_name, column_name, data_type 
      FROM information_schema.columns
      WHERE table_name = '${tablename}';
    `;

    const { rows } = await this.db.getConnection().query(query);

    console.log(rows);
    throw new Error();
    //return 'a' as TableMetadataDAO;
  }
}
