"use strict";

import IComponentResponse from "../../supply/interface/IComponentResponse";

export default interface IVersionResponse {
    id: number;
    major?: number;
    projectId?: number;
    components?: IComponentResponse[];
}
