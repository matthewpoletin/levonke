"use strict";

import * as rp from "request-promise";

import IComponentResponse from "../supply/interface/IComponentResponse";
import IProjectResponse from "./interface/IProjectResponse";
import IVersionRequest from "./interface/IVersionRequest";
import IVersionResponse from "./interface/IVersionResponse";

import IVersionService from "./IVersionService";

import getOptions from "./../../Options";

import config from "../../../IConfig";

import * as queue from "../../queue/queue";
import * as queueRepository from "../../queue/repository";

const elaborationServiceURL = config.Services.Elaboration.url + config.Services.Elaboration.port + config.Services.Elaboration.base;

class VersionService implements IVersionService {

    public queueCounter = 0;

    constructor() {
        queue.activate("addComponent");
    }

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
        this.queueCounter++;
        const options = getOptions(elaborationServiceURL, `/versions/${versionId}/components`, null, componentRequest);
        try {
            const response = await rp.post(options);
            console.log("BackendResponse: " + JSON.stringify(response));
            return response;
        } catch (error) {
            console.log("BackendNoResponse");
            if (!error.statusCode || error.statusCode.toString()[0] === "5") {
                await queueRepository.pushBack(options, "addComponent");
            } else {
                return error.statusCode;
            }
        }
    }

    public async removeComponent(versionId: number, componentRequest: IComponentResponse): Promise<void> {
        const options = getOptions(elaborationServiceURL, `/versions/${versionId}/components`, null, componentRequest);
        return rp.delete(options);
    }

}

export default new VersionService();
