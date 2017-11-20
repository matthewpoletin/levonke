"use strict";

import * as TypeMoq from "typemoq";
import * as rand from "../lib/randstring";

import IManufacturerService from "../../src/backend/supply/IManufacturerService";
import ManufacturerService from "../../src/backend/supply/ManufacturerService";

import IManufacturerRequest from "../../src/backend/supply/interface/IManufacturerRequest";

const ManufacturerServiceMock: TypeMoq.IMock<IManufacturerService> = TypeMoq.Mock.ofInstance(ManufacturerService);

ManufacturerServiceMock.setup((service) => service.getManufacturers(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(async () => []);

ManufacturerServiceMock.setup((service) => service.createManufacturer(TypeMoq.It.isAny()))
    .returns(async () => ({
        id: Math.ceil(Math.random() * 100),
    }));

ManufacturerServiceMock.setup((service) => service.getManufacturer(TypeMoq.It.isAny()))
    .returns(async (id: number) => ({
        id,
        name: rand.randomStringAlpha(8),
        website: rand.generateLink(),
    }));

ManufacturerServiceMock.setup((service) => service.updateManufacturer(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(async (id: number, manufacturer: IManufacturerRequest) => ({
        id,
        name: rand.randomStringAlpha(8),
        website: rand.generateLink(),
    }));

ManufacturerServiceMock.setup((service) => service.deleteManufacturer(TypeMoq.It.isAny()))
    .returns(async (id: number) => undefined);

export default ManufacturerServiceMock;
