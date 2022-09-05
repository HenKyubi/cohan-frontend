import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

//Styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../src/styles/App.scss";

//PrimeReact
import { Sidebar } from "primereact/sidebar";

//Components
import Login from "./components/login";
import AddressCRUD from "./components/address-crud";
import PersonCRUD from "./components/person_crud";
import { Button } from "primereact/button";

const App = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <>
      {isLogged && (
        <>
          <div style={{ paddingTop: "2rem", paddingLeft: "2rem" }}>
            <Button icon="pi pi-list" onClick={(e) => setVisible(true)} />
          </div>
          <Routes>
            <Route path="/address" element={<AddressCRUD />} />
            <Route path="/" element={<PersonCRUD />} />
          </Routes>
          <Sidebar visible={visible} onHide={() => setVisible(false)}>
            <div id="listCRUDS">
              <ul>
                <li>
                  <Link to="/address">Address</Link>
                </li>
                <li>
                  <Link to="/">Person</Link>
                </li>
              </ul>
              <Button
                icon="pi pi-power-off"
                onClick={() => {
                  setIsLogged(!isLogged);
                }}
                className="btn-signout"
              >
                Salir
              </Button>
            </div>
          </Sidebar>
        </>
      )}

      {!isLogged && <Login setIsLogged={setIsLogged} />}
      {/* <AddressCRUD/> */}
      {/* <PersonCRUD /> */}
    </>
  );
};

export default App;
