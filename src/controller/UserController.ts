"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import UserService from "../backend/community/UserService";

import IUserRequest from "../backend/community/interface/IUserRequest";

export default class UserController extends AbstractController {

    public static async getUsers(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        const username: string = req.query.username;
        try {
            let userResponses = null;
            if (username) {
                userResponses = await UserService.getUsers(page, size, username);
            } else {
                userResponses = await UserService.getUsers(page, size);
            }
            res.json(userResponses);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getUsers } error`);
        }
    }

    public static async createUser(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userRequest: IUserRequest = req.body;
        try {
            const userResponse = await UserService.createUser(userRequest);
            res.json(201, userResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { createUser } error`);
        }
    }

    public static async getUser(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId = parseInt(req.params.userId, 10);
        try {
            const userResponse = await UserService.getUserById(userId);
            res.json(userResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getUser: userId = ${userId}} error`);
        }
    }

    public static async getUserByUsername(req: restify.Request, res: restify.Response, next: restify.Next) {
        const username: string = req.params.username;
        try {
            const userResponse = await UserService.getUserByUsername(username);
            res.json(userResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getUserByUsername: username = ${username}} error`);
        }
    }

    public static async getUserByEmail(req: restify.Request, res: restify.Response, next: restify.Next) {
        const email: string = req.params.email;
        try {
            const userResponse = await UserService.getUserByEmail(email);
            res.json(userResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getUserByEmail: email = ${email}} error`);
        }
    }

    public static async updateUser(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: number = parseInt(req.params.userId, 10);
        const userRequest = req.body;
        try {
            const userResponse = await UserService.updateUserById(userId, userRequest);
            res.json(userResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { updateUser: userId = ${userId} } error`);
        }
    }

    public static async deleteUser(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId = parseInt(req.params.userId, 10);
        try {
            await UserService.deleteUserById(userId);
            res.send(204);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { deleteUser: userId = ${userId} } error`);
        }
    }

    public static async getTeams(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId = parseInt(req.params.userId, 10);
        try {
            const teamResponses = await UserService.getTeams(userId);
            res.json(teamResponses);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getTeams: userId = ${userId} } error`);
        }
    }
}
