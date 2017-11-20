"use strict";

import * as rp from "request-promise";

import ITeamResponse from "./interface/ITeamResponse";
import IUserRequest from "./interface/IUserRequest";
import IUserResponse from "./interface/IUserResponse";

import IUserService from "./IUserService";

import getOptions from "../../Options";

import config from "../../../IConfig";

const communityServiceURL = config.Services.Community.url + config.Services.Community.port + config.Services.Community.base;

class UserService implements IUserService {

    public async getUsers(page?: number, size?: number): Promise<IUserResponse[]> {
        const options = getOptions(communityServiceURL, `/users`, {page, size});
        return rp.get(options);
    }

    public async createUser(userRequest: IUserRequest): Promise<{ id: number; }> {
        const options = getOptions(communityServiceURL, `/users`, null, userRequest);
        return rp.post(options);
    }

    public async getUser(userId: number): Promise<IUserResponse> {
        const options = getOptions(communityServiceURL, `/users/${userId}`);
        return rp.get(options);
    }

    public async updateUser(userId: number, userRequest: IUserRequest): Promise<IUserResponse> {
        const options = getOptions(communityServiceURL, `/users/${userId}`, null, userRequest);
        return rp.patch(options);
    }

    public async deleteUser(userId: number): Promise<void> {
        const options = getOptions(communityServiceURL, `/users/${userId}`);
        return rp.delete(options);
    }

    public async getTeams(userId: number, page?: number, size?: number): Promise<ITeamResponse[]> {
        const options = getOptions(communityServiceURL, `/users/${userId}/teams`, {page, size});
        return rp.get(options);
    }

}

export default new UserService();
