import { SchemaMetadataDAO } from './SchemaMetadataDAO';
import { TableMetadataDAO } from './TableMetadataDAO';

export class PostgreRepository {
  public async getDbTableNames(): Promise<string[]> {
    const dao = new SchemaMetadataDAO();

    const tablesMetadata = await dao.getList();

    return tablesMetadata.map((metadata: SchemaMetadataDAO) => metadata.tablename);
  }

  public async getTableColumns(tablename: string): Promise<TableMetadataDAO> {
    const dao = new TableMetadataDAO();

    return await dao.getOne(tablename);
  }
}
