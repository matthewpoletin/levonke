"use strict";

export default interface IOrganizationRequest {
    name?: string;
    officialName?: string;
    description?: string;
    pubEmail?: string;
    website?: string;
    ownerId?: number;
}
