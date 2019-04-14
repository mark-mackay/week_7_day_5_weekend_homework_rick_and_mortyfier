const PubSub = {
  publish: function (channel, payload) {
    console.log('Publish Event on Channel:', channel);
    const event = new CustomEvent(channel, {
      detail: payload
    });
    document.dispatchEvent(event);
  },

  subscribe: function (channel, callback) {
    console.log('Subscribe Event on Channel:', channel);
    document.addEventListener(channel, callback);
  }
};

module.exports = PubSub;
