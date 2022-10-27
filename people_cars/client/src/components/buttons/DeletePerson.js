import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'

import { GET_PEOPLE, DELETE_PERSON } from '../../queries/gql'

import filter from 'lodash.filter'

const DeleteCar = ({ id }) => {
  const [deletePerson] = useMutation(DELETE_PERSON, {
    update(cache, { data: { deletePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE })
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          contacts: filter(people, o => {
            return o.id !== deletePerson.id
          })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this Car?')

    if (result) {
      deletePerson({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
}

export default DeleteCar