import {
  HomeOutlined,
  BookOutlined,
  AuditOutlined,
  TeamOutlined,
  FieldTimeOutlined,
  BankOutlined
} from "@ant-design/icons"
import { MenuProps } from "antd"

export type MenuItem = NonNullable<Required<MenuProps>["items"]>[number]

function createMenuItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  if (children && children.length > 0) {
    return {
      key,
      icon,
      children,
      label,
    }
  }

  return {
    key,
    icon,
    label,
  }
}

export const menuItems: MenuItem[] = [
  createMenuItem("Dashboard", "/", <HomeOutlined />),
  createMenuItem("Schedule", "/schedule", <FieldTimeOutlined />),
  createMenuItem("Employees", "employees", <BookOutlined />, [
    createMenuItem("Workers", "/workers", <TeamOutlined />),
    createMenuItem("Supervisors", "/supervisors", <AuditOutlined />),
  ]),
  createMenuItem("Workplace", "/workplace", <BankOutlined />, [
    createMenuItem("Companies", "/workplace/companies", <BookOutlined />)
  ]),
  createMenuItem("Weight", "/pallets", <FieldTimeOutlined />)
]
