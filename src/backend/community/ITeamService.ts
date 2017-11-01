"use strict";

import ITeamRequest from "./interface/ITeamRequest";
import ITeamResponse from "./interface/ITeamResponse";

export default interface ITeamService {

    getTeams(page: number): Promise<ITeamResponse[]>;
    createTeam(teamRequest: ITeamRequest): Promise<{ id: number; }>;
    getTeam(id: number): Promise<ITeamResponse>;
    updateTeam(id: number, teamRequest: ITeamRequest): Promise<ITeamResponse>;
    deleteTeam(id: number): Promise<void>;

}
