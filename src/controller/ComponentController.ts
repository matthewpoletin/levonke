"use strict";

import * as restify from "restify";
import restifyErrors from "restify-errors";

import AbstractController from "./AbstractController";

import ComponentService from "../backend/supply/ComponentService";

import IComponentRequest from "../backend/supply/interface/IComponentRequest";

export default class ComponentController extends AbstractController {

    // TODO: fix pagination
    // TODO: implement pagination in microservice
    public static async readComponents(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.params.page, 10) || 0;
        try {
            const components = await ComponentService.getComponents(page);
            return res.json(components);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("ComponentService { getComponents } error"));
        }
    }

    public static async createComponent(req: restify.Request, res: restify.Response, next: restify.Next) {
        const componentRequest: IComponentRequest = req.body;
        try {
            const componentResponse = await ComponentService.createComponent(componentRequest);
            return res.json(201, componentResponse);
        } catch (error) {
            ComponentController.errorHandler(error, res);
        }
    }

    public static async readComponent(req: restify.Request, res: restify.Response, next: restify.Next) {
        const componentId = parseInt(req.params.id, 10);
        try {
            const componentResponse = await ComponentService.getComponent(componentId);
            return res.json(componentResponse);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailiableErorr(`ComponentService {readComponent: componentId = ${componentId}} error`));
        }
    }

    public static async updateComponent(req: restify.Request, res: restify.Response) {
        const componentId = parseInt(req.params.id, 10);
        const componentRequest = req.body;
        return res.json(await ComponentService.updateComponent(componentId, componentRequest));
    }

    public static async deleteComponent(req: restify.Request, res: restify.Response, next: restify.Next) {
        const componentId = parseInt(req.params.id, 10);
        try {
            await ComponentService.deleteComponent(componentId);
            return res.send(204);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`ComponentService { deleteComponent: componentId = ${componentId} } error`));
        }
    }

}
