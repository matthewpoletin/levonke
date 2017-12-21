"use strict";

import IPaginated from "../../IPaginated";

export default interface IProjectResponse {
    id: number;
    name?: string;
    officialName?: string;
    description?: string;
    website?: string;
    teamId?: number;
}

export interface IProjectPaginated extends IPaginated {
    content: IProjectResponse[];
}
