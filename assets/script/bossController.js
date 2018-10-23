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
        attackedArr: {
            default: null,
            type: ['String']
        },
        bossPrefeb: {
            default: null,
            type: cc.Prefab
        },
        hurtPrefeb: {
            default: null,
            type: cc.Prefab
        },
        //伤害
        hurt: 0,
        level: 0,
        blood: {
            default:null,
            type: cc.Sprite
        },
        boss: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.attackedArr = ["待机","被攻击"];
        this.addBoss();
    },

    addBoss() {
        // let boss = this.bossPool.get();
        if(this.boss == null){
            this.boss = cc.instantiate(this.bossPrefeb);
            this.boss.zIndex = 1000
            this.level += 1;
            var bossType = this.level % 2 + 1;
            var skeStr = 'sprint/boss' + bossType;
            this.node.addChild(this.boss)
            this.node.scale = 0;
            var act = cc.scaleTo(0.3, 1, 1);
            this.node.runAction(act)
            this.getDragon(this.boss.getComponent(dragonBones.ArmatureDisplay), skeStr , 'Armature', this.attackedArr[0]);
            this.boss.getChildByName('blood').getComponent('bloodLife').initNode(this.level);
        }
    },
    getDragon (animationDisplay, path, armatureName, newAnimation) {
        cc.loader.loadResDir(path, function(err, assets){

            if(err || assets.length <= 0)  return;

            assets.forEach(asset => {
                if(asset instanceof dragonBones.DragonBonesAsset){
                    animationDisplay.dragonAsset = asset;
                }
                if(asset instanceof dragonBones.DragonBonesAtlasAsset){
                    animationDisplay.dragonAtlasAsset  = asset;
                }
            });

            animationDisplay.armatureName = armatureName;
            animationDisplay.playAnimation(newAnimation, 0);
        })
    },
    start() {

    },
    /**
     * boss被攻击
     * @param {*} hurt 
     */
    attacked(hurt) {
        this.getBossParams();
        var _armatureDisplay = this.boss.getComponent(dragonBones.ArmatureDisplay);
        this.loadDragonBones(_armatureDisplay, 'Armature', this.attackedArr[1]);
        var newVal = this.boss.getChildByName('blood').getComponent('bloodLife').sub(hurt);
        this.addHurt(hurt);
        if (newVal == 1){
            this.destroyBoss();
        }
    },
    /**
     * 销毁当前boss并新增
     */
    destroyBoss() {
        this.boss.destroy();
        this.boss = null;
        this.addBoss();
    },
    /**
     * 获取当前boss信息
     */
    getBossParams(){
        this.boss = this.node.getChildByName("bossPrefeb");
    },
    /**
     * 加载伤害label
     * @param {*} hurtVal 
     */
    addHurt(hurtVal){
        var hurt = cc.instantiate(this.hurtPrefeb);
        hurt.zIndex = 1001;
        hurt.getComponent(cc.Label).string = hurtVal;
        this.node.addChild(hurt);
    },

    /**
     * 动态加载龙骨
     * @param animationDisplay  龙骨组件
     * @param armatureName      Armature名称
     * @param newAnimation      Animation名称
     * @param completeCallback  动画播放完毕的回调
     * @param playTimes         播放次数 -1是根据龙骨文件 0五险循环 >0是播放次数
     */
    loadDragonBones(animationDisplay, armatureName, newAnimation, playTimes = 1) {  //动态加载龙骨
            animationDisplay.armatureName = armatureName;
            animationDisplay.playAnimation(newAnimation, playTimes);
            animationDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.normalAction, this);
    },
    normalAction: function (call) {
        this.boss.getComponent(dragonBones.ArmatureDisplay).playAnimation(this.attackedArr[0], 0);
    }
    // update (dt) {},
});
