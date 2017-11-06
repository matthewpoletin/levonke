"use strict";

export default interface IProjectRequest {
    id: number;
    name?: string;
    description?: string;
    website?: string;
    teamId?: number;
}
