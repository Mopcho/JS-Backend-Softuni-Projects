const eventBus = require('./EventBus');

eventBus.subscribe('Call', (name) => {console.log(`Calling ${name}`)});
eventBus.subscribe('Call', (name1,name2) => {console.log(`Calling ${name1} and ${name2}`)});
eventBus.subscribe('Close', () => {console.log('Ending call')});

eventBus.publish('Call','Didka','Marto');