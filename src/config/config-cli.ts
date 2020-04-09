import {WPUPConfig} from "config/config";
export const getConfig = (cmd: {current: string, theme: string, user: string,token: string, url: string, ignoressl: boolean, activate: boolean}): WPUPConfig => {
    const theme = cmd.theme;
    const url = cmd.url;
    const ignoressl = cmd.ignoressl;
    const activate = cmd.activate;
    const user = cmd.user;
    const token = cmd.token;
    const current = cmd.current || '@CLI';
    return {
        envs: {
            [current]: {
                theme,
                user,
                token,
                url,
                ignoressl,
                activate
            }
        },
        current,
        theme
    }
};
