import React from "react";
import axios from "axios";
import moment from "moment";
import { RadialProgress } from "react-radial-progress-indicator";

const formatDate = date => moment(date).format("MMM Do YYYY");

const today = new Date();

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      deletingIndex: null,
      time: 0,
      deletedProducts: []
    };
  }

  fetchJsonFromServer = async () => {
    const res = await axios.get("/livejson.php?userid=003887&key=pzt1sspgo2xn");
    const {
      data: { livejson }
    } = res;
    const products = livejson.map(json => this.extractDataFromJson(json));
    this.setState({ products });
  };

  getDateFromFloat = date => {
    const [day, month, year] = [
      date.substring(0, 2),
      date.substring(2, 4),
      date.substring(5, 7)
    ];
    return new Date(`20${year}`, month - 1, day);
  };

  extractDataFromJson = data => {
    return {
      name:
        productsHashMap[data["2"].substring(0, 2)] ||
        "This product is not registered",
      expiryDate: this.getDateFromFloat(data["3"])
    };
  };

  productStatus = expiryDate => {
    const daySinceToday = moment(today).diff(moment(expiryDate), "days");
    if (daySinceToday > 0) return "box-list is-expired";
    else if (daySinceToday === 0 || (daySinceToday > -3 && daySinceToday < -1))
      return "box-list is-expiring";
    else return "box-list";
  };

  beginTouch = idx => {
    const beginingTime = new Date();
    this.setState({ deletingIndex: idx, time: beginingTime });
  };

  endTouch = () => {
    const endTime = new Date();
    const timeDifference = endTime - this.state.time;
    if (timeDifference > 999) {
      const { deletingIndex, products, deletedProducts } = this.state;
      return this.setState({
        time: 0,
        deletingIndex: null,
        products: [
          ...products.slice(0, deletingIndex),
          ...products.slice(deletingIndex + 1)
        ],
        deletedProducts: [...deletedProducts.concat(products[deletingIndex])]
      });
    }
    return this.setState({ time: 0, deletingIndex: null });
  };

  async componentDidMount() {
    this.fetchJsonFromServer();
  }

  renderProducts = () => {
    const { products } = this.state;
    return products.map((product, idx) => {
      const { name, expiryDate } = product;
      return (
        <div
          className={this.productStatus(expiryDate)}
          key={name + expiryDate + idx}
          onMouseDown={() => this.beginTouch(idx)}
          onTouchEnd={this.endTouch}
          onTouchStart={() => this.beginTouch(idx)}
          onMouseUp={this.endTouch}
        >
          <div className="columns">
            <div className="column is-10">
              <p className="title is-5 m-12 is-white"> {name}</p>
              <p className="title is-6 is-white">
                Expiry Date: {formatDate(expiryDate)}
              </p>
            </div>
            {this.state.deletingIndex === idx && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <RadialProgress
                  backgroundColour="#dff0d8"
                  backgroundTransparent
                  duration={1000}
                  height={72}
                  ringBgColour="#ccc"
                  ringFgColour="purple"
                  ringIntermediateColour="#aaa"
                  ringThickness={0.2}
                  segmented={false}
                  showIntermediateProgress
                  startStep={0}
                  step={100}
                  steps={100}
                  text={(steps, percentage) =>
                    Math.floor((steps * percentage * 10) / 10).toFixed(0) + "%"
                  }
                  width={200}
                />
              </div>
            )}
          </div>
        </div>
      );
    });
  };
  render() {
    console.log(this.state.deletedProducts, "deletedProducts");
    return (
      <div className="container">
        <button
          className="button is-link"
          style={{ marginBottom: 12 }}
          onClick={this.fetchJsonFromServer}
        >
          Fetch
        </button>
        <div className="columns">
          <div className="column">
            <div className="background-panel">{this.renderProducts()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

const productsHashMap = {
  11: "Coca Cola Zero Sugar 325 ml.",
  12: "Meiji non-fat milk 200 ml.",
  13: "Dutchie strawberry 0% fat"
};
