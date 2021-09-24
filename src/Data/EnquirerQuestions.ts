import Ejs from 'ejs';
import { FileExplorer } from "../FileExplorer";

export class EnquirerQuestions {
  public static GENERATE_DAO: 'dao';
  public static GENERATE_CONFIG: 'config';

  private readonly _questions: Map<string, any>;

  public constructor(private readonly fileExplorer: FileExplorer) {
    const configTemplate = this.fileExplorer.load(`${process.cwd()}/src/Templates/GenerateConfigTemplate.ejs`);
    this._questions = new Map<string, any>(
      [
        [EnquirerQuestions.GENERATE_DAO, {
          type: 'select',
          name: 'tablename',
          message: 'From what table do you want to generate DAO?',
          choices: [],
        }],
        [EnquirerQuestions.GENERATE_CONFIG, {
          type: 'snippet',
          name: 'config',
          message: 'Fill the fields in order to create clidao.config.json',
          fields: [
            {
              name: 'db_username',
              message: 'Database Username'
            },
            {
              name: 'db_password',
              message: 'Database Password'
            },
            {
              name: 'db_host',
              message: 'Database Host'
            },
            {
              name: 'db_port',
              message: 'Database Port'
            },
            {
              name: 'db_name',
              message: 'Database name'
            }
          ],
          template: Ejs.render(configTemplate),
        }]
      ]
    );
  }

  public storage(): Map<string, any> {
    return this._questions;
  }
}