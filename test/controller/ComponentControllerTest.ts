"use strict";

import "mocha";
import * as TypeMoq from "typemoq";

import * as assert from "assert";
import * as proxyquire from "proxyquire";
import ComponentServiceMock from "../backend/ComponentServiceMock";

import RequestMock from "../mock/request";
import ResponseMock from "../mock/response";

import IComponentRequest from "../../src/backend/supply/interface/IComponentRequest";
import IComponentResponse from "../../src/backend/supply/interface/IComponentResponse";

const componentController = proxyquire("../../src/controller/ComponentController", {
    "../backend/supply/ComponentService": { default: ComponentServiceMock.object },
}).default;

const next = () => { return; };

function validateComponentResponse(response: IComponentResponse) {
    assert.deepStrictEqual(typeof response.id, "number", "IComponentResponse.id");
    assert.deepStrictEqual(typeof response.uuid, "string", "IComponentResponse.uuid");
    assert.deepStrictEqual(typeof response.manufacturerPartNumber, "string", "IComponentResponse.manufacturerPartNumber");
    assert.deepStrictEqual(typeof response.manufacturerId, "number", "IComponentResponse.manufacturerId");
}

describe("ComponentController test", () => {

    it("getComponents", async () => {
        const req = new RequestMock().setBody({}).setQuery({page: "0", size: "25"});
        const res = new ResponseMock();
        await componentController.getComponents(req, res);

        ComponentServiceMock.verify((service) => service.getComponents(TypeMoq.It.isAny(), TypeMoq.It.isAny()), TypeMoq.Times.once());
        res._object && res._object.length ?
            res._object.forEach((track) => { validateComponentResponse(track); })
            : assert.strictEqual(Array.isArray(res._object), true);
    });

    it("createComponent", async () => {
        const req = new RequestMock().setBody({});
        const res = new ResponseMock();
        await componentController.createComponent(req, res, next);

        ComponentServiceMock.verify((service) => service.createComponent(TypeMoq.It.isAny()), TypeMoq.Times.once());
        assert.strictEqual(res._code, 201, "HttpResponseCode 201");
        assert.strictEqual(typeof res._object.id, "number");
    });


    it("getComponent", async () => {
        const req = new RequestMock().setParams({id: 1});
        const res = new ResponseMock();
        await componentController.getComponent(req, res, next);

        ComponentServiceMock.verify((service) => service.getComponent(TypeMoq.It.isAny()), TypeMoq.Times.once());
        validateComponentResponse(res._object);
    });

    it("updateComponent", async () => {
        const req = new RequestMock().setParams({id: 1}).setBody({});
        const res = new ResponseMock();
        await componentController.updateComponent(req, res, next);

        ComponentServiceMock.verify((service) => service.updateComponent(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAny()), TypeMoq.Times.once());
        validateComponentResponse(res._object);
    });

    it("deleteComponent", async () => {
        const req = new RequestMock().setParams({id: 1});
        const res = new ResponseMock();
        await componentController.deleteComponent(req, res, next);

        ComponentServiceMock.verify((service) => service.deleteComponent(TypeMoq.It.isAny()), TypeMoq.Times.once());
        assert.strictEqual(res._code, 204, "HttpResponseCode 204");
    });

});
