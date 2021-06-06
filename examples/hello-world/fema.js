(() => {
  // src/Queue.ts
  var Queue = class {
    constructor() {
      this.promises = [];
      this.resolvers = [];
    }
    addPromise() {
      this.promises.push(new Promise((resolve) => {
        this.resolvers.push(resolve);
      }));
    }
    enqueue(t) {
      if (!this.resolvers.length)
        this.addPromise();
      const resolve = this.resolvers.shift();
      resolve(t);
    }
    dequeue() {
      if (!this.promises.length)
        this.addPromise();
      const promise = this.promises.shift();
      return promise;
    }
    get length() {
      return this.promises.length - this.resolvers.length;
    }
  };

  // src/Actor.ts
  var Actor = class {
    constructor(state) {
      this.state = state;
      this.queue = new Queue();
      this.message = this.message.bind(this);
      this.envelope = this.envelope.bind(this);
    }
    message(message) {
      return console.warn(message, "called on base Actor");
    }
    envelope(message) {
      this.queue.enqueue(this.message(message));
    }
  };

  // src/Messaging.ts
  function getIdGenerator() {
    let lastId = 0;
    return function getNextUniqueId2() {
      lastId += 1;
      return lastId;
    };
  }
  var getNextUniqueId = getIdGenerator();
  var inboxes = {};
  function inbox(eventType, callback, id = getNextUniqueId()) {
    if (!inboxes[eventType])
      inboxes[eventType] = {};
    inboxes[eventType][id] = callback;
  }
  function send(eventType, arg) {
    if (!inboxes[eventType])
      return;
    Object.keys(inboxes[eventType]).forEach((key) => inboxes[eventType][key](arg));
  }

  // src/Machine.ts
  var Machine = () => {
    return {
      assign: (actor, address = getNextUniqueId()) => {
        inbox(address, new actor().envelope);
        return address;
      }
    };
  };

  // examples/hello-world/src/app.ts
  var GreetActor = class extends Actor {
    constructor() {
      super("HELLO");
    }
    message(message) {
      switch (message.type) {
        case "HELLO":
          console.log("hello", message.name);
          break;
        case "GOODBYE":
          console.log("goodbye", message.name);
          break;
        default:
          break;
      }
    }
  };
  window.addEventListener("DOMContentLoaded", () => {
    const machine = Machine();
    const greetInbox = machine.assign(GreetActor);
    send(greetInbox, {type: "HELLO", name: "Kevin"});
    send(greetInbox, {type: "GOODBYE", name: "Kevin"});
  });
})();
