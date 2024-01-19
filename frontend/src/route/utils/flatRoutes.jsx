function flatRoutes(routes) {
    return routes.reduce((prevRoutes, currentRoute) => {
        if (currentRoute.routes && currentRoute.routes.length) {
            return [...prevRoutes, currentRoute, ...flatRoutes(currentRoute.routes)];
        }

        return [...prevRoutes, currentRoute];
    }, []);
}

export default flatRoutes;
