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
        hpNode: {
            default: null,
            type: cc.Node
        },

        hpValNode: {
            default: null,
            type: cc.Node
        },

        valueCompanyArr: {
            default: null,
            type: ['String']
        },

        bossTimeNode: {
            default: null,
            type: cc.Node
        },
        //血条总长比
        hp: 0,
        //血条背景
        hpBack: 0,
        //血条数值总量
        hpVal: 0,
        //血条数值总量
        realHpVal: 0,
        //boss血条时间
        time: 30
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.hpNode = this.node.getChildByName('blood');
        this.hpValNode = this.node.getChildByName('hp_val');
        this.bossTimeNode = this.node.getChildByName('boss_time');
        this.bossTimeNode.zIndex = -1;
        this.valueCompanyArr = this.node.parent.getChildByName('boss').getComponent('bossController').valueCompanyArr;
    },

    // start () {
    // },

    sub(hurt) {
        var fill_start = this.hpNode.getComponent(cc.Sprite);
        this.realHpVal -= hurt;
        fill_start.fillStart = this.realHpVal / this.hpVal;
        if (this.realHpVal <= 0) {
            this.realHpVal = 0;
        }
        var map = this.valTrans(this.realHpVal);
        this.hpValNode.getComponent(cc.Label).string = this.fixed(map.value) + this.valueCompanyArr[map.index];
        return this.realHpVal;
    },

    initNode(level) {
        this.bossTimeNode.active = false;
        this.hpNode.getComponent(cc.Sprite).fillStart = 1;
        this.realHpVal = this.hpVal = level * 10;
        var map = this.valTrans(this.hpVal);
        this.hpValNode.getComponent(cc.Label).string = this.fixed(map.value) + this.valueCompanyArr[map.index];
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
    /**
     * 两位小数转换
     * @param {*} value 
     */
    fixed(value) {
        if (value === 'number' && value % 1 === 0) {
            return value;
        }

        value = parseFloat(parseFloat(value).toFixed(2));
        return value;
    },
    /**
     * boss时间条初始化
     */
    bossTime() {
        this.bossTimeNode.active = true;
        this.bossTimeNode.getComponent(cc.Sprite).fillStart = 1;
    },
    /**
     * boss时间条递减
     * @param {*} dt 
     */
    bossTimeSub(dt) {
        if (this.bossTimeNode.active == true) {
            this.bossTimeNode.getComponent(cc.Sprite).fillStart -= dt / 30;
            if (this.bossTimeNode.getComponent(cc.Sprite).fillStart < 0) {
                this.bossTimeNode.active = false;
            }
        }
    },
    update(dt) {
        this.bossTimeSub(dt);
    },
});
