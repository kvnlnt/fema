import { Actor } from './actor';
import { getNextUniqueId, inbox } from './Messaging';

export const Machine = <ActorClass>() => {
  return {
    assign: <States, Messages>(
      actor: { new (): ActorClass extends Actor<States, Messages> ? ActorClass : never },
      address: string | number = getNextUniqueId(),
    ) => {
      inbox(address, new actor().envelope);
      return address;
    },
  };
};
