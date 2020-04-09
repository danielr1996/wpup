import {getConfig as getFileConfig} from "config/config-file";
import {getConfig as getCliConfig} from "config/config-cli";
import _ from "lodash";

export type WPUPConfig = {
    envs: {
        [key: string]: {
            url?: string,
            theme?: string,
            user?: string,
            token?: string,
            ignoressl?: boolean,
            activate?: boolean,
        }
    },
    current: string,
    theme: string,

}

export const getConfig = (cmd: {current: string, theme: string, user: string,token: string, url: string, ignoressl: boolean, activate: boolean}): WPUPConfig => {
    const fileConfig: WPUPConfig = getFileConfig();
    const cliConfig: WPUPConfig = getCliConfig(cmd);
    let config: WPUPConfig;
    if (cliConfig.current === '@CLI') {
        const fileCurrent = fileConfig.envs[fileConfig.current];
        const cliCurrent = cliConfig.envs[cliConfig.current];
        let finalConfig = {...fileConfig};
        finalConfig.envs[fileConfig.current] = _.merge(fileCurrent, cliCurrent);
        config = finalConfig;
    } else {
        config = _.merge(fileConfig, cliConfig);
    }
    if(!!config.theme){
        config.envs[config.current].theme = config.theme;
    }
    return config;
};
