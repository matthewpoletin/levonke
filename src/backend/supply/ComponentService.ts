"use strict";

import IComponentRequest from "./interface/IComponentRequest";
import IComponentResponse from "./interface/IComponentResponse";
import IComponentPaginated from "./interface/IComponentResponse";

import IComponentService from "./IComponentService";

import getOptions from "./../../Options";

import config from "../../../IConfig";

import requestWrapper from "../authrequest";
const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const supplyServiceURL = config.Services.Supply.url + config.Services.Supply.port + config.Services.Supply.base;

class ComponentService implements IComponentService {

    public async getComponents(page: number, size: number): Promise<IComponentPaginated[]> {
        const options = getOptions(supplyServiceURL, `/components`, {page, size});
        return rp.get(options);
    }

    public async createComponent(componentRequest: IComponentRequest): Promise<{ id: number; }> {
        const options = getOptions(supplyServiceURL, `/components`, null, componentRequest);
        return rp.post(options);
    }

    public async getComponent(componentId: number): Promise<IComponentResponse> {
        const options = getOptions(supplyServiceURL, `/components/${componentId}`);
        return rp.get(options);
    }

    public async getComponentByUUID(componentUUID: string): Promise<IComponentResponse> {
        const options = getOptions(supplyServiceURL, `/component`, {uuid: componentUUID});
        return rp.get(options);
    }

    public async updateComponent(componentId: number, componentRequest: IComponentRequest): Promise<IComponentResponse> {
        const options = getOptions(supplyServiceURL, `/components/${componentId}`, null, componentRequest);
        return rp.patch(options);
    }

    public async deleteComponent(componentId: number): Promise<void> {
        const options = getOptions(supplyServiceURL, `/components/${componentId}`);
        return rp.delete(options);
    }

}

export default new ComponentService();
