"use strict";

import ILoginRequest from "./interface/LoginRequest";
import IRefreshRequest from "./interface/RefreshRequest";
import ITokenRequest from "./interface/TokenRequest";
import ITokenResponse from "./interface/TokenResponse";
import IUserResponse from "./interface/UserResponse";

import IAuthService from "./IAuthService";

import getOptions from "../../Options";

import config from "../../../IConfig";

import requestWrapper from "../authrequest";
const rp = requestWrapper({id: 3, secret: "qULETS2mSjRKMgNppMSutTPb4xb1IzqxmbNoWv9HHYoIFMuZUZ"});

const authServiceURL = config.Services.Auth.url + config.Services.Auth.port + config.Services.Auth.base;

class AuthService implements IAuthService {

    public login(credentials: ILoginRequest): Promise<ITokenResponse> {
        const options = getOptions(authServiceURL, "/token", null, credentials);
        return rp.post(options);
    }

    public check(token: ITokenRequest): Promise<IUserResponse> {
        const options = getOptions(authServiceURL, "/token/check", null, token);
        return rp.post(options);
    }

    public refresh(refresh: IRefreshRequest): Promise<ITokenResponse> {
        const options = getOptions(authServiceURL, "/token/refresh", null, refresh);
        return rp.post(options);
    }

    public logout(token: ITokenRequest): Promise<void> {
        const options = getOptions(authServiceURL, "/token", null, token);
        return rp.delete(options);
    }

    public oAuthCheck(token: ITokenRequest): Promise<IUserResponse> {
        const options = getOptions(authServiceURL, "/oauth/token/check", null, token);
        return rp.post(options);
    }

}

export default new AuthService();
