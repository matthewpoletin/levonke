"use strict";

export default interface IUserResponse {
    id: number;
    username?: string;
    firstname?: string;
    surname?: string;
    regEmail?: string;
    pubEmail?: string;
    ghLink?: string;
    fbLink?: string;
}
