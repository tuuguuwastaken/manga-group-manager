import { TableColumnsType, Button, Col, Card, Row, Table } from "antd"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useCurrentGroup } from "../../hooks/group"
import { CustomDocumentType } from "../../types/firebase"
import { PalletWeightType } from "../../types/pallets"
import { palletWeightGetListRequest, selectPalletWeightGetListState } from "../../store/pallets/getList/reducer"
import dayjs from "dayjs"
import { formatNumber } from "../../utils/format"
import { contractorGetListRequest, selectContractorGetListState } from "../../store/contractor/GetList/reducer"

const PalletWeightListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { config } = useCurrentGroup()
  const { data, loading } = useSelector(selectPalletWeightGetListState)
  const { data: contractors } = useSelector(selectContractorGetListState)

  const onFetch = () => {
    dispatch(palletWeightGetListRequest({ config }))
    dispatch(contractorGetListRequest({ config }))
  }

  useEffect(() => {
    if (config) {
      onFetch()
    }
  }, [])

  const columns: TableColumnsType<CustomDocumentType<PalletWeightType>> = useMemo(
    () => [
      {
        title: "№",
        align: "center",
        width: 10,
        render: (_value, _record, index) => <p>{index + 1}</p>,
      },
      {
        title: "Farm",
        align: "start",
        width: 150,
        render: (_value, record) => <>{record.data.farm}</>,
      },
      {
        title: "Block",
        align: "center",
        width: 50,
        render: (_value, record) => <>{record.data.block}</>,
      },
      {
        title: "Gross weight",
        align: "start",
        width: 120,
        render: (_value, record) => <>{formatNumber(record.data.weight)} KG</>,
      },
      {
        title: "Trays",
        width: 70,
        render: (_value, record) => <>{formatNumber(record.data.tray)}</>,
      },
      {
        title: "Contractor",
        align: "start",
        render: (_value, record) => <>{contractors?.find((e) => e.id == record.data.contractor)?.data.name}</>,
      },
      {
        title: "Created at",
        width: 150,
        render: (_value, record) => <p>{dayjs(record.data.createdAt?.toDate()).format("DD-MM-YYYY | HH:MM:ss")}</p>,
      },
      {
        title: "Actions",
        align: "center",
        render: (_value, record) => <Button onClick={() => navigate(`/workers/${record.id}/edit`)}>edit</Button>,
      },
    ],
    [navigate]
  )

  const newWorker = () => {
    navigate("create")
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Pallet Weight Report List</h2>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <Button type="primary" onClick={newWorker}>
            Add
          </Button>
        </Col>
      </div>
      <Card>
        <Row gutter={[0, 10]} justify={"start"}>
          <Col span={24}>
            <Table loading={loading} columns={columns} dataSource={data} size="small" />
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default PalletWeightListPage
