"use strict";

import "mocha";
import * as TypeMoq from "typemoq";

import * as assert from "assert";
import * as proxyquire from "proxyquire";
import ProjectServiceMock from "../backend/ProjectServiceMock";

import RequestMock from "../mock/request";
import ResponseMock from "../mock/response";

import IProjectRequest from "../../src/backend/elaboration/interface/IProjectRequest";
import IProjectResponse from "../../src/backend/elaboration/interface/IProjectResponse";

const projectController = proxyquire("../../src/controller/ProjectController", {
    "../backend/elaboration/ProjectService": { default: ProjectServiceMock.object },
}).default;

const next = () => { return; };

function validateProjectResponse(response: IProjectResponse) {
    assert.deepStrictEqual(typeof response.id, "number", "IProjectResponse.id");
    assert.deepStrictEqual(typeof response.name, "string", "IProjectResponse.name");
    assert.deepStrictEqual(typeof response.description, "string", "IProjectResponse.description");
    assert.deepStrictEqual(typeof response.website, "string", "IProjectResponse.website");
    assert.deepStrictEqual(typeof response.teamId, "number", "IProjectResponse.teamId");
}

describe("ProjectController test", () => {

    it("getProjects", async () => {
        const req = new RequestMock().setBody({}).setQuery({page: "0", size: "25"});
        const res = new ResponseMock();
        await projectController.getProjects(req, res, next);

        ProjectServiceMock.verify((service) => service.getProjects(TypeMoq.It.isAny(), TypeMoq.It.isAny()), TypeMoq.Times.once());
        res._object && res._object.length ?
            res._object.forEach((track) => { validateProjectResponse(track); })
            : assert.strictEqual(Array.isArray(res._object), true);
    });

    it("createProject", async () => {
        const req = new RequestMock().setBody({});
        const res = new ResponseMock();
        await projectController.createProject(req, res, next);

        ProjectServiceMock.verify((service) => service.createProject(TypeMoq.It.isAny()), TypeMoq.Times.once());
        assert.strictEqual(res._code, 201, "HttpResponseCode 201");
        assert.strictEqual(typeof res._object.id, "number");
    });


    it("getProjectById", async () => {
        const req = new RequestMock().setParams({id: 1});
        const res = new ResponseMock();
        await projectController.getProjectById(req, res, next);

        ProjectServiceMock.verify((service) => service.getProjectById(TypeMoq.It.isAny()), TypeMoq.Times.once());
        validateProjectResponse(res._object);
    });

    it("updateProjectById", async () => {
        const req = new RequestMock().setParams({id: 1}).setBody({});
        const res = new ResponseMock();
        await projectController.updateProjectById(req, res, next);

        ProjectServiceMock.verify((service) => service.updateProjectById(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAny()), TypeMoq.Times.once());
        validateProjectResponse(res._object);
    });

    it("deleteProjectById", async () => {
        const req = new RequestMock().setParams({id: 1});
        const res = new ResponseMock();
        await projectController.deleteProjectById(req, res, next);

        ProjectServiceMock.verify((service) => service.deleteProjectById(TypeMoq.It.isAny()), TypeMoq.Times.once());
        assert.strictEqual(res._code, 204, "HttpResponseCode 204");
    });

});
