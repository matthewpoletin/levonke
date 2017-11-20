"use strict";

export default interface IUserResponse {
    id: number;
    username?: string;
    forename?: string;
    surname?: string;
    regEmail?: string;
    pubEmail?: string;
    ghLink?: string;
    fbLink?: string;
}
