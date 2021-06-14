import { Actor } from './actor';
import { getNextUniqueId, inbox } from './Messaging';

export type Address = string | number;

export const Machine = <ActorClass>() => {
  return {
    assign: <States, Messages>(
      actor: { new (): ActorClass extends Actor<States, Messages> ? ActorClass : never },
      address: Address = getNextUniqueId(),
    ) => {
      const newActor = new actor();
      newActor.address = address;
      inbox(address, newActor.envelope);
      return address;
    },
  };
};
