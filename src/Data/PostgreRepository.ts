import { SchemaMetadataDAO } from './SchemaMetadataDAO';
import { TableMetadataDAO } from './TableMetadataDAO';

export class PostgreRepository {
  public async getAllTablesMetadata(): Promise<SchemaMetadataDTO[]> {
    const dao = new SchemaMetadataDAO();

    const tablesMetadata = await dao.getAll();

    return tablesMetadata.map(
      (metadata: SchemaMetadataDAO) => new SchemaMetadataDTO(metadata.tablename)
    );
  }

  public async getTableMetadata(tablename: string) {
    const dao = new TableMetadataDAO();

    await dao.getOne(tablename);
  }
}

export class SchemaMetadataDTO {
  constructor(public tablename: string) {}
}
