"use strict";

import IPaginated from "../../IPaginated";

export default interface IOrganizationResponse {
    id: number;
    name?: string;
    officialName?: string;
    description?: string;
    pubEmail?: string;
    website?: string;
    ownerId?: number;
}

export interface IOrganizationPaginated extends IPaginated {
    content: IOrganizationResponse[];
}
