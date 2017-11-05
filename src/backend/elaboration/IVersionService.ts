"use strict";

import IVersionRequest from "./interface/IVersionRequest";
import IVersionResponse from "./interface/IVersionResponse";

export default interface IVersionService {
    getVersions(page: number, size: number): Promise<IVersionResponse[]>;
    createVersion(versionRequest: IVersionRequest): Promise<{ id: number; }>;
    getVersion(versionId: number): Promise<IVersionResponse>;
    updateVersion(versionId: number, versionRequest: IVersionRequest): Promise<IVersionResponse>;
    deleteVersion(versionId: number): Promise<void>;
}
