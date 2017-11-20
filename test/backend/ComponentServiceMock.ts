"use strict";

import * as TypeMoq from "typemoq";
import * as rand from "../lib/randstring";

import ComponentService from "../../src/backend/supply/ComponentService";
import IComponentService from "../../src/backend/supply/IComponentService";

import IComponentRequest from "../../src/backend/supply/interface/IComponentRequest";

const ComponentServiceMock: TypeMoq.IMock<IComponentService> = TypeMoq.Mock.ofInstance(ComponentService);

ComponentServiceMock.setup((service) => service.getComponents(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(async () => []);

ComponentServiceMock.setup((service) => service.createComponent(TypeMoq.It.isAny()))
    .returns(async () => ({
        id: Math.ceil(Math.random() * 100),
    }));

ComponentServiceMock.setup((service) => service.getComponent(TypeMoq.It.isAny()))
    .returns(async (id: number) => ({
        id,
        uuid: rand.generateUUID(),
        manufacturerPartNumber: rand.randomString(8),
        manufacturerId: rand.generateId(),
    }));

ComponentServiceMock.setup((service) => service.updateComponent(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(async (id: number, component: IComponentRequest) => ({
        id,
        uuid: rand.generateUUID(),
        manufacturerPartNumber: rand.randomString(8),
        manufacturerId: rand.generateId(),
    }));

ComponentServiceMock.setup((service) => service.deleteComponent(TypeMoq.It.isAny()))
    .returns(async (id: number) => undefined);

export default ComponentServiceMock;
