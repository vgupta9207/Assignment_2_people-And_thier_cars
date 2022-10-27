import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form, Input ,Select} from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { ADD_PERSON, GET_PEOPLE } from '../../queries/gql'
import Title from '../layouts/Title'

const AddPeople = () => {
  const [id] = useState(uuidv4())
  const [AddPerson] = useMutation(ADD_PERSON)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    let { firstName,lastName } = values

    AddPerson({
      variables: {
       id,firstName,lastName
      },
      update: (cache, { data: { AddPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE })
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            cars: [...data.people, AddPerson]
          }
        })
      }
    })
  }

  return (
    <>
    <Title title="Add Person"/>
    <Form
      form={form}
      name='add-contact-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
      <Form.Item
        name='firstName'
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input placeholder='First Name' />
      </Form.Item>
      <Form.Item
        name='lastName'
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input placeholder='Last Name' />
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
            Add Person
          </Button>
        )}
      </Form.Item>
    </Form>
    </>
  )
}

export default AddPeople