import * as fs from 'fs';

export class FileExplorer {
  public exist(path: string): boolean {
    return fs.existsSync(path);
  }

  public load(path: string): string {
    return fs.readFileSync(path, {encoding: 'utf-8'});
  }

  public write(content: string, path: string): void {
    fs.writeFileSync(path, content);
  }
}