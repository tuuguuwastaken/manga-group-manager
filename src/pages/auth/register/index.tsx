import React, { useState } from "react"
import { Button, Input, Form, Alert, Row, Col, Checkbox, Card } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { RegisterType, registerUser, selectRegisterState } from "../../../store/auth/register/reducer"
import { CheckboxChangeEvent } from "antd/es/checkbox"

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

const Register: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isGroup, setIsGroup] = useState(false)

  const { loading, error } = useSelector(selectRegisterState)

  interface FormType {
    username: string
    password: string
    confirmPassword: string
    remember: boolean
    isGroup: boolean
    orgName?: string
    orgEmail?: string
  }

  const handleRegister = (val: FormType) => {
    const payload: RegisterType = {
      orgName: val.orgName,
      orgEmail: val.orgEmail,
      username: val.username,
      password: val.password,
      type: val.isGroup ? "GROUP" : "USER",
      navigate: navigate,
    }
    dispatch(registerUser(payload))
  }

  const handleGroupCheck = (val: CheckboxChangeEvent) => {
    setIsGroup(val.target.checked)
  }

  return (
    <Wrapper>
      <div className="container">
        <Row>
          <Col span={24}>
            <Card className="pt-3" title="Register">
              <Form layout="vertical" onFinish={handleRegister}>
                <Form.Item<FormType> label="Email or Username" name="username" rules={[{ required: true, message: "Please enter your username" }]}>
                  <Input />
                </Form.Item>

                <Form.Item<FormType>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                    { min: 8, message: "Password must be at least 8 characters" },
                    {
                      pattern: /(?=.*[A-Z])(?=.*\d)/,
                      message: "Password must contain at least one uppercase letter and one number",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item<FormType>
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error("Passwords do not match"))
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                {isGroup ? (
                  <>
                    <Form.Item<FormType> label="Group name" name={"orgName"} rules={[{ required: true }]}>
                      <Input type="text" />
                    </Form.Item>
                    <Form.Item<FormType> label="Group email (optional) " name={"orgEmail"}>
                      <Input type="text"></Input>
                    </Form.Item>
                  </>
                ) : null}

                {!isGroup && (
                  <>
                    <Form.Item<FormType> label="Invite code ( optional )">
                      <Input></Input>
                    </Form.Item>
                  </>
                )}

                <Form.Item<FormType> name="isGroup" valuePropName="checked">
                  <Checkbox onChange={handleGroupCheck}>Register as a Group</Checkbox>
                </Form.Item>

                <Row align="middle" justify="center">
                  <Col>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Register
                    </Button>
                  </Col>
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

export default Register
