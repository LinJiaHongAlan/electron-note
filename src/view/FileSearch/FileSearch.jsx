import React, { memo, useState } from 'react'
import { FileSearchWrapper } from './style';
import { Button, Input } from 'antd';
import { createGuid } from '../../utils/common'
import { useContextMenu } from '../../hooks/useContextMenu'
import { getParentNode } from '../../utils/helper'
import useIpcRenderer from '../../hooks/useIpcRenderer'
import {
  FileFilled,
  CloseCircleFilled
} from '@ant-design/icons';

const { Search } = Input;
const remote = window.require('@electron/remote')

const FileSearch = memo((props) => {
  const { files, onFileClick, changeText, deleteHandel, createItem, importFiles } = props

  const [isEdit, setIsEdit] = useState('')
  const [searchText, setSearchText] = useState('')

  const filterFiles = searchText === '' ? files : files.filter(file => {
    return file.title.includes(searchText)
  })

  // 右键上下文菜单
  const clickedItem = useContextMenu([
    {
      label: '打开',
      click () {
        const parentElement = getParentNode(clickedItem.current, 'fileSearch-row')
        onFileClick(parentElement.dataset.id)
      }
    },
    {
      label: '编辑',
      click () {
        const parentElement = getParentNode(clickedItem.current, 'fileSearch-row')
        setIsEdit(parentElement.dataset.id)
      }
    },
    {
      label: '删除',
      click () {
        const parentElement = getParentNode(clickedItem.current, 'fileSearch-row')
        deleteItem(parentElement.dataset.id)
      }
    }
  ], '.fileSearch-rowbox', [files])

  const onSearch = (value) => {
    setSearchText(value)
  }

  const changeTextHandel = (fileItem, el) => {
    const value = el.target.value
    if (fileItem.isNew === true) {
      if (value === '') {
        // 删除
        deleteItem(fileItem.id)
        return
      }
    }
    setIsEdit('')
    changeText && changeText(fileItem, value)
  }

  // 删除按钮
  const deleteItem = (id) => {
    deleteHandel && deleteHandel(id)
  }

  // 新增
  const createItemHandel = () => {
    const item = {
      id: createGuid(),
      title: '',
      body: '## 新增一个',
      createdAt: new Date().getTime(),
      isNew: true
    }
    createItem && createItem(item)
  }

  // 关闭
  const closeItemHandel = (e, fileItem) => {
    e.stopPropagation()
    if (fileItem.isNew) {
      deleteItem(fileItem.id)
    } else {
      setIsEdit('')
    }
  }

  // 导入文件
  const importFilesHandel = () => {
    importFiles && importFiles()
  }

  // 监听主进程传出的事件
  useIpcRenderer({
    // 新增文件
    'create-new-file': createItemHandel,
    'import-file': importFilesHandel
  })
  

  return (
    <FileSearchWrapper>
      <div className="fileSearch-header">
        <Search placeholder="输入搜素内容" onSearch={onSearch} style={{ width: 200 }} />
      </div>
      <div  className="fileSearch-listbox">
        <div className='fileSearch-rowbox'>
          {
            filterFiles.map((fileItem, index) => {
              const isShowInput = isEdit === fileItem.id || fileItem.isNew

              return (
                <div key={fileItem.id} data-id={fileItem.id} onClick={() => { onFileClick && onFileClick(fileItem.id) }} className="fileSearch-row">
                  {
                    isShowInput && (
                      <>
                        <Input onPressEnter={(el) => { changeTextHandel(fileItem, el) }} defaultValue={fileItem.title} />
                        <CloseCircleFilled onClick={(e) => { closeItemHandel(e, fileItem) }} />
                      </>
                    )
                  }
                  {
                    !isShowInput && (
                      <>
                        <div className='fileSearch-row-left'>
                          <div className='fileSearch-row-left-icon'>
                            <FileFilled />
                          </div>
                          <div className='fileSearch-row-left-label'>
                            { fileItem.title }
                          </div>
                        </div>
                        <div className='fileSearch-row-right'>
                        </div>
                      </>
                    )
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </FileSearchWrapper>
  );
})

export default FileSearch;