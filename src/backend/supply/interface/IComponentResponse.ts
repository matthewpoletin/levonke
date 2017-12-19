"use strict";

import IPaginated from "../../IPaginated";

export default interface IComponentResponse {
    id?: number;
    uuid?: string;
    manufacturerPartNumber?: string;
    manufacturerId?: number;
}

export interface IComponentPaginated extends IPaginated {
    content: IComponentPaginated[];
}
