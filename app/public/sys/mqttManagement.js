/**
 * serialPortManager
 *
 * This scripts manages the calls and callbacks from ipcMain to mainWindow renderer -
 * related to SerialPort calls
 *
 */
const { ipcMain, dialog } = require('electron');
const path = require('path');

var mqtt = require('mqtt');

var client = null;
var sendToWindow;
/*
//MQTT
client.on("connect", function() {
  client.subscribe("presence");
  client.publish("presence", "Hello mqtt");
});

client.on("message", function(topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
*/

class mqttManager {

    constructor(_sendToWindow) {

        sendToWindow = _sendToWindow.bind(this);
        this.connect = this.connect.bind(this);
        this.publish = this.publish.bind(this);

        ipcMain.on('mqtt-subscribe', (event, url, topic) => {
            console.log("MQTT SUBSCRIBE");
            this.connect(url, topic);
        });

        ipcMain.on('mqtt-publish', (event, topic, message) => {
            console.log("MQTT PUBLISH " + message);
            this.publish(topic, message);
        });

        this.url = null;
        this.topic = null;
    }

    connect(url, topic) {
        this.url = url;
        this.topic = topic;
        sendToWindow = sendToWindow.bind(this);
        //url = 'mqtt://test.mosquitto.org';
        if (client)
            client.end();

        console.log("connecting to URL: " + this.url)
        client = mqtt.connect(url); //'mqtt://test.mosquitto.org'

        client.on('connect', function() {
            client.subscribe(topic);
            sendToWindow("mqtt-connected", true);
        });

        client.on('message', function(outTopic, message) {
            console.log("MQTT message @" + outTopic + "->" + message.toString());
            sendToWindow("mqtt-message", outTopic, message);
        });

        client.on('error', function(error) {
            sendToWindow("mqtt-error", error);
        });
    }

    publish(topic, message) {
        if (client) {
            console.log("publishing to mqtt" + message);
            client.publish(topic, message);
        }
    }


}

module.exports = mqttManager;