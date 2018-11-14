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
        // attack:{
        //     default: [],
        //     type: ["String"]
        // },
        // attacked:{
        //     default: [],
        //     type: ["String"]
        // },
        // boss:{
        //     default:null,
        //     type:cc.Node,
        // },
        // currentAct: '待机',
        // attackVal : 9000
    },

    // LIFE-CYCLE CALLBACKS:
    // test () {
    //     this.attack = ["待机","一斩","二斩","三斩","四斩"];
    //     var _armatureDisplay = this.node.getComponent(dragonBones.ArmatureDisplay);
    //     // this.node.parent.on(cc.Node.EventType.TOUCH_START, function(event){
    //     cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function(event){
    //         switch(this.currentAct){
    //             case this.attack[0]:        
    //                 _armatureDisplay.playAnimation(this.attack[1], 1);
    //                 break;
    //             case this.attack[1]:        
    //                 _armatureDisplay.playAnimation(this.attack[2], 1);
    //                 break;
    //             case this.attack[2]:        
    //                 _armatureDisplay.playAnimation(this.attack[3], 1);
    //                 break;
    //             case this.attack[3]:        
    //                 _armatureDisplay.playAnimation(this.attack[4], 1);
    //                 break;
    //             case this.attack[4]:        
    //                 _armatureDisplay.playAnimation(this.attack[1], 1);
    //                 break;
    //         }
    //         this.currentAct = _armatureDisplay.animationName
    //         _armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.normalAction, this);
    //         this.boss.getComponent("bossController").attacked(this.attackVal);
    //     }, this )
    // },
    // normalAction: function (call) {
    //     this.node.getComponent(dragonBones.ArmatureDisplay).playAnimation(this.attack[0], 0);
    // },
    // addTouchEvent:function(){
    //     this.attack = ["待机","一斩","二斩","三斩","四斩"];
    //     var _armatureDisplay = this.node.getComponent(dragonBones.ArmatureDisplay);
    //     this.node.parent.on(cc.Node.EventType.TOUCH_START, function(event){
    //     // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function(event){
    //         switch(this.currentAct){
    //             case this.attack[0]:        
    //                 _armatureDisplay.playAnimation(this.attack[1], 1);
    //                 break;
    //             case this.attack[1]:        
    //                 _armatureDisplay.playAnimation(this.attack[2], 1);
    //                 break;
    //             case this.attack[2]:        
    //                 _armatureDisplay.playAnimation(this.attack[3], 1);
    //                 break;
    //             case this.attack[3]:        
    //                 _armatureDisplay.playAnimation(this.attack[4], 1);
    //                 break;
    //             case this.attack[4]:        
    //                 _armatureDisplay.playAnimation(this.attack[1], 1);
    //                 break;
    //         }
    //         this.currentAct = _armatureDisplay.animationName
    //         _armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.normalAction, this);
    //         this.boss.getComponent("bossController").attacked(this.attackVal);
    //     }, this )
    // },
    // start () {
    //     this.addTouchEvent();
    //     this.test();
    // },

    // update (dt) {},
});
