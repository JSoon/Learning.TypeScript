"use strict";
var Handler = /** @class */ (function () {
    function Handler() {
        var _this = this;
        this.onClickBad = function (e) {
            // oops, used `this` here. using this callback would crash at runtime
            _this.info = e.type;
            console.log(e.type);
        };
    }
    return Handler;
}());
var h = new Handler();
var uiElement = {
    addClickListener: function (cb) {
        document.body.onclick = cb;
    }
};
uiElement.addClickListener(h.onClickBad); // error!
