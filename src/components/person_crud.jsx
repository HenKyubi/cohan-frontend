import { Component } from "react";
import { PersonService } from "../service/personService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { AddressService } from "../service/addressService";
// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import Autocomplete from "@mui/material/Autocomplete";

export default class PersonCRUD extends Component {
  constructor() {
    super();
    this.state = {
      persons: [],
      visible: false,
      person: {
        id: null,
        name: null,
        phoneNumber: null,
        emailAddress: null,
        addressId: null,
      },
      address: {
        id: null,
        street: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
      },
      selectedPerson: {},
      // searchBarValue: ""
    };
    this.items = [
      {
        label: "Create",
        icon: "pi pi-fw pi-plus",
        command: () => {
          this.showSaveDialog();
        },
      },
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        command: () => {
          this.showEditDialog();
        },
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash",
        command: () => {
          this.delete();
        },
      },
    ];
    this.personService = new PersonService();
    this.addressService = new AddressService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount() {
    this.personService
      .getAll()
      .then((data) => this.setState({ persons: data }));
  }

  save() {
    this.addressService
      .save(this.state.address)
      .then((response) => {
        let person = Object.assign({}, this.state.person);
        person.addressId = response;
        this.personService.save(person).then(() => {
          this.setState({
            visible: false,
            person: {
              id: null,
              name: null,
              phoneNumber: null,
              emailAddress: null,
              addressId: null,
            },
            address: {
              id: null,
              street: null,
              city: null,
              state: null,
              postalCode: null,
              country: null,
            },
          });
          this.toast.show({
            severity: "success",
            summary: "Attention",
            detail: "The register has been saved",
          });
          this.personService
            .getAll()
            .then((data) => this.setState({ persons: data }));
        });
      })
      .catch((err) => {
        this.toast.show({
          severity: "error",
          summary: "Error!",
          detail: `${err}`,
        });
      });
  }

  delete() {
    // if (this.selectedPerson) {
    if (window.confirm("Do you really want to delete the record")) {
      this.personService
        .delete(this.state.selectedPerson.id)
        .then(() => {
          this.toast.show({
            severity: "success",
            summary: "Attention!",
            detail: "Register has been deleted",
          });
          this.personService
            .getAll()
            .then((data) => this.setState({ persons: data }));
        })
        .catch((err) => {
          this.toast.show({
            severity: "error",
            summary: "Error!",
            detail: `${err}`,
          });
        });
    }
    // } else {
    // window.alert("Select a register to delete");
    // }
  }

  // find(id){
  //   this.personService.findById(id).then((res)=>{this.setState({persons: res}) })
  // }

  render() {
    return (
      <div style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
        <Menubar model={this.items} />
        <br />
        {/* <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={this.state.persons.map((item) => item.id)}
          // options={this.persons.map((option) => option.id)}
          renderInput={(params) => (
            <TextField {...params} label="Search by Id" />
          )}
          value={this.state.searchBarValue}
          onChange={(e, newValue) => {this.setState({searchBarValue: newValue}, this.find(this.state.searchBarValue))}}
        />
        <br /> */}
        <Panel header="Person CRUD">
          <DataTable
            value={this.state.persons}
            paginator={true}
            rows="6"
            selectionMode="single"
            selection={this.state.selectedPerson}
            onSelectionChange={(e) =>
              this.setState({ selectedPerson: e.value })
            }
          >
            <Column field="id" header="ID" />
            <Column field="name" header="Name" />
            <Column field="phoneNumber" header="Phone number" />
            <Column field="emailAddress" header="Email address" />
            <Column field="addressId.id" header="Address ID" />
            <Column field="addressId.street" header="Address Street" />
            <Column field="addressId.city" header="Address City" />
            <Column field="addressId.state" header="Address State" />
            <Column field="addressId.postalCode" header="Address Postal code" />
            <Column field="addressId.country" header="Address Country" />
          </DataTable>
        </Panel>
        <Dialog
          header={
            this.state.selectedPerson.id !== null
              ? `Create person`
              : `Edit person`
          }
          visible={this.state.visible}
          style={{ width: "400px" }}
          footer={this.footer}
          modal={true}
          onHide={() => this.setState({ visible: false })}
        >
          <form id="person-form">
            <span className="p-float-label">
              <InputText
                value={this.state.person.name}
                style={{ width: "100%" }}
                id="name"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let person = Object.assign({}, prevState.person);
                    person.name = val;

                    return { person };
                  });
                }}
              />
              <label htmlFor="name">Name</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.person.phoneNumber}
                style={{ width: "100%" }}
                id="phoneNumber"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let person = Object.assign({}, prevState.person);
                    person.phoneNumber = val;

                    return { person };
                  });
                }}
              />
              <label htmlFor="phoneNumber">Phone number</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.person.emailAddress}
                style={{ width: "100%" }}
                id="emailAddress"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let person = Object.assign({}, prevState.person);
                    person.emailAddress = val;

                    return { person };
                  });
                }}
              />
              <label htmlFor="emailAddress">Email address</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.address?.street}
                style={{ width: "100%" }}
                id="street"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let address = Object.assign({}, prevState.address);
                    address.street = val;

                    return { address };
                  });
                }}
              />
              <label htmlFor="street">Street</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.address?.city}
                style={{ width: "100%" }}
                id="city"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let address = Object.assign({}, prevState.address);
                    address.city = val;

                    return { address };
                  });
                }}
              />
              <label htmlFor="city">City</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.address?.state}
                style={{ width: "100%" }}
                id="state"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let address = Object.assign({}, prevState.address);
                    address.state = val;

                    return { address };
                  });
                }}
              />
              <label htmlFor="state">State</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.address?.postalCode}
                style={{ width: "100%" }}
                id="postalCode"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let address = Object.assign({}, prevState.address);
                    address.postalCode = val;

                    return { address };
                  });
                }}
              />
              <label htmlFor="postalCode">Postal code</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.address?.country}
                style={{ width: "100%" }}
                id="country"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let address = Object.assign({}, prevState.address);
                    address.country = val;

                    return { address };
                  });
                }}
              />
              <label htmlFor="country">Country</label>
            </span>
          </form>
        </Dialog>
        <Toast ref={(el) => (this.toast = el)} />
      </div>
    );
  }

  showSaveDialog() {
    this.setState({
      visible: true,
      person: {
        id: null,
        name: null,
        phoneNumber: null,
        emailAddress: null,
        addressId: null,
      },
      address: {
        id: null,
        street: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
      },
    });
    document.getElementById("person-form").reset();
  }

  showEditDialog() {
    // if (this.selectedPerson) {
    this.setState({
      visible: true,
      person: {
        id: this.state.selectedPerson.id,
        name: this.state.selectedPerson.name,
        phoneNumber: this.state.selectedPerson.phoneNumber,
        emailAddress: this.state.selectedPerson.emailAddress,
        addressId: this.state.selectedPerson.addressId,
      },
      address: {
        id: this.state.selectedPerson.addressId.id,
        street: this.state.selectedPerson.addressId.street,
        city: this.state.selectedPerson.addressId.city,
        state: this.state.selectedPerson.addressId.state,
        postalCode: this.state.selectedPerson.addressId.postalCode,
        country: this.state.selectedPerson.addressId.country,
      },
    });
    // } else {
    // window.alert("Select a register to edit");
    // }
  }
}
