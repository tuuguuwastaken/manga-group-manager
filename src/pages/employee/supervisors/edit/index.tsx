/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Divider, Form, Input, Row, Select } from "antd"
import AppBarComponent from "../../../../components/Appbar"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { formEditFinished, formEditStarted } from "../../../../store/formState/reducer"
import { useDispatch, useSelector } from "react-redux"
import { isNil } from "lodash"
import { useCurrentGroup } from "../../../../hooks/group"
import ImagePicker from "../../../../components/ImagePicker"
import { ImageState } from "../../../../types/image"
import { supervisorEditOneRequest } from "../../../../store/Employee/Supervisor/editOne/reducer"
import { selectSupervisorGetOneState, supervisorGetOneRequest, supervisorGetOneInitial } from "../../../../store/Employee/Supervisor/getOne/reducer"
import { SupervisorType } from "../../../../types/employee/supervidor"
import { selectWorkerGetListState, workerGetListRequest } from "../../../../store/Employee/Worker/getList/reducer"
import { WorkerType } from "../../../../types/employee/worker"
import { useForm } from "antd/es/form/Form"

const SupervisorCreatePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [touched, setTouched] = useState(false)
  const { config } = useCurrentGroup()
  const [form] = useForm()
  const { data, loading } = useSelector(selectSupervisorGetOneState)
  const [worker, setWorker] = useState<WorkerType | null>(null)
  const { data: workerList } = useSelector(selectWorkerGetListState)
  const [profile, setProfile] = useState<ImageState | null>(null)
  const [workerId, setWorkerId] = useState<string | null>(null)
  const { id } = useParams()
  const isEdit = useMemo(() => !isNil(id), [id])

  useEffect(() => {
    if (id) {
      setWorkerId(id)
    }
  }, [id])

  useEffect(() => {
    dispatch(workerGetListRequest({ config }))
    if (isEdit && id && config.path) {
      dispatch(
        supervisorGetOneRequest({
          config,
          id: id,
        })
      )
    } else {
      dispatch(supervisorGetOneInitial())
    }
  }, [isEdit, config, id, dispatch])

  useEffect(() => {
    if (workerId) {
      setWorker(workerList?.find((e) => e.id === workerId)?.data ?? null)
    }
  }, [workerId])

  useEffect(() => {
    if (worker && !isEdit) {
      form.setFieldsValue({
        supervisorEmail: worker.email,
        supervisorNumber: worker.phoneNumber,
        supervisorWorkplace: worker.workplace,
        kakaoTalk: "",
      })
    }
  }, [form])

  const cancel = () => {
    if (!touched) {
      dispatch(formEditFinished())
    }
    navigate(-1)
  }

  const onSubmit = (val: SupervisorType) => {
    console.log(val)
    const payload: SupervisorType = {
      ...val,
      supervisorPicture: data?.data.supervisorPicture || worker?.profilePicture || null,
    }
    dispatch(supervisorEditOneRequest({ config, data: payload, id: id, image: profile ?? null, navigate: navigate }))
  }

  return (
    <>
      <AppBarComponent loading={false} breadcrumbTitle={"Add a new Supervisor"} previousTitle={"list"} title={"Add new supervisor"} />
      <br />
      <Form
        layout="vertical"
        initialValues={isEdit ? data?.data ?? {} : {}}
        onFinish={onSubmit}
        onChange={() => setTouched(true)}
        scrollToFirstError
        form={form}
        onFocus={() => dispatch(formEditStarted())}
      >
        <Card loading={loading}>
          {!isEdit && (
            <>
              {" "}
              <Row gutter={[20, 10]}>
                <Col span={24}>
                  <Form.Item<SupervisorType> name={"workerId"} label="Select Worker">
                    <Select placeholder="jane Smith" onChange={(e) => setWorkerId(e)}>
                      {workerList?.map((e) => {
                        return (
                          <>
                            <Select.Option key={e.id}>{`${e.data.firstName} ${e.data.lastName}`}</Select.Option>
                          </>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Divider></Divider>
            </>
          )}
          {workerId && (
            <>
              <Row gutter={[20, 10]}>
                <Col lg={12} sm={24}>
                  <Row gutter={[20, 20]} style={{ marginBottom: 10 }}>
                    <Col>
                      <ImagePicker
                        data={profile}
                        image={data?.data.supervisorPicture || worker?.profilePicture}
                        onChange={(image) => setProfile(image)}
                      />
                    </Col>
                    <Col>
                      <p>
                        <strong>Picture</strong>
                      </p>
                      <p>Size: Max 2 MB </p>
                      <p></p>
                    </Col>
                  </Row>

                  <Row gutter={20}>
                    <Col span={12}>
                      <Form.Item<SupervisorType>
                        name={"kakaoTalk"}
                        label="KakaoTalk"
                        rules={[{ required: true, message: "Please input this field!" }]}
                      >
                        <Input placeholder="JaneSmith1999" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<SupervisorType>
                        name={"supervisorEmail"}
                        label="Supervisor Email ( optional ) "
                        rules={[{ required: false, message: "Please input the last name!" }]}
                      >
                        <Input placeholder="Smith" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col lg={12} sm={24} style={{ marginTop: 10 }}>
                  <Form.Item<SupervisorType> name={"supervisorNumber"} label="Phone number (Optional) :" style={{ marginTop: 15 }}>
                    <Input placeholder="0491008800" />
                  </Form.Item>
                  <Form.Item<SupervisorType> name={"supervisorWorkplace"} label="Workplace :">
                    <Input placeholder="workplace" />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify={"end"}>
                <Col>
                  <Row gutter={20} justify={"center"}>
                    <Col span={11}>
                      <Button type="primary" htmlType="submit" className="mr-4" loading={loading} disabled={!workerId}>
                        Submit
                      </Button>
                    </Col>
                    <Col span={11}>
                      <Button type="default" onClick={cancel}>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          )}
        </Card>
      </Form>
    </>
  )
}

export default SupervisorCreatePage
