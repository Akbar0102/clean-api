const makeDb = require("../db/index");
const makeContactList = require("./contact-list");
const makeContactsEndpointHandler = require("./contacts-endpoint");

const database = makeDb();
const contactList = makeContactList({ database });
const contactsEndPointHandler = makeContactsEndpointHandler({ contactList });

module.exports = contactsEndPointHandler;
