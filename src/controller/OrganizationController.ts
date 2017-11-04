"use strict";

import * as restify from "restify";
import restifyErrors from "restify-errors";

import AbstractController from "./AbstractController";

import OrganizationService from "../backend/community/OrganizationService";

import IOrganizationRequest from "../backend/community/interface/IOrganizationRequest";

export default class OrganizationController extends AbstractController {

    // TODO: fix pagination
    // TODO: implement pagination in microservice
    public static async readOrganizations(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.params.page, 10) || 0;
        try {
            const organizations = await OrganizationService.getOrganizations(page);
            return res.json(organizations);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("OrganizationService { getOrganizations } error"));
        }
    }

    public static async createOrganization(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationRequest: IOrganizationRequest = req.body;
        try {
            const organizationResponse = await OrganizationService.createOrganization(organizationRequest);
            return res.json(201, organizationResponse);
        } catch (error) {
            OrganizationController.errorHandler(error, res);
        }
    }

    public static async readOrganization(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationId = parseInt(req.params.id, 10);
        try {
            const organizationResponse = await OrganizationService.getOrganization(organizationId);
            return res.json(organizationResponse);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailiableErorr(`OrganizationService {readOrganization: organizationId = ${organizationId}} error`));
        }
    }

    public static async updateOrganization(req: restify.Request, res: restify.Response) {
        const organizationId = parseInt(req.params.id, 10);
        const organizationRequest = req.body;
        return res.json(await OrganizationService.updateOrganization(organizationId, organizationRequest));
    }

    public static async deleteOrganization(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationId = parseInt(req.params.id, 10);
        try {
            await OrganizationService.deleteOrganization(organizationId);
            return res.send(204);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`OrganizationService { deleteOrganization: organizationId = ${organizationId} } error`));
        }
    }

}
