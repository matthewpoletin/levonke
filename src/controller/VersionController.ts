"use strict";

import * as restify from "restify";
import restifyErrors from "restify-errors";

import AbstractController from "./AbstractController";

import VersionService from "../backend/elaboration/VersionService";

import IVersionRequest from "../backend/elaboration/interface/IVersionRequest";

export default class VersionController extends AbstractController {

    // TODO: fix pagination
    // TODO: implement pagination in microservice
    public static async readVersions(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.params.page, 10) || 0;
        try {
            const versions = await VersionService.getVersions(page);
            return res.json(versions);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("VersionService { getVersions } error"));
        }
    }

    public static async createVersion(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionRequest: IVersionRequest = req.body;
        try {
            const versionResponse = await VersionService.createVersion(versionRequest);
            return res.json(201, versionResponse);
        } catch (error) {
            VersionController.errorHandler(error, res);
        }
    }

    public static async readVersion(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId = parseInt(req.params.id, 10);
        try {
            const versionResponse = await VersionService.getVersion(versionId);
            return res.json(versionResponse);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailiableErorr(`VersionService {readVersion: versionId = ${versionId}} error`));
        }
    }

    public static async updateVersion(req: restify.Request, res: restify.Response) {
        const versionId = parseInt(req.params.id, 10);
        const versionRequest = req.body;
        return res.json(await VersionService.updateVersion(versionId, versionRequest));
    }

    public static async deleteVersion(req: restify.Request, res: restify.Response, next: restify.Next) {
        const versionId = parseInt(req.params.id, 10);
        try {
            await VersionService.deleteVersion(versionId);
            return res.send(204);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`VersionService { deleteVersion: versionId = ${versionId} } error`));
        }
    }

}
