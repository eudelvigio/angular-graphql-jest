import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import * as process from 'process';
import { buildSchema, useContainer } from 'type-graphql';
import { HumanWithCarResolver } from '../models/human-with-car/HumanWithCar.resolver';
import { Container } from 'typedi';

const { ApolloServer } = require('apollo-server-express');

declare function require(name: string);

const join = require('path').join;

export class Api {

    BROWSER_FOLDER;
    SERVER_FOLDER;
    app;

    graphqlTs;
    constructor(autoStart?: boolean) {
        if (autoStart) {
            this.start();
        }
    }

    async start() {
        this.BROWSER_FOLDER = join(process.cwd(), 'dist/browser');
        this.SERVER_FOLDER = join(process.cwd(), 'dist/server');
        this.app = express();
        this.setSecurity();
        await this.setGraphQL();
        this.setAngularEngine();
        this.setRoutes();
        this.listen();
        this.startServerProcesses();
    }

    listen() {
        const PORT = process.env.PORT || 4000;
        this.app.listen(PORT, () => {
            console.log(`Node server listening on http://localhost:${PORT}`);
        });
    }

    startServerProcesses() {
    }

    async setGraphQL() {
        useContainer(Container);

        const schema = await buildSchema({
            resolvers: [HumanWithCarResolver]
        });
        const server = new ApolloServer({schema});
        server.applyMiddleware({app: this.app});
    }

    setSecurity() {

    }

    setAngularEngine() {
        // Faster server renders w/ Prod mode (dev mode never needed)
        enableProdMode();
        // * NOTE :: leave this as require() since this file is built Dynamically from webpack
        const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('../../dist/server/main');
        // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
        this.app.engine('html', ngExpressEngine({
          bootstrap: AppServerModuleNgFactory,
          providers: [
            provideModuleMap(LAZY_MODULE_MAP)
          ]

        }));
        this.app.set('view engine', 'html');
        this.app.set('views', this.BROWSER_FOLDER);
    }

    setRoutes() {
        // All regular routes use the Universal engine
        this.app.get('/graphql', (req, res) => {
            this.graphqlTs.query(req.query.q).then(result => {
                res.send(result);
            });
        });
        const readFileSync = require('fs').readFileSync;

        this.app.get('/mockeo', (req, res) => {
            const data = readFileSync(join(process.cwd(), 'src/mock/MOCK_DATA.json'), 'utf8');
            const obj = JSON.parse(data);
            res.send(obj);
        });
        this.app.get('/mockeoespecifico', (req, res) => {
            const data = readFileSync(join(process.cwd(), 'src/mock/MOCK_DATA.json'), 'utf8');
            const obj = JSON.parse(data);
            res.send(obj.find((o) => parseInt(o.id, 10) === parseInt(req.query.id, 10)));
        });
        // Server static files from /browser
        this.app.get('*.*', express.static(this.BROWSER_FOLDER, {
            maxAge: '1y'
        }));

        // All regular routes use the Universal engine
        this.app.get('*', (req, res) => {
            res.render('index', { req });
        });
    }
}


