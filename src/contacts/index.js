import makeDb from "../db/index.js";
import makeContactList from "./contact-list.js";
import makeContactsEndpointHandler from "./contacts-endpoint.js";

const database = makeDb();
const contactList = makeContactList({ database });
const contactsEndPointHandler = makeContactsEndpointHandler({ contactList });

export default contactsEndPointHandler;
