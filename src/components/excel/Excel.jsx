import { useState } from 'react'
import { buildXlsx, readXlsxToJson } from '../../utils/excel'

const Excel = () => {
  const [groups, setGroups] = useState([])

  const tempalteClickHandler = () => {
    buildXlsx([clientsGroupsModel], 'Client Groups')
  }

  const mockClickHandler = () => {
    var data = buildClientsGroups(50)
    buildXlsx(data, 'Client Groups')
  }

  const uploadFile = async e => {
    const file = e.target.files[0]
    var data = await readXlsxToJson(file)
    setGroups(data)
  }

  return (
    <div>
      <div>
        <button onClick={tempalteClickHandler}>generate template</button>
        <button onClick={mockClickHandler}>generate mock</button>
        <input
          type='file'
          onChange={uploadFile}
          onClick={event => {
            event.target.value = null
          }}
        />
      </div>
      <div>
        {groups.map((grp, i) => (
          <div key={grp.groupId} style={{ display: 'flex', gap: 10 }}>
            <div>{grp.groupId}</div>
            <div>{grp.clientIdNumber}</div>
            <div>{grp.groupName}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Excel

export const buildClientsGroups = (clientsCount = 10) => {
  let result = []
  for (let i = 0; i < clientsCount; i++)
    result.push({
      groupId: i,
      clientIdNumber: i,
      groupName: `group #${i}`,
    })
  return result
}

export const clientsGroupsModel = {
  groupId: '',
  clientIdNumber: '',
  groupName: '',
}
