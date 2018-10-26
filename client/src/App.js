import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: 24 }}>
        <div className="columns">
          <div className="column">
            <div style={{ backgroundColor: "#545959", padding: 16 }}>
              <div
                style={{
                  backgroundColor: "#a9e3f9",
                  padding: 12,
                  borderRadius: 4,
                  marginBottom: 12
                }}
              >
                <p className="title is-5" style={{ marginBottom: 12 }}>
                  {" "}
                  Milk{" "}
                </p>
                <p className="title is-6"> Expiry date: 23/12/18 </p>
              </div>
              <div
                style={{
                  backgroundColor: "#f98109",
                  padding: 12,
                  borderRadius: 4,
                  marginBottom: 12
                }}
              >
                <p className="title is-5" style={{ marginBottom: 12 }}>
                  {" "}
                  Milk{" "}
                </p>
                <p className="title is-6"> Expiry date: 23/12/18 </p>
              </div>
              <div
                style={{
                  backgroundColor: "#ff0000",
                  padding: 12,
                  borderRadius: 4,
                  marginBottom: 12
                }}
              >
                <p className="title is-5" style={{ marginBottom: 12 }}>
                  {" "}
                  Milk{" "}
                </p>
                <p className="title is-6"> Expiry date: 23/12/18 </p>
              </div>
              <div
                style={{
                  backgroundColor: "#a9e3f9",
                  padding: 12,
                  borderRadius: 4
                }}
              >
                <p className="title is-5" style={{ marginBottom: 12 }}>
                  {" "}
                  Milk{" "}
                </p>
                <p className="title is-6"> Expiry date: 23/12/18 </p>
              </div>
            </div>
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
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default App;
