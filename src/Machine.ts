import { Actor } from './actor';
import { getNextUniqueId, inbox } from './Messaging';

export const Machine = <T>() => {
  return {
    assign: <U>(actor: { new (): T extends Actor<U> ? T : never }, address: string | number = getNextUniqueId()) => {
      inbox(address, new actor().envelope);
      return address;
    },
  };
};
