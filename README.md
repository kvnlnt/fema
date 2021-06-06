# Fema
Frontend State Machine

## :construction: Don't use, under construction

## Summary
This is an experimental state machine based on the [Actor Model](https://en.wikipedia.org/wiki/Actor_model). 

## Goals
- [x] can send a finite number of messages to other actors
- [x] can create a finite number of new actors
- [x] can designate the behavior to be used for the next message it receives

## Example

```Typescript
import { Actor } from './actor';
import { Machine } from './Machine';
import { send } from './Messaging';

// Define an Actor and its message types
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
  // Create an actor and retrieve its address
  const greetInbox = machine.assign(GreetActor);
  // Send a message to an actor at an address
  send<GreetActorMessages>(greetInbox, { type: 'HELLO', name: 'Kevin' });
  send<GreetActorMessages>(greetInbox, { type: 'GOODBYE', name: 'Kevin' });
});
```