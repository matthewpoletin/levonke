"use strict";

import IUserRequest from "./interface/IUserRequest";
import IUserResponse from "./interface/IUserResponse";
import ITeamResponse from "./interface/ITeamResponse";

export default interface IUserService {
    getUsers(page?: number, size?: number, query?: string): Promise<IUserResponse[]>;
    createUser(userRequest: IUserRequest): Promise<{ id: number; }>;
    getUserById(userId: number): Promise<IUserResponse>;
    getUserByUsername(username: string): Promise<IUserResponse>;
    getUserByEmail(email: string): Promise<IUserResponse>;
    updateUserById(userId: number, userRequest: IUserRequest): Promise<IUserResponse>;
    deleteUserById(userId: number): Promise<void>;

    getTeams(userId: number, page?: number, size?: number): Promise<ITeamResponse[]>;
}
