"use strict";

import "mocha";
import * as TypeMoq from "typemoq";

import * as assert from "assert";
import * as proxyquire from "proxyquire";
import VersionServiceMock from "../backend/VersionServiceMock";

import RequestMock from "../mock/request";
import ResponseMock from "../mock/response";

import IVersionRequest from "../../src/backend/elaboration/interface/IVersionRequest";
import IVersionResponse from "../../src/backend/elaboration/interface/IVersionResponse";

const versionController = proxyquire("../../src/controller/VersionController", {
    "../backend/elaboration/VersionService": { default: VersionServiceMock.object },
}).default;

const next = () => { return; };

function validateVersionResponse(response: IVersionResponse) {
    assert.deepStrictEqual(typeof response.id, "number", "IVersionResponse.id");
    assert.deepStrictEqual(typeof response.major, "number", "IVersionResponse.major");
    assert.deepStrictEqual(typeof response.projectId, "number", "IVersionResponse.projectId");
    // assert.deepStrictEqual(typeof response.components, "array", "IVersionResponse.surname");
}

describe("VersionController test", () => {

    it("getVersions", async () => {
        const req = new RequestMock().setBody({}).setQuery({page: "0", size: "25"});
        const res = new ResponseMock();
        await versionController.getVersions(req, res, next);

        VersionServiceMock.verify((service) => service.getVersions(TypeMoq.It.isAny(), TypeMoq.It.isAny()), TypeMoq.Times.once());
        res._object && res._object.length ?
            res._object.forEach((track) => { validateVersionResponse(track); })
            : assert.strictEqual(Array.isArray(res._object), true);
    });

    it("createVersion", async () => {
        const req = new RequestMock().setBody({});
        const res = new ResponseMock();
        await versionController.createVersion(req, res, next);

        VersionServiceMock.verify((service) => service.createVersion(TypeMoq.It.isAny()), TypeMoq.Times.once());
        assert.strictEqual(res._code, 201, "HttpResponseCode 201");
        assert.strictEqual(typeof res._object.id, "number");
    });


    it("getVersion", async () => {
        const req = new RequestMock().setParams({id: 1});
        const res = new ResponseMock();
        await versionController.getVersion(req, res, next);

        VersionServiceMock.verify((service) => service.getVersion(TypeMoq.It.isAny()), TypeMoq.Times.once());
        validateVersionResponse(res._object);
    });

    it("updateVersion", async () => {
        const req = new RequestMock().setParams({id: 1}).setBody({});
        const res = new ResponseMock();
        await versionController.updateVersion(req, res, next);

        VersionServiceMock.verify((service) => service.updateVersion(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAny()), TypeMoq.Times.once());
        validateVersionResponse(res._object);
    });

    it("deleteVersion", async () => {
        const req = new RequestMock().setParams({id: 1});
        const res = new ResponseMock();
        await versionController.deleteVersion(req, res, next);

        VersionServiceMock.verify((service) => service.deleteVersion(TypeMoq.It.isAny()), TypeMoq.Times.once());
        assert.strictEqual(res._code, 204, "HttpResponseCode 204");
    });

});
