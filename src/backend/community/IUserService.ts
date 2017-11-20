"use strict";

import IUserRequest from "./interface/IUserRequest";
import IUserResponse from "./interface/IUserResponse";
import ITeamResponse from "./interface/ITeamResponse";

export default interface IUserService {
    getUsers(page?: number, size?: number): Promise<IUserResponse[]>;
    createUser(userRequest: IUserRequest): Promise<{ id: number; }>;
    getUser(userId: number): Promise<IUserResponse>;
    updateUser(userId: number, userRequest: IUserRequest): Promise<IUserResponse>;
    deleteUser(userId: number): Promise<void>;

    getTeams(userId: number, page?: number, size?: number): Promise<ITeamResponse[]>;
}
