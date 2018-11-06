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
        valueCompanyArr: {
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
        level: 1,
        mlevel: 0,
        mlevelMax: 7,
        levelValue: 1,
        boss: {
            default: null,
            type: cc.Node
        },
        bloodStrip: {
            default: null,
            type: cc.Node
        },
        levelNode: {
            default: null,
            type: cc.Node
        },
        mLevelNode: {
            default: null,
            type: cc.Node
        },
        moneyNode: {
            default: null,
            type: cc.Prefab
        },
        smokeNode: {
            default: null,
            type: cc.Node
        },
        attackEffNode: {
            default: null,
            type: cc.Node
        },
        spriteAnimation: 'Sprite',
        bossScale: 1,
        bossNameLabel: {
            default: null,
            type: cc.Node
        },
        bossNames: ["String"]

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.attackEffNode.zIndex = 1001;
        this.attackedArr = ["待机", "被攻击"];
        this.valueCompanyArr = [" ", "k", "m", "g", "t", "p", "e", "z", "y", "b", "n", "d"];
        this.bossNames = ["奥巴马", "UZI"];
    },
    start() {
        // var a = baseUtil.getName();
        // this.level = baseUtil.age;
        this.addBoss();
    },

    addBoss() {
        // let boss = this.bossPool.get();
        this.levelNode.getComponent(cc.Label).string = parseInt((this.level - 1) / this.mlevelMax) + 1;
        this.mLevelNode.getComponent(cc.Label).string = parseInt((this.level - 1) % this.mlevelMax) + 1;
        if (this.boss == null) {
            //切换场景
            this.switchBackground();
        }
    },
    
    /**
     * 场景切换 表识为2
     */
    switchBackground() {
        if (this.mlevel == 1) {
            var backgroundType = 'background/background_' + ((this.level + 1) % 2 + 1);
            this.mlevel = 0;
            this.node.parent.getComponent('background').switchBackground(backgroundType);
            this.scheduleOnce(function () {
                //     // 这里的 this 指向 component
                this.createBoss();
            }, 0.5);
        } else {
            this.createBoss();
        }
    },
    createBoss() {
        //boss尺寸
        var scale = 0.5;
        //boss等级
        var bossLevel = this.level;
        this.boss = cc.instantiate(this.bossPrefeb);
        this.boss.zIndex = 1000;
        var isBigBoss = false;
        if (this.level % this.mlevelMax == 0) {
            isBigBoss = true;
            this.bossScale = scale * 1.5
            scale = this.bossScale;
            bossLevel = bossLevel * 10;
            this.mlevel += 1;
        }
        var bossType = this.level % 2 + 1;
        var skeStr = 'sprint/boss' + bossType;
        this.bossNameLabel.getComponent(cc.Label).string = this.bossNames[bossType-1];
        this.node.addChild(this.boss);
        this.boss.scale = 0;
        var act = cc.scaleTo(0.3, scale, scale);
        this.boss.runAction(act)
        this.getDragon(this.boss.getComponent(dragonBones.ArmatureDisplay), skeStr, 'Armature', this.attackedArr[0]);
        this.bloodStrip.getComponent('bloodLife').initNode(Math.pow(bossLevel, 2));
        if (isBigBoss){
            this.bloodStrip.getComponent('bloodLife').bossTime();
        }
    },
    getDragon(animationDisplay, path, armatureName, newAnimation) {
        cc.loader.loadResDir(path, function (err, assets) {

            if (err || assets.length <= 0) return;

            assets.forEach(asset => {
                if (asset instanceof dragonBones.DragonBonesAsset) {
                    animationDisplay.dragonAsset = asset;
                }
                if (asset instanceof dragonBones.DragonBonesAtlasAsset) {
                    animationDisplay.dragonAtlasAsset = asset;
                }
            });
            if (animationDisplay != null) {
                animationDisplay.armatureName = armatureName;
                animationDisplay.playAnimation(newAnimation, 0);
            }
        })
    },
    /**
     * boss被攻击
     * @param {*} hurt 
     */
    attacked(hurt) {
        // this.getBossParams();
        var fontSize = 10;
        var criticalHitChance = Math.random();
        if (criticalHitChance < 0.3) {
            hurt = hurt * 20;
            fontSize = 20;
        }
        if (this.boss != null && this.boss != undefined) {
            this.attackEffNodeAnim();
            var _armatureDisplay = this.boss.getComponent(dragonBones.ArmatureDisplay);
            if (_armatureDisplay.animationName == this.attackedArr[0]) {
                this.loadDragonBones(_armatureDisplay, 'Armature', this.attackedArr[1], this.normalAction);
            }
            //简化大数字
            var newVal = this.bloodStrip.getComponent('bloodLife').sub(hurt);
            this.addHurt(hurt, fontSize);
            // if (newVal == 0) {
            //     this.destroyBoss();
            // }
        }
    },
    /**
     * 销毁当前boss并新增
     */
    destroyBoss() {
        var smokeContextScale = 0.3;
        var monsterContextScale = 0.5;
        var scale = this.bossScale / (monsterContextScale / smokeContextScale);
        this.smokeNode.scale = scale;
        this.smokeNode.y = 325 + 420 * (this.smokeNode.scale - smokeContextScale) / 2;
        var actSquen = cc.sequence(cc.fadeOut(0.1), cc.callFunc(function () {
            if (this.boss != null) {
                this.smokeNodeAnim();
                this.boss.destroy();
                this.boss = null;
                var unitVal = this.level % this.mlevelMax + 1;
                for (var i = 0; i < (unitVal == 1 ? 1 : unitVal / 2); i++) {
                    var moneyPrefab = cc.instantiate(this.moneyNode);
                    moneyPrefab.zIndex = 1001;
                    moneyPrefab.getComponent('moneyLife').initVal(this.levelValue);
                    this.node.addChild(moneyPrefab);
                }
                this.level += 1;
                this.levelValue = Math.pow(this.level, 3);
                this.addBoss();
            }
        }, this));
        if (this.boss != null){
            this.boss.runAction(actSquen)
        }
    },
    /**
     * 获取当前boss信息
     */
    getBossParams() {
        this.boss = this.node.getChildByName("bossPrefeb");
    },
    /**
     * 加载伤害label
     * @param {*} hurtVal 
     */
    addHurt(hurtVal, fontSize) {
        //简化大数字
        var map = this.valTrans(hurtVal);
        hurtVal = map.value;
        var company = this.valueCompanyArr[map.index];

        var hurt = cc.instantiate(this.hurtPrefeb);
        hurt.zIndex = 1001;
        //设置数值
        hurt.getComponent(cc.Label).string = hurtVal + company;
        hurt.getComponent(cc.Label).fontSize = fontSize;

        this.node.addChild(hurt);
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
    smokeNodeAnim() {
        this.smokeNode.active = true;
        var animation = this.smokeNode.getComponent(dragonBones.ArmatureDisplay);
        this.loadDragonBones(animation, this.spriteAnimation, this.spriteAnimation, this.smokeNormalAction);
    },
    attackEffNodeAnim() {
        var rat = Math.floor(Math.random() * 360 + 0);
        this.attackEffNode.rotation = rat;
        this.attackEffNode.active = true;
        var animation = this.attackEffNode.getComponent(dragonBones.ArmatureDisplay);
        this.loadDragonBones(animation, this.spriteAnimation, this.spriteAnimation, this.attackEffNodeAction);
    },
    normalAction: function (call) {
        if (this.boss != null) {
            this.boss.getComponent(dragonBones.ArmatureDisplay).playAnimation(this.attackedArr[0], 0);
        }
    },
    smokeNormalAction: function (call) {
        if (this.smokeNode != null) {
            this.smokeNode.active = false;
        }
    },
    attackEffNodeAction: function (call) {
        if (this.attackEffNode != null) {
            this.attackEffNode.active = false;
        }
    },
    update (dt) {
        if(this.bloodStrip.getComponent('bloodLife').realHpVal == 0){
            this.destroyBoss();
        }
    },
});
