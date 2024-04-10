import { Flex, Button, Form, type FormProps, Input } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'

import { getUserAuth, loginSuccess } from 'actions/auth'
import { AppDispatch } from 'store'
import LifeApi from 'api/LifeApi'
import './index.scss'
import Router from 'next/router'

type FieldType = {
  username: string
  password: string
}

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const resp = await LifeApi.login(values)

    if (resp.success) {
      dispatch(loginSuccess(resp))
      await dispatch(getUserAuth())
      Router.push('/dashboard')
    }
  }

  return (
    <div className="login-page">
      <Flex className="login-page-container" justify="center" align="center">
        <div className="login-content">
          <div className="login-web">
            <img src="/elixir.svg" width={180} height={180} />
            <h2>Sign in to BWork</h2>
          </div>
          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item<FieldType>
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username or email address!',
                },
              ]}
            >
              <Input placeholder="Username or email address" />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button className="login-button" type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Flex>
    </div>
  )
}

export default Login
