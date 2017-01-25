
var ampqlib = require("amqplib");
var common = require("./common");

function subscribeToQueue(channel, topic) {
  return channel.assertQueue(topic).then(() => {
    return channel.consume(topic, message => {
      if (message !== null) {
        console.log(message.content.toString());
        channel.ack(message);
      }
    });
  });
}

function subscribe(topic) {
  if(common.isConnected() === false) {
    return common.connect().then(channel => {
      return subscribeToQueue(channel, topic);
    });
  }
  else {
    return subscribeToQueue(channel, topic);
  }
}

module.exports = {
  connect: common.connect,
  subscribe: subscribe
};
