"use strict";

import * as TypeMoq from "typemoq";
import * as rand from "../lib/randstring";

import IProjectService from "../../src/backend/elaboration/IProjectService";
import ProjectService from "../../src/backend/elaboration/ProjectService";

import IProjectRequest from "../../src/backend/elaboration/interface/IProjectRequest";

const ProjectServiceMock: TypeMoq.IMock<IProjectService> = TypeMoq.Mock.ofInstance(ProjectService);

ProjectServiceMock.setup((service) => service.getProjects(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(async () => []);

ProjectServiceMock.setup((service) => service.createProject(TypeMoq.It.isAny()))
    .returns(async () => ({
        id: Math.ceil(Math.random() * 100),
    }));

ProjectServiceMock.setup((service) => service.getProjectById(TypeMoq.It.isAny()))
    .returns(async (id: number) => ({
        id,
        name: rand.randomStringAlpha(8),
        description: rand.randomStringAlpha(8),
        website: rand.generateLink(),
        teamId: rand.generateId(),
    }));

ProjectServiceMock.setup((service) => service.updateProjectById(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(async (id: number, project: IProjectRequest) => ({
        id,
        name: rand.randomStringAlpha(8),
        description: rand.randomStringAlpha(8),
        website: rand.generateLink(),
        teamId: rand.generateId(),
    }));

ProjectServiceMock.setup((service) => service.deleteProjectById(TypeMoq.It.isAny()))
    .returns(async (id: number) => undefined);

export default ProjectServiceMock;
