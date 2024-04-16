const { program } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// async function invokeAction(action, ...args) {
//   switch (action) {
//     case "list":
//       console.log(await listContacts());
//       break;

//     case "get":
//       console.log(await getContactById(...args));
//       break;

//     case "add":
//       console.log(await addContact(...args));
//       break;

//     case "remove":
//       console.log(await removeContact(...args));
//       break;

//     default:
//       console.warn("\x1b[31m Unknown action type!");
//   }

/*
  try {
    const result = await eval(`${action} (...args)`);
    console.table(result);
  } catch (error) {
    console.error(error.message);
  }
}
*/

// const [, , action, ...args] = process.argv;
// invokeAction(action, ...args);

// module.exports = invokeAction;

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

async function invokeAction() {
  const options = program.opts();
  const { action } = options;

  try {
    switch (action) {
      case "list":
        console.table(await listContacts());
        break;
      case "get":
        console.table(await getContactById(options.id));
        break;
      case "add":
        console.table(
          await addContact(options.name, options.email, options.phone)
        );
        break;
      case "remove":
        console.table(await removeContact(options.id));
        break;
      default:
        console.error("Unknown action type!");
    }
  } catch (error) {
    console.error(error.message);
  }
}

invokeAction();

// invokeAction("list");
// invokeAction("get", 1);
// invokeAction("add", "John Doe", "john@example.com", "123456789");
// invokeAction("remove", 2);
