import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined, BookOutlined, OrderedListOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible>
        <div className="logo" style={{ color: "white", textAlign: "center", padding: "16px", fontSize: "18px" }}>
          Manga Manager
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/manga-list" icon={<BookOutlined />}>
            <Link to="/manga-list">Manga List</Link>
          </Menu.Item>
          <Menu.Item key="/tasks" icon={<OrderedListOutlined />}>
            <Link to="/tasks">Tasks</Link>
          </Menu.Item>
          <Menu.Item key="/workers" icon={<UserOutlined />}>
            <Link to="/workers">Workers</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content Area */}
      <Layout>
        <Header style={{ background: "#fff", padding: "0 20px", fontSize: "18px" }}>
          Welcome to Manga Manager
        </Header>
        <Content style={{ margin: "20px", background: "#fff", padding: "20px", borderRadius: "8px" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
