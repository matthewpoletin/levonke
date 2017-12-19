"use strict";

import IPaginated from "../../IPaginated";

export default interface ITeamResponse {
    id: number;
    name?: string;
    organizationId?: number;
}
export
interface ITeamPaginated extends IPaginated {
    content: ITeamResponse[];
}
