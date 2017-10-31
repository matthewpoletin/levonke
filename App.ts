"use strict";

import * as restify from "restify";
import router from "./src/Router";

class App {
    private server: restify.Server;
    private port: number | string;

    constructor(port: number | string) {
        this.server = restify.createServer({
            name: "levonke-api",
            version: "0.0.1",
        });
        this.server.use(restify.plugins.queryParser());
        this.server.use(restify.plugins.bodyParser());
        this.port = port;
    }

    public init(): void {
        router(this.server);
        this.server.listen(this.port);
    }

}

new App(8441).init();
