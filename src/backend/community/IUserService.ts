"use strict";

import IUserRequest from "./interface/UserRequest";
import IUserResponse from "./interface/UserResponse";

export default interface IUserService {

    getUsers(page: number): Promise<IUserResponse[]>;
    createUser(userRequest: IUserRequest): Promise<{ id: number; }>;
    getUser(id: number): Promise<IUserResponse>;
    updateUser(id: number, userRequest: IUserRequest): Promise<IUserResponse>;
    deleteUser(id: number): Promise<void>;

}
