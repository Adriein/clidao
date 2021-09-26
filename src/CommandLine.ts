import chalk from 'chalk';
import { ConsoleInteraction } from "./types";
import ora from 'ora';

export class CommandLine {
  public static INFO_STATUS: string = chalk.blue('[Info]:');
  public static WARN_STATUS: string = chalk.red('[Warn]:');
  public static FATAL_ERROR: string = chalk.red('[Fatal_Error]:');

  public async prompt<T>({message, color, prefix}: ConsoleInteraction, task?: (...args: any[]) => any, ...args: any[]): Promise<T | void> {
    return new Promise((resolve) => {
      const Ora = ora({interval: 150}).start(`${prefix} ${chalk[color](message)}`);

      setTimeout(() => {
        try {
          if (task) {
            const completion = task(...args);
            Ora.succeed(`${prefix} ${message} ${chalk.green('[success]')}`);
            return resolve(completion);
          }

          Ora.stopAndPersist();
          return resolve();
        } catch (error: any) {
          Ora.fail(`${prefix} ${error.message} ${chalk.red('[failure]')}`);
          return resolve();
        }
      }, 1500);

    });


  }

  public async ask<T, C>(fn: (...args: any[]) => Promise<T>, questions: C): Promise<T> {
    return await fn(questions);
  }
}