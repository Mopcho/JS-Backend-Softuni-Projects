const EventEmitter = require('events');

const myEmitter = new EventEmitter();
const secondEmitter = new EventEmitter();

myEmitter.on('click',(name)=> {
    console.log(`Hello ${name}`);
});

secondEmitter.on('click',(firstName , secondName) => {
    console.log(`Hello ${firstName} ${secondName}`);
});

myEmitter.emit('click','Valeri');
secondEmitter.emit('click','Valeri','Petkov')