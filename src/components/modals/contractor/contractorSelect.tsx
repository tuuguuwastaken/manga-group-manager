import { Button, Col, Empty, Modal, Row } from "antd"
import { useSelector } from "react-redux"
import { selectContractorGetListState } from "../../../store/contractor/GetList/reducer"
import { useMemo } from "react"
import { PlusOutlined } from "@ant-design/icons"

export interface ContractorComponentProp {
  show: boolean
  onHide: () => void
  onSelect: (val: ListType) => void
}

interface ListType {
  value: string
  label: string
}

const ContractorSelectComponent: React.FC<ContractorComponentProp> = ({ show, onHide, onSelect }) => {
  const { data, loading } = useSelector(selectContractorGetListState)

  const list: ListType[] = useMemo(() => {
    const arr: ListType[] = []
    // if (!data) return []
    data?.forEach((e) => {
      arr.push({
        value: e.id,
        label: e.data.name,
      })
    })
    arr.push({
      value: "hendry",
      label: "henry",
    })
    arr.push({
      value: "hendry1",
      label: "henry",
    })
    arr.push({
      value: "hendry2",
      label: "henry",
    })
    arr.push({
      value: "hendry3",
      label: "henry",
    })  
    return arr
  }, [data])

  const onClose = () => {
    // form.resetFields()
    onHide()
  }
  return (
    <Modal loading={loading} footer={null} title="Select contractor" centered open={show} onOk={onClose} onCancel={onClose}>
      <Row gutter={[20, 10]} align={"middle"} justify={"center"}>
        <Col span={24}>
          {list.length > 0 ? (
            <Row gutter={[12, 12]}>
              {list.map((item) => (
                <Col key={item.value} xs={24} sm={12} md={8} lg={6} xl={4}>
                  <div
                    onClick={() => onSelect(item)}
                    style={{
                      border: "1px solid #d9d9d9",
                      padding: "12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      textAlign: "center",
                      background: "#fafafa",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#e6f7ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#fafafa")}
                  >
                    {item.label}
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <Empty />
          )}
        </Col>
        <Col span={24}>
          <Row justify={"space-between"}>
            <Button className="mt-1" type="primary">
              <PlusOutlined /> Add new
            </Button>
            <Button className="mt-1" type="default" onClick={onClose}>
              close
            </Button>
          </Row>
        </Col>
      </Row>
    </Modal>
  )
}

export default ContractorSelectComponent
