const http = require("http");
const express = require("express");
const socket = require("socket.io");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const ProductKey = require("./schemas/ProductKey");
const ProductExpiryDate = require("./schemas/ProductExpiryDate");

const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb://localhost/iot-refrigerator",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const server = http.createServer(app);
const io = socket.listen(server);

server.listen(PORT, () => console.log("server strting in port 4000"));

app.get("/", (req, res) => {
  res.send("Hello From Tai!");
});

app.post("/add-product-key", (req, res) => {
  const { barcodeKey, name } = req.body;
  ProductKey.findOne({ barcodeKey }).then(product => {
    if (product) {
      return res.status(400).send("Product already exists");
    }
    const newProductKey = new ProductKey({
      barcodeKey,
      name
    });
    newProductKey.save().then(newProduct => {
      res.status(200).send(newProduct + " is successfully added to database");
    });
  });
});

app.post("/add-product-expiry-date", (req, res) => {
  const { barcodeKey, expiryDate } = req.body;
  ProductKey.findOne({ barcodeKey }).then(product => {
    if (!product) {
      io.emit("NO_PRODUCT", "Sorry, we cannot find your product!");
      return res.status(404).send("No product found");
    }
    const newProductExpiryDate = new ProductExpiryDate({
      name: product.name,
      expiryDate
    });
    newProductExpiryDate.save().then(newProductExpiryDate => {
      io.emit("NEW_PRODUCT_ADDED", newProductExpiryDate);
      res
        .status(200)
        .send(newProductExpiryDate + " is successfully added to database");
    });
  });
});

app.get("/all-products", (req, res) => {
  ProductExpiryDate.find({}).then(products => {
    res.status(200).json({ products: products });
  });
});

io.on("connection", socket => {
  console.log(socket.id);
  socket.emit("socket", socket.id);
  socket.on("DELETE_PRODUCT", _id => {
    ProductExpiryDate.findByIdAndRemove({ _id }).then(product => {
      io.emit("PRODUCT_DELETED", product);
    });
  });
  socket.on("test", test => {
    console.log(test);
    socket.emit("test2", "HELLO BACK FROM SERVER");
  });
  socket.on("disconnect", () => console.log("user disconnected"));
});
