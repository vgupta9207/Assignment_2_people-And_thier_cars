import { useQuery } from '@apollo/client'
import { List } from 'antd'
import {  GET_PEOPLE } from "../../queries/gql"
import People from '../listitems/People'
import Title from '../layouts/Title'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const PeopleList = () => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <>
    <Title title="Records"/>
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.people.map(({  id,
          firstName,
          lastName}) => (
        <List.Item key={id}>
           <People id={id}
          firstName={firstName}
          lastName={lastName} />
        </List.Item>
      ))}
    </List>
    </>
  )
}

export default PeopleList