import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'

import { GET_PEOPLE, DELETE_PERSON } from '../../queries/gql'

import filter from 'lodash.filter'

const DeletePerson = ({ id }) => {
    console.log("Entery")
  const [DeletePerson] = useMutation(DELETE_PERSON, {
    update(cache, { data: { DeletePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE })
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
         people: filter(people, o => {
            return o.id !== DeletePerson.id
          })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this Person?')

    if (result) {
      DeletePerson({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
}

export default DeletePerson