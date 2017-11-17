"use strict";

import * as rp from "request-promise";

import IComponentRequest from "./interface/IComponentRequest";
import IComponentResponse from "./interface/IComponentResponse";

import IComponentService from "./IComponentService";

import getOptions from "./../../Options";

import config from "../../../IConfig";

const supplyServiceURL = config.Services.Supply.url + config.Services.Supply.port + config.Services.Supply.base;


class ComponentService implements IComponentService {

    public async getComponents(page: number, size: number): Promise<IComponentResponse[]> {
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
