<template>
  <div class="home">
   
    <form>    
      <div >
        <input type="text" :id="'expense-name'" v-model="expense.name">
        <label :for="'expense-name'">Expense Name:</label>
    <label :for="'amount'">Amount:</label>
        <input type="number" :id="'amount'" name="amount" v-model="expense.amount">
             <button type="button" @click="addExpense(expense.name, expense.amount)">Add Expense</button>
      </div>
    </form>
   
    <ul id="expenses"></ul>
    <h2>Summary:</h2> {{totalExp}}
    <ul id="summary"><li v-for="(expense,index) in expenses" :key="index"> {{expense.name}} {{expense.amount}}</li></ul>

    <button>Save</button>
  </div>
</template>

<script setup>
// @ is an alias to /src

import { io } from "socket.io-client";
import { ref, watch } from "vue"
const expensess = ref(0)
const expense = ref([{ name: '', amount: 0 }])
const expenses = ref([])
const socket = io.connect("http://localhost:3000");
console.log(socket)
const totalExp = ref(0)

watch(
  () => expenses.value,
  (newVal) => {
    console.log(newVal)
    totalExp.value +=newVal
    socket.emit("messageFromClient", newVal);
  }
);

function addExpense(name, amount) {
let exp = {name, amount}
totalExp.value += amount; 
  expenses.value.push(exp);
  expense.value.amount = 0;
  expense.value.name = ''

  updateExpenses();
        updateSummary();
}


    
     

      // Define a function to update the list of expenses
      function updateExpenses() {
        // Get the ul element where the expenses will be displayed


        // Loop through the expenses array and add each expense to the list
        for (let i = 0; i < expenses.value.length; i++) {
           expensess.value = expenses.value[i];
          // const li = document.createElement('li');
          // li.textContent = `${expense.name} spent $${expense.amount.toFixed(2)} on ${expense.expenseName}`;

          // Create a button to remove the expense
          // const button = document.createElement('button');
          // button.textContent = 'Remove';
          // button.classList.add('remove-button');
          // button.addEventListener('click', () => removeExpense(i));
          // li.appendChild(button);

          // expensesList.appendChild(li);
        }
      }

      // Define a function to update the summary of expenses
      function updateSummary() {
        // Get the ul element where the summary will be displayed
        const summaryList = document.getElementById('summary');

        // Clear the current summary
        summaryList.innerHTML = '';

        // Calculate the total amount spent and the number of users
        const userExpenses = {};
        for (const expense of expenses.value) {
          const user = expense.name;
          if (user in userExpenses) {
            userExpenses[user] += expense.amount;
          } else {
            userExpenses[user] = expense.amount;
          }
        }

        const totalAmount = Object.values(userExpenses).reduce((total, expense) => total + expense, 0);
        const numUsers = Object.keys(userExpenses).length;

        // Calculate the amount each user owes or is owed
        const perPersonAmount = totalAmount / numUsers;
        const userAmounts = {};
        for (const [user, expense] of Object.entries(userExpenses)) {
          const amount = expense - perPersonAmount;
          userAmounts[user] = amount;
        }

        // Loop through the userAmounts object and add each user's amount to the summary
    for (const [user, amount] of Object.entries(userAmounts)) {
      const li = document.createElement('li');
      const prefix = amount >= 0 ? 'is owed' : 'owes';
      li.textContent = `${user} ${prefix} $${Math.abs(amount).toFixed(2)}`;
          summaryList.appendChild(li);
        }
      }





</script>
