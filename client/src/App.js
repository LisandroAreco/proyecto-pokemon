import {Home, Landing, Detail, Form} from "./views"
import NavBar from "./components/NavBar/NavBar"
import { Route, useLocation } from "react-router-dom"
import style from "./App.module.css"
import axios from "axios"
axios.defaults.baseURL = "https://proyecto-pokemon-six.vercel.app/"
function App() {

  let location = useLocation()

  return (
    <div className={style} >
      {location.pathname !== "/" && <NavBar/>}
      <Route exact path="/" component={Landing}></Route>
      <Route exact path="/detail/:id" component={Detail}></Route>
      <Route exact path="/create" component={Form}></Route>
      <Route exact path="/home" render={() => <Home/>} />
    </div>
  );
}
 
export default App;
