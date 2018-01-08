"use strict";

import ILoginRequest from "./interface/LoginRequest";
import IRefreshRequest from "./interface/RefreshRequest";
import ITokenRequest from "./interface/TokenRequest";
import ITokenResponse from "./interface/TokenResponse";
import IUserResponse from "./interface/UserResponse";

export default interface IAuthService {

    login(credentials: ILoginRequest): Promise<ITokenResponse>;

    check(token: ITokenRequest): Promise<IUserResponse>;

    refresh(refresh: IRefreshRequest): Promise<ITokenResponse>;

    logout(token: ITokenRequest): Promise<void>;

    oAuthCheck(token: ITokenRequest): Promise<IUserResponse>;

}
