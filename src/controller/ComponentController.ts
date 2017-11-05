"use strict";

import * as restify from "restify";
import restifyErrors from "restify-errors";

import AbstractController from "./AbstractController";

import ComponentService from "../backend/supply/ComponentService";

import IComponentRequest from "../backend/supply/interface/IComponentRequest";

export default class ComponentController extends AbstractController {

    public static async getComponents(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        try {
            const componentResponses = await ComponentService.getComponents(page, size);
            res.json(componentResponses);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("ComponentService { getComponents } error"));
        }
    }

    public static async createComponent(req: restify.Request, res: restify.Response, next: restify.Next) {
        const componentRequest: IComponentRequest = req.body;
        try {
            const componentResponse = await ComponentService.createComponent(componentRequest);
            res.json(201, componentResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("ComponentService { createComponent } error"));
        }
    }

    public static async getComponent(req: restify.Request, res: restify.Response, next: restify.Next) {
        const componentId = parseInt(req.params.id, 10);
        try {
            const componentResponse = await ComponentService.getComponent(componentId);
            res.json(componentResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`ComponentService { getComponent: componentId = ${componentId}} error`));
        }
    }

    public static async updateComponent(req: restify.Request, res: restify.Response, next: restify.Next) {
        const componentId: number = parseInt(req.params.id, 10);
        const componentRequest = req.body;
        try {
            const componentResponse = await ComponentService.updateComponent(componentId, componentRequest);
            res.json(componentResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`ComponentService { updateComponent: componentId = ${componentId} } error`));
        }
    }

    public static async deleteComponent(req: restify.Request, res: restify.Response, next: restify.Next) {
        const componentId: number = parseInt(req.params.id, 10);
        try {
            await ComponentService.deleteComponent(componentId);
            res.send(204);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`ComponentService { deleteComponent: componentId = ${componentId} } error`));
        }
    }

}
