import { environment } from '../../environments/environment';
/**
 * api-endpoints.constant.ts
 *
 * This file contains all the REST api endpoints that the application
 * uses.
 */

/**
 *  The base path of the API
 */

export const API_BASE = environment.apiBaseUrl;


export const USER_ID = null;

/**
 *  The API endpoints object
 */
export const API_ENDPOINTS = {

  //deliver
  DELIVERY_BY_TASK: `${API_BASE}/delivery/task`,
  DELIVERY_BY_JOB: `${API_BASE}/delivery/job`,


  // Pre/Post Authentication
  AUTHENTICATION_ENDPOINT: `${API_BASE}/api/auth/signin`,
  SIGNUP_AUTHENTICATION_ENDPOINT: `${API_BASE}/api/auth/signup`,
  AUTH_USER_ENDPOINT: `${API_BASE}/user/data`,
  LOGOUT_ENDPOINT: `${API_BASE}/user/logout`,
  FORGET_PASSWORD_ENDPOINT: `${API_BASE}/user/requestpasswordchange/`,
  VALIDATE_TOKEN: `${API_BASE}/validate-token`,
  CHANGE_PASSWORD: `${API_BASE}/user/changepassword`,

  // userShift
  GET_SHIFT: `${API_BASE}/shift/`,
  POST_SHIFT: `${API_BASE}/shift/`,
  GET_ACTIVE_SHIFTS: `${API_BASE}/activeShift/`,

  // User
  GET_USER: `${API_BASE}/user/`,
  GET_STAFF_LIST: `${API_BASE}/staffList/`,
  GET_STAFF_DETAIL: `${API_BASE}/staffdetail/`,

  POST_PROFILE_PHOTO: `${API_BASE}/photo/`,
  DELETE_PROFILE_PHOTO: `${API_BASE}/photo/`,
  USER_PROFILE_PHOTO: `${API_BASE}/photo/`,

  // Timesheet
  GET_TIMESHEET_DAY: `${API_BASE}/timesheet/`,


  // for type values: MYTIME,COREDB
  REPORT_PROJECT_ENDPOINT: `${API_BASE}/report/project`,
  REPORT_CLIENT_ENDPOINT: `${API_BASE}/report/client`,
  REPORT_TASK_ENDPOINT: `${API_BASE}/report/task`,
  REPORT_STAFF_ENDPOINT: `${API_BASE}/report/staff`,

  // Lookup
  PAYPERIOD: `${API_BASE}/lookup/PayPeriod/`,

  TASK_TIME_HISTORY_ENDPOINT: `${API_BASE}/taskTimeHistory/`,

  //RSS Feeds
  GET_RSS_FEEDS: `${API_BASE}/rss/feeds/`,

  //App version
  GET_APP_VERSION: `${API_BASE}/version/`,

};
