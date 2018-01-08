"use strict";

import IOrganizationRequest from "./interface/IOrganizationRequest";
import IOrganizationResponse from "./interface/IOrganizationResponse";
import IOrganizationPaginated from "./interface/IOrganizationResponse";
import ITeamResponse from "./interface/ITeamResponse";
import IUserResponse from "./interface/IUserResponse";

export default interface IOrganizationService {
    getOrganizations(page: number, size: number, name: string): Promise<IOrganizationPaginated>;
    createOrganization(organizationRequest: IOrganizationRequest): Promise<{ id: number; }>;
    getOrganizationById(organizationId: number): Promise<IOrganizationResponse>;
    getOrganizationBy(params): Promise<IOrganizationResponse>;
    updateOrganizationById(organizationId: number, organizationRequest: IOrganizationRequest): Promise<IOrganizationResponse>;
    deleteOrganizationById(organizationId: number): Promise<void>;

    setOwner(organizationId: number, userId: number): Promise<void>;
    getOwner(organizationId: number): Promise<IUserResponse>;

    getTeams(organizationId: number): Promise<ITeamResponse[]>;
    addTeam(organizationId: number, teamId: number): Promise<void>;
}
