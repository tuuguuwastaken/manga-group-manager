import { Breadcrumb, Button, Row } from "antd"
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"

interface AppBarComponentProps {
  loading: boolean
  title?: string | null
  breadcrumbTitle?: string | null
  previousTitle?: string | null
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({ loading, title, breadcrumbTitle, previousTitle }) => {
  const navigate = useNavigate()

  return (
    <Row className="my-2" justify="space-between" align="middle">
      <Button type="text" onClick={() => navigate(-1)} size="large">
        <ArrowLeftOutlined className="mr-2" />
        <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{title}</span>
      </Button>
      <Breadcrumb
        items={[
          {
            title: (
              <Link to="" onClick={() => navigate(-1)}>
                {previousTitle}
              </Link>
            ),
          },
          {
            title: loading ? <LoadingOutlined /> : breadcrumbTitle ?? "Add",
          },
        ]}
      />
    </Row>
  )
}

export default AppBarComponent
