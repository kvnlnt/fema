export class Queue<T> {
  private promises: Promise<T>[] = [];
  private resolvers: ((t: T) => void)[] = [];

  private addPromise() {
    this.promises.push(
      new Promise((resolve) => {
        this.resolvers.push(resolve);
      }),
    );
  }

  enqueue(t: T) {
    if (!this.resolvers.length) this.addPromise();
    const resolve = this.resolvers.shift()!;
    resolve(t);
  }

  dequeue() {
    if (!this.promises.length) this.addPromise();
    const promise = this.promises.shift()!;
    return promise;
  }

  get length() {
    return this.promises.length - this.resolvers.length;
  }
}
