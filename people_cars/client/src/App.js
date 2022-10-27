import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import AddCar from "./components/forms/AddCar";
import AddPeople from "./components/forms/AddPeople";
import Title from "./components/layouts/Title";
import "./App.css"
import PeopleList from './components/list/PeopleList';


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
     <PeopleList/>
    </div>
    </ApolloProvider>
  );
}

export default App;
