import { inbox, send } from 'src/Messaging';

export default (): boolean => {
  let messages: string = '';
  inbox('test', (msg: string) => (messages += msg));
  send('test', 'one');
  send('test', 'two');
  send('test', 'three');
  return messages === 'onetwothree';
};
