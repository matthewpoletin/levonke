"use strict";

import IManufacturerRequest from "./interface/IManufacturerRequest";
import IManufacturerResponse from "./interface/IManufacturerResponse";

export default interface IManufacturerService {

    getManufacturers(page: number): Promise<IManufacturerResponse[]>;
    createManufacturer(manufacturerRequest: IManufacturerRequest): Promise<{ id: number; }>;
    getManufacturer(manufacturerId: number): Promise<IManufacturerResponse>;
    updateManufacturer(manufacturerId: number, manufacturerRequest: IManufacturerRequest): Promise<IManufacturerResponse>;
    deleteManufacturer(manufacturerId: number): Promise<void>;

}
