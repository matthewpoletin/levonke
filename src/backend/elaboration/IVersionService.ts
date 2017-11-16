"use strict";

import IComponentResponse from "../supply/interface/IComponentResponse";
import IProjectResponse from "./interface/IProjectResponse";
import IVersionRequest from "./interface/IVersionRequest";
import IVersionResponse from "./interface/IVersionResponse";

export default interface IVersionService {
    getVersions(page?: number, size?: number): Promise<IVersionResponse[]>;
    createVersion(versionRequest: IVersionRequest): Promise<{ id: number; }>;
    getVersion(versionId: number): Promise<IVersionResponse>;
    updateVersion(versionId: number, versionRequest: IVersionRequest): Promise<IVersionResponse>;
    deleteVersion(versionId: number): Promise<void>;

    getProject(versionId: number): Promise<IProjectResponse>;

    getComponents(versionId: number, page?: number, size?: number): Promise<IComponentResponse[]>;
    addComponent(versionId: number, componentRequest: IComponentResponse): Promise<void>;
    removeComponent(versionId: number, componentRequest: IComponentResponse): Promise<void>;
}
