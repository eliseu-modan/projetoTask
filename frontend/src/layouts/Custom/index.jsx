import { Layout } from "antd";

const { Content } = Layout;

function CustomLayout({ route, ...props }) {
    return (
        <Layout className="layout-main">
            <Content className="layout-content" style={route.layoutContentStyle}>
                {props.children}
            </Content>
        </Layout>
    );
}

export default CustomLayout;
