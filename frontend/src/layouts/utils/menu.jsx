import { flatRoutes } from "../../route/utils";

/**
 * Function for validate visualization of menu
 */
export function isInvalidRole(roles, authData) {
    return (
        Array.isArray(roles) &&
        !!roles.length &&
        !roles.includes(authData?.user.role)
    );
}

/**
 * Function for display menu item selected
 */
export function menuSelectedKeys(routes, routeMatch) {
    return flatRoutes(routes)
        .filter((route) => route.path === routeMatch)
        .map((route) => route.path);
}

/**
 * Fuction for open menu items by default
 */
export function menuDefaultOpenKeys(routes, routeMatch) {
    const paths = routeMatch.split("/").filter((path) => path);
    const pathIndicator = paths[0];

    return flatRoutes(routes)
        .filter((route) => route.path.split("/").includes(pathIndicator))
        .map((route) => route.path);
}

/**
 * Fuction for render menu items inside a antd Menu component
 */
export function renderMenuItems(routes, renderMenuItem, filterRoutes) {
    let data = routes;

    if (filterRoutes) {
        data = filterRoutes(routes);
    }

    // Return just routes with menu object with a filter if necessary
    return (
        data
            .filter((route) => route.menu)
            .map(renderMenuItem)
            // This remove null itens in array
            .filter((route) => route)
    );
}
