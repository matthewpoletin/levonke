"use strict";

export default interface IProjectRequest {
    id: number;
    name?: string;
    description?: string;
    website?: string;
    // TODO: decide if team object will be used
    teamId: number;
}
