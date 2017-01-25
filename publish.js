
var common = require("./common");

//function sendMessage(connection, topic, message)

function sendToChannel(channel, topic, message) {
  return channel.assertQueue(topic).then(() => {
    return channel.sendToQueue(topic, new Buffer(message));
  });
}

function publish(topic, message) {

  if(common.isConnected() === false) {
    return common.connect().then(channel => {
      return sendToChannel(channel, topic, message);
    });
  }
  else {
    return sendToChannel(common.channel, topic, message);
  }
}

module.exports = {
  connect: common.connect,
  publish: publish
};
