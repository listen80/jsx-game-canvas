export default {
  onCreate() {
    this.$event.on("talk", ($state, data, next) => {
      this.talks = data;
      this.next = next;
    });
  },

  onClose() {
    this.talks = null;
    this.next();
  },

  render() {
    return this.talks ? (
      <Talk talks={this.talks} onClose={this.onClose} />
    ) : null;
  },
};
