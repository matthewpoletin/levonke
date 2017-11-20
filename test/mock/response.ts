"use strict";

import {Writable} from "stream";

import {OutgoingHttpHeaders} from "http";
import {Socket} from "net";
import * as restify from "restify";

class ResponseMock extends Writable implements restify.Response {
    public headers: any;

    public code: number;
    public contentLength: number;
    public contentType: string;
    public id: string;
    public statusCode: number;
    public statusMessage: string;

    public upgrading: boolean;
    public chunkedEncoding: boolean;
    public shouldKeepAlive: boolean;
    public useChunkedEncodingByDefault: boolean;
    public sendDate: boolean;
    public finished: boolean;
    public headersSent: boolean;
    public connection: Socket;

    public cache(type: string, options?: restify.CacheOptions): string;
    public cache(options?: restify.CacheOptions): string;
    public cache(type?: any, options?: any): string {
        throw new Error("Method not implemented.");
    }

    public noCache(): restify.Response {
        throw new Error("Method not implemented.");
    }

    public charSet(type: string): restify.Response {
        throw new Error("Method not implemented.");
    }

    public get(name: string): string {
        throw new Error("Method not implemented.");
    }

    public getHeaders() {
        throw new Error("Method not implemented.");
    }

    public header(name: string, value?: any) {
        throw new Error("Method not implemented.");
    }

    public json(code: number, object: any, headers?: { [header: string]: string; });
    public json(object: any, headers?: { [header: string]: string; });
    public json(code: any, object?: any, headers?: any) {
        throw new Error("Method not implemented.");
    }

    public link(l: string, rel: string): string {
        throw new Error("Method not implemented.");
    }

    public send(code?: any, body?: any, headers?: { [header: string]: string; }) {
        throw new Error("Method not implemented.");
    }

    public sendRaw(code?: any, body?: any, headers?: { [header: string]: string; }) {
        throw new Error("Method not implemented.");
    }

    public set(name: string, val: string): restify.Response {
        throw new Error("Method not implemented.");
    }

    public status(code: number): number {
        throw new Error("Method not implemented.");
    }

    public toString(): string {
        throw new Error("Method not implemented.");
    }

    public redirect(code: number, url: string, next: restify.Next): void;
    public redirect(options: string | object, next: restify.Next): void;
    public redirect(code: any, url: any, next?: any) {
        throw new Error("Method not implemented.");
    }

    public assignSocket(socket: Socket): void {
        throw new Error("Method not implemented.");
    }

    public detachSocket(socket: Socket): void {
        throw new Error("Method not implemented.");
    }

    public writeContinue(callback?: () => void): void {
        throw new Error("Method not implemented.");
    }

    public writeHead(statusCode: number, reasonPhrase?: string, headers?: OutgoingHttpHeaders): void;
    public writeHead(statusCode: number, headers?: OutgoingHttpHeaders): void;
    public writeHead(statusCode: any, reasonPhrase?: any, headers?: any) {
        throw new Error("Method not implemented.");
    }

    public setTimeout(msecs: number, callback?: () => void): this {
        throw new Error("Method not implemented.");
    }

    public destroy(error: Error): void {
        throw new Error("Method not implemented.");
    }

    public setHeader(name: string, value: string | number | string[]): void {
        throw new Error("Method not implemented.");
    }

    public getHeader(name: string): string | number | string[] {
        throw new Error("Method not implemented.");
    }

    public getHeaderNames(): string[] {
        throw new Error("Method not implemented.");
    }

    public hasHeader(name: string): boolean {
        throw new Error("Method not implemented.");
    }

    public removeHeader(name: string): void {
        throw new Error("Method not implemented.");
    }

    public addTrailers(headers: OutgoingHttpHeaders | Array<[string, string]>): void {
        throw new Error("Method not implemented.");
    }

    public flushHeaders(): void {
        throw new Error("Method not implemented.");
    }
}

export default class ResponseMockExtensions extends ResponseMock {
    public _code: number;
    public _headers: any;
    public _body: string;
    public _object: any;

    public send(code?: any, body?: any, headers?: { [header: string]: string; }) {
        this._code = code;
        this._body = body;
        this._headers = headers;
    }

    public json(code: number, object: any, headers?: { [header: string]: string; });
    public json(object: any, headers?: { [header: string]: string; });
    public json(code: any, object?: any, headers?: any) {
        this._object = object || code;
        this._code = object ? code : null;
        this._headers = object ? headers : null;
    }
}
