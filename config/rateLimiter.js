import rateLimit from "express-rate-limit";


/**
 * Rate limiter configuration object.
 * @typedef {Object} LimiterConfig
 * @property {number} windowMs - The time window in milliseconds.
 * @property {number} max - The maximum number of requests allowed per windowMs.
 * @property {string} standardHeaders - The standard headers to be used.
 * @property {boolean} legacyHeaders - Whether to use legacy headers or not.
 * @property {string} message - The error message to be displayed when the limit is exceeded.
 */

/**
 * Rate limiter instance.
 * @type {LimiterConfig}
 */
export const limiter = rateLimit(
    {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        standardHeaders: "draft-7", //
        legacyHeaders: false,
        message: "Too many requests from this IP, please try again after an hour"
    }
);
