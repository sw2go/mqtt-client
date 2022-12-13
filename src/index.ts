import "./css/main.css";
import * as Paho from "paho-mqtt"
import { Dom, Div, UI, Tab, Chip } from "./dom";

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

  private ui = new UI();

  constructor() {
    this.client = null;
    this.updateStatus(State.Disconnected);
    
    Dom.btn("connect").addEventListener("click", () => this.connection() );
    Dom.btn("disconnect").addEventListener("click", () => this.connection() );
    Dom.btn("lastwill").addEventListener("click", (e) => this.toogleAccordion(e.target as HTMLButtonElement) );

    Dom.btn("pub").addEventListener("click", () => this.publish());
    Dom.btn("sub").addEventListener("click", () => this.subscribe());
    Dom.btn("messages").addEventListener("click", (e) => Tab.activate(e.currentTarget, "messages"));
    Dom.btn("loggings").addEventListener("click", (e) => Tab.activate(e.currentTarget, "loggings"));
    Dom.btn("messages").click();
    Dom.btn("clear").addEventListener("click", () => this.clear());
  }

  private toogleAccordion(btn: HTMLButtonElement) {
    btn.classList.toggle("active");
    btn.nextElementSibling.classList.toggle("hide");  // toggle visibility of Element after the button
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

  private clear() {
    this.msg.Element.innerHTML ="";
    this.log.Element.innerHTML ="";
  }

  private connect() {
    this.updateStatus(State.Connecting);

    let clientId: string = this.ui.ClientId;

    if (this.ui.ClientId.length == 0) {
      if (this.ui.CleanSession) {
        clientId = "randomId_" + Math.random().toString(16).substring(2,8);
      } else {
        alert(`Client Id is mandatory when using session`);
        return;
      }
    }

    this.client = new Paho.Client(this.ui.Host, 8884, clientId);
    this.client.onMessageDelivered = m => this.messageDelivered(m);
    this.client.onMessageArrived = m => this.messageArrived(m);
    this.client.onConnectionLost = e => this.connectionLost(e);

    let options: Paho.ConnectionOptions = {
      useSSL: true,
      reconnect: this.ui.Reconnect,
      cleanSession: this.ui.CleanSession,
      userName: this.ui.User,
      password: this.ui.Password,        
      onSuccess: (o: Paho.WithInvocationContext) => {
        this.updateStatus(State.Connected, clientId);
      },
      onFailure: (e: Paho.ErrorWithInvocationContext) => {
        this.updateStatus(State.ConnectFailure, `${clientId} error: ${e.errorMessage}`);
      } 
    }

    if (this.ui.LastWill.Message.length > 0 && this.ui.LastWill.Topic.length) {
      let lw = new Paho.Message(this.ui.LastWill.Message);
      lw.destinationName = this.ui.LastWill.Topic;
      lw.qos = this.ui.LastWill.Qos as Paho.Qos;
      lw.retained = this.ui.LastWill.Retained;
      console.log(lw);
      options.willMessage = lw;
    }

    try {
      this.client.connect(options);
    } catch (e: any) {
      this.updateStatus(State.ConnectInvalidState, `${clientId} error: ${e.message}`);
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
  }

  private reset() {
    if (this.client) {
      if (this.client.isConnected()) {
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
    try {
      this.client.send( 
        this.ui.Pub.Topic, 
        this.ui.Pub.Message, 
        this.ui.Pub.Qos as Paho.Qos, 
        this.ui.Pub.Retained); 
    } catch (e) {
      this.updateStatus(State.PublishInvalidState);
    } 
  }

  private subscribe() {
    let chip = Chip.create(this.ui.Sub.Topic, this.ui.ClientId, this.ui.CleanSession, this.ui.Sub.Qos, (e) => this.unsubscribe(e));  
    if (chip) {
      try {
        this.client.subscribe(this.ui.Sub.Topic, { 
          qos: this.ui.Sub.Qos as Paho.Qos,
          onSuccess: (o => {
            Chip.add(chip);
            this.log.Text(`subscribe: ${this.ui.Sub.Topic} success, grantedQos: ${o.grantedQos}`);
          }),
          onFailure: (e => {
            this.log.Text(`subscribe: ${this.ui.Sub.Topic} failure, ${e.errorMessage}`);
          })        
        });  
      }catch (e) {
        this.updateStatus(State.SubscribeInvalidState);
      }        
    }
  }

  private unsubscribeAll() {
    let chips = Chip.allCleanSession();
    for (let i = 0; i < chips.length; i++) {
      this.unsubscribe(chips[i]);
    }
  }

  private unsubscribe(chip: HTMLDivElement) {
    if (this.client?.isConnected()) {
      if (Chip.isCleanSession(chip) || Chip.isSameClient(chip, this.ui.ClientId)) {
        try {
          this.client.unsubscribe(Chip.Topic(chip), {
            onSuccess: (o => {
              this.log.Text(`unsubscribe: ${Chip.Topic(chip)} success`);
              Chip.remove(chip);
            }),
            onFailure: (e => {
              this.log.Text(`unsubscribe: ${Chip.Topic(chip)} failure, ${e.errorMessage}`);
            }) 
          });
        } catch(e) {   
          this.updateStatus(State.UnsubscribeInvalidState)   
        }  
      }
    } else if (Chip.isCleanSession(chip)) {
      Chip.remove(chip);  // not connected with clean session -> subscription is lost anyway
    } else {
      // keep chip, it belongs to another session or the client is not connected
    }
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

