"use strict";

import * as rp from "request-promise";

import IManufacturerRequest from "./interface/IManufacturerRequest";
import IManufacturerResponse from "./interface/IManufacturerResponse";

import IManufacturerService from "./IManufacturerService";

import getOptions from "./../../Options";

// TODO: make loaded from a text file
const supplyServiceURL = "http://localhost:8444/api/supply";

class ManufacturerService implements IManufacturerService {

    public async getManufacturers(page?: number, size?: number): Promise<IManufacturerResponse[]> {
        const options = getOptions(supplyServiceURL, `/manufacturers`, {page, size});
        return rp.get(options);
    }

    public async createManufacturer(manufacturerRequest: IManufacturerRequest): Promise<{ id: number; }> {
        const options = getOptions(supplyServiceURL, `/manufacturers`, null, manufacturerRequest);
        return rp.post(options);
    }

    public async getManufacturer(manufacturerId: number): Promise<IManufacturerResponse> {
        const options = getOptions(supplyServiceURL, `/manufacturers/${manufacturerId}`);
        return rp.get(options);
    }

    public async updateManufacturer(manufacturerId: number, manufacturerRequest: IManufacturerRequest): Promise<IManufacturerResponse> {
        const options = getOptions(supplyServiceURL, `/manufacturers/${manufacturerId}`, null, manufacturerRequest);
        return rp.patch(options);
    }

    public async deleteManufacturer(manufacturerId: number): Promise<void> {
        const options = getOptions(supplyServiceURL, `/manufacturers/${manufacturerId}`);
        return rp.delete(options);
    }

    public async getComponents(manufacturerId: number, page?: number, size?: number): Promise<void> {
        const options = getOptions(supplyServiceURL, `/manufacturers/${manufacturerId}/components`);
        return rp.get(options);
    }


    public async addComponent(manufacturerId: number, componentId: number): Promise<void> {
        const options = getOptions(supplyServiceURL, `/manufacturers/${manufacturerId}/components/${componentId}`);
        return rp.get(options);
    }

}

export default new ManufacturerService();
