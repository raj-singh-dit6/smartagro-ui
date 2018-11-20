/**
 * login-request.model.ts
 * The Data Transfer Object for the JSON payload that should be
 * sent along with the login request
 */
export class LoginRequest {

    constructor(
        public usernameOrEmail: string,
        public password: string
    ) { }
}
