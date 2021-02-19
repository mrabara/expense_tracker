const balance = document.querySelector('#balance');
const money_plus = document.querySelector('#money-plus');
const money_minus = document.querySelector('#money-minus');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const transaction = document.querySelector('#transaction');
const amount = document.querySelector('#amount');
const delHistory = document.querySelector('#btn-delete-history');

const dummyTransaction = [
    { id: 1, transaction: 'Phone Cover', amount: -150 },
    { id: 2, transaction: 'Salary', amount: 4500 },
    { id: 3, transaction: 'Book', amount: -500 },
    {id: 4, transaction: 'Camera', amount: -300},
];

let transactions = dummyTransaction;


// Add Transaction
function addTransaction(e) {
    e.preventDefault();

    if (transaction.value.trim() === '' || amount.value.trim() === '') {
       return alert('Please add a transaction and amount');
    }

    const trans = {
        id: generateID(),
        transaction: transaction.value,
        amount: +amount.value,
    }

    transactions.push(trans);
    addTransactionDOM(trans);
    updateValues();
    transaction.value = '';
    amount.value = '';
}

function generateID() {
    return Math.floor(Math.random() * 10000000);
}


// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');


    // add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.transaction} <span>${sign}${Math.abs(transaction.amount)}</span> 
         <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}


// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, amount) => (acc += amount), 0).toFixed(2);
  
    const income = amounts
      .filter(amount => amount > 0)
      .reduce((acc, amount) => (acc += amount), 0)
      .toFixed(2);
  
    const expenses = (
      amounts.filter(amount => amount < 0).reduce((acc, amount) => (acc += amount), 0) *
      -1
    ).toFixed(2);
    
    balance.innerHTML = `Php${total}`;
    money_plus.innerHTML = `Php${income}`;
    money_minus.innerHTML = `Php${expenses}`;
}

function delAllHistory() {
    if (!(list.hasChildNodes())) return alert('No history to Delete');
    list.innerHTML = '';
    transactions = [];
    init();
}

// Remove Transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    init();
}


// Init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM)
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);

delHistory.addEventListener('click', delAllHistory);
