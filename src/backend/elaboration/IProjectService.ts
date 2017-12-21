"use strict";

import IProjectRequest from "./interface/IProjectRequest";
import IProjectResponse from "./interface/IProjectResponse";
import IProjectPaginated from "./interface/IProjectResponse";
import IVersionResponse from "./interface/IVersionResponse";

export default interface IProjectService {
    getProjects(page?: number, size?: number, name?: string): Promise<IProjectPaginated>;
    createProject(projectRequest: IProjectRequest): Promise<IProjectResponse>;
    getProjectById(projectId: number): Promise<IProjectResponse>;
    getProjectBy(name: string): Promise<IProjectResponse>;
    updateProjectById(projectId: number, projectRequest: IProjectRequest): Promise<IProjectResponse>;
    deleteProjectById(projectId: number): Promise<void>;

    setTeam(projectId: number, teamId: number): Promise<IProjectResponse>;

    getVersions(projectId: number, page?: number, size?: number): Promise<IVersionResponse[]>;
    addVersion(projectId: number, versionId: number): Promise<void>;

}
