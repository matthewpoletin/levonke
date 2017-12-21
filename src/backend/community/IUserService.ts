"use strict";

import ITeamResponse from "./interface/ITeamResponse";
import IUserRequest from "./interface/IUserRequest";
import IUserResponse from "./interface/IUserResponse";
import IUserPaginated from "./interface/IUserResponse";

export default interface IUserService {
    getUsers(page?: number, size?: number, query?: string): Promise<IUserPaginated>;
    createUser(userRequest: IUserRequest): Promise<{ id: number; }>;
    getUserById(userId: number): Promise<IUserResponse>;
    getUserBy(params): Promise<IUserResponse>;
    updateUserById(userId: number, userRequest: IUserRequest): Promise<IUserResponse>;
    deleteUserById(userId: number): Promise<void>;

    getTeams(userId: number, page?: number, size?: number): Promise<ITeamResponse[]>;
}
