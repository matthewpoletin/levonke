"use strict";

import IManufacturerRequest from "./interface/IManufacturerRequest";
import IManufacturerResponse from "./interface/IManufacturerResponse";

export default interface IManufacturerService {
    getManufacturers(page: number, size: number): Promise<IManufacturerResponse[]>;
    createManufacturer(manufacturerRequest: IManufacturerRequest): Promise<{ id: number; }>;
    getManufacturer(manufacturerId: number): Promise<IManufacturerResponse>;
    updateManufacturer(manufacturerId: number, manufacturerRequest: IManufacturerRequest): Promise<IManufacturerResponse>;
    deleteManufacturer(manufacturerId: number): Promise<void>;

    getComponents(manufacturerId: number, page?: number, size?: number): Promise<void>;
    addComponent(manufacturerId: number, componentId: number): Promise<void>;
}
