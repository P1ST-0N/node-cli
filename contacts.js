// const fs = require("fs").promises;
const fs = require("node:fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(contactsPath, "[]"); // Створюємо порожній масив
      return []; // Повертаємо порожній масив
    }
    throw error; // Інші помилки передаємо далі
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(contactsPath, "[]"); // Створюємо порожній масив
      return null; // Повертаємо null, оскільки файл порожній
    }
    throw error; // Інші помилки передаємо далі
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const removedContact = contacts.find((contact) => contact.id === contactId);

    if (!removedContact) return null;

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return removedContact;
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(contactsPath, "[]"); // Створюємо порожній масив
      return null; // Повертаємо null, оскільки файл порожній
    }
    throw error; // Інші помилки передаємо далі
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: contacts.length + 1, name, email, phone };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(contactsPath, "[]"); // Створюємо порожній масив
      return null; // Повертаємо null, оскільки файл порожній
    }
    throw error; // Інші помилки передаємо далі
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
