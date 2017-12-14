"use strict";

import * as TypeMoq from "typemoq";
import * as rand from "../lib/randstring";

import ITeamService from "../../src/backend/community/ITeamService";
import TeamService from "../../src/backend/community/TeamService";

import ITeamRequest from "../../src/backend/community/interface/ITeamRequest";

const TeamServiceMock: TypeMoq.IMock<ITeamService> = TypeMoq.Mock.ofInstance(TeamService);

TeamServiceMock.setup((service) => service.getTeams(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(async () => []);

TeamServiceMock.setup((service) => service.createTeam(TypeMoq.It.isAny()))
    .returns(async () => ({
        id: Math.ceil(Math.random() * 100),
    }));

TeamServiceMock.setup((service) => service.getTeamById(TypeMoq.It.isAny()))
    .returns(async (id: number) => ({
        id,
        name: rand.randomStringAlpha(8),
        organizationId: rand.generateId(),
    }));

TeamServiceMock.setup((service) => service.updateTeamById(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(async (id: number, team: ITeamRequest) => ({
        id,
        name: rand.randomStringAlpha(8),
        organizationId: rand.generateId(),
    }));

TeamServiceMock.setup((service) => service.deleteTeamById(TypeMoq.It.isAny()))
    .returns(async (id: number) => undefined);

export default TeamServiceMock;
