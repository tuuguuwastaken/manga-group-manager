/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from "react"
import { CustomDocumentType } from "../../types/firebase"
import { WorkplaceType } from "../../types/workplace"
import { Button, Card, Col, Row, Table, TableColumnsType } from "antd"
// import { useForm } from "antd/es/form/Form"

const WorkplaceListPage = () => {
  // const [form] = useForm()

  const columns: TableColumnsType<CustomDocumentType<WorkplaceType>> = useMemo(() => {
    const baseColumn: TableColumnsType<CustomDocumentType<WorkplaceType>> = [
      {
        title: "№",
        align: "center",
        width: 10,
        render: (_value, _record, index) => <>{index + 1}</>,
      },
      {
        title: "Workplace",
        align: "start",
        render: (_value, record, _index) => <>{record.data.name}</>,
      },
      {
        title: "Email",
        align: "start",
        render: (_value, record, _index) => <>{record.data.email}</>,
      },
      {
        title: "Phone number",
        align: "start",
        render: (_value, record, _index) => <>{record.data.phoneNumber}</>,
      },
      {
        title: "total Farms",
        align: "start",
        render: (_value, record, _index) => <>{record.data.farms?.length}</>,
      },
    ]
    return baseColumn
  }, [])
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Company List</h2>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <Button type="primary">Add</Button>
        </Col>
      </div>
      <Card>
        <Row gutter={[0, 10]} justify={"start"}>
          {/* <Form layout="vertical" form={form} ></Form> */}
          <Col span={24}>
            <Table columns={columns} dataSource={[]} size="small"></Table>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default WorkplaceListPage
