/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Row, Col, Input, Button, Form, Table, TableColumnsType } from "antd"
import { useState, useMemo, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useCurrentGroup } from "../../../hooks/group"
import { useForm } from "antd/es/form/Form"
import { debounce } from "lodash"
import { selectSupervisorGetListState, supervisorGetListRequest } from "../../../store/Employee/Supervisor/getList/reducer"
import { SupervisorType } from "../../../types/employee/supervidor"
import { FilterType } from "../../../types/filter"
import { CustomDocumentType } from "../../../types/firebase"
import { selectWorkerGetListState, workerGetListRequest } from "../../../store/Employee/Worker/getList/reducer"

const SupervisorListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form] = useForm()
  const { config } = useCurrentGroup()
  const { data, loading } = useSelector(selectSupervisorGetListState)
  const { data: workers } = useSelector(selectWorkerGetListState)

  const [searchParams, setSearchParams] = useState<FilterType | null>(null)

  useEffect(() => {
    if (config) {
      dispatch(supervisorGetListRequest({ config: config ?? "" }))
      dispatch(workerGetListRequest({ config }))
    }
  }, [config])

  const dataSource = useMemo(() => {
    if (!data) return []
    return data.filter((supervisor) => {
      const { singleSearch, email, phoneNumber } = searchParams || {}
      const fullName = `${workers?.find((e) => e.id === supervisor.data.workerId)?.data.firstName} ${workers?.find((e) => e.id === supervisor.data.workerId)?.data.lastName}`.toLowerCase()

      return (
        (!singleSearch || fullName.includes(singleSearch.toLowerCase())) &&
        (!email || (workers?.find((e) => e.id === supervisor.data.workerId)?.data.email ?? "").toLowerCase().includes(email.toLowerCase())) &&
        (!phoneNumber || (workers?.find((e) => e.id === supervisor.data.workerId)?.data.phoneNumber ?? "").includes(phoneNumber))
      )
    })
  }, [data, searchParams, workers])

  const columns: TableColumnsType<CustomDocumentType<SupervisorType>> = useMemo(() => {
    const baseColumns: TableColumnsType<CustomDocumentType<SupervisorType>> = [
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
        render: (_value, record, _index) => <>{workers?.find((e) => e.id === record.data.workerId)?.data.firstName}</>,
      },
      {
        title: "Last name",
        align: "start",
        width: 150,
        render: (_volume, record, _index) => <>{workers?.find((e) => e.id === record.data.workerId)?.data.lastName}</>,
      },
      {
        title: "Email",
        align: "start",
        render: (_value, record, _index) => <>{workers?.find((e) => e.id === record.data.workerId)?.data.email}</>,
      },
      {
        title: "Phone number",
        align: "start",
        render: (_value, record, _index) => <>{workers?.find((e) => e.id === record.data.workerId)?.data.phoneNumber}</>,
      },
      {
        title: "Actions",
        align: "center",
        render: (_value, record, _index) => (
          <>
            <Button onClick={() => navigate(`/supervisors/${record.id}/edit`)}>edit</Button>
          </>
        ),
      },
    ]
    return baseColumns
  }, [])

  const newSupervisor = () => {
    navigate("add")
  }

  const debouncedSetSearchParams = useCallback(
    debounce((values) => {
      setSearchParams(values)
    }, 800),
    []
  )

  const handleFormChange = (e: FilterType) => {
    debouncedSetSearchParams(e)
  }

  const handleSearchClear = () => {
    form.resetFields()
    setSearchParams(null)
  }

  return (
    <>
      <h2>Supervisor List</h2>
      <Card loading={loading}>
        <Row gutter={[0, 10]} justify={"start"}>
          <Col>
            <Button type="primary" onClick={newSupervisor}>
              Add
            </Button>
          </Col>
          <Col span={24}>
            <Form layout="vertical" form={form} onValuesChange={handleFormChange}>
              <Row gutter={[10, 10]}>
                <Col lg={4} md={8} sm={24}>
                  <Form.Item<FilterType> name="singleSearch" label="Name :">
                    <Input placeholder="Jane/Smith"></Input>
                  </Form.Item>
                </Col>
                <Col lg={4} md={8} sm={24}>
                  <Form.Item<FilterType> name="email" label="Email :">
                    <Input placeholder="JaneDoe@gmail.com"></Input>
                  </Form.Item>
                </Col>
                <Col lg={4} md={8} sm={24}>
                  <Form.Item<FilterType> name="phoneNumber" label="Phone Number :">
                    <Input placeholder="0491008800"></Input>
                  </Form.Item>
                </Col>
                {searchParams?.singleSearch || searchParams?.email || searchParams?.phoneNumber ? (
                  <Col xl={3} md={8} sm={12} xs={24}>
                    <Form.Item>
                      <Button type="text" onClick={handleSearchClear} style={{ marginTop: 30 }}>
                        Clear
                      </Button>
                    </Form.Item>
                  </Col>
                ) : null}
              </Row>
            </Form>
          </Col>
          <Col span={24}>
            <Table loading={loading} columns={columns} dataSource={dataSource} size="small" />
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default SupervisorListPage
