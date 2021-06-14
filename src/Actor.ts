import { Address } from './Machine';
import { Queue } from './Queue';

export class Actor<States, Messages> {
  public address: Address;
  protected state: States;
  protected queue: Queue<Messages>;
  protected messageType: Messages[keyof Pick<Messages, Extract<keyof Messages, 'type'>>];
  constructor(state: States) {
    this.state = state;
    this.queue = new Queue<Messages>();
    this.message = this.message.bind(this);
    this.envelope = this.envelope.bind(this);
  }
  message(message: Messages): any {
    return console.warn(message, 'called on base Actor');
  }
  envelope(message: Messages): void {
    this.queue.enqueue(this.message(message));
  }
}
