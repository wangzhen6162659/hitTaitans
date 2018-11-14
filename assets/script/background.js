// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var GameConfig = require("GameConfig");
var GameTools = require("GameTools");
var GameUiTools = require("GameUiTools");
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
        blackMaskNode: {
            default: null,
            type: cc.Node
        },
        parseNode: {
            default: null,
            type: cc.Node
        },
        attack: {
            default: [],
            type: ["String"]
        },
        attacked: {
            default: [],
            type: ["String"]
        },
        boss: {
            default: null,
            type: cc.Node,
        },
        hero: {
            default: null,
            type: cc.Node,
        },
        attackEffNode: {
            default: null,
            type: cc.Node
        },
        _armatureDisplay: {
            default: null,
            type: dragonBones.ArmatureDisplay,
        },
        currentAct: '待机',
        spriteAnimation: 'Sprite',
        attackVal: 9000
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        GameConfig.GameScene = this;
        this.attackEffNode.zIndex = 1001;
    },

    start() {
        this.test();
    },

    // LIFE-CYCLE CALLBACKS:
    normalAction: function (call) {
        this.hero.getComponent(dragonBones.ArmatureDisplay).playAnimation(this.attack[0], 0);
    },
    test() {
        this.attack = ["待机", "一斩", "二斩", "三斩", "四斩", "五斩", "六斩"];
        this._armatureDisplay = this.hero.getComponent(dragonBones.ArmatureDisplay);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
    },
    onTouchBegan(event) {
        if (GameConfig.IS_GAME_PARSE) {
            return;
        }
        switch (this.currentAct) {
            case this.attack[0]:
                this._armatureDisplay.playAnimation(this.attack[1], 1);
                break;
            case this.attack[1]:
                this._armatureDisplay.playAnimation(this.attack[2], 1);
                break;
            case this.attack[2]:
                this._armatureDisplay.playAnimation(this.attack[3], 1);
                break;
            case this.attack[3]:
                this._armatureDisplay.playAnimation(this.attack[4], 1);
                break;
            case this.attack[4]:
                this._armatureDisplay.playAnimation(this.attack[5], 1);
                break;
            case this.attack[5]:
                this._armatureDisplay.playAnimation(this.attack[6], 1);
                break;
            case this.attack[6]:
                this._armatureDisplay.playAnimation(this.attack[1], 1);
                break;
        }
        this.currentAct = this._armatureDisplay.animationName
        this._armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.normalAction, this);
        this.attackEffNodeAnim(event.getLocation());
        this.boss.getComponent("bossController").attacked(this.attackVal);
    },
    // start () {

    // },
    switchBackground(path) {
        var node = this.node;
        var blackMask = this.blackMaskNode;
        var switchActIn = cc.sequence(cc.fadeIn(1), cc.callFunc(function () {
            cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
                node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            blackMask.runAction(cc.fadeOut(0.5));
        }))
        blackMask.runAction(switchActIn);
    },
    openSetting() {
        GameConfig.GameScene.gameParsePanel();
    },
    //攻击特效
    attackEffNodeAnim(local) {
        var rat = Math.floor(Math.random() * 360 + 0);
        this.attackEffNode.rotation = rat;
        var po2 = this.node.parent.convertToNodeSpaceAR(local);
        this.attackEffNode.setPosition(po2)
        this.attackEffNode.active = true;
        var animation = this.attackEffNode.getComponent(dragonBones.ArmatureDisplay);
        this.loadDragonBones(animation, this.spriteAnimation, this.spriteAnimation, this.attackEffNodeAction);
    },

    //游戏暂停
    gameParsePanel() {
        GameTools.playSimpleAudioEngine(2);
        GameConfig.IS_GAME_PARSE = true;
        this.parseNode.active = true;
        this.parseNode.getComponent('GameOver').save();
    },

    //游戏暂停
    gameParsePanelOver() {
        GameTools.playSimpleAudioEngine(2);
        GameConfig.IS_GAME_PARSE = false;
        this.parseNode.active = false;
    },
    /**
     * 动态加载龙骨
     * @param animationDisplay  龙骨组件
     * @param armatureName      Armature名称
     * @param newAnimation      Animation名称
     * @param completeCallback  动画播放完毕的回调
     * @param playTimes         播放次数 -1是根据龙骨文件 0五险循环 >0是播放次数
     */
    loadDragonBones(animationDisplay, armatureName, newAnimation, retfunction, playTimes = 1) {  //动态加载龙骨
        animationDisplay.armatureName = armatureName;
        animationDisplay.playAnimation(newAnimation, playTimes);
        animationDisplay.addEventListener(dragonBones.EventObject.COMPLETE, retfunction, this);
    },
    attackEffNodeAction: function (call) {
        if (this.attackEffNode != null) {
            this.attackEffNode.active = false;
        }
    },

    // update (dt) {},
});
