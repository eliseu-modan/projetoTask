import { Menu } from "antd";
import { useAuthentication } from "../../../contexts/authentication";
import { useNavigate } from "react-router-dom";
import routes from "../../../route/routes";
import {
  isInvalidRole,
  menuDefaultOpenKeys,
  menuSelectedKeys,
  renderMenuItems,
} from "../../utils/menu";
import { useCurrentPath } from "../../../hooks";

function LayoutMenu({ filterRoutes, ...props }) {
  const { authData } = useAuthentication();
  const navigate = useNavigate();
  const currentPath = useCurrentPath();

  function handlerOnClick(params) {
    navigate(params.key);
  }

  function menuItem(route) {
    // Not display menu if have diff role
    //if (isInvalidRole(route.isAdmin, authData)) return null;
    if (isInvalidRole(route.roles || [], authData)) return null;

    if (route.menu) {
      const {
        icon: Icon,
        title,
        isClickable,
        insideSubmenu,
        ...restMenu
      } = route.menu;
      let { routes: menuItems, ...restRoute } = route;
      const menuChildren = title || null;

      menuItems = [{ ...restRoute, menu: insideSubmenu }, ...(menuItems ?? [])];

      if (menuItems?.length) {
        const subMenuItens = renderMenuItemsConfig(menuItems);

        // Verify if have a valid sub-menu
        if (subMenuItens.length) {
          return {
            icon: <Icon />,
            label: title,
            key: route.path,
            children: subMenuItens,
            onTitleClick: isClickable ? handlerOnClick : undefined,
            ...restMenu,
          };
        }
      }

      return {
        icon: <Icon />,
        label: menuChildren,
        key: route.path,
        ...restMenu,
      };
    }

    return null;
  }

  function renderMenuItemsConfig(data) {
    // Return just routes with menu object
    return renderMenuItems(data, menuItem, filterRoutes);
  }

  return (
    <Menu
      className="layout-menu"
      selectedKeys={menuSelectedKeys(routes, currentPath)}
      defaultOpenKeys={menuDefaultOpenKeys(routes, currentPath)}
      onClick={handlerOnClick}
      items={renderMenuItemsConfig(routes)}
      {...props}
    />
  );
}

export default LayoutMenu;
