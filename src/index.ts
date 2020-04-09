import {uploadTheme} from "upload";
import {getConfig, WPUPConfig} from "config/config";

import {Command} from 'commander';

const program = new Command();
program.version('1.0.3');
const theme = program.command('theme')
    .description('install and activate themes')
    .action(() => {
    });
theme.command('activate <theme-name>')
    .description('activate a theme')
    .action((themeName) => console.warn('Activate Theme not yet implemented'));
theme.command('install')
    .description('install theme')
    .option('-u, --url <url>', 'URL to the wordpress installation, e.g. https://wordpress.example.com')
    .option('-t, --theme <theme>', 'theme file')
    .option('-c, --current <current>', 'which configuration to use')
    .option('-k, --ignoressl', 'ignore ssl')
    .option('--no-ignoressl', 'don\'t ignore ssl')
    .option('-a, --activate', 'active theme after installation')
    .option('--no-activate', 'don\'t active theme after installation')
    .option('-v, --verbose', 'Show additional infos')
    .option('-d, --dry', 'don\'t actually upload but show would be uploaded')
    .option('-i, --user <user>', 'username')
    .option('-p, --token <token>', 'token')
    .action(cmd => {
        const config: WPUPConfig = getConfig(cmd);
        if (cmd.verbose) {
            console.log(config);
        }
        uploadTheme(config.envs[config.current].url, config.envs[config.current].theme, config.envs[config.current].user,config.envs[config.current].token,config.envs[config.current].activate, config.envs[config.current].ignoressl, cmd.dry)
            .subscribe();
    });
const env = program.command('env')
    .description('Environment related commands')
    .action(() => {
    });
env.command('get')
    .description('Get all available environments')
    .action(() => console.log('Get Env'));
env.command('use <env>')
    .description('Set current env')
    .action(env => console.log('Set env ', env));
program.parse(process.argv);
