"use strict";

import * as restify from "restify";
import restifyErrors from "restify-errors";

import AbstractController from "./AbstractController";

import OrganizationService from "../backend/community/OrganizationService";

import IOrganizationRequest from "../backend/community/interface/IOrganizationRequest";

export default class OrganizationController extends AbstractController {

    public static async getOrganizations(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        try {
            const organizationResponses = await OrganizationService.getOrganizations(page, size);
            res.json(organizationResponses);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("OrganizationService { getOrganizations } error"));
        }
    }

    public static async createOrganization(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationRequest: IOrganizationRequest = req.body;
        try {
            const organizationResponse = await OrganizationService.createOrganization(organizationRequest);
            res.json(201, organizationResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("OrganizationService { createOrganization } error"));
        }
    }

    public static async getOrganization(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationId: number = parseInt(req.params.id, 10);
        try {
            const organizationResponse = await OrganizationService.getOrganization(organizationId);
            res.json(organizationResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`OrganizationService { getOrganization: organizationId = ${organizationId}} error`));
        }
    }

    public static async updateOrganization(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationId: number = parseInt(req.params.id, 10);
        const organizationRequest = req.body;
        try {
            const organizationResponse = await OrganizationService.updateOrganization(organizationId, organizationRequest);
            res.json(organizationResponse);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`OrganizationService { updateOrganization: organizationId = ${organizationId} } error`));
        }
    }

    public static async deleteOrganization(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationId: number = parseInt(req.params.id, 10);
        try {
            await OrganizationService.deleteOrganization(organizationId);
            res.send(204);
            return next();
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`OrganizationService { deleteOrganization: organizationId = ${organizationId} } error`));
        }
    }

}
