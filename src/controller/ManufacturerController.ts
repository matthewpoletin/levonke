"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import ManufacturerService from "../backend/supply/ManufacturerService";

import IManufacturerRequest from "../backend/supply/interface/IManufacturerRequest";

export default class ManufacturerController extends AbstractController {

    public static async getManufacturers(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        try {
            const manufacturerResponses = await ManufacturerService.getManufacturers(page, size);
            res.json(manufacturerResponses);
            return next();
        } catch (error) {
            ManufacturerController.errorResponse(error, res, next, `ManufacturerService { getManufacturers } error`);
        }
    }

    public static async createManufacturer(req: restify.Request, res: restify.Response, next: restify.Next) {
        const manufacturerRequest: IManufacturerRequest = req.body;
        try {
            const manufacturerResponse = await ManufacturerService.createManufacturer(manufacturerRequest);
            res.json(201, manufacturerResponse);
            return next();
        } catch (error) {
            ManufacturerController.errorResponse(error, res, next, `UserService { createManufacturer } error`);
        }
    }

    public static async getManufacturer(req: restify.Request, res: restify.Response, next: restify.Next) {
        const manufacturerId: number = parseInt(req.params.manufacturerId, 10);
        try {
            const manufacturerResponse = await ManufacturerService.getManufacturer(manufacturerId);
            res.json(manufacturerResponse);
            return next();
        } catch (error) {
            ManufacturerController.errorResponse(error, res, next, `ManufacturerService { getManufacturer: manufacturerId = ${manufacturerId}} error`);
        }
    }

    public static async updateManufacturer(req: restify.Request, res: restify.Response, next: restify.Next) {
        const manufacturerId: number = parseInt(req.params.manufacturerId, 10);
        const manufacturerRequest = req.body;
        try {
            const manufacturerResponse = await ManufacturerService.updateManufacturer(manufacturerId, manufacturerRequest);
            res.json(manufacturerResponse);
            return next();
        } catch (error) {
            ManufacturerController.errorResponse(error, res, next, `ManufacturerService {updateUser: manufacturerId = ${manufacturerId}} error`);
        }
    }

    public static async deleteManufacturer(req: restify.Request, res: restify.Response, next: restify.Next) {
        const manufacturerId: number = parseInt(req.params.manufacturerId, 10);
        try {
            await ManufacturerService.deleteManufacturer(manufacturerId);
            res.send(204);
            return next();
        } catch (error) {
            ManufacturerController.errorResponse(error, res, next, `ManufacturerService { deleteManufacturer: manufacturerId = ${manufacturerId} } error`);
        }
    }

    public static async getComponents(req: restify.Request, res: restify.Response, next: restify.Next) {
        const manufacturerId: number = parseInt(req.params.manufacturerId, 10);
        try {
            const componentResponses = await ManufacturerService.getComponents(manufacturerId);
            res.json(componentResponses);
            return next();
        } catch (error) {
            ManufacturerController.errorResponse(error, res, next, `ManufacturerService { getComponents: manufacturerId = ${manufacturerId} } error`);
        }
    }

    public static async addComponent(req: restify.Request, res: restify.Response, next: restify.Next) {
        const manufacturerId: number = parseInt(req.params.manufacturerId, 10);
        const componentId: number = parseInt(req.params.componentId, 10);
        try {
            await ManufacturerService.addComponent(manufacturerId, componentId);
            res.send(204);
            return next();
        } catch (error) {
            ManufacturerController.errorResponse(error, res, next, `ManufacturerService { addComponents: manufacturerId = ${manufacturerId} } error`);
        }
    }

}
