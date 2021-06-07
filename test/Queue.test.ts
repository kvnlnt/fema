import { Queue } from 'src/Queue';

export default (): boolean => {
  type Messages = { test: string };
  const queue = new Queue<Messages>();
  queue.enqueue({ test: 'one' });
  queue.enqueue({ test: 'two' });
  queue.enqueue({ test: 'three' });
  queue.dequeue();
  queue.dequeue();
  queue.dequeue();
  return queue.length === 0;
};
