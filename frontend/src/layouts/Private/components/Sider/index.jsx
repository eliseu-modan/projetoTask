import {
  LogoutOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useAuthentication } from "../../../../contexts/authentication";
import { LayoutMenu } from "../../../_commons";
import { useNavigate } from "react-router-dom";
import { SIDER_SIZE } from "../../../constants";

import "./index.css";

const { Sider } = Layout;

function PrivateSider({ toggleCollapsed, ...props }) {
  const { clearAuthenticationAsync } = useAuthentication();
  const navigate = useNavigate();
  const theme = "light";

  function filterRoutes(routes) {
    return routes
      .filter((route) => route.layout === "private")
      .filter((route) => !route.extra?.header);
  }

  async function onMenuClick(key) {
    if (key === "profile") {
      navigate("/profile");
    } else {
      await clearAuthenticationAsync().then(() => {
        navigate("/");
      });
    }
  }

  return (
    <Sider
      className="private-sider"
      theme={theme}
      collapsedWidth={0}
      width={SIDER_SIZE}
      {...props}
    >
      {!props.collapsed && (
        <>
          <div>
            <div className="container-collapse-button">
              <Button
                icon={<MenuUnfoldOutlined />}
                type="link"
                onClick={toggleCollapsed}
              />
            </div>

            {/* <div className="center">
							<img alt="logo" className="logo" src={Logo} />
						</div> */}

            <div className="inner-div-menu">
              <LayoutMenu
                className="sider-menu"
                filterRoutes={filterRoutes}
                mode="inline"
                theme={theme}
              />
            </div>
          </div>

          <div>
            <Menu
              theme={theme}
              mode="inline"
              className="sider-menu"
              selectedKeys={[]}
              onClick={({ key }) => onMenuClick(key)}
              items={[
                // {
                // 	icon: <UserOutlined />,
                // 	key: "profile",
                // 	label: "Perfil",
                // },
                {
                  icon: <LogoutOutlined />,
                  key: "logout",
                  label: "Sair",
                  style: { color: "red" },
                },
              ]}
            />
          </div>
        </>
      )}
    </Sider>
  );
}

export default PrivateSider;
