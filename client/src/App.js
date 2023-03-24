import {Home, Landing, Detail, Form} from "./views"
import NavBar from "./components/NavBar/NavBar"
import { Route, useLocation } from "react-router-dom"

function App() {

  let location = useLocation()

  return (
    <div >
      {location.pathname !== "/" && <NavBar/>}
      <Route exact path="/" component={Landing}></Route>
      <Route exact path="/detail/:id" component={Detail}></Route>
      <Route exact path="/create" component={Form}></Route>
      <Route path="/home" render={() => <Home/>} />
    </div>
  );
}
 
export default App;
