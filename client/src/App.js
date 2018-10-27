import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import socketIOClient from "socket.io-client";

const END_POINT = "http://localhost:4000/";

const socket = socketIOClient(END_POINT);

const formatDate = date => moment(date).format("MMM Do YYYY");

class App extends Component {
  constructor(props) {
    super(props);
    socket.on("socket", id => console.log(id));
    socket.on("test2", test => console.log(test));
    this.state = {
      products: []
    };
  }

  async componentDidMount() {
    const res = await axios.get("/all-products");
    const products = res.data.products;
    this.setState({ products });
  }

  renderProducts = () => {
    const { products } = this.state;
    return products.map(product => {
      const { _id, name, expiryDate } = product;
      return (
        <div className="box-list" key={_id}>
          <p className="title is-5 m-12"> {name}</p>
          <p className="title is-6"> Expiry Date: {formatDate(expiryDate)}</p>
        </div>
      );
    });
  };
  render() {
    // const { socket } = this;
    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="background-panel">{this.renderProducts()}</div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label"> Code </label>
              <div className="control">
                <input className="input" type="number" placeholder="Code" />
              </div>
            </div>
            <div className="field">
              <label className="label"> Expiry date </label>
              <div className="control">
                <input className="input" type="date" placeholder="Text input" />
              </div>
            </div>
            <button className="button is-large is-fullwidth is-success">
              Submit
            </button>
          </div>
        </div>
        <hr />
        <div className="field">
          <label className="label"> Name </label>
          <div className="control">
            <input className="input" type="text" placeholder="Name" />
          </div>
        </div>
        <div className="field">
          <label className="label"> Code </label>
          <div className="control">
            <input className="input" type="number" placeholder="Text input" />
          </div>
          <button
            className="button is-large is-fullwidth is-link"
            style={{ marginTop: 12 }}
            onClick={() => socket.emit("test", "HELLO FROM REACT")}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default App;
