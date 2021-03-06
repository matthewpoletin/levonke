"use strict";

import IProjectResponse from "../elaboration/interface/IProjectResponse";
import IOrganizationResponse from "./interface/IOrganizationResponse";
import ITeamRequest from "./interface/ITeamRequest";
import ITeamResponse from "./interface/ITeamResponse";
import ITeamPaginated from "./interface/ITeamResponse";

export default interface ITeamService {
    getTeams(page?: number, size?: number, name?: string): Promise<ITeamPaginated>;
    createTeam(teamRequest: ITeamRequest): Promise<{ id: number; }>;
    getTeamById(id: number): Promise<ITeamResponse>;
    getTeamBy(params): Promise<ITeamResponse>;
    updateTeamById(id: number, teamRequest: ITeamRequest): Promise<ITeamResponse>;
    deleteTeamById(id: number): Promise<void>;

    getUsers(teamId: number, page?: number, size?: number): Promise<number[]>;
    addUser(teamId: number, userId: number): Promise<void>;
    removeUser(teamId: number, userId: number): Promise<void>;

    getProjects(teamId: number, page?: number, size?: number): Promise<IProjectResponse[]>;
    getOrganization(teamId: number): Promise<IOrganizationResponse>;
}
