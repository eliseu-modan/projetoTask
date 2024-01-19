import { flatRoutes } from '.';
import routes from '../routes';

function breadcrumbFormat(
    data,
    currentPath,
) {
    if (Array.isArray(data)) {
        return flatRoutes(data)
            .filter((route) => route.page && route.menu)
            .reduce(
                (prevRoute, currentRoute, currentIndex, allRoutes) => {
                    let routeData = prevRoute;
                    const routePosition = allRoutes.findIndex(
                        (route) => route.path === currentPath,
                    );

                    if (currentIndex <= routePosition) {
                        routeData = [...routeData, currentRoute];
                    }

                    return routeData;
                },
                [],
            )
            .map((route) => {
                const breadcrumbName = route.menu?.title
                    ? String(route.menu?.title)
                    : route.page?.title || '';

                return {
                    path: route.path,
                    breadcrumbName,
                };
            });
    }

    const routeData = routes.find((route) => route.rootPath === data.rootPath);

    if (routeData) {
        return breadcrumbFormat([routeData], currentPath);
    }

    return [];
}

export default breadcrumbFormat;
