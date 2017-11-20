"use strict";

function randomStringBase(symbols: string, length: number): string {
    const text = [];

    for (let i = 0; i < length; i++) {
        text.push(symbols.charAt(Math.floor(Math.random() * symbols.length)));
    }

    return text.join("");
}

export function randomStringNumeric(length: number): string {
    const symbols = "0123456789";
    return randomStringBase(symbols, length);
}

export function randomStringAlpha(length: number) {
    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return randomStringBase(symbols, length);
}

export function randomString(length: number) {
    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return randomStringBase(symbols, length);
}

export function generateEmail() {
    return `${randomString(10)}@${randomStringAlpha(6)}.com`;
}

export function generateLink() {
    return `${randomString(10)}.com/${randomString(8)}`;
}

export function generateId() {
    return Math.ceil(Math.random() * 100);
}

export function randomInteger(max: number, min?: number) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

export function generateUUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}
