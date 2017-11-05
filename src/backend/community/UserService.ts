"use strict";

import * as rp from "request-promise";

import IUserRequest from "./interface/IUserRequest";
import IUserResponse from "./interface/IUserResponse";

import IUserService from "./IUserService";

// TODO: make loaded from a text file
const apiUrl = "http://localhost:8442/api/community";

function getOptions(path, params?, body?) {
    return {
        body,
        json: true,
        qs: params,
        uri: apiUrl + path,
    };
}

class UserService implements IUserService {

    public async getUsers(page: number, size: number): Promise<IUserResponse[]> {
        const options = getOptions(`/users`, {page, size});
        return rp.get(options);
    }

    public async createUser(userRequest: IUserRequest): Promise<{ id: number; }> {
        const options = getOptions(`/users`, null, userRequest);
        return rp.post(options);
    }

    public async getUser(userId: number): Promise<IUserResponse> {
        const options = getOptions(`/users/${userId}`);
        return rp.get(options);
    }

    public async updateUser(userId: number, userRequest: IUserRequest): Promise<IUserResponse> {
        const options = getOptions(`/users/${userId}`, null, userRequest);
        return rp.patch(options);
    }

    public async deleteUser(userId: number): Promise<void> {
        const options = getOptions(`/users/${userId}`);
        return rp.delete(options);
    }

}

export default new UserService();
