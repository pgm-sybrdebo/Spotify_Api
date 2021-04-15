/**
 * My logging system
 */

import chalk from 'chalk';


export default {
  info: text => console.log(chalk.blue(`info: ${text}`)),
  error: text => console.log(chalk.redBright(`error: ${text}`)),
  json: json => console.log(chalk.grey(JSON.stringify(json, null, 2))),
};
