"use strict";

export default interface ITeamRequest {
    name?: string;
    // TODO: check if organization interface can be used
    organizationId: string;
}