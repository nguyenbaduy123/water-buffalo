import { useState } from 'react'
import { Button, Checkbox, Divider, Flex, Input } from 'antd'
import Router from 'next/router'

import { ProviderFC } from 'types/global'
import './index.scss'
import AuthLayout from 'layouts/AuthLayout'
import LifeApi from 'api/LifeApi'
import { errorNotification, successNotification } from 'utils'

const Signup = () => {
  const [step, setStep] = useState(0)
  const nextStep = () => setStep((prev) => prev + 1)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [invalidText, setInvalidText] = useState('')

  const renderContinueButton = (onClick?: () => void) => {
    let disabled

    switch (step) {
      case 0:
        disabled = !email
        break
      case 1:
        disabled = !password
        break
      case 2:
        disabled = !username
        break
    }

    return (
      <Button type="primary" disabled={disabled} onClick={onClick || nextStep}>
        Continue
      </Button>
    )
  }

  const validateEmail = async () => {
    const resp = await LifeApi.validateField({ email })

    if (resp.success) {
      nextStep()
    } else {
      setInvalidText(resp.message || 'Invalid email address')
    }
  }

  const validateUsername = async () => {
    const resp = await LifeApi.validateField({ username })

    if (resp.success) {
      nextStep()
    } else {
      setInvalidText(resp.message || 'Invalid username')
    }
  }

  const handleSignup = async () => {
    const resp = await LifeApi.signup({ email, password, username })

    if (resp.success) {
      successNotification('Signup success', 'You have successfully signed up')
      Router.push('/auth/login', '/login')
    } else {
      console.log('Signup failed')
      errorNotification('Signup failed', resp.message || 'Signup failed')
    }
  }

  const renderBoxStep = () => {
    const renderInfoField = (
      field: string,
      label: string,
      value: string,
      infoStep: number,
      onChange: (text: string) => void,
      onContinue?: () => void
    ) => {
      if (step < infoStep) return null
      return (
        <label htmlFor={field} className="info-field">
          <div className="label">{label}</div>
          <Flex align="center" gap={10}>
            <Input
              id={field}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            {step == infoStep && renderContinueButton(onContinue)}
          </Flex>
        </label>
      )
    }

    return (
      <div className="box-info">
        <div className="box-info-header">
          <h4>Welcome to Water Buffalo</h4>
          <h4>Let's Get Started</h4>
        </div>

        {renderInfoField(
          'email',
          'Enter your email *',
          email,
          0,
          setEmail,
          validateEmail
        )}

        {renderInfoField(
          'password',
          'Enter your password *',
          password,
          1,
          setPassword
        )}

        {renderInfoField(
          'username',
          'Enter your username *',
          username,
          2,
          setUsername,
          validateUsername
        )}

        {step == 3 && (
          <>
            <Divider />
            <Flex vertical gap={10}>
              <Checkbox>I agree to the terms and conditions</Checkbox>
              <Button type="primary" onClick={handleSignup}>
                Sign Up
              </Button>
            </Flex>
          </>
        )}
      </div>
    )
  }

  return (
    <AuthLayout>
      <div className="signup-page">
        <div className="signup-page-container">
          <ContainerBox>{renderBoxStep()}</ContainerBox>
        </div>
      </div>
    </AuthLayout>
  )
}

const ContainerBox: ProviderFC = ({ children }) => {
  return <div className="container-box">{children}</div>
}

export default Signup
