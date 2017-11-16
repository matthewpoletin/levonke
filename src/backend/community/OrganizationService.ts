"use strict";

import * as rp from "request-promise";

import IOrganizationRequest from "./interface/IOrganizationRequest";
import IOrganizationResponse from "./interface/IOrganizationResponse";
import IUserResponse from "./interface/IUserResponse";

import IOrganizationService from "./IOrganizationService";

import getOptions from "../../Options";
import ITeamResponse from "./interface/ITeamResponse";

// TODO: make loaded from a text file
const communityServiceURL = "http://localhost:8442/api/community";

class OrganizationService implements IOrganizationService {

    public async getOrganizations(page: number, size: number): Promise<IOrganizationResponse[]> {
        const options = getOptions(communityServiceURL, `/organizations`, {page, size});
        return rp.get(options);
    }

    public async createOrganization(organizationRequest: IOrganizationRequest): Promise<{ id: number; }> {
        const options = getOptions(communityServiceURL, `/organizations`, null, organizationRequest);
        return rp.post(options);
    }

    public async getOrganization(organizationId: number): Promise<IOrganizationResponse> {
        const options = getOptions(communityServiceURL, `/organizations/${organizationId}`);
        return rp.get(options);
    }

    public async updateOrganization(organizationId: number, organizationRequest: IOrganizationRequest): Promise<IOrganizationResponse> {
        const options = getOptions(`/organizations/${organizationId}`, null, organizationRequest);
        return rp.patch(options);
    }

    public async deleteOrganization(organizationId: number): Promise<void> {
        const options = getOptions(communityServiceURL, `/organizations/${organizationId}`);
        return rp.delete(options);
    }

    public async setOwner(organizationId: number, userId: number): Promise<void> {
        const options = getOptions(communityServiceURL, `/organizations/${organizationId}/owner/${userId}`);
        return rp.post(options);
    }

    public async getOwner(organizationId: number): Promise<IUserResponse> {
        const options = getOptions(communityServiceURL, `/organizations/${organizationId}/owner`);
        return rp.get(options);
    }

    public async getTeams(organizationId: number): Promise<ITeamResponse[]> {
        const options = getOptions(communityServiceURL, `/organizations/${organizationId}/teams`);
        return rp.get(options);
    }

    public async addTeam(organizationId: number, teamId: number): Promise<void> {
        const options = getOptions(communityServiceURL, `/organizations/${organizationId}/teams/${teamId}`);
        return rp.post(options);
    }

    public async removeTeam(organizationId: number, teamId: number): Promise<void> {
        const options = getOptions(communityServiceURL, `/organizations/${organizationId}/teams/${teamId}`);
        return rp.delete(options);
    }

}

export default new OrganizationService();
