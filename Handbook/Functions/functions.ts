interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
  info!: string;
  onClickBad = (e: Event) => {
    // oops, used `this` here. using this callback would crash at runtime
    this.info = e.type;
    console.log(e.type);
  }
}

let h = new Handler();
let uiElement: UIElement = {
  addClickListener: function(cb) {
    document.body.onclick = cb
  }
}
uiElement.addClickListener(h.onClickBad); // error!