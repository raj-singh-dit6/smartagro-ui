/**
 * login-response.model.ts
 * The Data Transfer Object for the JSON returned as a
 * response to the login-request.
 */
export class LoginResponse {

    constructor(
        public token: string,
        public success: boolean) {}
}
