"use strict";

import IPaginated from "../../IPaginated";

import IComponentResponse from "../../supply/interface/IComponentResponse";

export default interface IVersionResponse {
    id: number;
    major?: number;
    projectId?: number;
    components?: IComponentResponse[];
}

export interface IVersionPaginated extends IPaginated {
    content: IVersionResponse[];
}
