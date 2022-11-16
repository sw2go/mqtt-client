import "./css/main.css";
import * as Paho from "paho-mqtt"

enum State {
  Disconnected = 0,
  Connecting = 1,
  Disconnecting = 2,
  Failure = 3,
  ConnectionLost = 4,
  Connected = 5
}

class main {

  private client: Paho.Client;
  private status: State;

  constructor() {
    this.client = null;
    this.updateStatus(State.Disconnected);

    this.btn("connect").addEventListener("click", () => {
      if (this.status == State.Connected) {
        this.disconnect();
      } else if (this.status == State.Disconnected) {      
        this.connect();
      } else {
        this.reset();
      }
    });

    this.btn("pub").addEventListener("click", () => this.publish());
    this.btn("sub").addEventListener("click", () => this.subscribe());
  }

  private connect() {
    this.updateStatus(State.Connecting); 
    this.client = new Paho.Client(this.inp("host").value, 8884, "clientId_" + Math.random().toString(16).substring(2,8));
    this.client.onMessageDelivered = m => this.messageDelivered(m);
    this.client.onMessageArrived = m => this.messageArrived(m);
    this.client.onConnectionLost = e => this.connectionLost(e);
    this.client.connect({
      useSSL: true,
      reconnect: true,
      cleanSession: true,
      userName: this.inp("user").value,
      password: this.inp("password").value,
      onSuccess: (o: Paho.WithInvocationContext) => {
        this.updateStatus(State.Connected);
        this.divAddHTML("console", `connect: success`);        
      },
      onFailure: (e: Paho.ErrorWithInvocationContext) => {
        this.updateStatus(State.Failure);
        this.divAddHTML("console", `connect: failure ${e.errorMessage}`);
      }
    });
  }

  private disconnect() {
    this.updateStatus(State.Disconnecting);   
    this.unsubscribeAll();
    this.client.disconnect();  
    this.div("messages").innerHTML =""; 
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
    this.client.send(this.inp("pub").value, this.inp("message").value, 0, true ); 
  }

  private subscribe() {
    let topic = this.inp("sub").value;
    if (!this.div("subs").children.namedItem(topic)) {
      let newDiv = this.createChip(topic);
      this.client.subscribe(topic, { 
        qos: 0,
        onSuccess: (o => {
          this.divAddHTML("console", `subscribe: ${topic} success, grantedQos: ${o.grantedQos}`);
        }),
        onFailure: (e => {
          this.divAddHTML("console", `subscribe: ${topic} failure, ${e.errorMessage}`);
        })        
      });
      this.div("subs").appendChild(newDiv);      
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
    let child = this.div("subs").lastElementChild as HTMLDivElement;
    if (child) {      
      this.unsubscribe(child);
      this.unsubscribeAll();
    }
  }

  private unsubscribe(div: HTMLElement) {
    this.client.unsubscribe(div.id, {
      onSuccess: (o => {
        this.divAddHTML("console", `unsubscribe: ${div.id} success`);
      }),
      onFailure: (e => {
        this.divAddHTML("console", `unsubscribe: ${div.id} failure, ${e.errorMessage}`);
      }) 
    });
    div.remove();
  }

  private messageDelivered(message: Paho.Message) {
    this.divAddHTML("console", `publish: success`);  
  }

  private messageArrived(message: Paho.Message) {
    this.divAddHTML("messages", `${message.destinationName}:${message.payloadString}`);
  }
  
  private connectionLost(o: Paho.MQTTError) {
    this.updateStatus(State.ConnectionLost);
    this.divAddHTML("console", `connection: lost, ${o.errorMessage}`);
  }

  private divAddHTML(id: string, html: string) {
    let div = this.div(id);
    div.innerHTML += html + "<br>";
    div.scrollTop = div.scrollHeight; 
  }

  private updateStatus(status: State) {    
    this.inp("host").disabled = status >= State.Connected;
    this.inp("user").disabled = status >= State.Connected;
    this.inp("password").disabled = status >= State.Connected;
    this.btn("connect").innerText = (State.Connected === status) ? "Disconnect" : (State.Disconnected === status) ? "Connect" : "Reset";

    this.inp("message").disabled = status < State.Connected;
    this.inp("pub").disabled = status < State.Connected;    
    this.btn("pub").disabled = status < State.Connected;

    this.inp("sub").disabled = status < State.Connected;
    this.btn("sub").disabled = status < State.Connected;

    if (this.status === State.Disconnecting && status === State.ConnectionLost) {
      setTimeout(() => this.updateStatus(State.Disconnected), 0);
    }
    this.status = status;
    console.log(State[status]);
  }

  private  btn(id: string): HTMLButtonElement {
    return this.ele("btn", id) as HTMLButtonElement;
  }
  private inp(id: string): HTMLInputElement {
    return this.ele("inp", id) as HTMLInputElement
  }
  private div(id: string): HTMLElement {
    return this.ele("div", id)
  }

  private ele(ele: string, id: string): HTMLElement {
    return document.getElementById(ele + "-" + id);
  }

}

let x = new main();


// Global Helpers
















