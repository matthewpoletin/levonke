"use strict";

import IPaginated from "../../IPaginated";

export default interface IUserResponse {
    id: number;
    username?: string;
    avatar?: string;
    bio?: string;
    forename?: string;
    surname?: string;
    regEmail?: string;
    pubEmail?: string;
    ghLink?: string;
    fbLink?: string;
    password?: string;
}

export interface IUserPaginated extends IPaginated {
    content: IUserResponse[];
}
