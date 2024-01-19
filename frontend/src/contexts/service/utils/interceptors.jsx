import { handler401, handlerRedirectPageError } from "./statusInterceptors";

// REQUEST

function request(config) {
    return config;
}

// RESPONSE

function response(config) {
    return config;
}

// ERROR

function error({ auth, service }) {
    return async (config) => {
        // 401
        if (config.response?.status === 401 && auth.accessToken) {
            return await handler401({ config, auth, service });
        }

        // 403
        if (config.response?.status === 403) {
            return await handlerRedirectPageError({ config });
        }

        // 500
        if (config.response?.status === 500) {
            return await handlerRedirectPageError({ config });
        }

        // 503
        if (config.response?.status === 503) {
            return await handlerRedirectPageError({ config });
        }

        return Promise.reject(config);
    };
}

// INTERCEPTOR

function serviceInterceptors(auth) {
    return (service) => ({
        request: [request, error({ auth, service })],
        response: [response, error({ auth, service })],
    });
}

export default serviceInterceptors;
