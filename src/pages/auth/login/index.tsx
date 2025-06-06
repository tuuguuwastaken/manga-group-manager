import React, { useState } from "react"
import { Button, Input, Form, Alert, Row, Col, Checkbox, Card } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, selectLoginState } from "../../../store/auth/login/reducer"
import { LoginType } from "../../../types/user"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/background.png");

  & > .container {
    display: block;
  }

  p.hint {
    font-size: 12px;
  }

  .forgot-btn {
    color: rgba(0, 0, 0, 0.65);
    font-size: 0.8rem;
    text-decoration: underline;
  }
`

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(selectLoginState)
  interface FormType {
    username: string
    password: string
    remember: boolean
  }
  const [state] = useState<FormType>({
    username: "",
    password: "",
    // username: "naranbat@ailab.mn",
    // password: "Test1234",
    remember: false,
  })

  const handleLogin = (val: LoginType) => {
    console.log(val)
    const payload: LoginType = {
      username: val.username,
      password: val.password,
      navigate: navigate,
    }
    dispatch(loginUser({ ...payload }))
  }

  return (
    <Wrapper>
      <div className="container">
        <Row>
          <Col span={24}>
            <Card className="pt-3">
              <Form layout="vertical" onFinish={handleLogin} initialValues={state}>
                <Form.Item<FormType> label="Email or username" name={"username"}>
                  <Input />
                </Form.Item>
                <Form.Item<FormType> label="Password" name={"password"}>
                  <Input.Password />
                </Form.Item>
                <Row align={"middle"} justify={"center"}>
                  <Col>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Login
                    </Button>
                  </Col>
                </Row>
                <Row justify="space-between" align="middle" className="mb-4 mt-10">
                  <Col span={24}>
                    <Form.Item<FormType> name="remember" valuePropName="checked" className="m-0">
                      <Checkbox>Remember</Checkbox>
                    </Form.Item>
                  </Col>
                  {/* <Col>
                <Link to="/forgot-password" className="forgot-btn">
                  Нууц үг мартсан
                </Link>
              </Col> */}
                </Row>
                {error && <Alert type="error" message={error} />}
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </Wrapper>
  )
}

export default Login
