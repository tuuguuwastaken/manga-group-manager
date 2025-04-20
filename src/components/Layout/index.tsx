import { Layout, Menu, MenuProps } from "antd"
import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useCurrentGroup } from "../../hooks/group"
import { useDispatch, useSelector } from "react-redux"
import { organizationOneRequest, selectOrganizationOneState } from "../../store/organization/GetOne/reducer"
import { menuItems as menu } from "./menu"

const { Header, Sider, Content } = Layout

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data } = useSelector(selectOrganizationOneState)
  const { config } = useCurrentGroup()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (config?.orgId) {
      dispatch(organizationOneRequest({ id: config.orgId }))
    }
  }, [config?.orgId, dispatch])

  const menuItems: MenuItem[] = menu

  useEffect(() => {
    const keys: string[] = []

    menuItems.forEach((item) => {
      if (!item?.key) return

      const itemKey = String(item.key)
      if (location.pathname.startsWith(itemKey)) {
        keys.push(itemKey)
      }

      if (Array.isArray(item?.children) && item.children.length > 0) {
        item.children.forEach((child) => {
          if (!child?.key) return

          const childKey = String(child.key)
          if (location.pathname.startsWith(childKey)) {
            keys.push(childKey)
          }
        })
      }
    })

    setSelectedKeys(keys)
  }, [location.pathname, menuItems])

  const menuRender = useMemo(() => {
    return (
      <Menu
        theme="dark"
        selectedKeys={selectedKeys}
        defaultOpenKeys={[`/${location.pathname.split("/")[1]}`]}
        mode="inline"
        items={menuItems}
        onSelect={(e) => navigate(e.key)}
      />
    )
  }, [])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" style={{ color: "white", textAlign: "center", padding: "16px", fontSize: "18px" }}>
          {`WMS 0.0.1`}
        </div>
        {menuRender}
      </Sider>

      {/* Main Content Area */}
      <Layout>
        <Header style={{ background: "#fff", padding: "0 20px", fontSize: "18px" }}>{data?.data.name}</Header>
        <Content style={{ margin: " 0px 20px", padding:"10px", borderRadius: "8px" }}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout

type MenuItem = NonNullable<Required<MenuProps>["items"]>[number]
