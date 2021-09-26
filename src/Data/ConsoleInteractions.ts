import { ConsoleInteraction } from "../types";
import { CommandLine } from "../CommandLine";
import { Config } from "../Config";

export class ConsoleInteractions {
  public static CHECK_CONFIG = 'check_config';
  public static GENERATE_CONFIG = 'generate_config';
  public static PRIVACY = 'privacy';

  private readonly _interactions: Map<string, ConsoleInteraction>;

  constructor() {
    this._interactions = new Map<string, ConsoleInteraction>(
      [
        [
          ConsoleInteractions.CHECK_CONFIG,
          {
            message: `Looking for ${Config.CONFIG_FILE} 🔍`,
            color: 'white',
            prefix: CommandLine.INFO_STATUS
          }
        ],
        [
          ConsoleInteractions.GENERATE_CONFIG,
          {
            message: `Creating ${Config.CONFIG_FILE}👨‍🍳`,
            color: 'white',
            prefix: CommandLine.INFO_STATUS
          }
        ],
        [
          ConsoleInteractions.PRIVACY,
          {
            message: `${Config.CONFIG_FILE} will only be generated inside your root and will be added to your .gitignore to prevent unwanted commits ⚠`,
            color: 'red',
            prefix: CommandLine.WARN_STATUS
          }
        ]
      ]
    );
  }

  public storage(): Map<string, ConsoleInteraction> {
    return this._interactions;
  }
}