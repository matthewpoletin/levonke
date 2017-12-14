"use strict";

import IProjectResponse from "../elaboration/interface/IProjectResponse";
import IOrganizationResponse from "./interface/IOrganizationResponse";
import ITeamRequest from "./interface/ITeamRequest";
import ITeamResponse from "./interface/ITeamResponse";
import IUserResponse from "./interface/IUserResponse";

export default interface ITeamService {
    getTeams(page?: number, size?: number): Promise<ITeamResponse[]>;
    createTeam(teamRequest: ITeamRequest): Promise<{ id: number; }>;
    getTeamById(id: number): Promise<ITeamResponse>;
    getTeamByName(teamName: string): Promise<ITeamResponse>;
    updateTeamById(id: number, teamRequest: ITeamRequest): Promise<ITeamResponse>;
    deleteTeamById(id: number): Promise<void>;

    getUsers(teamId: number, page?: number, size?: number): Promise<number[]>;
    addUser(teamId: number, userId: number): Promise<void>;
    removeUser(teamId: number, userId: number): Promise<void>;

    getProjects(teamId: number, page?: number, size?: number): Promise<IProjectResponse[]>;
    getOrganization(teamId: number): Promise<IOrganizationResponse>;
}
