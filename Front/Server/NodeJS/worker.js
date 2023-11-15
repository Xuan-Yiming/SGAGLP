// worker.js
let totalCustomers = 0;
setInterval(() => {
    totalCustomers++;
    postMessage(totalCustomers);
}, 1000);