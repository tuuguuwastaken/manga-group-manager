/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux"
import { useCurrentGroup } from "../../../hooks/group"
import { selectWorkerGetListState, workerGetListRequest } from "../../../store/Employee/Worker/getList/reducer"
import { useEffect, useMemo, useState } from "react"
import { Button, Card, Col, Form, Input, Row, Table, TableColumnsType } from "antd"
import { CustomDocumentType } from "../../../types/firebase"
import { WorkerType } from "../../../types/employee/worker"
import { useNavigate } from "react-router-dom"
import { FilterType } from "../../../types/filter"
import { useForm } from "antd/es/form/Form"
import { debounce } from "lodash"

const WorkerListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const [form] = useForm()
  const { config } = useCurrentGroup()
  const { data, loading } = useSelector(selectWorkerGetListState)

  // const [searchParams, setSearchParams] = useState<FilterType | null>(null)

  useEffect(() => {
    console.log("CONFIG AND DATA : ", config,data)
    if (config && !data) {
      console.log("sending res")
      dispatch(workerGetListRequest({ config }))
    }
  }, [config])

  const columns: TableColumnsType<CustomDocumentType<WorkerType>> = useMemo(() => [
    {
      title: "№",
      align: "center",
      width: 10,
      render: (_value, _record, index) => <p>{index + 1}</p>,
    },
    {
      title: "First Name",
      align: "start",
      width: 150,
      render: (_value, record) => <>{record.data.firstName}</>,
    },
    {
      title: "Last name",
      align: "start",
      width: 150,
      render: (_value, record) => <>{record.data.lastName}</>,
    },
    {
      title: "Email",
      align: "start",
      render: (_value, record) => <>{record.data.email}</>,
    },
    {
      title: "Phone number",
      align: "start",
      render: (_value, record) => <>{record.data.phoneNumber}</>,
    },
    {
      title: "Actions",
      align: "center",
      render: (_value, record) => (
        <Button onClick={() => navigate(`/workers/${record.id}/edit`)}>edit</Button>
      ),
    },
  ], [navigate])

  // const newWorker = () => {
  //   navigate("add")
  // }

  // const debouncedSetSearchParams = useMemo(
  //   () => debounce((values) => {
  //     setSearchParams((prev) => {
  //       if (JSON.stringify(prev) !== JSON.stringify(values)) {
  //         return values
  //       }
  //       return prev
  //     })
  //   }, 800),
  //   []
  // )

  // const handleFormChange = (e: FilterType) => {
  //   debouncedSetSearchParams(e)
  // }

  // const handleSearchClear = () => {
  //   form.resetFields()
  //   setSearchParams(null)
  // }

  return (
    <>
      <h2>Worker List</h2>
      <Card>
        <Row gutter={[0, 10]} justify={"start"}>
          {/* <Col>
            <Button type="primary" onClick={newWorker}>
              Add
            </Button>
          </Col>
          <Col span={24}>
            <Form layout="vertical" form={form} onValuesChange={handleFormChange}>
              <Row gutter={[10, 10]}>
                <Col lg={4} md={8} sm={24}>
                  <Form.Item<FilterType> name="singleSearch" label="Name :">
                    <Input placeholder="Jane/Smith" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={8} sm={24}>
                  <Form.Item<FilterType> name="email" label="Email :">
                    <Input placeholder="JaneDoe@gmail.com" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={8} sm={24}>
                  <Form.Item<FilterType> name="phoneNumber" label="Phone Number :">
                    <Input placeholder="0491008800" />
                  </Form.Item>
                </Col>
                {searchParams && (searchParams.singleSearch || searchParams.email || searchParams.phoneNumber) && (
                  <Col xl={3} md={8} sm={12} xs={24}>
                    <Form.Item>
                      <Button type="text" onClick={handleSearchClear} style={{ marginTop: 30 }}>
                        Clear
                      </Button>
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Form> */}
          {/* </Col> */}
          <Col span={24}>
            <Table loading={loading} columns={columns} dataSource={data || []} size="small" />
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default WorkerListPage