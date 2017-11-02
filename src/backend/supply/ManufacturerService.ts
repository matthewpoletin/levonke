"use strict";

import * as rp from "request-promise";

import IManufacturerRequest from "./interface/IManufacturerRequest";
import IManufacturerResponse from "./interface/IManufacturerResponse";

import IManufacturerService from "./IManufacturerService";

// TODO: make loaded from a text file
const apiUrl = "http://localhost:8444/api/supply";

function getOptions(path, params?, body?) {
    return {
        body,
        json: true,
        qs: params,
        uri: apiUrl + path,
    };
}

class ManufacturerService implements IManufacturerService {

    public async getManufacturers(page: number): Promise<IManufacturerResponse[]> {
        const options = getOptions(`/manufacturers`, {page});
        return rp.get(options);
    }

    public async createManufacturer(manufacturerRequest: IManufacturerRequest): Promise<{ id: number; }> {
        const options = getOptions(`/manufacturers`, null, manufacturerRequest);
        return rp.post(options);
    }

    public async getManufacturer(manufacturerId: number): Promise<IManufacturerResponse> {
        const options = getOptions(`/manufacturers/${manufacturerId}`);
        return rp.get(options);
    }

    public async updateManufacturer(manufacturerId: number, manufacturerRequest: IManufacturerRequest): Promise<IManufacturerResponse> {
        const options = getOptions(`/manufacturers/${manufacturerId}`, null, manufacturerRequest);
        return rp.patch(options);
    }

    public async deleteManufacturer(manufacturerId: number): Promise<void> {
        const options = getOptions(`/manufacturers/${manufacturerId}`);
        return rp.delete(options);
    }

}

export default new ManufacturerService();
