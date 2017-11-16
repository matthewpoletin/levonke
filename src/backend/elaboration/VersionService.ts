"use strict";

import * as rp from "request-promise";

import IComponentResponse from "../supply/interface/IComponentResponse";
import IProjectResponse from "./interface/IProjectResponse";
import IVersionRequest from "./interface/IVersionRequest";
import IVersionResponse from "./interface/IVersionResponse";

import IVersionService from "./IVersionService";

import getOptions from "./../../Options";

// TODO: make loaded from a text file
const elaborationServiceURL = "http://localhost:8443/api/elaboration";

class VersionService implements IVersionService {

    public async getVersions(page: number, size: number): Promise<IVersionResponse[]> {
        const options = getOptions(elaborationServiceURL, `/versions`, {page, size});
        return rp.get(options);
    }

    public async createVersion(versionRequest: IVersionRequest): Promise<{ id: number; }> {
        const options = getOptions(elaborationServiceURL, `/versions`, null, versionRequest);
        return rp.post(options);
    }

    public async getVersion(versionId: number): Promise<IVersionResponse> {
        const options = getOptions(elaborationServiceURL, `/versions/${versionId}`);
        return rp.get(options);
    }

    public async updateVersion(versionId: number, versionRequest: IVersionRequest): Promise<IVersionResponse> {
        const options = getOptions(elaborationServiceURL, `/versions/${versionId}`, null, versionRequest);
        return rp.patch(options);
    }

    public async deleteVersion(versionId: number): Promise<void> {
        const options = getOptions(elaborationServiceURL, `/versions/${versionId}`);
        return rp.delete(options);
    }

    public async getProject(versionId: number): Promise<IProjectResponse> {
        const options = getOptions(elaborationServiceURL, `/versions/${versionId}/projects`);
        return rp.get(options);
    }

    public async getComponents(versionId: number, page?: number, size?: number): Promise<IComponentResponse[]> {
        const options = getOptions(elaborationServiceURL, `/versions/${versionId}/components`);
        return rp.get(options);
    }

    public async addComponent(versionId: number, componentRequest: IComponentResponse): Promise<void> {
        const options = getOptions(elaborationServiceURL, `/versions/${versionId}/components`, null, componentRequest);
        return rp.post(options);
    }

    public async removeComponent(versionId: number, componentRequest: IComponentResponse): Promise<void> {
        const options = getOptions(elaborationServiceURL, `/versions/${versionId}/components`, null, componentRequest);
        return rp.delete(options);
    }

}

export default new VersionService();
