"use strict";

import * as restify from "restify";

import AbstractController from "./AbstractController";

import authService from "../backend/auth/AuthService";

export default class AuthController extends AbstractController {

    public static async login(req: restify.Request, res: restify.Response, next: restify.Next) {
        const loginRequest = req.body;
        try {
            const authResponse = await authService.login(loginRequest);
            return res.json(201, authResponse);
        } catch (error) {
            AuthController.errorResponse(error, res, next, `AuthService { login } error`);
        }
    }

    public static async refresh(req: restify.Request, res: restify.Response, next: restify.Next) {
        const refreshRequest = req.body;
        try {
            const authResponse = await authService.refresh(refreshRequest);
            return res.json(201, authResponse);
        } catch (error) {
            AuthController.errorResponse(error, res, next, `AuthService { refresh } error`);
        }
    }

    public static async logout(req: restify.Request, res: restify.Response, next: restify.Next) {
        const logoutRequest = req.body;
        try {
            const authResponse = await authService.logout(logoutRequest);
            return res.json(204, authResponse);
        } catch (error) {
            AuthController.errorResponse(error, res, next, `AuthService { logout } error`);
        }
    }

}
