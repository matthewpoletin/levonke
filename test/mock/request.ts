"use strict";

import * as Logger from "bunyan";
import {IncomingHttpHeaders} from "http";
import {Socket} from "net";
import * as restify from "restify";
import {RouteSpec} from "restify";
import {Readable} from "stream";
import {Url} from "url";

class RequestMock extends Readable implements restify.Request {
    public query?: any;
    public body?: any;
    public params?: any;
    public files?: { [name: string]: restify.RequestFileInterface; };
    public username?: string;
    public authorization?: restify.RequestAuthorization;
    public httpVersion: string;
    public httpVersionMajor: number;
    public httpVersionMinor: number;
    public connection: Socket;
    public headers: IncomingHttpHeaders;
    public rawHeaders: string[];
    public trailers: { [key: string]: string; };
    public rawTrailers: string[];

    public method?: string;
    public url?: string;
    public statusCode?: number;
    public statusMessage?: string;
    public socket: Socket;

    public log: Logger;

    public setTimeout(msecs: number, callback: () => void): this {
        throw new Error("Method not implemented.");
    }

    public destroy(error?: Error): void {
        throw new Error("Method not implemented.");
    }

    public accepts(types: string | string[]): boolean {
        throw new Error("Method not implemented.");
    }

    public acceptsEncoding(types: string | string[]): boolean {
        throw new Error("Method not implemented.");
    }

    public getContentLength(): number {
        throw new Error("Method not implemented.");
    }

    public contentLength(): number {
        throw new Error("Method not implemented.");
    }

    public getContentType(): string {
        throw new Error("Method not implemented.");
    }

    public contentType(): string {
        throw new Error("Method not implemented.");
    }

    public getHref(): string {
        throw new Error("Method not implemented.");
    }

    public href(): string {
        throw new Error("Method not implemented.");
    }

    public getId(): string {
        throw new Error("Method not implemented.");
    }

    public id(): string {
        throw new Error("Method not implemented.");
    }

    public getPath(): string {
        throw new Error("Method not implemented.");
    }

    public path(): string {
        throw new Error("Method not implemented.");
    }

    public getQuery(): string {
        throw new Error("Method not implemented.");
    }

    public time(): number {
        throw new Error("Method not implemented.");
    }

    public getUrl(): Url {
        throw new Error("Method not implemented.");
    }

    public getVersion(): string {
        throw new Error("Method not implemented.");
    }

    public version(): string {
        throw new Error("Method not implemented.");
    }

    public matchedVersion(): string {
        throw new Error("Method not implemented.");
    }

    public header(name: string, value?: string): string {
        throw new Error("Method not implemented.");
    }

    public trailer(name: string, value?: string): string {
        throw new Error("Method not implemented.");
    }

    public is(type: string): boolean {
        throw new Error("Method not implemented.");
    }

    public isChunked(): boolean {
        throw new Error("Method not implemented.");
    }

    public isKeepAlive(): boolean {
        throw new Error("Method not implemented.");
    }

    public isSecure(): boolean {
        throw new Error("Method not implemented.");
    }

    public isUpgradeRequest(): boolean {
        throw new Error("Method not implemented.");
    }

    public isUpload(): boolean {
        throw new Error("Method not implemented.");
    }

    public userAgent(): string {
        throw new Error("Method not implemented.");
    }

    public startHandlerTimer(handlerName: string): void {
    }

    public endHandlerTimer(handlerName: string): void {
    }

    public connectionState(): string {
        throw new Error("Method not implemented.");
    }

    public getRoute(): RouteSpec {
        throw new Error("Method not implemented.");
    }
}

export default class RequestMockExtensions extends RequestMock {

    public setParams(params: any): RequestMockExtensions {
        this.params = params;
        return this;
    }

    public setBody(body: any): RequestMockExtensions {
        this.body = body;
        return this;
    }

    public setQuery(query: any): RequestMockExtensions {
        this.query = query;
        return this;
    }

}
