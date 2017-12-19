"use strict";

import "mocha";
import * as TypeMoq from "typemoq";

import * as assert from "assert";
import * as proxyquire from "proxyquire";
import ManufacturerServiceMock from "../backend/ManufacturerServiceMock";

import RequestMock from "../mock/request";
import ResponseMock from "../mock/response";

import IManufacturerRequest from "../../src/backend/supply/interface/IManufacturerRequest";
import IManufacturerResponse from "../../src/backend/supply/interface/IManufacturerResponse";

const manufacturerController = proxyquire("../../src/controller/ManufacturerController", {
    "../backend/supply/ManufacturerService": { default: ManufacturerServiceMock.object },
}).default;

const next = () => { return; };

function validateManufacturerResponse(response: IManufacturerResponse) {
    assert.deepStrictEqual(typeof response.id, "number", "IManufacturerResponse.id");
    assert.deepStrictEqual(typeof response.name, "string", "IManufacturerResponse.name");
    assert.deepStrictEqual(typeof response.website, "string", "IManufacturerResponse.website");
}

describe("ManufacturerController test", () => {

    it("getManufacturers", async () => {
        const req = new RequestMock().setBody({}).setQuery({page: "0", size: "25"});
        const res = new ResponseMock();
        await manufacturerController.getManufacturers(req, res);

        ManufacturerServiceMock.verify((service) => service.getManufacturers(TypeMoq.It.isAny(), TypeMoq.It.isAny()), TypeMoq.Times.once());
        res._object && res._object.length ?
            res._object.forEach((track) => { validateManufacturerResponse(track); })
            : assert.strictEqual(Array.isArray(res._object), true);
    });

    it("createManufacturer", async () => {
        const req = new RequestMock().setBody({});
        const res = new ResponseMock();
        await manufacturerController.createManufacturer(req, res, next);

        ManufacturerServiceMock.verify((service) => service.createManufacturer(TypeMoq.It.isAny()), TypeMoq.Times.once());
        assert.strictEqual(res._code, 201, "HttpResponseCode 201");
        assert.strictEqual(typeof res._object.id, "number");
    });


    it("getManufacturerById", async () => {
        const req = new RequestMock().setParams({id: 1});
        const res = new ResponseMock();
        await manufacturerController.getManufacturerById(req, res, next);

        ManufacturerServiceMock.verify((service) => service.getManufacturerById(TypeMoq.It.isAny()), TypeMoq.Times.once());
        validateManufacturerResponse(res._object);
    });

    it("updateManufacturerById", async () => {
        const req = new RequestMock().setParams({id: 1}).setBody({});
        const res = new ResponseMock();
        await manufacturerController.updateManufacturerById(req, res, next);

        ManufacturerServiceMock.verify((service) => service.updateManufacturerById(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAny()), TypeMoq.Times.once());
        validateManufacturerResponse(res._object);
    });

    it("deleteManufacturerById", async () => {
        const req = new RequestMock().setParams({id: 1});
        const res = new ResponseMock();
        await manufacturerController.deleteManufacturerById(req, res, next);

        ManufacturerServiceMock.verify((service) => service.deleteManufacturerById(TypeMoq.It.isAny()), TypeMoq.Times.once());
        assert.strictEqual(res._code, 204, "HttpResponseCode 204");
    });

});
