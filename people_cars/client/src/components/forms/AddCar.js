import { useEffect, useState } from 'react'
import { useMutation,useQuery } from '@apollo/client'
import { Button, Form, Input ,Select} from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_CAR, GET_PEOPLE } from '../../queries/gql'
import Title from '../layouts/Title'

const AddCar = () => {
  const [id] = useState(uuidv4())
  const [AddCar] = useMutation(ADD_CAR)
  const [personId, setPersonId] = useState("")

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const onFinish = values => {
    let { year, make, model, price, personId } = values
    console.log("Id",personId)
    year=parseInt(year)
    price=parseFloat(price)

    AddCar({
      variables: {
       id, year, make, model, price, personId
      },
      update: (cache, { data: { AddCar } }) => {
        const data = cache.readQuery({ query: GET_CAR })
        cache.writeQuery({
          query: GET_CAR,
          data: {
            ...data,
            cars: [...data.cars, AddCar]
          }
        })
      }
    })
  }

  return (
    <>
    <Title title="Add Car"/>
    <Form
      form={form}
      name='add-contact-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input your car year!' }]}
      >
        <Input max={2022}  placeholder='YEAR'/>
      </Form.Item>
      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input your car make!' }]}
      >
        <Input placeholder='MAKE' />
      </Form.Item>
      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input your car model!' }]}
      >
        <Input placeholder='MODEL' />
      </Form.Item>
      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input your car price!' }]}
      >
        <Input placeholder='PRICE' step="0.01" type="currency"/>
        
      </Form.Item>
      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please select the owner!' }]}
      >
      <Select
                style={{ width: "180px" }}
                placeholder="Select the owner ID"
                name='personId'
                onChange={(value) => {setPersonId(value); console.log(personId)}
                }
              >
                {data.people.map((data) => (
                  <Select.Option key={data.id} value={data.id}>
                    {data.id}
                  </Select.Option>
                ))
                }

              </Select>
              </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>

  </Form>
  </>
  )
}

export default AddCar