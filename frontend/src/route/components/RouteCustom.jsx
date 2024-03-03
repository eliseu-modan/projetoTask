import { useEffect } from "react";
import LayoutProvider from "../../layouts";

function RouteCustom({
  layout,
  menu,
  routes,
  page,
  component: Component,
  ...route
}) {
  const componentProps = {
    route: { layout, menu, routes, page, ...route },
  };

  useEffect(() => {
    if (page) {
      document.title = `${page.title} - Tasks`;
    }
  }, [page]);

  function renderComponent(props) {
    const meshProps = { ...props, ...componentProps };

    if (Component) {
      return (
        <LayoutProvider {...meshProps}>
          <Component {...meshProps} />
        </LayoutProvider>
      );
    }

    return null;
  }

  return renderComponent();
}

export default RouteCustom;
