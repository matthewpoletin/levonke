"use strict";

import * as rp from "request-promise";

import IVersionRequest from "./interface/IVersionRequest";
import IVersionResponse from "./interface/IVersionResponse";

import IVersionService from "./IVersionService";

// TODO: make loaded from a text file
const apiUrl = "http://localhost:8443/api/elaboration";

function getOptions(path, params?, body?) {
    return {
        body,
        json: true,
        qs: params,
        uri: apiUrl + path,
    };
}

class VersionService implements IVersionService {

    public async getVersions(page: number, size: number): Promise<IVersionResponse[]> {
        const options = getOptions(`/versions`, {page, size});
        return rp.get(options);
    }

    public async createVersion(versionRequest: IVersionRequest): Promise<{ id: number; }> {
        const options = getOptions(`/versions`, null, versionRequest);
        return rp.post(options);
    }

    public async getVersion(versionId: number): Promise<IVersionResponse> {
        const options = getOptions(`/versions/${versionId}`);
        return rp.get(options);
    }

    public async updateVersion(versionId: number, versionRequest: IVersionRequest): Promise<IVersionResponse> {
        const options = getOptions(`/versions/${versionId}`, null, versionRequest);
        return rp.patch(options);
    }

    public async deleteVersion(versionId: number): Promise<void> {
        const options = getOptions(`/versions/${versionId}`);
        return rp.delete(options);
    }

}

export default new VersionService();
