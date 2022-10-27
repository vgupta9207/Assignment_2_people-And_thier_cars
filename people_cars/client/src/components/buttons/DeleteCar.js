import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'

import { GET_CARS, DELETE_CAR } from '../../queries/gql'

import filter from 'lodash.filter'

const DeleteCar = ({ id }) => {
  const [deleteCar] = useMutation(DELETE_CAR, {
    update(cache, { data: { deleteCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS })
      cache.writeQuery({
        query: GET_CARS,
        data: {
          contacts: filter(cars, o => {
            return o.id !== deleteCar.id
          })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this Car?')

    if (result) {
      deleteCar({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
}

export default DeleteCar