
var ampqlib = require("amqplib");

function connect(connectionString) {
  return ampqlib.connect(connectionString).then(connection => {
    this.connection = connection;

    return this.connection;
  }).then(connection => {
    this.channel = connection.createChannel();

    return this.channel;
  });
}

function disconnect() {
  this.connection.close();

  this.connection = null;
  this.channel = null;
}

function isConnected() {
  return this.connection && this.channel;
};

module.exports = {
  isConnected: isConnected,
  connect: connect,
  ampqlib: ampqlib,
  connection: this.connection,
  channel: this.channel
};
