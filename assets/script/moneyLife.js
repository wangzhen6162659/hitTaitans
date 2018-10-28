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
        speedXDirection: 1,
        monVal: 0,
        overTag: false,
        horizon: 262,
        revSpeedY: 0,
        xMax: 177
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.speedY = this.randomNum(8, 15);
        this.speedX = this.randomNum(-8, 8);
        this.moneyEndNode = this.node.parent.getChildByName('moneyEnd');
    },

    gravitySpeedY() {
        if (this.node.y > this.horizon) {
            var y = this.speedY;
            if (this.node.y + y < this.horizon) {
                y = this.horizon - this.node.y;
                this.revSpeedY = Math.abs(this.speedY)/5;
                this.time = 0;
                this.speedY = 0;
            }
            this.node.y += y;
        } else {
            if (this.revSpeedY >0.1){
                this.node.y += this.speedY + this.revSpeedY;
            }
        }
    },

    gravitySpeedX() {
        if (Math.abs(this.node.x) > this.xMax) {
            this.speedXDirection = -1;
        }
        if (this.node.y > this.horizon) {
            this.node.x += this.speedXDirection * this.speedX;
        }
    },

    initVal(value) {
        this.monVal = value;
    },

    update(dt) {
        this.time += dt;
        if (!this.overTag) {
            if (this.time > 1) {
                this.overTag = true;
                this.bezerTo();
            } else {
                this.speedY -= 1 / 2 * 10 * Math.pow(this.time, 2);
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
        var beginY = this.randomNum(100, 350);
        var beginX = this.randomNum(-170, 170);
        var midY = this.randomNum(400, 1200);
        var midX = this.randomNum(-170, 170);
        var moneyIcon = this.moneyEndNode.getChildByName('moneyIcon');
        var bezier = [cc.v2(beginX, beginY), cc.v2(midX, midY), cc.v2(this.moneyEndNode.x + moneyIcon.x / 2, this.moneyEndNode.y + moneyIcon.y)];
        var bezierTo = cc.sequence(cc.bezierTo(1, bezier), cc.callFunc(function () {
            // this.node.destory();
            this.destroyMoney();
        }, this));
        this.node.runAction(bezierTo);
    },

    destroyMoney() {
        this.moneyEndNode.getComponent('moneyEndController').addVal(this.monVal);
        this.node.destroy();
    }

});
