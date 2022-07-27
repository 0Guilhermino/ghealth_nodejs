const express = require("express");
const mongoose = require("mongoose");
const app = express();


app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//Rotas da API
const patientRoutes = require('./routes/patientRoutes')
app.use('/patient', patientRoutes)


// rota inicial / endpoint
app.get("/", (req, res) => {
  //mostra a req

  res.json({ message: "Oi Express!" });
});
const DB_USER = '0guilhermino'
const DB_PASSWORD = encodeURIComponent('@Angelo1')

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.4ehkvo8.mongodb.net/bancoapi?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log("Conectamos ao MongoDB");
    app.listen(3000);
  })
  .catch((err) => console.log(err));


