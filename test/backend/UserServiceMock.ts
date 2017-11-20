"use strict";

import * as TypeMoq from "typemoq";
import * as rand from "../lib/randstring";

import IUserService from "../../src/backend/community/IUserService";
import UserService from "../../src/backend/community/UserService";

import IUserRequest from "../../src/backend/community/interface/IUserRequest";

const UserServiceMock: TypeMoq.IMock<IUserService> = TypeMoq.Mock.ofInstance(UserService);

UserServiceMock.setup((service) => service.getUsers(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(async () => []);

UserServiceMock.setup((service) => service.createUser(TypeMoq.It.isAny()))
    .returns(async () => ({
        id: Math.ceil(Math.random() * 100),
    }));

UserServiceMock.setup((service) => service.getUser(TypeMoq.It.isAny()))
    .returns(async (id: number) => ({
        id,
        username: rand.randomStringAlpha(8),
        forename: rand.randomStringAlpha(8),
        surname: rand.randomStringAlpha(8),
        regEmail: rand.generateEmail(),
        pubEmail: rand.generateEmail(),
        ghLink: rand.generateLink(),
        fbLink: rand.generateLink(),
        // client: Math.ceil(Math.random() * 100),
    }));

UserServiceMock.setup((service) => service.updateUser(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(async (id: number, user: IUserRequest) => ({
        id,
        username: rand.randomStringAlpha(8),
        forename: rand.randomStringAlpha(8),
        surname: rand.randomStringAlpha(8),
        regEmail: rand.generateEmail(),
        pubEmail: rand.generateEmail(),
        ghLink: rand.generateLink(),
        fbLink: rand.generateLink(),
        // client: Math.ceil(Math.random() * 100),
    }));

UserServiceMock.setup((service) => service.deleteUser(TypeMoq.It.isAny()))
    .returns(async (id: number) => undefined);

export default UserServiceMock;
