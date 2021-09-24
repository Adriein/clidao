import Database from './Database';

export class SchemaMetadataDAO {
  private db = Database.getInstance();
  public schemaname!: string;
  public tablename!: string;
  public tableowner!: string;
  public tablespace!: string | null;
  public hasindexes!: boolean;
  public hasrules!: boolean;
  public hastriggers!: boolean;
  public rowsecurity!: boolean;

  public async getList(): Promise<SchemaMetadataDAO[]> {
    const query = `
      SELECT *
      FROM pg_catalog.pg_tables
      WHERE schemaname != 'pg_catalog' 
      AND schemaname != 'information_schema';
    `;
    
    const { rows } = await this.db.getConnection().query(query);

    return rows as SchemaMetadataDAO[];
  }
}
