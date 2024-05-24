export default class Messages {
  constructor(size, actions) {
    this.size = size;
    this.messages = [];
    this.onAdded = actions.onAdded;
    this.onRemoved = actions.onRemoved;
  }

  getMessages() {
    return this.messages;
  }

  addMessage(message) {
    if (this.messages.length >= this.size) {
      const removedMessage = this.messages.shift();
      this.onRemoved(removedMessage);
    }

    const messageWithId = { id: Date.now(), message };
    this.messages.push(messageWithId);
    this.onAdded(messageWithId);
  }
};
