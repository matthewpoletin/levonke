"use strict";

import * as rp from "request-promise";

import IProjectResponse from "../elaboration/interface/IProjectResponse";
import IOrganizationResponse from "./interface/IOrganizationResponse";
import ITeamRequest from "./interface/ITeamRequest";
import ITeamResponse from "./interface/ITeamResponse";
import ITeamPaginated from "./interface/ITeamResponse";

import ITeamService from "./ITeamService";

import getOptions from "../../Options";

import config from "../../../IConfig";

const communityServiceURL = config.Services.Community.url + config.Services.Community.port + config.Services.Community.base;
const elaborationServiceURL = config.Services.Elaboration.url + config.Services.Elaboration.port + config.Services.Elaboration.base;

class TeamService implements ITeamService {

    public async getTeams(page?: number, size?: number): Promise<ITeamPaginated[]> {
        const options = getOptions(communityServiceURL, `/teams`, {page, size});
        return rp.get(options);
    }

    public async createTeam(teamRequest: ITeamRequest): Promise<{ id: number; }> {
        const options = getOptions(communityServiceURL, `/teams`, null, teamRequest);
        return rp.post(options);
    }

    public async getTeamById(teamId: number): Promise<ITeamResponse> {
        const options = getOptions(communityServiceURL, `/teams/${teamId}`);
        return rp.get(options);
    }

    public async getTeamBy(params): Promise<ITeamResponse> {
        const options = getOptions(communityServiceURL, `/teams/by`, params);
        return rp.get(options);
    }

    public async updateTeamById(teamId: number, teamRequest: ITeamRequest) {
        const options = getOptions(communityServiceURL, `/teams/${teamId}`, null, teamRequest);
        return rp.patch(options);
    }

    public async deleteTeamById(teamId: number): Promise<void> {
        const option = getOptions(communityServiceURL, `/teams/${teamId}`);
        return rp.delete(option);
    }

    public async addUser(teamId: number, userId: number): Promise<void> {
        const options = getOptions(communityServiceURL, `/teams/${teamId}/users/${userId}`);
        return rp.post(options);
    }

    public async getUsers(teamId: number, page?: number, size?: number): Promise<number[]> {
        const options = getOptions(communityServiceURL, `/teams/${teamId}/users`);
        return rp.get(options);
    }

    public async removeUser(teamId: number, userId: number): Promise<void> {
        const options = getOptions(communityServiceURL, `/teams/${teamId}/users/${userId}`);
        return rp.delete(options);
    }

    public async getProjects(teamId: number, page?: number, size?: number): Promise<IProjectResponse[]> {
        const options = getOptions(elaborationServiceURL, `/teams/${teamId}/projects`);
        return rp.get(options);
    }

    public async getOrganization(teamId: number): Promise<IOrganizationResponse> {
        const options = getOptions(communityServiceURL, `teams/${teamId}/organization`);
        return rp.get(options);
    }

}

export default new TeamService();
