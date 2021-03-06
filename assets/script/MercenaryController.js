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
        _armatureDisplay: {
            default:null,
            type: dragonBones.ArmatureDisplay
        },
        bloodLife:{
            default:null,
            type:cc.Node
        },
        atk: 50
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.bloodLife = this.node.parent.parent.getChildByName('blood');
        this._armatureDisplay = this.node.getComponent(dragonBones.ArmatureDisplay);
        this._armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.normalAction, this);
    },
    normalAction: function(call){
        this.bloodLife.getComponent('bloodLife').subByMercenary(this.atk);
        this._armatureDisplay.playAnimation("攻击", 1);
    }

    // update (dt) {},
});
