"use strict";

import IOrganizationRequest from "./interface/IOrganizationRequest";
import IOrganizationResponse from "./interface/IOrganizationResponse";
import ITeamResponse from "./interface/ITeamResponse";
import IUserResponse from "./interface/IUserResponse";

export default interface IOrganizationService {
    getOrganizations(page: number, size: number): Promise<IOrganizationResponse[]>;
    createOrganization(organizationRequest: IOrganizationRequest): Promise<{ id: number; }>;
    getOrganization(organizationId: number): Promise<IOrganizationResponse>;
    updateOrganization(organizationId: number, organizationRequest: IOrganizationRequest): Promise<IOrganizationResponse>;
    deleteOrganization(organizationId: number): Promise<void>;

    setOwner(organizationId: number, userId: number): Promise<void>;
    getOwner(organizationId: number): Promise<IUserResponse>;

    getTeams(organizationId: number): Promise<ITeamResponse[]>;
    addTeam(organizationId: number, teamId: number): Promise<void>;
    removeTeam(organizationId: number, teamId: number): Promise<void>;
}
