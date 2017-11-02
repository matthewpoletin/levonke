"use strict";

import * as rp from "request-promise";

import IComponentRequest from "./interface/IComponentRequest";
import IComponentResponse from "./interface/IComponentResponse";

import IComponentService from "./IComponentService";

// TODO: make loaded from a text file
const apiUrl = "http://localhost:8442/api/community";

function getOptions(path, params?, body?) {
    return {
        body,
        json: true,
        qs: params,
        uri: apiUrl + path,
    };
}

class ComponentService implements IComponentService {

    public async getComponents(page: number): Promise<IComponentResponse[]> {
        const options = getOptions(`/components`, {page});
        return rp.get(options);
    }

    public async createComponent(componentRequest: IComponentRequest): Promise<{ id: number; }> {
        const options = getOptions(`/components`, null, componentRequest);
        return rp.post(options);
    }

    public async getComponent(componentId: number): Promise<IComponentResponse> {
        const options = getOptions(`/components/${componentId}`);
        return rp.get(options);
    }

    public async updateComponent(componentId: number, componentRequest: IComponentRequest): Promise<IComponentResponse> {
        const options = getOptions(`/components/${componentId}`, null, componentRequest);
        return rp.patch(options);
    }

    public async deleteComponent(componentId: number): Promise<void> {
        const options = getOptions(`/components/${componentId}`);
        return rp.delete(options);
    }

}

export default new ComponentService();
