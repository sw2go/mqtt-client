export class Dom {

    /**
     * Get HTMLButtonElement by "btn-{id}"
     */
    public static btn(id: string): HTMLButtonElement {
        return Dom.ele("btn", id) as HTMLButtonElement;
    }

    /**
     * Get HTMLInputElement by "inp-{id}"
     */
    public static inp(id: string): HTMLInputElement {
        return Dom.ele("inp", id) as HTMLInputElement;
    }

    /**
     * Get HTMLDivElement by "div-{id}"
     */
    public static div(id: string): HTMLDivElement {
        return Dom.ele("div", id) as HTMLDivElement;
    }

    public static fieldset(id: string): HTMLFieldSetElement {
        return Dom.ele("fieldset", id) as HTMLFieldSetElement;
    }

    /**
     * Get HTMLElement by "{ele}-{id}"
     */
    public static ele(ele: string, id: string): HTMLElement {
        return document.getElementById(`${ele}-${id}`);
    }

    public static divAddHTML(id: string, html: string) {
        let div = Dom.div(id);
        div.innerHTML += html + "<br>";
        div.scrollTop = div.scrollHeight; 
    }

    public static now() {
        return new Date().toLocaleTimeString('de-CH', { hour12: false, 
            hour: "numeric", 
            minute: "numeric",
            second: "numeric"});
    }

}

export class Div {
    private div: HTMLDivElement = null;
    constructor(id: string) {
        this.div = Dom.div(id);
    }

    public Text(text: string) {
        let e = document.createElement("span");
        e.innerText += Dom.now() + " " + text;
        this.div.appendChild(e);
        e = document.createElement("br");
        this.div.appendChild(e);
        return this;
    }

    public Br() {
        let e = document.createElement("br");
        this.div.appendChild(e);
        return this;
    }

    public get Element(): HTMLDivElement {
        return this.div;
    }
}

export class UI {
    constructor () { }
    private lwData = new UIMsg("lw");
    private pubData = new UIMsg("pub");
    private subData = new UISub("sub");
    public get Host() { return Dom.inp("host").value; }
    public get User() { return Dom.inp("user").value; }
    public get Password() { return Dom.inp("password").value; }
    public get LastWill() { return this.lwData; }
    public get Reconnect() { return Dom.inp("reconnect").checked; }
    public get CleanSession() { return Dom.inp("clean-session").checked; }
    public get ClientId() { return Dom.inp("client-id").value.trim(); }
    public get Pub() { return this.pubData; }
    public get Sub() { return this.subData; }
}

class UISub {
    constructor (protected prefix: string) { }
    public get Topic() { return Dom.inp(`${this.prefix}-topic`).value.trim(); }
    public get Qos() { return parseInt(Dom.inp(`${this.prefix}-qos`).value); }
}
  
class UIMsg extends UISub {
    constructor ( prefix: string) { super(prefix); }
    public get Message() { return Dom.inp(`${this.prefix}-message`).value.trim(); }
    public get Retained() { return Dom.inp(`${this.prefix}-retained`).checked; }
}


export class Tab {    
    public static activate(button: EventTarget, tabContentDivId) {        
        // Hide all "tabcontent" 
        let tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLDivElement>;
        for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        }

        // Remove the class "active" from "tablinks"
        let tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }

        // Show the current "tabcontent" and set "tablink" "active"
        Dom.div(tabContentDivId).style.display = "block";
        (button as HTMLElement).classList.add("active");
    }
}


export class Chip {
    public static create(topic: string, clientId: string, cleanSession: boolean, qos: number, unsubscribe: (HTMLElement) => void): HTMLDivElement {        
        if (Dom.div("subs").querySelector(`[topic="${topic}"][client-id="${clientId}"]`)) {
            return null; // chip/subscription already exists
        } else {
            let chip = document.createElement('div') as HTMLDivElement;
            chip.classList.add("chip");
            chip.setAttribute("clean-session", cleanSession ? "1" : "0");
            chip.setAttribute("client-id", clientId);
            chip.setAttribute("topic", topic);
            chip.setAttribute("qos", qos.toString());
            chip.innerText = topic;
            
            let close = document.createElement('span') as HTMLSpanElement;
            close.classList.add("chip-x");
            close.innerHTML = "&times;";
            close.addEventListener("click", () => unsubscribe(chip));  
            chip.appendChild(close);
            
            let tooltip = document.createElement('span') as HTMLSpanElement;
            tooltip.classList.add("tooltiptext");
            tooltip.innerText = cleanSession ? `clean(${clientId}) qos=${qos}` :  `${clientId} qos=${qos}`
            chip.appendChild(tooltip);

            return chip;
        }
      }

      public static add(chip: HTMLDivElement) {
        Dom.div("subs").appendChild(chip);  
      }

      public static remove(chip: HTMLDivElement) {
        chip.remove();
      }

      public static allCleanSession() {
        // any chip with clean-session
        return Dom.div("subs").querySelectorAll(`.chip[clean-session="1"]`) as NodeListOf<HTMLDivElement>;
      }

      public static isCleanSession(chip: HTMLDivElement) {
        return chip.getAttribute("clean-session") === "1";
      }

      public static isSameClient(chip: HTMLDivElement, clientId: string) {
        return chip.getAttribute("client-id") === clientId;
      }

      public static Topic(chip: HTMLDivElement) {
        return chip.getAttribute("topic");
      }
}




