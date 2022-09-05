import { Component } from "react";
import { AddressService } from "../service/addressService";
// import { Address } from "../interfaces/types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export default class AddressCRUD extends Component {
  constructor() {
    super();
    this.state = {
      addresses: [],
      visible: false,
      address: {
        id: null,
        street: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
      },
      selectedAddress: {},
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
    this.addressService
      .getAll()
      .then((data) => this.setState({ addresses: data }));
  }

  save() {
    this.addressService.save(this.state.address).then(() => {
      this.setState({
        visible: false,
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
      this.addressService
        .getAll()
        .then((data) => this.setState({ addresses: data }));
    });
  }

  delete() {
    // if (this.selectedAddress) {
      if (window.confirm("Do you really want to delete the record")) {
        this.addressService.delete(this.state.selectedAddress.id).then(() => {
          this.toast.show({
            severity: "success",
            summary: "Attention!",
            detail: "Register has been deleted",
          });
          this.addressService
            .getAll()
            .then((data) => this.setState({ addresses: data }));
        }).catch((err)=>{
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

  render() {
    return (
      <div style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
        <Menubar model={this.items} />
        <br />
        <Panel header="Address CRUD">
          <DataTable
            value={this.state.addresses}
            paginator={true}
            rows="5"
            selectionMode="single"
            selection={this.state.selectedAddress}
            onSelectionChange={(e) =>
              this.setState({ selectedAddress: e.value })
            }
          >
            <Column field="id" header="ID"></Column>
            <Column field="street" header="Street"></Column>
            <Column field="city" header="City"></Column>
            <Column field="state" header="State"></Column>
            <Column field="postalCode" header="Postal code"></Column>
            <Column field="country" header="Country"></Column>
          </DataTable>
        </Panel>
        <Dialog
          header="Create address"
          visible={this.state.visible}
          style={{ width: "400px" }}
          footer={this.footer}
          modal={true}
          onHide={() => this.setState({ visible: false })}
        >
          <form id="address-form">
            <span className="p-float-label">
              <InputText
                value={this.state.address.street}
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
                value={this.state.address.city}
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
                value={this.state.address.state}
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
                value={this.state.address.postalCode}
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
                value={this.state.address.country}
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
      address: {
        id: null,
        street: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
      },
    });
    document.getElementById("address-form").reset();
  }

  showEditDialog() {
    // if (this.selectedAddress) {
      this.setState({
        visible: true,
        address: {
          id: this.state.selectedAddress.id,
          street: this.state.selectedAddress.street,
          city: this.state.selectedAddress.city,
          state: this.state.selectedAddress.state,
          postalCode: this.state.selectedAddress.postalCode,
          country: this.state.selectedAddress.country,
        },
      });
    // } else {
      // window.alert("Select a register to edit");
    // }
  }
}
