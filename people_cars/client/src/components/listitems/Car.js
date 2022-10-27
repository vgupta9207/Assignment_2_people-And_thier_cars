import { useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import DeleteCar from '../buttons/DeleteCar'
import UpdateCar from '../forms/UpdateCar'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})
const Car = props => {
  const { id, year, model ,price} = props
  const styles = getStyles()

  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => setEditMode(!editMode)

  return (
    <>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          
          model={model}
          
          price={price}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <DeleteCar id={id} />
          ]}
        >
          {year}  {model}{"->"}{price}
        </Card>
      )}
    </>
  )
}

export default Car