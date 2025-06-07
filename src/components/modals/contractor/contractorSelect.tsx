import { Button, Col, Form, Input, Modal, Row } from "antd"
import { useSelector } from "react-redux"
import { PlusOutlined } from "@ant-design/icons"
import { useForm } from "antd/es/form/Form"
import { ContractorType } from "../../../types/contractor"
import { useDispatch } from "react-redux"
import { useCurrentGroup } from "../../../hooks/group"
import { contractorEditOneRequest, selectContractorEditOneState } from "../../../store/contractor/EditOne/reducer"

export interface ContractorComponentProp {
  show: boolean
  onHide: () => void
  onSelect: (val: ListType) => void
}

interface ListType {
  value: string
  label: string
}

const ContractorSelectComponent: React.FC<ContractorComponentProp> = ({ show, onHide }) => {
  const { loading } = useSelector(selectContractorEditOneState)

  const dispatch = useDispatch()
  const { config } = useCurrentGroup()
  const [form] = useForm()

  const onClose = () => {
    form.resetFields()
    onHide()
  }

  const onSubmit = (val: ContractorType) => {
    const payload = {
      ...val,
    }

    dispatch(contractorEditOneRequest({ config, data: payload }))

    onHide()
  }
  return (
    <Modal loading={loading} footer={null} title="Add a new Contractor" centered open={show} onOk={onClose} onCancel={onClose}>
      <Form form={form} layout="vertical" scrollToFirstError onFinish={onSubmit}>
        <Row gutter={[0, 0]} align={"middle"} justify={"center"}>
          <Col span={24}>
            <Form.Item<ContractorType> name={"name"} label="Name :" rules={[{ required: true, message: "Please fill this field" }]}>
              <Input size="middle" style={{ width: "100%" }} placeholder="John"></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<ContractorType> name={"email"} label="Email :" rules={[{ required: true, message: "Please fill this field" }]}>
              <Input size="middle" style={{ width: "100%" }} placeholder="johnDoe@domain.com"></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<ContractorType> name={"number"} label="Phonenumber :" rules={[{ required: true, message: "Please fill this field" }]}>
              <Input size="middle" style={{ width: "100%" }} placeholder="0491088888"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Row justify={"end"} gutter={10}>
              <Col>
                <Button className="mt-1" htmlType="submit" loading={loading}>
                  <PlusOutlined /> Submit
                </Button>
              </Col>
              <Col>
                <Button className="mt-1" type="default" onClick={onClose}>
                  close
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ContractorSelectComponent
