import { gql } from 'apollo-server-express'
import { people, cars } from './peopleCarsScheme.js'
import pkg from 'lodash';


const {find, remove,filter} = pkg;


const typeDefs = gql`
    type Person {
        id : String!
        firstName : String
        lastName : String
      }
      type Car {
        id: String!
        year: Int!
        make: String!
        model: String!
        price: Float!
        personId: String!
      }

      type Query {
        person(id: String!): Person
        people: [Person]
        car(id: String!): Car
        cars: [Car]
        personWithCars(personId: String!): [Car]
      }

      type Mutation {
        addPeople(id : String!, firstName : String!, lastName : String!) : Person
        addCars(year: Int!, make : String!, model: String!, price: Float!, personId: String!,id: String!) : Car
        updatePeople(id : String!, firstName: String!, lastName: String!) : Person
        updateCar(year: Int!, make : String!, model: String!, price: Float!, personId: String!,id: String!) : Car
        deletePeople(id : String!, firstName : String!, lastName : String!) : Person  
        deleteCar( year: Int!, make : String!, model: String!, price: Float!, personId: String!,id: String!) : Car
      }
`

const resolvers = {
  Query: {
    people: () => people,
    person: (root, args) => {
      return find(people, { id: args.id })
    },
    cars: () => cars,
    car: (root, args) => {
      return find(cars, {id:args.id})
    },
    personWithCars:(root,args)=>{
      
      return filter(cars, {personId:args.personId})
    }
  } ,
  
  Mutation : {
    addPeople(root, args) {
      const {id, firstName, lastName} = args
      const newPeople = {
          id : id,
          firstName : firstName,
          lastName : lastName
      }
      people.push(newPeople)
      return newPeople
    },

    addCars(root, args) {
        const {year, make, model, price, personId, id} = args
        const newCar = {
            id : id,
            personId : personId,
            year : year,
            make : make,
            model : model,
            price  : price
        }

        cars.push(newCar)
        return newCar
    },

    updatePeople(root, args) {
      const peopleToUpdate = find(people, {id : args.id})

      if (!peopleToUpdate) {
        throw new Error(`Couldn't find person with id ${args.id}`)
      }

      peopleToUpdate.firstName = args.firstName
      peopleToUpdate.lastName = args.lastName

      return peopleToUpdate
    },

    updateCar(root, args) {
      const carToUpdate = find(cars, {id : args.id})


      if (!carToUpdate) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }
      const {make, model, year, price, personId} = args


     
      carToUpdate.make = make
      carToUpdate.year = year
      carToUpdate.price = price
      carToUpdate.make = make
      carToUpdate.personId = personId
      carToUpdate.model = model

      return carToUpdate
    },

    deletePeople(root, args) {
      const peopleToDelete = find(people, {id : args.id})
      remove(person, {id :args.id})
      remove(cars, {personId : args.id})

      return peopleToDelete
    },

    deleteCar(root, args) {
      const carToDelete = find(cars, {id: args.id})
      remove(cars, {id : args.id})

      return carToDelete
    },
  }
}

export {typeDefs, resolvers}