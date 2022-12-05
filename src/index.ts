import "./css/main.css";
import * as Paho from "paho-mqtt"
import { Dom, Div } from "./dom";

enum State {
  Disconnected = 0,
  Connecting = 1,
  Disconnecting = 2,
  ConnectFailure = 3,
  ConnectInvalidState = 4,
  DisconnectInvalidState = 5,
  PublishInvalidState = 6,
  SubscribeInvalidState = 7,
  UnsubscribeInvalidState = 8,
  ConnectionLost = 9,
  Connected = 10
}

class Main {

  private client: Paho.Client;
  private status: State;

  private msg: Div = new Div("messages");
  private log: Div = new Div("loggings");

  constructor() {
    this.client = null;
    this.updateStatus(State.Disconnected);
    
    Dom.btn("connect").addEventListener("click", () => this.connection() );
    Dom.btn("disconnect").addEventListener("click", () => this.connection() );

    Dom.btn("pub").addEventListener("click", () => this.publish());
    Dom.btn("sub").addEventListener("click", () => this.subscribe());
    Dom.btn("messages").addEventListener("click", (e) => this.activateTab(e, "messages"));
    Dom.btn("loggings").addEventListener("click", (e) => this.activateTab(e, "loggings"));
    Dom.btn("messages").click();
  }

  private connection() {
    if (this.status == State.Connected) {
      this.disconnect();
    } else if (this.status == State.Disconnected) {      
      this.connect();
    } else {
      this.reset();
    }
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
    this.updateStatus(State.Connecting);

    let clientId: string = Dom.inp("client-id").value;

    if (!clientId || clientId.trim().length == 0) {
      if (Dom.inp("clean-session").checked) {
        clientId = "randomId_" + Math.random().toString(16).substring(2,8);
      } else {
        alert(`Client Id is mandatory when using session`);
        return;
      }
    }

    this.client = new Paho.Client(Dom.inp("host").value, 8884, clientId);
    this.client.onMessageDelivered = m => this.messageDelivered(m);
    this.client.onMessageArrived = m => this.messageArrived(m);
    this.client.onConnectionLost = e => this.connectionLost(e);

    try {
      this.client.connect({
        useSSL: true,
        reconnect: Dom.inp("reconnect").checked,
        cleanSession: Dom.inp("clean-session").checked,
        userName: Dom.inp("user").value,
        password: Dom.inp("password").value,
        onSuccess: (o: Paho.WithInvocationContext) => {
          this.updateStatus(State.Connected, clientId);
        },
        onFailure: (e: Paho.ErrorWithInvocationContext) => {
          this.updateStatus(State.ConnectFailure, `${clientId} error: ${e.errorMessage}`);
        }
      });
    } catch (e) {
      this.updateStatus(State.ConnectInvalidState, `${clientId}`);
    }
  }

  private disconnect() {
    this.updateStatus(State.Disconnecting);   
    this.unsubscribeAll();
    try {
      this.client.disconnect();
    } catch (e) {
      this.updateStatus(State.DisconnectInvalidState);
    }    
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
          this.updateStatus(State.DisconnectInvalidState);
        }        
      }      
      this.client = null;      
    }
    this.updateStatus(State.Disconnected);
  }

  private publish() {      
    let qos = parseInt(Dom.inp("pub-qos").value) as Paho.Qos;
    try {
      this.client.send(Dom.inp("pub").value, Dom.inp("message").value, qos, Dom.inp("retained").checked); 
    } catch (e) {
      this.updateStatus(State.PublishInvalidState);
    } 
  }

  private subscribe() {
    let clientId = Dom.inp("client-id").value;
    let topic = Dom.inp("sub").value;
    let qos = parseInt(Dom.inp("sub-qos").value) as Paho.Qos;

    // create chip only if it does not jet exist for the current session 
    if (!Dom.div("subs").querySelector(`[topic="${topic}"][client-id="${clientId}"]`)) {
      let newDiv = this.createChip(topic);      
      try {
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
      }catch (e) {
        this.updateStatus(State.SubscribeInvalidState);
      }        
    }
  }

  private createChip(topic: string): HTMLDivElement {
    let chip = document.createElement('div') as HTMLDivElement;
    chip.classList.add("chip");
    chip.setAttribute("clean-session", Dom.inp("clean-session").checked ? "1" : "0");
    chip.setAttribute("client-id", Dom.inp("client-id").value);
    chip.setAttribute("topic", topic);
    chip.setAttribute("qos", Dom.inp("sub-qos").value);
    chip.innerText = topic;
    let newSpan = document.createElement('span') as HTMLSpanElement;
    newSpan.classList.add("chip-x");
    newSpan.innerHTML = "&times;";
    chip.appendChild(newSpan);
    newSpan.addEventListener("click", () => { 
      if (chip.getAttribute("clean-session") === "1" || chip.getAttribute("client-id") === Dom.inp("client-id").value) {
        this.unsubscribe(chip);
      } else {
        alert("to unsubscribe use correct client-id: " + chip.getAttribute("client-id"));
      }
    });  
    return chip;
  }

  private unsubscribeAll() {
    let chip = Dom.div("subs").lastElementChild as HTMLDivElement;
    // unsubscribe all only when connection was a clean-session 
    if (chip && chip.classList.contains("chip") && chip.getAttribute("clean-session") === "1") {      
      this.unsubscribe(chip);
      this.unsubscribeAll();
    }  
  }

  private unsubscribe(div: HTMLElement) {
    let topic = div.getAttribute("topic");
    try {
      this.client.unsubscribe(topic, {
        onSuccess: (o => {
          this.log.Text(`unsubscribe: ${topic} success`);
        }),
        onFailure: (e => {
          this.log.Text(`unsubscribe: ${topic} failure, ${e.errorMessage}`);
        }) 
      });
    } catch(e) {   
      this.updateStatus(State.UnsubscribeInvalidState)   
    }
    div.remove();
  }

  private messageDelivered(message: Paho.Message) {
    this.log.Text(`publish: success`);  
  }

  private messageArrived(message: Paho.Message) {

    Dom.div("state").classList.add("incoming");
    setTimeout(() => { Dom.div("state").classList.remove("incoming"); }, 100);

    this.msg.Text(`${message.destinationName}:${message.payloadString}`);
  }
  
  private connectionLost(o: Paho.MQTTError) {
    this.updateStatus(State.ConnectionLost, o.errorMessage);
  }

  private updateStatus(status: State, text: string = null) {  

    if (text) {
      this.log.Text(`${State[status]} ${text}`);
    } else {
      this.log.Text(`${State[status]}`);      
    }
    
    Dom.div("state").classList.remove("connected");

    if (status >= State.Connected) {
      Dom.div("state").classList.add("connected");
      Dom.div("connect").classList.add("hide");
      Dom.div("disconnect").classList.remove("hide");
    } else {
      Dom.div("connect").classList.remove("hide");
      Dom.div("disconnect").classList.add("hide");
    }

    Dom.fieldset("pub-sub").disabled = status < State.Connected;

    Dom.btn("connect").innerText = (State.Connected === status) ? "Disconnect" : (State.Disconnected === status) ? "Connect" : "Reset";
    Dom.btn("disconnect").innerText = (State.Connected === status) ? "Disconnect" : (State.Disconnected === status) ? "Connect" : "Reset";

    if (this.status === State.Disconnecting && status === State.ConnectionLost) {
      setTimeout(() => this.updateStatus(State.Disconnected), 0);
    }
    this.status = status;    
  }
}

let x = new Main();

