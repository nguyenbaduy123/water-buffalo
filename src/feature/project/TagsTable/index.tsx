import { Button, Flex, Modal, Table } from 'antd'
import SearchInput from 'common/SearchInput'
import React from 'react'
import { AppDispatch, RootState } from 'store'
import ModalAddTag from '../ModalAddTag'
import { COLORS } from 'utils/css'
import { fuzzySearch } from 'utils'
import { WarningCircle } from '@phosphor-icons/react'
import LifeApi from 'api/LifeApi'
import { updateProjectSuccess } from 'actions/project'

interface Props {
  currentProject: RootState['project']['currentProject']
  dispatch: AppDispatch
}

const TagsTable = ({ currentProject, dispatch }: Props) => {
  const tags = currentProject?.settings?.tags || []
  const [searchValue, setSearchValue] = React.useState('')
  const [openAddTag, setOpenAddTag] = React.useState(false)
  const [selectedTagIds, setSelectedTagIds] = React.useState<number[]>([])

  const resetState = () => {
    setSelectedTagIds([])
    setOpenAddTag(false)
  }

  const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
      width: 50,
      render: (index: number) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      render: (text: string, record: any) => (
        <div
          style={{
            width: 100,
            height: 20,
            backgroundColor: record.color,
            borderRadius: 12,
            border: '1px solid ' + COLORS.gray[7],
          }}
        />
      ),
    },
  ]

  const handleDeleteTags = async () => {
    if (!currentProject) return
    const resp = await LifeApi.deleteTags(currentProject.id, selectedTagIds)
    if (resp.success) {
      dispatch(
        updateProjectSuccess({
          project: {
            ...currentProject,
            settings: {
              ...currentProject.settings,
              tags: currentProject.settings.tags.filter(
                (tag) => !selectedTagIds.includes(tag.id)
              ),
            },
          },
        })
      )
      resetState()
    }
  }

  const handleConfirmDelete = () => {
    Modal.confirm({
      title: 'Do you want to delete these tags?',
      icon: <WarningCircle color={COLORS.orange[4]} size={24} />,
      content: 'This action cannot be undone. Please confirm!',
      onOk: handleDeleteTags,
    })
  }

  return (
    <div className="tags-table-container">
      <Flex className="tags-setting-header" justify="space-between">
        <div className="search-tag-input">
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search tags"
          />
        </div>
        <Flex gap={10}>
          {!!selectedTagIds.length && (
            <Button danger onClick={handleConfirmDelete}>
              Delete
            </Button>
          )}
          <Button type="primary" onClick={() => setOpenAddTag(true)}>
            Add Tag
          </Button>
        </Flex>
      </Flex>
      <Table
        bordered
        columns={columns}
        dataSource={tags
          .filter((tag) => fuzzySearch(searchValue, tag.name))
          .map((tag, index) => ({ ...tag, index }))}
        rowKey="id"
        rowSelection={{
          onChange: (selectedRowKeys) =>
            setSelectedTagIds(selectedRowKeys as number[]),
          selectedRowKeys: selectedTagIds,
        }}
        pagination={false}
      />

      <ModalAddTag
        currentProject={currentProject}
        open={openAddTag}
        onClose={() => setOpenAddTag(false)}
        dispatch={dispatch}
      />
    </div>
  )
}

export default TagsTable
