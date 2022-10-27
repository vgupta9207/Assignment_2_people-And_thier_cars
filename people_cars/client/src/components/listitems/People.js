import { useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import DeletePerson from '../buttons/DeletePerson'
import UpdatePeople from '../forms/UpdatePeople'
import Car from './Car'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})
const People = props => {
  const { id, firstName,lastName,carMap} = props
  const styles = getStyles()

  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => setEditMode(!editMode)
 
  return (
    <>
      {editMode ? (
        <UpdatePeople
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <DeletePerson id={id}  />
          ]}
        >
          {firstName}
          {lastName }
          
          {carMap.map(({ id, year, model ,price}) => (
            <Car key={id} id={id} year={year} model={model} price={price} />
          ))}
        </Card>
      )}
    </>
  )
}

export default People