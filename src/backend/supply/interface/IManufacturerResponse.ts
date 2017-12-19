"use strict";

import IPaginated from "../../IPaginated";

export default interface IManufacturerResponse {
    id: number;
    name?: string;
    description?: string;
    website?: string;
}

export interface IManufacturerPaginated extends IPaginated {
    content: IManufacturerResponse[];
}
