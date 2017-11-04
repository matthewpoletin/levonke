"use strict";

import IOrganizationRequest from "./interface/IOrganizationRequest";
import IOrganizationResponse from "./interface/IOrganizationResponse";

export default interface IOrganizationService {

    getOrganizations(page: number): Promise<IOrganizationResponse[]>;
    createOrganization(organizationRequest: IOrganizationRequest): Promise<{ id: number; }>;
    getOrganization(organizationId: number): Promise<IOrganizationResponse>;
    updateOrganization(organizationId: number, organizationRequest: IOrganizationRequest): Promise<IOrganizationResponse>;
    deleteOrganization(organizationId: number): Promise<void>;

}
