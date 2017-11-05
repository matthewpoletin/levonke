"use strict";

import * as rp from "request-promise";

import IProjectRequest from "./interface/IProjectRequest";
import IProjectResponse from "./interface/IProjectResponse";

import IProjectService from "./IProjectService";

// TODO: make loaded from a text file
const apiUrl = "http://localhost:8443/api/elaboration";

// TODO: make common for all services
function getOptions(path, params?, body?) {
    return {
        body,
        json: true,
        qs: params,
        uri: apiUrl + path,
    };
}

// TODO: set base uri for 'projects'
class ProjectService implements IProjectService {

    public async getProjects(page: number, size: number): Promise<IProjectResponse[]> {
        const options = getOptions(`/projects`, {page, size});
        return rp.get(options);
    }

    public async createProject(projectRequest: IProjectRequest): Promise<{ id: number; }> {
        const options = getOptions(`/projects`, null, projectRequest);
        return rp.post(options);
    }

    public async getProject(projectId: number): Promise<IProjectResponse> {
        const options = getOptions(`/projects/${projectId}`);
        return rp.get(options);
    }

    public async updateProject(projectId: number, projectRequest: IProjectRequest): Promise<IProjectResponse> {
        const options = getOptions(`/projects/${projectId}`, null, projectRequest);
        return rp.patch(options);
    }

    public async deleteProject(projectId: number): Promise<void> {
        const options = getOptions(`/projects/${projectId}`);
        return rp.delete(options);
    }

}

export default new ProjectService();
