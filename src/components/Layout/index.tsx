/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Layout, Menu } from "antd"
import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { organizationOneRequest, selectOrganizationOneState } from "../../store/organization/GetOne/reducer"
import { menuItems } from "./menu"
import { selectLoginState } from "../../store/auth/login/reducer"
import { profileRequest, selectProfileState } from "../../store/profile/reducer"
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons"

const { Header, Sider, Content } = Layout

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data } = useSelector(selectOrganizationOneState)
  const { data: profileData } = useSelector(selectProfileState)
  const loginState = useSelector(selectLoginState)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (loginState.user) dispatch(profileRequest())
  }, [loginState.user])

  useEffect(() => {
    console.log("GETTING CONFIG")
    const orgId = profileData?.data.organizationId
    console.log(orgId)
    if (orgId) dispatch(organizationOneRequest({ id: orgId }))
  }, [profileData])

  // Automatically select menu items based on path
  const selectedKeys = useMemo(() => {
    const keys: string[] = []

    menuItems.forEach((item) => {
      if (!item?.key) return

      if (location.pathname.includes(item.key.toString())) {
        keys.push(item.key.toString())
      }

      if ("children" in item && Array.isArray(item.children)) {
        item.children.forEach((child) => {
          if (child?.key && location.pathname.includes(child.key.toString())) {
            keys.push(child.key.toString())
          }
        })
      }
    })

    return keys
  }, [location.pathname])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        breakpoint="md"
        onBreakpoint={(broken) => setCollapsed(broken)}
      >
        <div
          className="logo"
          style={{
            color: "white",
            textAlign: "center",
            padding: "16px",
            fontSize: "18px",
          }}
        >
          {`WMS 0.0.1`}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={[`/${location.pathname.split("/")[1]}`]}
          items={menuItems}
          onSelect={({ key }) => navigate(key)}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: "0 20px", fontSize: "18px" }}>
          <Button type="text" icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />} onClick={() => setCollapsed(!collapsed)} />
          {data?.data.name}
        </Header>
        <Content style={{ margin: "0 20px", padding: "10px", borderRadius: "8px" }}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
