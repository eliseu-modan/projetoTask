function formatRoutes(routes, parent) {
    return routes.map((route) => {
        let currentRoute = {
            path: route.path,
            rootPath: route.path,
            isFake: false,
            layout: route.layout || "public",
            redirectAuth: true,
        };

        if (typeof route.redirectAuth === "boolean") {
            currentRoute = {
                ...currentRoute,
                redirectAuth: route.redirectAuth,
            };
        }

        if (route.page && typeof route.page.showPageInfo === "undefined") {
            currentRoute = {
                ...currentRoute,
                page: { ...route.page, showPageInfo: true },
            };
        }

        if (parent) {
            currentRoute = {
                ...currentRoute,
                path: `${parent.path}${route.path}`,
                rootPath: parent.rootPath,
                layout: route.layout || parent.layout,
            };

            if (parent.roles && parent.roles.length) {
                if (currentRoute.roles && currentRoute.roles.length) {
                    currentRoute = {
                        ...currentRoute,
                        roles: [...parent.roles, ...currentRoute.roles],
                    };
                } else {
                    currentRoute = {
                        ...currentRoute,
                        roles: parent.roles,
                    };
                }
            }
        }

        if (route.routes && route.routes.length) {
            currentRoute = {
                ...currentRoute,
                routes: formatRoutes(route.routes, { ...route, ...currentRoute }),
            };
        }

        return { ...route, ...currentRoute };
    });
}

export default formatRoutes;
