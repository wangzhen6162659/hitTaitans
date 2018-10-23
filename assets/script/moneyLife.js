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
        time: 0,
        speedY: 0,
        speedX: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.speedY = this.randomNum(50, 60);
        this.speedX = this.randomNum(-8, 8);
        console.log(this.node.y)
    },

    gravitySpeedY() {
        if (this.node.y > 0) {
            this.node.y += this.speedY;
        }
    },

    gravitySpeedX() {
        if (this.node.y > 0) {
            this.node.x += this.speedX;
        }
    },

    update(dt) {
        this.time += dt;
        this.speedY -= 1 / 2 * 10 * Math.pow(this.time, 2);
        this.gravitySpeedY();
        this.gravitySpeedX();
    },

    randomNum(minNum,maxNum){ 
        switch(arguments.length){ 
            case 1: 
                return parseFloat(Math.random()*minNum+1,10); 
            break; 
            case 2: 
                return parseFloat(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
                default: 
                    return 0; 
                break; 
        } 
    }
});
