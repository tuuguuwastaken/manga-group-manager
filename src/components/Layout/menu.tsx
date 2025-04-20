import { HomeOutlined, BookOutlined, AuditOutlined, TeamOutlined, FieldTimeOutlined } from "@ant-design/icons"
import { MenuProps } from "antd"

type MenuItem = NonNullable<Required<MenuProps>["items"]>[number]

function menuItem(
  label: React.ReactNode,
  key: string | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children: children?.filter(Boolean),
    label,
  }
}

export const menuItems: MenuItem[] = [
  menuItem("Dashboard", "/", <HomeOutlined />),
  menuItem("Schedule", "/schedule", <FieldTimeOutlined />),
  menuItem("Employees", "", <BookOutlined />, [
    menuItem("Workers", "/workers", <TeamOutlined /> ),
    menuItem("Supervisors", "/supervisors",<AuditOutlined />),
  ]),
]
