"use strict";

import IProjectRequest from "./interface/IProjectRequest";
import IProjectResponse from "./interface/IProjectResponse";
import IProjectPaginated from "./interface/IProjectResponse";
import IVersionResponse from "./interface/IVersionResponse";

import IProjectService from "./IProjectService";

import getOptions from "../../Options";

import config from "../../../IConfig";

import requestWrapper from "../authrequest";
const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const elaborationServiceURL = config.Services.Elaboration.url + config.Services.Elaboration.port + config.Services.Elaboration.base;

class ProjectService implements IProjectService {

    public async getProjects(page?: number, size?: number, name?: string): Promise<IProjectPaginated> {
        const options = getOptions(elaborationServiceURL, `/projects`, {page, size, name});
        return rp.get(options);
    }

    public async createProject(projectRequest: IProjectRequest): Promise<IProjectResponse> {
        const options = getOptions(elaborationServiceURL, `/projects`, null, projectRequest);
        return rp.post(options);
    }

    public async getProjectById(projectId: number): Promise<IProjectResponse> {
        const options = getOptions(elaborationServiceURL, `/projects/${projectId}`);
        return rp.get(options);
    }

    public async getProjectBy(name: string): Promise<IProjectResponse> {
        const options = getOptions(elaborationServiceURL, `/projects/by`, {name});
        return rp.get(options);
    }

    public async updateProjectById(projectId: number, projectRequest: IProjectRequest): Promise<IProjectResponse> {
        const options = getOptions(elaborationServiceURL, `/projects/${projectId}`, null, projectRequest);
        return rp.patch(options);
    }

    public async deleteProjectById(projectId: number): Promise<void> {
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
