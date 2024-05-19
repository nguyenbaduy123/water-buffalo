import React from 'react'
import './index.scss'
import { Button, Flex, Input } from 'antd'
import UploadButton from 'common/UploadButton'
import { Asterisk, Plus, Spinner } from '@phosphor-icons/react'
import { FileUploaded } from 'types/global'
import withAuth from 'hocs/withAuth'
import { COLORS } from 'utils/css'
import LifeApi from 'api/LifeApi'
import { createOrganizationSuccess } from 'actions/organization'

const NewOrganization = () => {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [logoUrl, setLogoUrl] = React.useState('')

  const handleSubmit = async () => {
    const resp = await LifeApi.createOrganization({
      name,
      description,
      avatar_url: logoUrl,
    })

    if (resp.success) {
      createOrganizationSuccess({ organization: resp.organization })
    }
  }

  const uploadButton = (
    <button
      style={{ border: 0, background: 'none', width: 100, height: 100 }}
      type="button"
    >
      {loading ? <Spinner /> : <Plus />}
      <div style={{ marginTop: 8, color: '#fff' }}>Upload</div>
    </button>
  )

  const handleAfterUpload = (fileList: FileUploaded[]) => {
    if (fileList.length) {
      setLogoUrl(fileList[0].url)
    }
  }

  return (
    <div className="new-organization">
      <h1>Setup new organization</h1>
      <Flex gap={16}>
        <div className="organization-logo">
          <UploadButton
            onChangeDone={handleAfterUpload}
            accept="image/png, image/jpeg"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="avatar"
                width={100}
                height={100}
                style={{ borderRadius: '50%' }}
              />
            ) : (
              uploadButton
            )}
          </UploadButton>
        </div>
        <Flex
          className="organization-info"
          gap={24}
          style={{ width: '100%' }}
          vertical
        >
          <div className="organization-name">
            <div style={{ marginBottom: 12 }}>
              Organization Name <Asterisk color={COLORS.red[4]} size={12} />
            </div>
            <Input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="organization-description">
            <div style={{ marginBottom: 12 }}>
              Organization Description{' '}
              <Asterisk color={COLORS.red[4]} size={12} />
            </div>
            <Input.TextArea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={!name || !description}
          >
            Create Organization
          </Button>
        </Flex>
      </Flex>
    </div>
  )
}

export default withAuth(NewOrganization)
