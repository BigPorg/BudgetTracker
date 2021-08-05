// const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
// let db;

// // what does this part do again?
// const request = indexedDB.open('budgetTracker', 1);

// // on upgrade
// request.onupgradeneeded = function (event) {
//     // const { oldVersion } = event;
//     // const newVersion = event.newVersion || db.version;

//     console.log('From old to new');

//     db = event.target.result;

//     if (db.objectStoresNames.length === 0) {
//         db.createObjectStore('BudgetTrackerStorage', { autoIncrement: true });
//     }
// };

// // on error

// request.onerror = function (event) {
//     console.log(`Database error, check ${event.target.errorCode}`);
// };

// function saveRecord(record) {
//     const transaction = database.transaction(['pending'], 'readwrite');
//     let store = transaction.objectStore('pending');

//     store.add(record);
// }
// // on success

// request.onsuccess = function (event) {
//     db = event.target.result;

//     if (navigator.online) {
//         console.log('Success, backend online.');
//         checkDatabase();
//     }
// }

// // complete checkDatabase

// function checkDatabase() {
//     console.log('checking database');
//     let transaction = db.transaction(['BudgetTrackerStorage'], 'readwrite');

//     let store = transaction.objectStore('BudgerTrackerStorage');

//     // getAll
//     const getAll = store.getAll();

//     getAll.onsuccess = function () {
//         if (getAll.result.length > 0) {
//             fetch('/api/transaction/bulk', {
//                 method: 'POST',
//                 body: JSON.stringify(getAll.result),
//                 headers: {
//                     accept: 'application/json, textplain, */*',
//                     'Content-Type': 'application/json',
//                 },
//             })
//                 .then((response) => response.json())
//                 .then((response) => {
//                     if (response.length > 0) {
//                         transaction = db.transaction(['BdugetTrackerStorage'], 'readwrite');


//                         const currentStorage = transaction.objectStore('BudgetTrackerStorage');
//                         // clearing
//                         currentStorage.clear();
//                     }
//                 });
//         }
//     };
// }


// // listen for online return
// window.addEventListener('online', checkDatabase);