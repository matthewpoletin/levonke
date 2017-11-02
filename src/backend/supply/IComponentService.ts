"use strict";

import IComponentRequest from "./interface/IComponentRequest";
import IComponentResponse from "./interface/IComponentResponse";

export default interface IComponentService {

    getComponents(page: number): Promise<IComponentResponse[]>;
    createComponent(componentRequest: IComponentRequest): Promise<{ id: number; }>;
    getComponent(componentId: number): Promise<IComponentResponse>;
    updateComponent(componentId: number, componentRequest: IComponentRequest): Promise<IComponentResponse>;
    deleteComponent(componentId: number): Promise<void>;

}
