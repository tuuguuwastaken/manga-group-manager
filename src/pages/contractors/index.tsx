import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { contractorGetListRequest, selectContractorGetListState } from "../../store/contractor/GetList/reducer"
import { useCurrentGroup } from "../../hooks/group"
import { useEffect, useMemo } from "react"
import { Card, Col, Table, TableColumnsType } from "antd"
import { Button } from "antd/es/radio"
import { CustomDocumentType } from "../../types/firebase"
import { ContractorType } from "../../types/contractor"
import dayjs from "dayjs"
import { useSelector } from "react-redux"

const ContractorListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {data ,loading } = useSelector(selectContractorGetListState)

  const { config } = useCurrentGroup()

  const onFetch = () => {
    dispatch(contractorGetListRequest({ config }))
  }

  useEffect(() => {
    if (config) {
      onFetch()
    }
  }, [config])

  const columns: TableColumnsType<CustomDocumentType<ContractorType>> = useMemo(() => {
    const baseColumns: TableColumnsType<CustomDocumentType<ContractorType>> = [
      {
        title: "№",
        align: "center",
        width: 10,
        render: (_value, _record, index) => <p>{index + 1}</p>,
      },
      {
        title: "Contractor",
        render: (_value, record) => <p>{record.data.name}</p>,
      },
      {
        title: "Email",
        render: (_value, record) => <p>{record.data.email}</p>,
      },
      {
        title: "Phone number",
        render: (_value, record) => <p>{record.data.number}</p>,
      },
      {
        title: "Created at",
        render: (_value, record) => <p>{dayjs(record.data.createdAt?.toDate()).format("DD-MM-YYYY | HH:MM:ss")}</p>,
      },
      {
        title: "Actions",
        align: "center",
        render: (_value, record) => <Button onClick={() => navigate(`/contractors/${record.id}/edit`)}>edit</Button>,
      },
    ]
    return baseColumns
  }, [])
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Contractor List</h2>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <Button type="primary" onClick={() => {}}>
            Add
          </Button>
        </Col>
      </div>
      <Card>
        <Table columns={columns} dataSource={data ?? []} loading={loading}></Table>
      </Card>
    </>
  )
}

export default ContractorListPage
