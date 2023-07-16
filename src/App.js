import "./App.css";
import SignInSide from "./signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNewUser from "./pages/CreateNewUser";
import UserTable from "./pages/UserTable";
import { Provider } from "react-redux";
import store from "./slices/store"

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<SignInSide />}></Route>
            <Route exact path="/add" element={<CreateNewUser />}></Route>
            <Route exact path="/usertable" element={<UserTable />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
