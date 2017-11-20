"use strict";

import * as TypeMoq from "typemoq";
import * as rand from "../lib/randstring";

import IVersionService from "../../src/backend/elaboration/IVersionService";
import VersionService from "../../src/backend/elaboration/VersionService";

import IVersionRequest from "../../src/backend/elaboration/interface/IVersionRequest";

const VersionServiceMock: TypeMoq.IMock<IVersionService> = TypeMoq.Mock.ofInstance(VersionService);

VersionServiceMock.setup((service) => service.getVersions(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(async () => []);

VersionServiceMock.setup((service) => service.createVersion(TypeMoq.It.isAny()))
    .returns(async () => ({
        id: Math.ceil(Math.random() * 100),
    }));

VersionServiceMock.setup((service) => service.getVersion(TypeMoq.It.isAny()))
    .returns(async (id: number) => ({
        id,
        major: rand.randomInteger(10, 0),
        projectId: rand.generateId(),
        surname: rand.randomStringAlpha(8),
        // components: rand?
    }));

VersionServiceMock.setup((service) => service.updateVersion(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(async (id: number, version: IVersionRequest) => ({
        id,
        major: rand.randomInteger(10, 0),
        projectId: rand.generateId(),
        surname: rand.randomStringAlpha(8),
        // components: rand?
    }));

VersionServiceMock.setup((service) => service.deleteVersion(TypeMoq.It.isAny()))
    .returns(async (id: number) => undefined);

export default VersionServiceMock;
