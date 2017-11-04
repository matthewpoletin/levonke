"use strict";

export default interface IOrganizationResponse {
    id: number;
    name?: string;
    description?: string;
    pubEmail?: string;
    website?: string;
    ownerId?: number;
}
