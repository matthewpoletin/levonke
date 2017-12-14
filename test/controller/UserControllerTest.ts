"use strict";

import "mocha";
import * as TypeMoq from "typemoq";

import * as assert from "assert";
import * as proxyquire from "proxyquire";
import UserServiceMock from "../backend/UserServiceMock";

import RequestMock from "../mock/request";
import ResponseMock from "../mock/response";

import IUserRequest from "../../src/backend/community/interface/IUserRequest";
import IUserResponse from "../../src/backend/community/interface/IUserResponse";

const userController = proxyquire("../../src/controller/UserController", {
    "../backend/community/UserService": { default: UserServiceMock.object },
}).default;

const next = () => { return; };

function validateUserResponse(response: IUserResponse) {
    assert.deepStrictEqual(typeof response.id, "number", "IUserResponse.id");
    assert.deepStrictEqual(typeof response.username, "string", "IUserResponse.username");
    assert.deepStrictEqual(typeof response.forename, "string", "IUserResponse.forename");
    assert.deepStrictEqual(typeof response.surname, "string", "IUserResponse.surname");
    assert.deepStrictEqual(typeof response.regEmail, "string", "IUserResponse.regEmail");
    assert.deepStrictEqual(typeof response.pubEmail, "string", "IUserResponse.pubEmail");
    assert.deepStrictEqual(typeof response.ghLink, "string", "IUserResponse.ghLink");
    assert.deepStrictEqual(typeof response.fbLink, "string", "IUserResponse.fbLink");
}

describe("UserController test", () => {

    it("getUsers", async () => {
        const req = new RequestMock().setBody({}).setQuery({page: "0", size: "25"});
        const res = new ResponseMock();
        await userController.getUsers(req, res, next);

        UserServiceMock.verify((service) => service.getUsers(TypeMoq.It.isAny(), TypeMoq.It.isAny()), TypeMoq.Times.once());
        res._object && res._object.length ?
            res._object.forEach((track) => { validateUserResponse(track); })
            : assert.strictEqual(Array.isArray(res._object), true);
    });

    it("createUser", async () => {
        const req = new RequestMock().setBody({});
        const res = new ResponseMock();
        await userController.createUser(req, res, next);

        UserServiceMock.verify((service) => service.createUser(TypeMoq.It.isAny()), TypeMoq.Times.once());
        assert.strictEqual(res._code, 201, "HttpResponseCode 201");
        assert.strictEqual(typeof res._object.id, "number");
    });


    it("getUserById", async () => {
        const req = new RequestMock().setParams({id: 1});
        const res = new ResponseMock();
        await userController.getUserById(req, res, next);

        UserServiceMock.verify((service) => service.getUserById(TypeMoq.It.isAny()), TypeMoq.Times.once());
        validateUserResponse(res._object);
    });

    it("updateUserById", async () => {
        const req = new RequestMock().setParams({id: 1}).setBody({});
        const res = new ResponseMock();
        await userController.updateUserById(req, res, next);

        UserServiceMock.verify((service) => service.updateUserById(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAny()), TypeMoq.Times.once());
        validateUserResponse(res._object);
    });

    it("deleteUserById", async () => {
        const req = new RequestMock().setParams({id: 1});
        const res = new ResponseMock();
        await userController.deleteUserById(req, res, next);

        UserServiceMock.verify((service) => service.deleteUserById(TypeMoq.It.isAny()), TypeMoq.Times.once());
        assert.strictEqual(res._code, 204, "HttpResponseCode 204");
    });

});
