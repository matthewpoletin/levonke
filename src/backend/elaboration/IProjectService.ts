"use strict";

import IProjectRequest from "./interface/IProjectRequest";
import IProjectResponse from "./interface/IProjectResponse";
import IVersionResponse from "./interface/IVersionResponse";

export default interface IProjectService {
    getProjects(page: number, size: number): Promise<IProjectResponse[]>;
    createProject(projectRequest: IProjectRequest): Promise<{ id: number; }>;
    getProject(projectId: number): Promise<IProjectResponse>;
    updateProject(projectId: number, projectRequest: IProjectRequest): Promise<IProjectResponse>;
    deleteProject(projectId: number): Promise<void>;

    setTeam(projectId: number, teamId: number): Promise<void>;

    getVersions(projectId: number, page?: number, size?: number): Promise<IVersionResponse[]>;
    addVersion(projectId: number, versionId: number): Promise<void>;

}
