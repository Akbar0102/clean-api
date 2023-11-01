import requiredParam from "../helpers/required-param.js";
import { InvalidPropertyError } from "../helpers/errors.js";
import isValidEmail from "../helpers/is-valid-email.js";
import upperFirst from "../helpers/upper-first.js";

export default function makeContact(
  contactInfo = requiredParam("contactInfo")
) {
  const validContact = validate(contactInfo);
  const normalContact = normalize(validContact);
  return Object.freeze(normalContact);

  function validate({
    firstName = requiredParam("firstName"),
    lastName = requiredParam("lastName"),
    emailAddress = requiredParam("emailAddress"),
    ...otherInfo
  } = {}) {
    validateName("first", firstName);
    validateName("last", lastName);
    validateEmail(emailAddress);
    return { firstName, lastName, emailAddress, ...otherInfo };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new InvalidPropertyError(
        `A contact's ${label} name must be at least 2 characters long.`
      );
    }
  }

  function validateEmail(emailAddress) {
    if (!isValidEmail(emailAddress)) {
      throw new InvalidPropertyError("Invalid contact email address.");
    }
  }

  function normalize({ firstName, lastName, emailAddress, ...otherInfo }) {
    return {
      ...otherInfo,
      firstName: upperFirst(firstName),
      lastName: upperFirst(lastName),
      emailAddress: emailAddress.toLowerCase(),
    };
  }
}
