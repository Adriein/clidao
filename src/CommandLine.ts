import chalk from 'chalk';
import { ChalkColors } from "./types";

export class CommandLine {
  public static INFO_STATUS: string = chalk.blue('[Info]:');
  public prompt(message: string, color: keyof ChalkColors, prefix?: string): void {
    console.log(`${prefix}${chalk[color](message)}`);
  }

  public async ask<T, C>(fn: (...args: any[]) => Promise<T>, questions: C): Promise<T> {
    return await fn(questions);
  }
}