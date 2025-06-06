/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Input, Modal, Row, Select, Space, Table, TableColumnsType } from "antd"
import { useMemo, useState } from "react"
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { palletWeightEditOneRequest, selectPalletWeightEditOneState } from "../../../store/pallets/editOne/reducer"
import { useCurrentGroup } from "../../../hooks/group"
import { PalletWeightType } from "../../../types/pallets"
import { useSelector } from "react-redux"
import ContractorSelectComponent from "../../../components/modals/contractor/contractorSelect"
import AppBarComponent from "../../../components/Appbar"

const contractors = [
  { value: "henry", label: "HENRY" },
  { value: "H&H", label: "H&H" },
]

const blocks = [
  { value: "A1", label: "A1 Block" },
  { value: "A2", label: "A2 Block" },
  { value: "A3", label: "A3 Block" },
  { value: "A4", label: "A4 Block" },
  { value: "B1", label: "B1 Block" },
  { value: "C1", label: "C1 Block" },
  { value: "C2", label: "C2 Block" },
  { value: "C3", label: "C3 Block" },
  { value: "C4", label: "C4 Block" },
  { value: "D1", label: "D1 Block" },
]


const PalletCreatePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { config } = useCurrentGroup()

  const [contractorShow, setContractorShow] = useState(true)

  const { loading } = useSelector(selectPalletWeightEditOneState)

  const [rows, setRows] = useState<PalletWeightType[]>([{ contractor: undefined, block: undefined, weight: undefined, tray: undefined }])

  const handleChange = (value: any, index: number, field: keyof PalletWeightType) => {
    const newRows = [...rows]
    newRows[index][field] = value
    setRows(newRows)
  }

  const addRow = () => {
    setRows([...rows, { contractor: undefined, block: undefined, weight: undefined, tray: undefined }])
  }

  const deleteRow = (index: number) => {
    const newRows = [...rows]
    newRows.splice(index, 1)
    setRows(newRows)
  }

  const validateRows = (): boolean => {
    return rows.every((row) => row.contractor && row.block && row.weight !== undefined && row.tray !== undefined)
  }

  const submitAll = () => {
    if (!validateRows()) {
      Modal.error({
        title: "Validation Error",
        content: "Please fill in all required fields before submitting.",
      })
      return
    }

    rows.forEach((row) => {
      dispatch(
        palletWeightEditOneRequest({
          config,
          data: row,
          navigate,
          id: undefined,
        })
      )
    })
  }

  const columns: TableColumnsType<PalletWeightType> = useMemo(
    () => [
      {
        title: "#",
        dataIndex: "index",
        width: 30,
        render: (_value: any, _record: PalletWeightType, index: number) => index + 1,
        responsive: ["sm"],
      },
      {
        title: "Contractor",
        dataIndex: "contractor",
        responsive: ["sm"],
        render: (_value: any, _record: PalletWeightType, index: number) => (
          <Select
            options={contractors}
            value={rows[index]?.contractor}
            onChange={(value) => handleChange(value, index, "contractor")}
            style={{ width: "100%" }}
          />
        ),
      },
      {
        title: "Block",
        dataIndex: "block",
        responsive: ["sm"],
        render: (_value: any, _record: PalletWeightType, index: number) => (
          <Select options={blocks} value={rows[index]?.block} onChange={(value) => handleChange(value, index, "block")} style={{ width: "100%" }} />
        ),
      },
      {
        title: "Weight (kg)",
        dataIndex: "weight",
        width: 150,
        responsive: ["sm"],
        render: (_value: any, _record: PalletWeightType, index: number) => (
          <Input type="number" value={rows[index]?.weight} onChange={(e) => handleChange(Number(e.target.value), index, "weight")} />
        ),
      },
      {
        title: "Trays",
        dataIndex: "tray",
        width: 150,
        responsive: ["sm"],
        render: (_value: any, _record: PalletWeightType, index: number) => (
          <Input type="number" value={rows[index]?.tray} onChange={(e) => handleChange(Number(e.target.value), index, "tray")} />
        ),
      },
      {
        title: "Action",
        dataIndex: "action",
        responsive: ["sm"],
        render: (_: any, __: any, index: number) => <Button icon={<DeleteOutlined />} danger onClick={() => deleteRow(index)} />,
      },
    ],
    [rows]
  )

  return (
    <>
      <AppBarComponent loading={false} breadcrumbTitle={"New pallet report"} previousTitle={"list"} title={"Create new pallet weight report"} />
      <br />
      <Card>
        <Table size="small" columns={columns} dataSource={rows} pagination={false} rowKey={(_, index) => String(index)} />
        <Row justify="space-between" style={{ marginTop: 20 }} gutter={[0, 20]}>
          <Col>
            <Button icon={<PlusOutlined />} onClick={addRow}>
              Add Row
            </Button>
          </Col>
          <Col>
            <Space>
              <Button onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="primary" onClick={submitAll} loading={loading}>
                Submit All
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
      <ContractorSelectComponent show={contractorShow} onHide={() => setContractorShow(!contractorShow)} onSelect={(e) => console.log(e)} />
    </>
  )
}

export default PalletCreatePage
