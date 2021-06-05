import { Actor } from './actor';
import { Machine } from './Machine';
import { send } from './Messaging';

type GreetActorMessages = { type: 'HELLO'; name: string } | { type: 'GOODBYE'; name: string };
class GreetActor extends Actor<GreetActorMessages> {
  constructor() {
    super('HELLO');
  }
  message(message: GreetActorMessages) {
    switch (this.state) {
      case 'HELLO':
        console.log('hello', message.name);
        this.state = 'GOODBYE';
        break;
      case 'GOODBYE':
        console.log('goodbye', message.name);
        this.state = 'HELLO';
        break;
      default:
        break;
    }
  }
}

type InsultActorMessages = { type: 'YURDUMB'; name: string } | { type: 'YURUGLY'; name: string };
class InsultActor extends Actor<InsultActorMessages> {
  constructor() {
    super('YURDUMB');
  }
  message(message: InsultActorMessages) {
    switch (this.state) {
      case 'YURDUMB':
        console.log('yurdumb', message.name);
        this.state = 'YURUGLY';
        break;
      case 'YURUGLY':
        console.log('yurugly', message.name);
        this.state = 'YURDUMB';
        break;
      default:
        break;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const machine = Machine<GreetActor | InsultActor>();
  const greetInbox = machine.assign(GreetActor);
  const insultInbox = machine.assign(InsultActor);
  send<GreetActorMessages>(greetInbox, { type: 'HELLO', name: 'Kevin' });
  send<InsultActorMessages>(insultInbox, { type: 'YURDUMB', name: 'Kevin' });
});
