import { TableColumnsType, Button, Col, Card, Row, Table } from "antd"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate} from "react-router-dom"
import { useCurrentGroup } from "../../hooks/group"
import { CustomDocumentType } from "../../types/firebase"
import { PalletWeightType } from "../../types/pallets"
import { palletWeightGetListRequest, selectPalletWeightGetListState } from "../../store/pallets/getList/reducer"
import dayjs from "dayjs"

const PalletWeightListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { config } = useCurrentGroup()
  const { data, loading } = useSelector(selectPalletWeightGetListState)


  useEffect(() => {
    console.log("CONFIG AND DATA : ", config, data)
    if (config && !data) {
      console.log("sending res")
      dispatch(palletWeightGetListRequest({ config:config }))
    }
  }, [config])

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
        width:150,
        render: (_value, record) => <>{record.data.farm}</>,
      },
      {
        title: "Block",
        align: "start",
        width: 50,
        render: (_value, record) => <>{record.data.block}</>,
      },
      {
        title: "Weight",
        align: "start",
        width: 70,
        render: (_value, record) => <>{record.data.weight}</>,
      },
      {
        title: "Trays",
        align: "start",
        width:70,
        render: (_value, record) => <>{record.data.tray}</>,
      },
      {
        title: "Contractor",
        align: "start",
        render: (_value, record) => <>{record.data.contractor}</>,
      },
      {
        title: "Created at",
        width:150,
        render:(_value, record) => <>
          {dayjs(record.data.createAt?.toDate()).format("YYYY-MM-DD HH:MM:ss")}
        </>
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
