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
    this.addressService.save(this.state.address).then((data) => {
      this.setState({
        visible: false,
        persona: {
          id: null,
          nombre: null,
          apellido: null,
          direccion: null,
          telefono: null,
        },
      });
      this.toast.show({
        severity: "success",
        summary: "Atención!",
        detail: "Se guardó el registro correctamente.",
      });
      this.addressService
        .getAll()
        .then((data) => this.setState({ addresses: data }));
    });
  }

  delete() {
    if (window.confirm("¿Realmente desea eliminar el registro?")) {
      this.addressService.delete(this.state.selectedAddress.id).then((data) => {
        this.toast.show({
          severity: "success",
          summary: "Atención!",
          detail: "Se eliminó el registro correctamente.",
        });
        this.addressService
          .getAll()
          .then((data) => this.setState({ addresses: data }));
      });
    }
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
            rows="4"
            selectionMode="single"
            selection={this.state.selectedPersona}
            onSelectionChange={(e) =>
              this.setState({ selectedPersona: e.value })
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
          <form id="persona-form">
            <span className="p-float-label">
              <InputText
                value={this.state.address.street}
                style={{ width: "100%" }}
                id="street"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let address = Object.assign({}, prevState.address);
                    address.name = val;

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
        nombre: null,
        apellido: null,
        direccion: null,
        telefono: null,
      },
    });
    document.getElementById("persona-form").reset();
  }

  showEditDialog() {
    this.setState({
      visible: true,
      address: {
        id: this.state.selectedAddress.id,
        nombre: this.state.selectedAddress.street,
        apellido: this.state.selectedAddress.city,
        direccion: this.state.selectedAddress.state,
        telefono: this.state.selectedAddress.postal_code,
        country: this.state.selectedAddress.country,
      },
    });
  }
}
