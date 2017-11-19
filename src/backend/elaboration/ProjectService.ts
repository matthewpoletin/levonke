"use strict";

import * as rp from "request-promise";

import IProjectRequest from "./interface/IProjectRequest";
import IProjectResponse from "./interface/IProjectResponse";
import IVersionResponse from "./interface/IVersionResponse";

import IProjectService from "./IProjectService";

import getOptions from "../../Options";

import config from "../../../IConfig";

const elaborationServiceURL = config.Services.Elaboration.url + config.Services.Elaboration.port + config.Services.Elaboration.base;

class ProjectService implements IProjectService {

    public async getProjects(page: number, size: number): Promise<IProjectResponse[]> {
        const options = getOptions(elaborationServiceURL, `/projects`, {page, size});
        return rp.get(options);
    }

    public async createProject(projectRequest: IProjectRequest): Promise<IProjectResponse> {
        const options = getOptions(elaborationServiceURL, `/projects`, null, projectRequest);
        return rp.post(options);
    }

    public async getProject(projectId: number): Promise<IProjectResponse> {
        const options = getOptions(elaborationServiceURL, `/projects/${projectId}`);
        return rp.get(options);
    }

    public async updateProject(projectId: number, projectRequest: IProjectRequest): Promise<IProjectResponse> {
        const options = getOptions(elaborationServiceURL, `/projects/${projectId}`, null, projectRequest);
        return rp.patch(options);
    }

    public async deleteProject(projectId: number): Promise<void> {
        const options = getOptions(elaborationServiceURL, `/projects/${projectId}`);
        return rp.delete(options);
    }

    public async setTeam(projectId: number, teamId: number): Promise<IProjectResponse> {
        const options = getOptions(elaborationServiceURL, `/projects/${projectId}/teams/${teamId}`);
        return rp.post(options);
    }

    public async getVersions(projectId: number, page?: number, size?: number): Promise<IVersionResponse[]> {
        const options = getOptions(elaborationServiceURL, `/projects/${projectId}/versions/`);
        return rp.get(options);
    }

    public async addVersion(projectId: number, versionId: number): Promise<void> {
        const options = getOptions(elaborationServiceURL, `/projects/${projectId}/versions/${versionId}`);
        return rp.post(options);
    }

}

export default new ProjectService();
