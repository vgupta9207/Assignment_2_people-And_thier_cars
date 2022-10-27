import { useQuery } from '@apollo/client'
import { List } from 'antd'
import { GET_CAR } from "../../queries/gql"
import Car from '../listItems/Car'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Cars = () => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_CAR)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.cars.map(({  id, year, make,model,personId,price }) => (
        <List.Item key={id}>
           <Car id={id}
          year={year}
          make={make}
          model={model}
          personId={personId}
          price={price} />
        </List.Item>
      ))}
    </List>
  )
}

export default Cars