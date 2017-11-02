"use strict";

import * as restify from "restify";
import restifyErrors from "restify-errors";

import AbstractController from "./AbstractController";

import ManufacturerService from "../backend/supply/ManufacturerService";

import IManufacturerRequest from "../backend/supply/interface/IManufacturerRequest";

export default class ManufacturerController extends AbstractController {

    // TODO: fix pagination
    // TODO: implement pagination in microservice
    public static async readManufacturers(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.params.page, 10) || 0;
        try {
            const manufacturers = await ManufacturerService.getManufacturers(page);
            return res.json(manufacturers);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("ManufacturerService { getManufacturers } error"));
        }
    }

    public static async createManufacturer(req: restify.Request, res: restify.Response, next: restify.Next) {
        const manufacturerRequest: IManufacturerRequest = req.body;
        try {
            const manufacturerResponse = await ManufacturerService.createManufacturer(manufacturerRequest);
            return res.json(201, manufacturerResponse);
        } catch (error) {
            ManufacturerController.errorHandler(error, res);
        }
    }

    public static async readManufacturer(req: restify.Request, res: restify.Response, next: restify.Next) {
        const manufacturerId = parseInt(req.params.id, 10);
        try {
            const manufacturerResponse = await ManufacturerService.getManufacturer(manufacturerId);
            return res.json(manufacturerResponse);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailiableErorr(`ManufacturerService {readManufacturer: manufacturerId = ${manufacturerId}} error`));
        }
    }

    public static async updateManufacturer(req: restify.Request, res: restify.Response) {
        const manufacturerId = parseInt(req.params.id, 10);
        const manufacturerRequest = req.body;
        return res.json(await ManufacturerService.updateManufacturer(manufacturerId, manufacturerRequest));
    }

    public static async deleteManufacturer(req: restify.Request, res: restify.Response, next: restify.Next) {
        const manufacturerId = parseInt(req.params.id, 10);
        try {
            await ManufacturerService.deleteManufacturer(manufacturerId);
            return res.send(204);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`ManufacturerService { deleteManufacturer: manufacturerId = ${manufacturerId} } error`));
        }
    }

}
