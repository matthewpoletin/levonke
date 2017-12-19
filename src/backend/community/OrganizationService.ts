"use strict";

import * as rp from "request-promise";

import IOrganizationRequest from "./interface/IOrganizationRequest";
import IOrganizationResponse from "./interface/IOrganizationResponse";
import IOrganizationPaginated from "./interface/IOrganizationResponse";
import IUserResponse from "./interface/IUserResponse";

import IOrganizationService from "./IOrganizationService";

import getOptions from "../../Options";
import ITeamResponse from "./interface/ITeamResponse";

import config from "../../../IConfig";

const communityServiceURL = config.Services.Community.url + config.Services.Community.port + config.Services.Community.base;

class OrganizationService implements IOrganizationService {

    public async getOrganizations(page: number, size: number): Promise<IOrganizationPaginated[]> {
        const options = getOptions(communityServiceURL, `/organizations`, {page, size});
        return rp.get(options);
    }

    public async createOrganization(organizationRequest: IOrganizationRequest): Promise<{ id: number; }> {
        const options = getOptions(communityServiceURL, `/organizations`, null, organizationRequest);
        return rp.post(options);
    }

    public async getOrganizationById(organizationId: number): Promise<IOrganizationResponse> {
        const options = getOptions(communityServiceURL, `/organizations/${organizationId}`);
        return rp.get(options);
    }

    public async getOrganizationBy(params): Promise<IOrganizationResponse> {
        const options = getOptions(communityServiceURL, `/organizations/by`, params);
        return rp.get(options);
    }

    public async updateOrganizationById(organizationId: number, organizationRequest: IOrganizationRequest): Promise<IOrganizationResponse> {
        const options = getOptions(`/organizations/${organizationId}`, null, organizationRequest);
        return rp.patch(options);
    }

    public async deleteOrganizationById(organizationId: number): Promise<void> {
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
