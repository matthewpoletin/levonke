"use strict";

import IProjectRequest from "./interface/IProjectRequest";
import IProjectResponse from "./interface/IProjectResponse";

export default interface IProjectService {

    getProjects(page: number): Promise<IProjectResponse[]>;
    createProject(projectRequest: IProjectRequest): Promise<{ id: number; }>;
    getProject(projectId: number): Promise<IProjectResponse>;
    updateProject(projectId: number, projectRequest: IProjectRequest): Promise<IProjectResponse>;
    deleteProject(projectId: number): Promise<void>;

}
