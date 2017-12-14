"use strict";

import * as TypeMoq from "typemoq";
import * as rand from "../lib/randstring";

import IOrganizationService from "../../src/backend/community/IOrganizationService";
import OrganizationService from "../../src/backend/community/OrganizationService";

import IOrganizationRequest from "../../src/backend/community/interface/IOrganizationRequest";

const OrganizationServiceMock: TypeMoq.IMock<IOrganizationService> = TypeMoq.Mock.ofInstance(OrganizationService);

OrganizationServiceMock.setup((service) => service.getOrganizations(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(async () => []);

OrganizationServiceMock.setup((service) => service.createOrganization(TypeMoq.It.isAny()))
    .returns(async () => ({
        id: Math.ceil(Math.random() * 100),
    }));

OrganizationServiceMock.setup((service) => service.getOrganizationById(TypeMoq.It.isAny()))
    .returns(async (id: number) => ({
        id,
        name: rand.randomStringAlpha(8),
        description: rand.randomStringAlpha(8),
        pubEmail: rand.generateEmail(),
        website: rand.generateLink(),
        ownerId: rand.generateId(),
    }));

OrganizationServiceMock.setup((service) => service.updateOrganization(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(async (id: number, organization: IOrganizationRequest) => ({
        id,
        name: rand.randomStringAlpha(8),
        description: rand.randomStringAlpha(8),
        pubEmail: rand.generateEmail(),
        website: rand.generateLink(),
        ownerId: rand.generateId(),
    }));

OrganizationServiceMock.setup((service) => service.deleteOrganization(TypeMoq.It.isAny()))
    .returns(async (id: number) => undefined);

export default OrganizationServiceMock;
