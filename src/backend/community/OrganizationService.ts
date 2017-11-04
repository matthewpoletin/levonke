"use strict";

import * as rp from "request-promise";

import IOrganizationRequest from "./interface/IOrganizationRequest";
import IOrganizationResponse from "./interface/IOrganizationResponse";

import IOrganizationService from "./IOrganizationService";

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

class OrganizationService implements IOrganizationService {

    public async getOrganizations(page: number): Promise<IOrganizationResponse[]> {
        const options = getOptions(`/organizations`, {page});
        return rp.get(options);
    }

    public async createOrganization(organizationRequest: IOrganizationRequest): Promise<{ id: number; }> {
        const options = getOptions(`/organizations`, null, organizationRequest);
        return rp.post(options);
    }

    public async getOrganization(organizationId: number): Promise<IOrganizationResponse> {
        const options = getOptions(`/organizations/${organizationId}`);
        return rp.get(options);
    }

    public async updateOrganization(organizationId: number, organizationRequest: IOrganizationRequest): Promise<IOrganizationResponse> {
        const options = getOptions(`/organizations/${organizationId}`, null, organizationRequest);
        return rp.patch(options);
    }

    public async deleteOrganization(organizationId: number): Promise<void> {
        const options = getOptions(`/organizations/${organizationId}`);
        return rp.delete(options);
    }

}

export default new OrganizationService();
