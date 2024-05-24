export default class Messages {
  constructor(size, actions) {
    this.size = size;
    this.messages = [];
    this.actions = actions;
  }

  getMessages() {
    return this.messages;
  }

  addMessage(message) {
    if (this.messages.length >= this.size) {
      const removedMessage = this.messages.shift();
      this.actions.onRemoved(removedMessage);
    }

    const messageWithId = { id: Date.now(), message };
    this.messages.push(messageWithId);
    this.actions.onAdded(messageWithId);
  }
};
