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
        //转换常量
        valueCompanyArr: {
            default: null,
            type: ['String']
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },
    start() {
        this.valueCompanyArr = this.node.parent.getComponent('bossController').valueCompanyArr;
        this.node.zIndex = 1001;
    },

    addVal(value) {
        this.moneyAllVal += value;
        this.time = 0;
    },
    update(dt) {
        this.time += dt
        var moneyValNode = this.node.getChildByName('moneyVal').getComponent(cc.Label);
        var company = this.valueCompanyArr.indexOf(moneyValNode.string.charAt(moneyValNode.string.length - 1));
        var thisVal = parseFloat(moneyValNode.string.substring(0, moneyValNode.string.length));

        //这是用来表示单位去除运算的变量
        var tempMoneyCompeny = company == 0 ? 1 : Math.pow(1000,company);
        if (thisVal < this.fixed(this.moneyAllVal / tempMoneyCompeny)) {
            var difference = this.fixed((this.moneyAllVal / tempMoneyCompeny - thisVal) * this.time * 3);
            // var thisValFix = this.fixed(thisVal);
            if (thisVal + difference > this.moneyAllVal / tempMoneyCompeny) {
                difference = this.moneyAllVal / tempMoneyCompeny - thisVal;
            }
            var map = this.valTrans(thisVal * tempMoneyCompeny + difference * tempMoneyCompeny);
            moneyValNode.string = this.fixed(map.value) + this.valueCompanyArr[map.index];
        }
    },
    /**
    * 数值转换
    * @param {*} value 原始值 
    * @param {*} index 数值单位
    */
    valTrans(value, index = 0) {
        if (value > 1000) {
            value = value / 1000;
            index++;
            var map = this.valTrans(value, index);
            value = map.value;
            index = map.index;
        }
        return { value, index };
    },
    transMoney(str) {
        //转换金额
        //...
        str = parseFloat(str);
        return str;
    },
    fixed(value) {
        if (value === 'number' && value % 1 === 0) {
            return value;
        }
        value = parseFloat(parseFloat(value).toFixed(2));
        return value;
    }
});
