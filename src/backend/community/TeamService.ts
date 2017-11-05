"use strict";

import * as rp from "request-promise";

import ITeamRequest from "./interface/ITeamRequest";
import ITeamResponse from "./interface/ITeamResponse";


import ITeamService from "./ITeamService";

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

class TeamService implements ITeamService {

    public async getTeams(page: number, size: number): Promise<ITeamResponse[]> {
        const options = getOptions(`/teams`, {page, size});
        return rp.get(options);
    }

    public async createTeam(teamRequest: ITeamRequest): Promise<{ id: number; }> {
        const options = getOptions(`teams`, null, teamRequest);
        return rp.post(options);
    }

    public async getTeam(teamId: number): Promise<ITeamResponse> {
        const options = getOptions(`/teams/${teamId}`);
        return rp.get(options);
    }

    public async updateTeam(teamId: number, teamRequest: ITeamRequest) {
        const options = getOptions(`/teams/${teamId}`, null, teamRequest);
        return rp.patch(options);
    }

    public async deleteTeam(teamId: number): Promise<void> {
        const option = getOptions(`/teams/${teamId}`);
        return rp.delete(option);
    }

}

export default new TeamService();
