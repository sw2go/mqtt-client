import "./css/main.css";
import * as Paho from "paho-mqtt"
const tbHost: HTMLInputElement = document.querySelector("#tbHost");
const tbUser: HTMLInputElement = document.querySelector("#tbUser");
const tbPassword: HTMLInputElement = document.querySelector("#tbPassword");
const btnConnect: HTMLButtonElement = document.querySelector("#btnConnect");

const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");

let client: Paho.Client = null;

btnConnect.addEventListener("click", () => {
  if (client) {
    client.onMessageArrived = null;
    client.onConnectionLost = null;
    client.disconnect();
    client = null;
  }

  client = new Paho.Client(tbHost.value, 8884, "clientId_" + Math.random().toString(16).substring(2,8));
  client.onMessageArrived = messageArrived;
  client.onConnectionLost = connectionLost;
  client.connect({
    useSSL: true,
    userName: tbUser.value,
    password: tbPassword.value,
    onSuccess: (ctx: Paho.WithInvocationContext) => {
      console.log("onConnect", ctx);
      client.subscribe("my/test/#");
    },
    onFailure: (err: Paho.ErrorWithInvocationContext) => {
      console.log("onFailure", err);
    }
  });

});

btnSend.addEventListener("click", () => {
  let message = new Paho.Message(tbMessage.value);
  message.destinationName = "my/test/topic";
  client.send(message); 
});

function messageArrived (message: Paho.Message ) {
  console.log("onMessageArrived:" + message.destinationName + " - " + message.payloadString);
  divMessages.innerHTML += message.destinationName + " - " + message.payloadString + '<br>';
}

function connectionLost(responseObject: Paho.MQTTError) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}
