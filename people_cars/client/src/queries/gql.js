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
{
  people {
    id
    firstName
    lastName
  }
  cars {
    id
    year
    make
    model
    price
    personId
  }
}
`;

export const ADD_PERSON = gql`
  mutation addPeople($id: String!, $firstName: String!, $lastName: String!) {
    addPeople(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const ADD_CAR = gql`
  mutation addCars($id: String!,$year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
    addCars(id: $id,  year: $year, make: $make, model: $model, price: $price, personId: $personId) {
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
  mutation updatePeople($id: String!, $firstName: String!, $lastName: String!) {
    updatePeople(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_CAR = gql`
  mutation updateCar($id: String!,  $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
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
  mutation deletePeople($id: String!) {
    deletePeople(id: $id) {
      id
      firstName
      lastName
    }
  }
`
export const DELETE_CAR = gql`
  mutation deleteCar($id: String!) {
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