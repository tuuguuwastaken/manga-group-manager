/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Input, Modal, Row, Select } from "antd"
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"
import { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { palletWeightEditOneRequest, selectPalletWeightEditOneState } from "../../../store/pallets/editOne/reducer"
import { useCurrentGroup } from "../../../hooks/group"
import { PalletWeightType } from "../../../types/pallets"
import ContractorSelectComponent from "../../../components/modals/contractor/contractorSelect"
import AppBarComponent from "../../../components/Appbar"
import "./index.css"
import { contractorGetListRequest, selectContractorGetListState } from "../../../store/contractor/GetList/reducer"
import { DefaultOptionType } from "antd/es/select"

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

  const { loading } = useSelector(selectPalletWeightEditOneState)
  const { data: contractors, loading: contractorLoading } = useSelector(selectContractorGetListState)
  const [contractorShow, setContractorShow] = useState(false)
  const [rows, setRows] = useState<PalletWeightType[]>([{ contractor: undefined, block: undefined, weight: undefined, tray: undefined }])

  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  const onFetch = () => {
    console.log("fetching")
    if (config) {
      dispatch(contractorGetListRequest({ config }))
    }
  }

  const handleChange = (value: any, index: number, field: keyof PalletWeightType) => {
    const newRows = [...rows]
    newRows[index][field] = value
    setRows(newRows)
  }

  const contractorList: DefaultOptionType[] = useMemo(() => {
    const arr: DefaultOptionType[] = []
    contractors?.map((e) => {
      arr.push({
        label: e.data.name,
        value: e.id,
      })
    })

    return arr
  }, [contractors])

  const addRow = () => {
    const newIndex = rows.length
    setRows([...rows, { contractor: undefined, block: undefined, weight: undefined, tray: undefined }])
    setTimeout(() => {
      rowRefs.current[newIndex]?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 100)
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

  useEffect(() => {
    onFetch()
  }, [config])

  return (
    <>
      <AppBarComponent loading={false} breadcrumbTitle="New pallet report" previousTitle="list" title="New pallet report" />
      <br />
      {rows.map((row, index) => (
        <Card key={index} ref={(el) => (rowRefs.current[index] = el)} size="small" style={{ marginBottom: 12 }} className="pallet-form">
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Select
                placeholder="Select contractor"
                value={row.contractor}
                options={contractorList}
                size="large"
                loading={contractorLoading}
                onChange={(val) => handleChange(val, index, "contractor")}
                style={{ width: "100%", height: 88, fontSize: "64px" }}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    {/* <Divider /> */}
                    <Button type="link" block onClick={() => setContractorShow(true)}>
                      + Add new contractor
                    </Button>
                  </>
                )}
              />
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Select
                placeholder="Select block"
                value={row.block}
                options={blocks}
                onChange={(val) => handleChange(val, index, "block")}
                style={{ width: "100%", height: 88, fontSize: "64px" }}
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <Input
                placeholder="Weight"
                type="number"
                value={row.weight}
                onChange={(e) => handleChange(Number(e.target.value), index, "weight")}
                style={{ height: 88, fontSize: "32px" }}
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <Input
                placeholder="Trays"
                type="number"
                value={row.tray}
                onChange={(e) => handleChange(Number(e.target.value), index, "tray")}
                style={{ height: 88, fontSize: "32px" }}
              />
            </Col>
            <Col span={24}>
              <Button danger icon={<DeleteOutlined />} onClick={() => deleteRow(index)} block style={{ height: 80, fontSize: 26 }}>
                Remove Row
              </Button>
            </Col>
          </Row>
        </Card>
      ))}

      <Card>
        <Button type="primary" icon={<PlusOutlined />} onClick={addRow} style={{ height: 100, backgroundColor: "#49C6E5", fontSize: 26 }} block>
          Add Row
        </Button>

        <div style={{ marginTop: 24, borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
          <Row justify="end" gutter={[12, 12]}>
            <Col>
              <Button onClick={() => navigate(-1)}>Cancel</Button>
            </Col>
            <Col>
              <Button type="primary" onClick={submitAll} loading={loading}>
                Submit All
              </Button>
            </Col>
          </Row>
        </div>
      </Card>
      <ContractorSelectComponent show={contractorShow} onHide={() => {
        setContractorShow(false);
        onFetch()
      }}/>
    </>
  )
}

export default PalletCreatePage
