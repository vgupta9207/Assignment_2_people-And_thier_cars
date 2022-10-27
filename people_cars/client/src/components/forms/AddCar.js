import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form, Input ,Select} from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_CAR } from '../../queries/gql'

const AddCar = () => {
  const [id] = useState(uuidv4())
  const [AddCar] = useMutation(ADD_CAR)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    let { year, make, model, price, personId } = values

    AddCar({
      variables: {
        year, make, model, price, personId
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
    <Form
      form={form}
      name='add-contact-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
      <Form.Item
        name='Year'
        rules={[{ required: true, message: 'Please input your car year!' }]}
      >
        <Input type="Number" max={2022}  placeholder='YEAR'/>
      </Form.Item>
      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input your car year!' }]}
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
  )
}

export default AddCar