"use strict";

export default interface IOrganizationResponse {
    id: number;
    name?: string;
    officialName?: string;
    description?: string;
    pubEmail?: string;
    website?: string;
    ownerId?: number;
}
