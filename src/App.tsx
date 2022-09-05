import React from "react";

//Styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";   

//Components
// import Login from "./components/login";
import AddressCRUD from "./components/address-crud";

const App = () => {
  // const [address, setAddress] = useState<Array<Address>>([]);
  // const addressService: AddressService = new AddressService();

  // // const getAllAddress=()=>{AddressService}

  // useEffect(() => {
  //   addressService.getAll().then((res) => setAddress(res));
  // }, []);

  return (
    <>
      {/* <Login/> */}
      <AddressCRUD/>
    </>
  );
};

export default App;

// export default class App extends Component {
//   constructor(){
//     super();
//     this.state={}
//     this.addressService = new AddressService();
//   }
// }
