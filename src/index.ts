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
    Dom.btn("messages").addEventListener("click", (e) => this.activateTab(e, "messages"));
    Dom.btn("loggings").addEventListener("click", (e) => this.activateTab(e, "loggings"));
    Dom.btn("messages").click();
  }

  private activateTab(e, name) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    Dom.div(name).style.display = "block";
    e.currentTarget.className += " active";
  }


  private connect() {
    this.updateStatus(State.Connecting);                 // TODO wenn nicht clean-session dann client-id als eingabe-feld

    let clientId: string = Dom.inp("client-id").value;

    if (!clientId || clientId.trim().length == 0) {
      if (Dom.inp("clean-session").checked) {
        clientId = "randomId_" + Math.random().toString(16).substring(2,8);
      } else {
        this.log.Text(`Client Id is mandatory when using session`);
        return;
      }
    }

    this.client = new Paho.Client(Dom.inp("host").value, 8884, clientId);
    this.client.onMessageDelivered = m => this.messageDelivered(m);
    this.client.onMessageArrived = m => this.messageArrived(m);
    this.client.onConnectionLost = e => this.connectionLost(e);
    this.client.connect({
      useSSL: true,
      reconnect: Dom.inp("reconnect").checked,
      cleanSession: Dom.inp("clean-session").checked,
      userName: Dom.inp("user").value,
      password: Dom.inp("password").value,
      onSuccess: (o: Paho.WithInvocationContext) => {
        this.updateStatus(State.Connected);
        this.log.Text(`connect ${clientId}: success`);
      },
      onFailure: (e: Paho.ErrorWithInvocationContext) => {
        this.updateStatus(State.Failure);
        this.log.Text(`connect ${clientId}: failure ${e.errorMessage}`);
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
    let qos = parseInt(Dom.inp("pub-qos").value) as Paho.Qos;
    this.client.send(Dom.inp("pub").value, Dom.inp("message").value, qos, Dom.inp("retained").checked); 
  }

  private subscribe() {
    let topic = Dom.inp("sub").value;
    if (!Dom.div("subs").children.namedItem(topic)) {
      let newDiv = this.createChip(topic);
      let qos = parseInt(Dom.inp("sub-qos").value) as Paho.Qos;
      this.client.subscribe(topic, { 
        qos: qos,
        onSuccess: (o => {
          Dom.div("subs").appendChild(newDiv);  
          this.log.Text(`subscribe: ${topic} success, grantedQos: ${o.grantedQos}`);
        }),
        onFailure: (e => {
          this.log.Text(`subscribe: ${topic} failure, ${e.errorMessage}`);
        })        
      });          
    }
  }

  private createChip(topic: string): HTMLDivElement {
    let div = document.createElement('div') as HTMLDivElement;
    div.id = topic;
    div.classList.add("chip");
    div.innerText = topic;
    let newSpan = document.createElement('span') as HTMLSpanElement;
    newSpan.classList.add("chip-x");
    newSpan.innerHTML = "&times;";
    div.appendChild(newSpan);
    newSpan.addEventListener("click", () => this.unsubscribe(div));  
    return div;
  }

  private unsubscribeAll() {
    let child = Dom.div("subs").lastElementChild as HTMLDivElement;
    if (child && child.classList.contains("chip")) {      
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

