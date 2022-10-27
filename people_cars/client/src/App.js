import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import AddCar from "./components/forms/AddCar";
import AddPeople from "./components/forms/AddPeople";
import Title from "./components/layouts/Title";
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PeopleList from './components/list/PeopleList';
import Cars from './components/list/Cars';
import PeopleWithCars from './components/list/PeopleWithCars';


const App=()=> {

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  })
  return (
   
    <ApolloProvider client={client}>
    <div className="App">
     <Title/>
     <AddPeople/>
     <AddCar/>
    <PeopleWithCars/>
    </div>
    </ApolloProvider>
    
  );
}

export default App;
