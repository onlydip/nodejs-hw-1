
import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(id) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === id);
    return result || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(id) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export { listContacts, getContactById, addContact, removeContact };