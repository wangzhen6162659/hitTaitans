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
        moneyEndNode: {
            default: null,
            type: cc.Node
        },
        time: 0,
        speedY: 0,
        speedX: 0,
        monVal: 0,
        overTag: false
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.speedY = this.randomNum(10, 20);
        this.speedX = this.randomNum(-8, 8);
        this.moneyEndNode = this.node.parent.getChildByName('moneyEnd');
    },

    gravitySpeedY() {
        if (this.node.y > 0) {
            var y = this.speedY;
            if (this.node.y + y < 0) {
                y = 0 - this.node.y;
            }
            this.node.y += y;
        }
    },

    gravitySpeedX() {
        if (this.node.y > 0) {
            this.node.x += this.speedX;
        }
    },

    initVal (value) {
        this.monVal = value;
    },

    update(dt) {
        this.time += dt;
        this.speedY -= 1 / 2 * 10 * Math.pow(this.time, 2);
        if (!this.overTag) {
            if (this.time > 2) {
                this.overTag = true;
                this.bezerTo();
            } else {
                this.gravitySpeedY();
                this.gravitySpeedX();
            }
        }

    },

    randomNum(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseFloat(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseFloat(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    },

    bezerTo() {
        var beginY = this.randomNum(100, 400);
        var beginX = this.randomNum(-500, 500);
        var midY = this.randomNum(800, 1600);
        var midX = this.randomNum(-500, 500);
        var moneyIcon = this.moneyEndNode.getChildByName('moneyIcon');
        console.log
        var bezier = [cc.v2(beginX, beginY), cc.v2(midX, midY), cc.v2(this.moneyEndNode.x + moneyIcon.x, this.moneyEndNode.y + moneyIcon.y)];
        var bezierTo = cc.sequence(cc.bezierTo(1, bezier),cc.callFunc(function(){
            // this.node.destory();
            this.destroyMoney();
        },this));
        this.node.runAction(bezierTo);
    },

    destroyMoney () {
        this.moneyEndNode.getComponent('moneyEndController').addVal(this.monVal);
        this.node.destroy();
    }

});
