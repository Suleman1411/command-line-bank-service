import { faker } from "@faker-js/faker";
import chalk from "chalk";
import inquirer from "inquirer";
class Customer {
    firstName;
    lastName;
    age;
    gender;
    mobNumber;
    accNumber;
    fullName;
    constructor(fName, lName, age, mob, acc) {
        this.firstName = fName;
        this.lastName = lName;
        this.fullName = `${fName} ${lName}`; // Full name
        this.accNumber = acc;
        this.age = age;
        this.gender = Math.random() < 0.5 ? "male" : "female"; // Randomly generate gender
        this.mobNumber = mob;
    }
}
class Bank {
    customer = [];
    account = [];
    firstTime = true;
    addCustomer(obj) {
        this.customer.push(obj);
    }
    addAccountNumber(obj) {
        this.account.push(obj);
    }
    transaction(accObj) {
        const index = this.account.findIndex((acc) => acc.accNumber === accObj.accNumber);
        if (index !== -1) {
            this.account[index] = accObj;
            if (!this.firstTime) {
                const customer = this.customer.find((item) => item.accNumber === accObj.accNumber);
                console.log(`Dear ${chalk.green.italic(customer?.fullName)}, Your Account Number Balance is ${chalk.bold.blueBright("$" + accObj.balance)}`);
            }
        }
    }
}
let myBank = new Bank();
for (let i = 0; i <= 10; i++) {
    let fName = faker.person.firstName();
    let lName = faker.person.lastName();
    let num = parseInt(faker.phone.number());
    const age = Math.floor(Math.random() * (95 - 18 + 1)) + 18;
    const cus = new Customer(fName, lName, age, num, 1000 + i);
    myBank.addCustomer(cus);
    myBank.addAccountNumber({ accNumber: cus.accNumber, balance: 1000 * i });
}
async function bankService(bank) {
    let service = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Please Select the Service",
        choices: ["View Balance", "Cash Withdraw", "Cash Deposit", "Exit"]
    });
    if (service.select === "View Balance") {
        let res = await inquirer.prompt({
            type: "input",
            name: "num",
            message: "Please Enter your account Number"
        });
        let account = myBank.account.find((acc) => acc.accNumber == res.num);
        if (!account) {
            console.log(chalk.red.bold.italic("Invalid Account Number"));
        }
        if (account) {
            const customer = myBank.customer.find((item) => item.accNumber == account?.accNumber);
            console.log(`Dear ${chalk.green.italic(customer?.fullName)}, Your Account Number Balance is ${chalk.bold.blueBright("$" + account.balance)}`);
        }
    }
    if (service.select === "Cash Withdraw") {
        let res = await inquirer.prompt({
            type: "input",
            name: "num",
            message: "Please Enter your account Number"
        });
        let account = myBank.account.find((acc) => acc.accNumber == res.num);
        if (!account) {
            console.log(chalk.red.bold.italic("Invalid Account Number"));
        }
        if (account) {
            let ans = await inquirer.prompt({
                type: "number",
                message: "Please Enter Your Cash Amount",
                name: "rupee",
            });
            if (ans.rupee > account.balance) {
                console.log(chalk.red.bold("Balance is insufficient"));
            }
            else {
                console.log("Collect your amount.");
                const newBalance = account.balance - ans.rupee;
                myBank.transaction({ accNumber: account.accNumber, balance: newBalance });
            }
        }
    }
    if (service.select === "Cash Deposit") {
        let res = await inquirer.prompt({
            type: "input",
            name: "num",
            message: "Please Enter your account Number"
        });
        let account = myBank.account.find((acc) => acc.accNumber == res.num);
        if (!account) {
            console.log(chalk.red.bold.italic("Invalid Account Number"));
        }
        if (account) {
            let ans = await inquirer.prompt({
                type: "number",
                message: "Please Enter Your Cash Amount",
                name: "rupee",
            });
            const newBalance = account.balance + ans.rupee;
            myBank.transaction({ accNumber: account.accNumber, balance: newBalance });
            console.log(`New Balance: ${newBalance}`);
        }
    }
    // After handling the selected service, set the firstTime flag to false
    // and call bankService again for further interactions
    if (service.select !== "Exit") {
        bank.firstTime = false;
        await bankService(bank);
    }
    else {
        console.log("Thank you for using our bank service. Goodbye!");
    }
}
// Start the bank service
bankService(myBank);
