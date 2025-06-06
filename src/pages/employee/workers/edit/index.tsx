/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Form, Input, Row } from "antd"
import AppBarComponent from "../../../../components/Appbar"
import { useEffect, useMemo, useState } from "react"
import { WorkerType } from "../../../../types/employee/worker"
import { useNavigate, useParams } from "react-router-dom"
import { formEditFinished, formEditStarted } from "../../../../store/formState/reducer"
import { useDispatch, useSelector } from "react-redux"
import { isNil } from "lodash"
import { selectWorkerGetOneState, workerGetOneInitial, workerGetOneRequest } from "../../../../store/Employee/Worker/getOne/reducer"
import { useCurrentGroup } from "../../../../hooks/group"
import ImagePicker from "../../../../components/ImagePicker"
import { ImageState } from "../../../../types/image"
import { workerEditOneRequest } from "../../../../store/Employee/Worker/editOne/reducer"

const WorkerCreatePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [touched, setTouched] = useState(false)
  const { config } = useCurrentGroup()
  const { data, loading} = useSelector(selectWorkerGetOneState)
  const [profile, setProfile] = useState<ImageState | null>(null)
  const { id } = useParams()
  const isEdit = useMemo(() => !isNil(id), [id])

  useEffect(() => {
    console.log("Called")
    if (isEdit && id && config.path) {
      dispatch(
        workerGetOneRequest({
          config,
          id: id,
          onSuccess: (val) => {
            console.log(val)

          },
        })
      )
    } else {
      dispatch(workerGetOneInitial())
    }
  }, [isEdit, config, id])

  const cancel = () => {
    if (!touched) {
      dispatch(formEditFinished())
    }
    navigate(-1)
  }

  const onSubmit = (val: WorkerType) => {
    console.log(val)
    const payload: WorkerType = {
      ...val,
      profilePicture: data?.data.profilePicture ?? null,
    }
    dispatch(workerEditOneRequest({ config, data: payload, id: id, image: profile ?? null, navigate: navigate }))
    dispatch(formEditFinished())
  }

  return (
    <>
      <AppBarComponent loading={false} breadcrumbTitle={"Add a new Worker"} previousTitle={"list"} title={"Add new worker"} />
      <br />
      <Form
        layout="vertical"
        initialValues={isEdit ? data?.data ?? {} : {}}
        onFinish={onSubmit}
        onChange={() => setTouched(true)}
        scrollToFirstError
        onFocus={() => dispatch(formEditStarted())}
      >
        <Card loading={loading}>
          <Row gutter={[20, 10]}>
            <Col lg={12} sm={24}>
              <Row gutter={[20, 20]}>
                <Col>
                  <ImagePicker data={profile} image={data?.data.profilePicture} onChange={(image) => setProfile(image)} />
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
                  <Form.Item<WorkerType> name={"firstName"} label="First name" rules={[{ required: true, message: "Please input the first name!" }]}>
                    <Input placeholder="Jane" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<WorkerType> name={"lastName"} label="Last name" rules={[{ required: true, message: "Please input the last name!" }]}>
                    <Input placeholder="Smith" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col lg={12} sm={24}>
              <Form.Item<WorkerType> name={"phoneNumber"} label="Phone number (Optional)" style={{ marginTop: 15 }}>
                <Input placeholder="0491008800" />
              </Form.Item>
              <Form.Item<WorkerType> name={"email"} label="Email (Optional)">
                <Input placeholder="JaneSmith@domain.com" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"end"}>
            <Col>
              <Row gutter={20} justify={"center"}>
                <Col span={11}>
                  <Button type="primary" htmlType="submit" className="mr-4" loading={loading}>
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
        </Card>
      </Form>
    </>
  )
}

export default WorkerCreatePage
