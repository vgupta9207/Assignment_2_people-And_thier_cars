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

const PeopleList = props => {
  const styles = getStyles()
const {peopleWithCars}=props
 
  console.log(peopleWithCars)

  return (
    <>
    <Title title="Records"/>
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {peopleWithCars.map(({  id,
          firstName,
          lastName,carMap}) => (
        <List.Item key={id}>
           <People id={id}
          firstName={firstName}
          lastName={lastName}>
          carMap:{carMap} 
</People>
        </List.Item>
      ))}
    </List>
    </>
  )
}

export default PeopleList