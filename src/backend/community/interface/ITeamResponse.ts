"use strict";

export default interface ITeamResponse {
    id: number;
    name?: string;
    // TODO: check if organization interface can be used
    organizationId?: number;
}
