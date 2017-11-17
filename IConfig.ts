"use strict";

interface IConfig {
    Services: {
        Community: {
            url: string;
            port: string;
            base: string;
        },
        Elaboration: {
            url: string;
            port: string;
            base: string;
        },
        Supply: {
            url: string;
            port: string;
            base: string;
        },
    };
}

// noinspection TsLint
const config: IConfig = require("./config.json");

export default config;
