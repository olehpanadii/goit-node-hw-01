import * as contactService from "./contacts.js";

import { program } from "commander";

const invokeAction = async ({ action, contactId, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactService.listContacts();
      return console.table(allContacts);
    case "get":
      const contactById = await contactService.getContactById(contactId);
      return console.log(contactById);
    case "add":
      const newContact = await contactService.addContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);
    case "remove":
      const deleteContact = await contactService.removeContact(contactId);
      return console.log(deleteContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --contactId <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
