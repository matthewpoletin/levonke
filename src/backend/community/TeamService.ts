"use strict";

import * as rp from "request-promise";

import IProjectResponse from "../elaboration/interface/IProjectResponse";
import IOrganizationResponse from "./interface/IOrganizationResponse";
import ITeamRequest from "./interface/ITeamRequest";
import ITeamResponse from "./interface/ITeamResponse";
import IUserResponse from "./interface/IUserResponse";

import ITeamService from "./ITeamService";

import getOptions from "../../Options";

// TODO: make loaded from a text file
const communityServiceURL = "http://localhost:8442/api/community";
const elaborationServiceURL = "http://localhost:8443/api/elaboration";

class TeamService implements ITeamService {

    public async getTeams(page?: number, size?: number): Promise<ITeamResponse[]> {
        const options = getOptions(communityServiceURL, `/teams`, {page, size});
        return rp.get(options);
    }

    public async createTeam(teamRequest: ITeamRequest): Promise<{ id: number; }> {
        const options = getOptions(communityServiceURL, `teams`, null, teamRequest);
        return rp.post(options);
    }

    public async getTeam(teamId: number): Promise<ITeamResponse> {
        const options = getOptions(communityServiceURL, `/teams/${teamId}`);
        return rp.get(options);
    }

    public async updateTeam(teamId: number, teamRequest: ITeamRequest) {
        const options = getOptions(communityServiceURL, `/teams/${teamId}`, null, teamRequest);
        return rp.patch(options);
    }

    public async deleteTeam(teamId: number): Promise<void> {
        const option = getOptions(communityServiceURL, `/teams/${teamId}`);
        return rp.delete(option);
    }

    public async addUser(teamId: number, userId: number): Promise<void> {
        const options = getOptions(communityServiceURL, `/teams/${teamId}/users/${userId}`);
        return rp.post(options);
    }

    public async getUsers(teamId: number, page?: number, size?: number): Promise<IUserResponse[]> {
        const options = getOptions(communityServiceURL, `/teams/teamId}/users`);
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
