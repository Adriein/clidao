export class TableMetadata {
  constructor(private readonly _name: string, private readonly _dataType: string) {}

  public name(): string {
    return this._name;
  }

  public dataType(): string {
    return this._dataType;
  }

}