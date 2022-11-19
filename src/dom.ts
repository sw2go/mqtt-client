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
}


export class Div {
    private div: HTMLDivElement = null;
    constructor(id: string) {
        this.div = Dom.div(id);
    }

    public Text(text: string) {
        let e = document.createElement("span");
        e.innerText += text;
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

