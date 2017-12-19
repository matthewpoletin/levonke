"use strict";

import * as rp from "request-promise";

import ITeamResponse from "./interface/ITeamResponse";
import IUserRequest from "./interface/IUserRequest";
import IUserResponse from "./interface/IUserResponse";
import IUserPaginated from "./interface/IUserResponse";

import IUserService from "./IUserService";

import getOptions from "../../Options";

import config from "../../../IConfig";

const communityServiceURL = config.Services.Community.url + config.Services.Community.port + config.Services.Community.base;

class UserService implements IUserService {

    public async getUsers(page?: number, size?: number, username?): Promise<IUserPaginated[]> {
        const options = getOptions(communityServiceURL, `/users`, {page, size, username});
        return rp.get(options);
    }

    public async createUser(userRequest: IUserRequest): Promise<{ id: number; }> {
        const options = getOptions(communityServiceURL, `/users`, null, userRequest);
        return rp.post(options);
    }

    public async getUserById(userId: number): Promise<IUserResponse> {
        const options = getOptions(communityServiceURL, `/users/${userId}`);
        return rp.get(options);
    }

    public async getUserBy(params): Promise<IUserResponse> {
        const options = getOptions(communityServiceURL, `/users/by`, params);
        return rp.get(options);
    }

    public async updateUserById(userId: number, userRequest: IUserRequest): Promise<IUserResponse> {
        const options = getOptions(communityServiceURL, `/users/${userId}`, null, userRequest);
        return rp.patch(options);
    }

    public async deleteUserById(userId: number): Promise<void> {
        const options = getOptions(communityServiceURL, `/users/${userId}`);
        return rp.delete(options);
    }

    public async getTeams(userId: number, page?: number, size?: number): Promise<ITeamResponse[]> {
        const options = getOptions(communityServiceURL, `/users/${userId}/teams`, {page, size});
        return rp.get(options);
    }

}

export default new UserService();
