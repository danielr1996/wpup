import YAML from "yaml";
import * as fs from "fs";
import _ from "lodash";
import {WPUPConfig} from "config/config";

export const getConfig = (): WPUPConfig => {
    let config: WPUPConfig;
    let state: WPUPConfig;


    if (fs.existsSync('wpup.config.yaml')) {
        config = YAML.parse(fs.readFileSync('wpup.config.yaml', 'utf8'));
    } else {
        config = {
            envs: {},
            theme: '',
            current: '',
        };
    }

    if (fs.existsSync('wpup.local.yaml')) {
        state = YAML.parse(fs.readFileSync('wpup.local.yaml', 'utf8'));
    } else {
        state = {
            envs: {},
            theme: '',
            current: '',
        };
    }


    return _.merge(config, state);
};
