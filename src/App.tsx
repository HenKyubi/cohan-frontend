import React from "react";

//Styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";   

//Components
// import Login from "./components/login";
import AddressCRUD from "./components/address-crud";
import PersonCRUD from "./components/person_crud";

const App = () => {

  return (
    <>
      {/* <Login/> */}
      {/* <AddressCRUD/> */}
      <PersonCRUD/>
    </>
  );
};

export default App;
