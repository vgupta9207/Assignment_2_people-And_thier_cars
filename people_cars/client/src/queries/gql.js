import { gql } from '@apollo/client'

export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
    }
  }
`
export const GET_CAR = gql`
        query Query {
            cars {
            id
            year
            make
            model
            price
            personId
            }
        }

`
export const GET_PERSON = gql`
query Query($personId: String!) {
  people(id: $personId) {
    id
    firstName
    lastName
  }
}`

export const GET_PERSON_WITH_CARS = gql`
query Query($personId: String!) {
  personWithCars(personId: $personId) {
    id
    year
    make
    model
    price
    personId
  }
}`

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPeople(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const ADD_CAR = gql`
  mutation AddCar($id: String!,  $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
    addCar(id: $id,  year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
    make
    model
    price
    personId
    }
  }
`

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!,  $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
    updateCar(id: $id,  year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
    make
    model
    price
    personId
    }
  }
`


export const DELETE_PERSON = gql`
  mutation DeletePerson($id: String!) {
    DeletePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`
export const DELETE_CAR = gql`
  mutation DeleteCar($id: String!) {
    deleteCar(id: $id) {
        id
        year
        make
        model
        price
        personId
    }
  }
`