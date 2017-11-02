"use strict";

export default interface IProjectRequest {
    name?: string;
    description?: string;
    website?: string;
    // TODO: decide if team object will be used
    teamId: number;
}
