
import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PEOPLE, GET_PERSON_WITH_CARS} from "../../queries/gql";
import AddCar from "../forms/AddCar";
import AddPeople from "../forms/AddPeople";
import PeopleList from "./PeopleList";
 const PeopleWithCars=props=> {
  
console.log("Entry")
    const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
console.log(data)
console.log(error)


  const peopleWithCars = data.people.map((person) => {
    return {
      ...person,
      carMap: data.cars.filter((car) => car.personId === person.id),
    };
  });
  return (
    <div>
    
      <PeopleList peopleWithCars={peopleWithCars} />
    </div>
  );
}

export default PeopleWithCars