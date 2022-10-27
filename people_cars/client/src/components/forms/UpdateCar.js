import { useMutation,useQuery } from '@apollo/client'
import { Button, Form, Input,Select } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_CAR ,GET_PEOPLE} from '../../queries/gql'

const UpdateCar = props => {
  const { id, year, make, model, price, personId } = props
  const [updateCar] = useMutation(UPDATE_CAR)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()


  useEffect(() => {
    forceUpdate({})
  }, [])

  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const onFinish = values => {
    const { year, make, model, price, personId } = values

    updateCar({
      variables: {
        id,
        year, make, model, price, personId
      }
    })

    props.onButtonClick()
  }

  return (
    <Form
      form={form}
      name='update-Car-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        year:year, make:make, model:model, price:price, personId:personId
      }}
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
              (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button type='danger' onClick={props.onButtonClick}>
        Cancel
      </Button>
    </Form>
  )
}

export default UpdateCar