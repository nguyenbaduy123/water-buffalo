import { Flex, Button, Form, type FormProps, Input, notification } from 'antd'
import React from 'react'
import Router from 'next/router'
import { NextPage } from 'next'
import { useAppDispatch } from 'hooks'

import { getUserAuth, loginSuccess } from 'actions/auth'
import LifeApi from 'api/LifeApi'
import AuthLayout from 'layouts/AuthLayout'
import { notificationError, redirectGoogleLogin } from 'utils'

type FieldType = {
  username: string
  password: string
}

const Login: NextPage = () => {
  const dispatch = useAppDispatch()

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const resp = await LifeApi.login(values)

    if (resp.success) {
      dispatch(loginSuccess(resp))
      await dispatch(getUserAuth())
      Router.push('/dashboard')
    } else {
      notificationError(resp.message || 'Login failed')
    }
  }

  return (
    <AuthLayout>
      <div className="login-web">
        <img src="/elixir.svg" width={180} height={180} />
        <h2>Sign in to WB</h2>
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
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="login-button" type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

      <div className="create-new-account">
        <span>Don't have an account?</span>
        <Button
          type="link"
          onClick={() => {
            Router.push('/auth/signup', '/signup')
          }}
        >
          Create an account
        </Button>
      </div>

      <div className="third-party-login">
        <div className="login-with-google" onClick={redirectGoogleLogin}>
          <img src="/google.svg" width={20} height={20} />
          <span>Login with Google</span>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login
