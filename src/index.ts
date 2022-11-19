import "./css/main.css";
import * as Paho from "paho-mqtt"
import { Dom, Div } from "./dom";

enum State {
  Disconnected = 0,
  Connecting = 1,
  Disconnecting = 2,
  Failure = 3,
  ConnectionLost = 4,
  Connected = 5
}

class Main {

  private client: Paho.Client;
  private status: State;

  private msg: Div = new Div("messages");
  private log: Div = new Div("loggings");

  constructor() {
    this.client = null;
    this.updateStatus(State.Disconnected);
    
    Dom.btn("connect").addEventListener("click", () => {
      if (this.status == State.Connected) {
        this.disconnect();
      } else if (this.status == State.Disconnected) {      
        this.connect();
      } else {
        this.reset();
      }
    });

    Dom.btn("pub").addEventListener("click", () => this.publish());
    Dom.btn("sub").addEventListener("click", () => this.subscribe());
  }

  private connect() {
    this.updateStatus(State.Connecting); 
    this.client = new Paho.Client(Dom.inp("host").value, 8884, "clientId_" + Math.random().toString(16).substring(2,8));
    this.client.onMessageDelivered = m => this.messageDelivered(m);
    this.client.onMessageArrived = m => this.messageArrived(m);
    this.client.onConnectionLost = e => this.connectionLost(e);
    this.client.connect({
      useSSL: true,
      reconnect: true,
      cleanSession: true,
      userName: Dom.inp("user").value,
      password: Dom.inp("password").value,
      onSuccess: (o: Paho.WithInvocationContext) => {
        this.updateStatus(State.Connected);
        this.log.Text(`connect: success`);
      },
      onFailure: (e: Paho.ErrorWithInvocationContext) => {
        this.updateStatus(State.Failure);
        this.log.Text(`connect: failure ${e.errorMessage}`);
      }
    });
  }

  private disconnect() {
    this.updateStatus(State.Disconnecting);   
    this.unsubscribeAll();
    this.client.disconnect();  
    this.msg.Element.innerHTML ="";
    this.log.Element.innerHTML ="";
  }

  private reset() {
    if (this.client) {
      if (this.client.isConnected) {
        this.unsubscribeAll();
        try {
          this.client.disconnect();
        } catch (e) {

        }        
      }      
      this.client = null;      
    }
    this.updateStatus(State.Disconnected);
  }

  private publish() {  
    this.client.send(Dom.inp("pub").value, Dom.inp("message").value, 0, true ); 
  }

  private subscribe() {
    let topic = Dom.inp("sub").value;
    if (!Dom.div("subs").children.namedItem(topic)) {
      let newDiv = this.createChip(topic);
      this.client.subscribe(topic, { 
        qos: 0,
        onSuccess: (o => {
          this.log.Text(`subscribe: ${topic} success, grantedQos: ${o.grantedQos}`);
        }),
        onFailure: (e => {
          this.log.Text(`subscribe: ${topic} failure, ${e.errorMessage}`);
        })        
      });
      Dom.div("subs").appendChild(newDiv);      
    }
  }

  private createChip(topic: string): HTMLDivElement {
    let div = document.createElement('div') as HTMLDivElement;
    div.id = topic;
    div.classList.add("chip");
    div.innerText = topic;
    let newSpan = document.createElement('span') as HTMLSpanElement;
    newSpan.classList.add("closebtn");
    newSpan.innerHTML = "&times;";
    div.appendChild(newSpan);
    newSpan.addEventListener("click", () => this.unsubscribe(div));  
    return div;
  }

  private unsubscribeAll() {
    let child = Dom.div("subs").lastElementChild as HTMLDivElement;
    if (child) {      
      this.unsubscribe(child);
      this.unsubscribeAll();
    }
  }

  private unsubscribe(div: HTMLElement) {
    this.client.unsubscribe(div.id, {
      onSuccess: (o => {
        this.log.Text(`unsubscribe: ${div.id} success`);
      }),
      onFailure: (e => {
        this.log.Text(`unsubscribe: ${div.id} failure, ${e.errorMessage}`);
      }) 
    });
    div.remove();
  }

  private messageDelivered(message: Paho.Message) {
    this.log.Text(`publish: success`);  
  }

  private messageArrived(message: Paho.Message) {
    this.msg.Text(`${message.destinationName}:${message.payloadString}`);
  }
  
  private connectionLost(o: Paho.MQTTError) {
    this.updateStatus(State.ConnectionLost);
    this.log.Text(`connection: lost, ${o.errorMessage}`);
  }

  private updateStatus(status: State) {    
    Dom.inp("host").disabled = status >= State.Connected;
    Dom.inp("user").disabled = status >= State.Connected;
    Dom.inp("password").disabled = status >= State.Connected;
    Dom.btn("connect").innerText = (State.Connected === status) ? "Disconnect" : (State.Disconnected === status) ? "Connect" : "Reset";

    Dom.inp("message").disabled = status < State.Connected;
    Dom.inp("pub").disabled = status < State.Connected;    
    Dom.btn("pub").disabled = status < State.Connected;

    Dom.inp("sub").disabled = status < State.Connected;
    Dom.btn("sub").disabled = status < State.Connected;

    if (this.status === State.Disconnecting && status === State.ConnectionLost) {
      setTimeout(() => this.updateStatus(State.Disconnected), 0);
    }
    this.status = status;
    console.log(State[status]);
  }
}

let x = new Main();

