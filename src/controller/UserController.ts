"use strict";

import * as restify from "restify";
import restifyErrors from "restify-errors";

import AbstractController from "./AbstractController";

import UserService from "../backend/community/UserService";

import IUserRequest from "../backend/community/interface/IUserRequest";

export default class UserController extends AbstractController {

    // TODO: fix pagination
    // TODO: implement pagination in microservice
    public static async readUsers(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.params.page, 10) || 0;
        try {
            const users = await UserService.getUsers(page);
            return res.json(users);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError("UserService { getUsers } error"));
        }
    }

    public static async createUser(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userRequest: IUserRequest = req.body;
        try {
            const userResponse = await UserService.createUser(userRequest);
            return res.json(201, userResponse);
        } catch (error) {
            UserController.errorHandler(error, res);
        }
    }

    public static async readUser(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId = parseInt(req.params.id, 10);
        try {
            const userResponse = await UserService.getUser(userId);
            return res.json(userResponse);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailiableErorr(`UserService {readUser: userId = ${userId}} error`));
        }
    }

    public static async updateUser(req: restify.Request, res: restify.Response) {
        const userId = parseInt(req.params.id, 10);
        const userRequest = req.body;
        return res.json(await UserService.updateUser(userId, userRequest));
    }

    public static async deleteUser(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId = parseInt(req.params.id, 10);
        try {
            await UserService.deleteUser(userId);
            return res.send(204);
        } catch (error) {
            return next(new restifyErrors.ServiceUnavailableError(`UserService { deleteUser: userId = ${userId} } error`));
        }
    }

}
