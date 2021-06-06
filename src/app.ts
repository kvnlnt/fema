import { Actor } from './actor';
import { Machine } from './Machine';
import { send } from './Messaging';

// Define an Actor and it's message types
type GreetActorMessages = { type: 'HELLO'; name: string } | { type: 'GOODBYE'; name: string };
class GreetActor extends Actor<GreetActorMessages> {
  constructor() {
    super('HELLO');
  }
  message(message: GreetActorMessages) {
    switch (message.type) {
      case 'HELLO':
        console.log('hello', message.name);
        break;
      case 'GOODBYE':
        console.log('goodbye', message.name);
        break;
      default:
        break;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Create a machine
  const machine = Machine<GreetActor>();
  // Create an actor and retrieve it's address
  const greetInbox = machine.assign(GreetActor);
  // Send a message to an actor at an address
  send<GreetActorMessages>(greetInbox, { type: 'HELLO', name: 'Kevin' });
  send<GreetActorMessages>(greetInbox, { type: 'GOODBYE', name: 'Kevin' });
});
