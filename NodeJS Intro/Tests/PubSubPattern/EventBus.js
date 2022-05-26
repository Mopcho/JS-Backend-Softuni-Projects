let subscribers = {};

//subscribe
exports.subscribe = (eventType,callback) => {
    if(!subscribers[eventType]) {
        subscribers[eventType] = [];
    }

    subscribers[eventType].push(callback);

    return () => {
        subscribers[eventType] = subscribers[eventType].filter(x = x != callback);
    }
}

//emit
exports.publish = (eventType,...args) => {
    subscribers[eventType].forEach(x=>x(...args));
}
