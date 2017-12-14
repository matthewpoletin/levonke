"use strict";

import "mocha";
import * as TypeMoq from "typemoq";

import * as assert from "assert";
import * as proxyquire from "proxyquire";
import TeamServiceMock from "../backend/TeamServiceMock";

import RequestMock from "../mock/request";
import ResponseMock from "../mock/response";

import ITeamRequest from "../../src/backend/community/interface/ITeamRequest";
import ITeamResponse from "../../src/backend/community/interface/ITeamResponse";

const teamController = proxyquire("../../src/controller/TeamController", {
    "../backend/community/TeamService": { default: TeamServiceMock.object },
}).default;

const next = () => { return; };

function validateTeamResponse(response: ITeamResponse) {
    assert.deepStrictEqual(typeof response.id, "number", "ITeamResponse.id");
    assert.deepStrictEqual(typeof response.name, "string", "ITeamResponse.name");
    assert.deepStrictEqual(typeof response.organizationId, "number", "ITeamResponse.organizationId");
}

describe("TeamController test", () => {

    it("getTeams", async () => {
        const req = new RequestMock().setBody({}).setQuery({page: "0", size: "25"});
        const res = new ResponseMock();
        await teamController.getTeams(req, res, next);

        TeamServiceMock.verify((service) => service.getTeams(TypeMoq.It.isAny(), TypeMoq.It.isAny()), TypeMoq.Times.once());
        res._object && res._object.length ?
            res._object.forEach((track) => { validateTeamResponse(track); })
            : assert.strictEqual(Array.isArray(res._object), true);
    });

    it("createTeam", async () => {
        const req = new RequestMock().setBody({});
        const res = new ResponseMock();
        await teamController.createTeam(req, res, next);

        TeamServiceMock.verify((service) => service.createTeam(TypeMoq.It.isAny()), TypeMoq.Times.once());
        assert.strictEqual(res._code, 201, "HttpResponseCode 201");
        assert.strictEqual(typeof res._object.id, "number");
    });


    it("getTeamById", async () => {
        const req = new RequestMock().setParams({id: 1});
        const res = new ResponseMock();
        await teamController.getTeamById(req, res, next);

        TeamServiceMock.verify((service) => service.getTeamById(TypeMoq.It.isAny()), TypeMoq.Times.once());
        validateTeamResponse(res._object);
    });

    it("updateTeamById", async () => {
        const req = new RequestMock().setParams({id: 1}).setBody({});
        const res = new ResponseMock();
        await teamController.updateTeamById(req, res, next);

        TeamServiceMock.verify((service) => service.updateTeamById(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAny()), TypeMoq.Times.once());
        validateTeamResponse(res._object);
    });

    it("deleteTeamById", async () => {
        const req = new RequestMock().setParams({id: 1});
        const res = new ResponseMock();
        await teamController.deleteTeamById(req, res, next);

        TeamServiceMock.verify((service) => service.deleteTeamById(TypeMoq.It.isAny()), TypeMoq.Times.once());
        assert.strictEqual(res._code, 204, "HttpResponseCode 204");
    });

});
