"use strict";

import "mocha";
import * as TypeMoq from "typemoq";

import * as assert from "assert";
import * as proxyquire from "proxyquire";
import OrganizationServiceMock from "../backend/OrganizationServiceMock";

import RequestMock from "../mock/request";
import ResponseMock from "../mock/response";

import IOrganizationRequest from "../../src/backend/community/interface/IOrganizationRequest";
import IOrganizationResponse from "../../src/backend/community/interface/IOrganizationResponse";

const organizationController = proxyquire("../../src/controller/OrganizationController", {
    "../backend/community/OrganizationService": { default: OrganizationServiceMock.object },
}).default;

const next = () => { return; };

function validateOrganizationResponse(response: IOrganizationResponse) {
    assert.deepStrictEqual(typeof response.id, "number", "IOrganizationResponse.id");
    assert.deepStrictEqual(typeof response.name, "string", "IOrganizationResponse.name");
    assert.deepStrictEqual(typeof response.description, "string", "IOrganizationResponse.description");
    assert.deepStrictEqual(typeof response.pubEmail, "string", "IOrganizationResponse.pubEmail");
    assert.deepStrictEqual(typeof response.website, "string", "IOrganizationResponse.website");
    assert.deepStrictEqual(typeof response.ownerId, "number", "IOrganizationResponse.ownerId");
}

describe("OrganizationController test", () => {

    it("getOrganizations", async () => {
        const req = new RequestMock().setBody({}).setQuery({page: "0", size: "25"});
        const res = new ResponseMock();
        await organizationController.getOrganizations(req, res, next);

        OrganizationServiceMock.verify((service) => service.getOrganizations(TypeMoq.It.isAny(), TypeMoq.It.isAny()), TypeMoq.Times.once());
        res._object && res._object.length ?
            res._object.forEach((track) => { validateOrganizationResponse(track); })
            : assert.strictEqual(Array.isArray(res._object), true);
    });

    it("createOrganization", async () => {
        const req = new RequestMock().setBody({});
        const res = new ResponseMock();
        await organizationController.createOrganization(req, res, next);

        OrganizationServiceMock.verify((service) => service.createOrganization(TypeMoq.It.isAny()), TypeMoq.Times.once());
        assert.strictEqual(res._code, 201, "HttpResponseCode 201");
        assert.strictEqual(typeof res._object.id, "number");
    });


    it("getOrganizationById", async () => {
        const req = new RequestMock().setParams({id: 1});
        const res = new ResponseMock();
        await organizationController.getOrganizationById(req, res, next);

        OrganizationServiceMock.verify((service) => service.getOrganizationById(TypeMoq.It.isAny()), TypeMoq.Times.once());
        validateOrganizationResponse(res._object);
    });

    it("updateOrganizationById", async () => {
        const req = new RequestMock().setParams({id: 1}).setBody({});
        const res = new ResponseMock();
        await organizationController.updateOrganizationById(req, res, next);

        OrganizationServiceMock.verify((service) => service.updateOrganization(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAny()), TypeMoq.Times.once());
        validateOrganizationResponse(res._object);
    });

    it("deleteOrganizationById", async () => {
        const req = new RequestMock().setParams({id: 1});
        const res = new ResponseMock();
        await organizationController.deleteOrganizationById(req, res, next);

        OrganizationServiceMock.verify((service) => service.deleteOrganization(TypeMoq.It.isAny()), TypeMoq.Times.once());
        assert.strictEqual(res._code, 204, "HttpResponseCode 204");
    });

});
