### Bank Service Program

The provided code is a simple command-line bank service program that allows users to perform basic banking operations, such as viewing account balances, making cash withdrawals, and making cash deposits. The program is built using TypeScript and uses the Faker.js library to generate fictional customer data.

### Code Explanation

1. **Customer Class**: The `Customer` class represents bank customers. It has properties for first name, last name, age, gender, mobile number, account number, and full name. The full name is a combination of the first name and last name.

2. **BankAccount Interface**: The `BankAccount` interface defines the structure of a bank account, including an account number and balance.

3. **Bank Class**: The `Bank` class manages the customer data and account data. It includes methods to add customers and account numbers and to handle transactions.

4. **Random Gender**: The code generates a random gender for customers by using a simple randomization technique where gender is randomly set to "male" or "female."

5. **Generate Customer Data**: A loop generates fictional customer data. It creates 9 customers with random names, ages between 18 and 95, mobile numbers, and account numbers ranging from 1001 to 1010. The initial account balances are set from 1000 to 10000.

6. **Bank Service Function**: The `bankService` function provides a menu for users to select banking services. Users can view their account balance, make cash withdrawals, make cash deposits, or exit the program.

7. **View Balance**: Users can enter their account number to view their account balance. If the account number is not found, an error message is displayed.

8. **Cash Withdraw**: Users can withdraw cash from their account. If the withdrawal amount exceeds the balance, an error message is shown. Otherwise, the new balance is displayed, and the transaction is recorded.

9. **Cash Deposit**: Users can deposit cash into their account. The new balance is displayed, and the transaction is recorded.

#### How to Use

1. Clone this repository to your local machine.
2. Install dependencies using `npm install` or `yarn install`.
3. Run the program using `npm start` or `yarn start`.
4. Follow the on-screen instructions to perform banking operations.

#### Author

[Suleman Pervez](https://github.com/Suleman1411)
