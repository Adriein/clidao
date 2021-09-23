import { SchemaMetadataDAO } from './SchemaMetadataDAO';
import { TableMetadataDAO } from './TableMetadataDAO';

export class PostgreRepository {
  public async getDbTableNames(): Promise<SchemaMetadataDTO[]> {
    const dao = new SchemaMetadataDAO();

    const tablesMetadata = await dao.getAll();

    return tablesMetadata.map(
      (metadata: SchemaMetadataDAO) => new SchemaMetadataDTO(metadata.tablename)
    );
  }

  public async getTableColumns(tablename: string): Promise<TableMetadataDAO> {
    const dao = new TableMetadataDAO();

    return await dao.getOne(tablename);
  }
}

export class SchemaMetadataDTO {
  constructor(public tablename: string) {}
}
