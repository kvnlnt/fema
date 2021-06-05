import { Queue } from './Queue';

export class Actor<Messages> {
  protected state: Messages[keyof Pick<Messages, Extract<keyof Messages, 'type'>>];
  protected queue: Queue<Messages>;
  constructor(state: Messages[keyof Pick<Messages, Extract<keyof Messages, 'type'>>]) {
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
