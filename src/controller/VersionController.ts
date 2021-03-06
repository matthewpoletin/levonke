"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import VersionService from "../backend/elaboration/VersionService";
import ComponentService from "../backend/supply/ComponentService";

import IVersionRequest from "../backend/elaboration/interface/IVersionRequest";
import IVersionResponse from "../backend/elaboration/interface/IVersionResponse";
import IComponentRequest from "../backend/supply/interface/IComponentRequest";
import IComponentResponse from "../backend/supply/interface/IComponentResponse";
import IProjectResponse from "../backend/elaboration/interface/IProjectResponse";

export default class VersionController extends AbstractController {

    public static async getVersions(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        try {
            const versionResponses = await VersionService.getVersions(page, size);
            res.json(versionResponses);
            return next();
        } catch (error) {
            VersionController.errorResponse(error, res, next, `VersionService { getVersions } error`);
        }
    }

    public static async createVersion(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionRequest: IVersionRequest = req.body;
        try {
            const versionResponse: IVersionResponse = await VersionService.createVersion(versionRequest);
            res.json(201, versionResponse);
            return next();
        } catch (error) {
            VersionController.errorResponse(error, res, next, `VersionService { createVersion } error`);
        }
    }

    public static async getVersion(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId: number = parseInt(req.params.versionId, 10);
        try {
            const versionResponse: IVersionResponse = await VersionService.getVersion(versionId);
            res.json(versionResponse);
            return next();
        } catch (error) {
            VersionController.errorResponse(error, res, next, `VersionService { getVersion: versionId = ${versionId}} error`);
        }
    }

    public static async updateVersion(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId = parseInt(req.params.versionId, 10);
        const versionRequest = req.body;
        try {
            const versionResponse: IVersionResponse = await VersionService.updateVersion(versionId, versionRequest);
            res.json(versionResponse);
            return next();
        } catch (error) {
            VersionController.errorResponse(error, res, next, `VersionService { updateVersion: versionId = ${versionId} } error`);
        }
    }

    public static async deleteVersion(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId: number = parseInt(req.params.versionId, 10);
        try {
            await VersionService.deleteVersion(versionId);
            res.send(204);
            return next();
        } catch (error) {
            VersionController.errorResponse(error, res, next, `VersionService { deleteVersion: versionId = ${versionId} } error`);
        }
    }

    public static async getProject(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId: number = parseInt(req.params.versionId, 10);
        try {
            const projectResponse: IProjectResponse = await VersionService.getProject(versionId);
            res.json(projectResponse);
            return next();
        } catch (error) {
            VersionController.errorResponse(error, res, next, `VersionService { deleteVersion: versionId = ${versionId} } error`);
        }
    }

    public static async createComponent(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId: number = parseInt(req.params.versionId, 10);
        const componentRequest: IComponentRequest = req.body;
        try {
            const componentResponse: IComponentResponse = await ComponentService.createComponent(componentRequest);
            await VersionService.addComponent(versionId, { uuid: componentResponse.uuid });
            res.json(201, componentResponse);
        } catch (error) {
            VersionController.errorResponse(error, res, next, `VersionService { createComponent: versionId = ${versionId} } error`);
        }
        return next();
    }

    public static async getComponents(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page = parseInt(req.query.page, 10) || 0;
        const size = parseInt(req.query.size, 10) || 25;
        const versionId: number = parseInt(req.params.versionId, 10);
        const componentResponsePromises = [];
        try {
            const componentUUIDResponses: IComponentResponse[] = await VersionService.getComponents(versionId, page, size);
            try {
                componentUUIDResponses.forEach((element) => {
                    const uuid = element.uuid;
                    componentResponsePromises.push(ComponentService.getComponentByUUID(uuid));
                });
                const componentResponses: IComponentResponse[] = await Promise.all(componentResponsePromises);
                res.json(componentResponses);
                // return next();
            } catch (error) {
                console.log(error);
                // VersionController.errorResponse(error, res, next, `VersionService { getComponents: versionId = ${versionId} } error`);
                res.json(componentUUIDResponses);
            }
            return next();
        } catch (error) {
            VersionController.errorResponse(error, res, next, `VersionService { getComponents: versionId = ${versionId} } error`);
        }
    }

    public static async addComponent(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId: number = parseInt(req.params.versionId, 10);
        const componentId: number = parseInt(req.params.componentId, 10);
        try {
            await VersionService.getVersion(versionId);
            const componentRequest: IComponentResponse = await ComponentService.getComponent(componentId);
            await VersionService.addComponent(versionId, componentRequest);
            res.send(201);
            return next();
        } catch (error) {
            VersionController.errorResponse(error, res, next, `VersionService { addComponent: versionId = ${versionId}; componentId = ${componentId} } error`);
        }
    }

    public static async removeComponent(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId: number = parseInt(req.params.versionId, 10);
        const componentId: number = parseInt(req.params.componentId, 10);
        try {
            const componentRequest: IComponentResponse = await ComponentService.getComponent(componentId);
            await VersionService.removeComponent(versionId, componentRequest);
            res.send(201);
            return next();
        } catch (error) {
            VersionController.errorResponse(error, res, next, `VersionService { removeComponent: versionId = ${versionId}; componentId = ${componentId} } error`);
        }
    }
}
