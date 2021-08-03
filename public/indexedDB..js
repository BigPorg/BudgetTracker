let db;
let budgie;

// what does this OR do again?
const request = indexedDB.open('budgetTracker', budgie || 10);

// on upgrade
request.onupgradeneeded = function (event) {
    const { oldVersion } = event;
    const newVersion = event.newVersion || db.version;

    console.log('From old to new');

    db = event.target.result;

    if (db.objectStoresNames.length === 0) {
        db.createObjectStore('budgetStorage', { autoIncrement: true });
    }
};



// on error

// on success

// on complete

// listen for online return
window.addEventListener('online', checkDatabase);