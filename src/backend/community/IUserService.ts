"use strict";

import IUserRequest from "./interface/UserRequest";
import IUserResponse from "./interface/UserResponse";

export default interface IUserService {

    getUsers(page: number): Promise<IUserResponse[]>;
    createUser(userRequest: IUserRequest): Promise<{ id: number; }>;
    getUser(userId: number): Promise<IUserResponse>;
    updateUser(userId: number, userRequest: IUserRequest): Promise<IUserResponse>;
    deleteUser(userId: number): Promise<void>;

}
