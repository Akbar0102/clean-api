const express = require("express");
const bodyParser = require("body-parser");
const handleContactsRequest = require("./contacts");
const adaptRequest = require("./helpers/adapt-request");

const app = express();
app.use(bodyParser.json());

app.all("/contacts", contactsController);
app.get("/contacts/:id", contactsController);

function contactsController(req, res) {
  const httpRequest = adaptRequest(req);
  handleContactsRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res.set(headers).status(statusCode).send(data)
    )
    .catch((e) => res.status(500).end());
}

app.listen(9090, () => console.log(`Listening on port 9090`));
