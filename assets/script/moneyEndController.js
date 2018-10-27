// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        //总金币
        moneyAllVal: 0,
        //定时
        time: 0,
        //金币浮点标记
        floatTag: false
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.node.zIndex = 1001;
    },

    addVal(value) {
        this.moneyAllVal += value;
        this.time = 0;
    },
    update(dt) {
        this.time += dt
        var moneyValNode = this.node.getChildByName('moneyVal').getComponent(cc.Label);
        var thisVal = this.transMoney(moneyValNode.string);
        if (thisVal < this.transMoney(this.moneyAllVal)) {
            var difference = this.fixed((this.moneyAllVal - thisVal) * this.time * 3);
            var thisValFix = this.fixed(thisVal);
            if (thisValFix + difference > this.moneyAllVal) {
                difference = this.moneyAllVal - thisValFix;
            }
            moneyValNode.string = this.fixed(thisValFix + difference);
        }
    },
    transMoney(str) {
        //转换金额
        //...
        str = parseFloat(str);
        return str;
    },
    fixed (value) {
        if (value === 'number' && obj%1 === 0){
            return value;
        }
        if (!this.floatTag){
            return parseInt(value);
        }

        value = parseFloat(parseFloat(value).toFixed(2));
        return value;
    }
});
