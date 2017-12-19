"use strict";

import IComponentPaginated from "./interface/IComponentResponse";
import IManufacturerRequest from "./interface/IManufacturerRequest";
import IManufacturerResponse from "./interface/IManufacturerResponse";
import IManufacturerPaginated from "./interface/IManufacturerResponse";

export default interface IManufacturerService {
    getManufacturers(page: number, size: number): Promise<IManufacturerPaginated[]>;
    createManufacturer(manufacturerRequest: IManufacturerRequest): Promise<{ id: number; }>;
    getManufacturerById(manufacturerId: number): Promise<IManufacturerResponse>;
    updateManufacturerById(manufacturerId: number, manufacturerRequest: IManufacturerRequest): Promise<IManufacturerResponse>;
    deleteManufacturerById(manufacturerId: number): Promise<void>;

    getComponents(manufacturerId: number, page?: number, size?: number): Promise<IComponentPaginated[]>;
    addComponent(manufacturerId: number, componentId: number): Promise<void>;
}
