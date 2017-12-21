"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import OrganizationService from "../backend/community/OrganizationService";

import IOrganizationRequest from "../backend/community/interface/IOrganizationRequest";
import IOrganizationPaginated from "../backend/community/interface/IOrganizationResponse";

export default class OrganizationController extends AbstractController {

    public static async getOrganizations(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        const name: string = req.query.name;
        try {
            let organizationsResponse: IOrganizationPaginated = null;
            if (name) {
                organizationsResponse = await OrganizationService.getOrganizations(page, size, name);
            } else {
                organizationsResponse = await OrganizationService.getOrganizations(page, size);
            }
            res.json(organizationsResponse);
            return next();
        } catch (error) {
            OrganizationController.errorResponse(error, res, next, `OrganizationService { getOrganizations } error`);
        }
    }

    public static async createOrganization(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationRequest: IOrganizationRequest = req.body;
        try {
            const organizationResponse = await OrganizationService.createOrganization(organizationRequest);
            res.json(201, organizationResponse);
            return next();
        } catch (error) {
            OrganizationController.errorResponse(error, res, next, `OrganizationService { createOrganization } error`);
        }
    }

    public static async getOrganizationById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationId: number = parseInt(req.params.organizationId, 10);
        try {
            const organizationResponse = await OrganizationService.getOrganizationById(organizationId);
            res.json(organizationResponse);
            return next();
        } catch (error) {
            OrganizationController.errorResponse(error, res, next, `OrganizationService { getOrganizationById: organizationId = ${organizationId} } error`);
        }
    }

    public static async getOrganizationBy(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationName: string = req.query.name;
        try {
            const organizationResponse = await OrganizationService.getOrganizationBy({name: organizationName});
            res.json(organizationResponse);
            return next();
        } catch (error) {
            OrganizationController.errorResponse(error, res, next, `OrganizationService { getOrganizationByName: organizationName = ${organizationName} } error`);
        }
    }

    public static async updateOrganizationById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationId: number = parseInt(req.params.organizationId, 10);
        const organizationRequest = req.body;
        try {
            const organizationResponse = await OrganizationService.updateOrganizationById(organizationId, organizationRequest);
            res.json(organizationResponse);
            return next();
        } catch (error) {
            OrganizationController.errorResponse(error, res, next, `OrganizationService { updateOrganizationById: organizationId = ${organizationId} } error`);
        }
    }

    public static async deleteOrganizationById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationId: number = parseInt(req.params.organizationId, 10);
        try {
            await OrganizationService.deleteOrganizationById(organizationId);
            res.send(204);
            return next();
        } catch (error) {
            OrganizationController.errorResponse(error, res, next, `OrganizationService { deleteOrganizationById: organizationId = ${organizationId} } error`);
        }
    }

    public static async setOwner(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationId: number = parseInt(req.params.organizationId, 10);
        const userId: number = parseInt(req.params.userId, 10);
        try {
            await OrganizationService.setOwner(organizationId, userId);
            res.send(201);
            return next();
        } catch (error) {
            OrganizationController.errorResponse(error, res, next, `OrganizationService { setOwner: organizationId = ${organizationId}, userId = ${userId} } error`);
        }
    }

    public static async getOwner(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationId: number = parseInt(req.params.organizationId, 10);
        try {
            const userResponse = await OrganizationService.getOwner(organizationId);
            res.json(userResponse);
            return next();
        } catch (error) {
            OrganizationController.errorResponse(error, res, next, `OrganizationService { getOwner: organizationId = ${organizationId} } error`);
        }
    }

    public static async getTeams(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationId: number = parseInt(req.params.organizationId, 10);
        try {
            const teamResponses = await OrganizationService.getTeams(organizationId);
            res.json(teamResponses);
            return next();
        } catch (error) {
            OrganizationController.errorResponse(error, res, next, `OrganizationService { getTeams: organizationId = ${organizationId} } error`);
        }
    }

    public static async addTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationId: number = parseInt(req.params.organizationId, 10);
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            await OrganizationService.addTeam(organizationId, teamId);
            res.send(201);
            return next();
        } catch (error) {
            OrganizationController.errorResponse(error, res, next, `OrganizationService { addTeam: organizationId = ${organizationId}; teamId = ${teamId} } error`);
        }
    }

    public static async removeTeam(req: restify.Request, res: restify.Response, next: restify.Next) {
        const organizationId: number = parseInt(req.params.organizationId, 10);
        const teamId: number = parseInt(req.params.teamId, 10);
        try {
            await OrganizationService.removeTeam(organizationId, teamId);
            res.send(204);
            return next();
        } catch (error) {
            OrganizationController.errorResponse(error, res, next, `OrganizationService { removeTeam: organizationId = ${organizationId}; teamId = ${teamId} } error`);
        }
    }

}
