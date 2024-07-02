/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/api/quiz",
    "/play-quiz",
];

export const nonPublicRoutes = [
    "/dashboard",
    "/settings",
    "/create-quiz",
    "/edit-quiz",
    "/profile",
    "/auth",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
    "/auth"
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix that are used for Api authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect for when a user logs in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/";

/**
 * The The dashboard routes where a user can go after loggedIn
 * @type {string}
 */
