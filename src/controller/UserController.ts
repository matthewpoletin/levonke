"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import UserService from "../backend/community/UserService";

import ITeamResponse from "../backend/community/interface/ITeamResponse";
import IUserRequest from "../backend/community/interface/IUserRequest";
import IUserResponse from "../backend/community/interface/IUserResponse";
import IUserPaginated from "../backend/community/interface/IUserResponse";

export default class UserController extends AbstractController {

    public static async getUsers(req: restify.Request, res: restify.Response, next: restify.Next) {
        const page: number = parseInt(req.query.page, 10) || 0;
        const size: number = parseInt(req.query.size, 10) || 25;
        const username: string = req.query.username;
        try {
            let userResponses: IUserPaginated = null;
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
        // TODO: check if user with such username exists
        try {
            const userResponse: IUserResponse = await UserService.createUser(userRequest);
            res.json(201, userResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { createUser } error`);
        }
    }

    public static async getUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId = parseInt(req.params.userId, 10);
        try {
            const userResponse: IUserResponse = await UserService.getUserById(userId);
            res.json(userResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getUser: userId = ${userId}} error`);
        }
    }

    public static async getUserBy(req: restify.Request, res: restify.Response, next: restify.Next) {
        const username: string = req.query.username;
        const email: string = req.query.email;
        if (username) {
            try {
                const userResponse = await UserService.getUserBy({username});
                res.json(userResponse);
                return next();
            } catch (error) {
                UserController.errorResponse(error, res, next, `UserService { getUserBy: username = ${username}} error`);
            }
        } else {
            try {
                const userResponse = await UserService.getUserBy({email});
                res.json(userResponse);
                return next();
            } catch (error) {
                UserController.errorResponse(error, res, next, `UserService { getUserBy: email = ${email}} error`);
            }
        }
    }

    public static async updateUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
        const userId: number = parseInt(req.params.userId, 10);
        const userRequest = req.body;
        try {
            const userResponse: IUserResponse = await UserService.updateUserById(userId, userRequest);
            res.json(userResponse);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { updateUser: userId = ${userId} } error`);
        }
    }

    public static async deleteUserById(req: restify.Request, res: restify.Response, next: restify.Next) {
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
            const teamResponses: ITeamResponse[] = await UserService.getTeams(userId);
            res.json(teamResponses);
            return next();
        } catch (error) {
            UserController.errorResponse(error, res, next, `UserService { getTeams: userId = ${userId} } error`);
        }
    }
}
