"use strict";

export default interface IOrganizationRequest {
    name?: string;
    description?: string;
    pubEmail?: string;
    website?: string;
    ownerId?: number;
}
