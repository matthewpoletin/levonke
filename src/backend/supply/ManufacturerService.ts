"use strict";

import IComponentPaginated from "./interface/IComponentResponse";
import IManufacturerRequest from "./interface/IManufacturerRequest";
import IManufacturerResponse from "./interface/IManufacturerResponse";
import IManufacturerPaginated from "./interface/IManufacturerResponse";

import IManufacturerService from "./IManufacturerService";

import getOptions from "./../../Options";

import config from "../../../IConfig";

import requestWrapper from "../authrequest";
const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const supplyServiceURL = config.Services.Supply.url + config.Services.Supply.port + config.Services.Supply.base;


class ManufacturerService implements IManufacturerService {

    public async getManufacturers(page: number, size: number): Promise<IManufacturerPaginated[]> {
        const options = getOptions(supplyServiceURL, `/manufacturers`, {page, size});
        return rp.get(options);
    }

    public async createManufacturer(manufacturerRequest: IManufacturerRequest): Promise<{ id: number; }> {
        const options = getOptions(supplyServiceURL, `/manufacturers`, null, manufacturerRequest);
        return rp.post(options);
    }

    public async getManufacturerById(manufacturerId: number): Promise<IManufacturerResponse> {
        const options = getOptions(supplyServiceURL, `/manufacturers/${manufacturerId}`);
        return rp.get(options);
    }

    public async updateManufacturerById(manufacturerId: number, manufacturerRequest: IManufacturerRequest): Promise<IManufacturerResponse> {
        const options = getOptions(supplyServiceURL, `/manufacturers/${manufacturerId}`, null, manufacturerRequest);
        return rp.patch(options);
    }

    public async deleteManufacturerById(manufacturerId: number): Promise<void> {
        const options = getOptions(supplyServiceURL, `/manufacturers/${manufacturerId}`);
        return rp.delete(options);
    }

    public async getComponents(manufacturerId: number, page?: number, size?: number): Promise<IComponentPaginated[]> {
        const options = getOptions(supplyServiceURL, `/manufacturers/${manufacturerId}/components`);
        return rp.get(options);
    }


    public async addComponent(manufacturerId: number, componentId: number): Promise<void> {
        const options = getOptions(supplyServiceURL, `/manufacturers/${manufacturerId}/components/${componentId}`);
        return rp.get(options);
    }

}

export default new ManufacturerService();
