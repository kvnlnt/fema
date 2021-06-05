function getIdGenerator() {
  let lastId = 0;
  return function getNextUniqueId() {
    lastId += 1;
    return lastId;
  };
}
export const getNextUniqueId = getIdGenerator();

const inboxes: Record<string, any> = {};
export function inbox<T>(eventType: string | number, callback: (args: T) => void, id: number = getNextUniqueId()) {
  if (!inboxes[eventType]) inboxes[eventType] = {};
  inboxes[eventType][id] = callback;
}

export function send<T>(eventType: string | number, arg?: T) {
  if (!inboxes[eventType]) return;
  Object.keys(inboxes[eventType]).forEach((key) => inboxes[eventType][key](arg));
}
