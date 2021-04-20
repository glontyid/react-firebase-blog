import './App.css';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header";
import AppRouter from "./AppRouter";
import {useContext} from "react";
import {Context} from "./index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./components/loader";

const App = () => {
  const {auth} = useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return <Loader/>
  }
  return (
    <BrowserRouter>
      <Header/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
