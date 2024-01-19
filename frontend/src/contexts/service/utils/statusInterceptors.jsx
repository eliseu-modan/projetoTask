import jwtDecode from "jwt-decode";

const { location } = window;

export async function handler401({ auth, config, service }) {
    return new Promise(async (resolve, reject) => {
        const configUrl = config.config.url;

        try {
            if (auth && service && !configUrl?.split("/").includes("refresh")) {
                await service
                    .request({
                        headers: { Authorization: auth.accessToken },
                        url: "/auth/refresh",
                        method: "POST",
                    })
                    .then(async ({ data }) => {
                        const tokenDecode = jwtDecode(data.token);
                        const accessToken = `Bearer ${data.token}`;

                        await auth.setAuthenticationAsync({
                            accessToken,
                            authData: {
                                tokenDecode,
                                role: "admin",
                                user: {
                                    id: tokenDecode.sub,
                                    name: tokenDecode.given_name,
                                    email: tokenDecode.email,
                                },
                            },
                        });

                        await service
                            .request({
                                ...config.config,
                                headers: { Authorization: accessToken },
                            })
                            .then((res) => resolve(res))
                            .catch(async () => {
                                await auth.clearAuthenticationAsync();

                                reject(config);
                            });
                    });
            } else {
                await auth?.clearAuthenticationAsync();

                reject(new Error("Invalid token."));
            }
        } catch (error) {
            await auth?.clearAuthenticationAsync();

            reject(error);
        }
    });
}

export async function handlerRedirectPageError({ config }) {
    if (location) {
        location.href = `/${String(config.response?.status)}`;
    }

    return Promise.reject(config);
}
