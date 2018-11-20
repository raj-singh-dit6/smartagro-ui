/**
 * exception-registry.constant.ts
 * This file contains all the exception messages that the application uses.
 */

/**
 * Typing for a single exception
 */
export interface Exception {
    code: number;
    logMessage: string;
    message: string;
}

/**
 * Default exceptions for Http errors
 */
export const DefaultHttpErrors = {
    0: {
        code: 0,
        logMessage: 'Could not connect to the server',
        message: 'Unable to communicate with the server'
    },

    400: {
        code: 400,
        logMessage: 'Bad request',
        message: 'Malformed request'
    },

    401: {
        code: 401,
        logMessage: 'Unauthorized Access',
        message: 'Unauthorized Access'
    },

    404: {
        code: 404,
        logMessage: 'Resource Unavailable',
        message: 'The requested resource is unavailable'
    },

    500: {
        code: 500,
        logMessage: 'Server error',
        message: 'Something went wrong while processing the request'
    }
};

/**
 * The exception registry object that contains all the exception entries
 * that is being used in the application
 */
export const ExceptionRegistry = {
    UNAUTH_ACC_DENIED: {
        code: 100,
        logMessage: 'Invalid credentials',
        message: 'Invalid credentials'
    }
};
