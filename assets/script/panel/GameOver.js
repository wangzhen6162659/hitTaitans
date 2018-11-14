var GameConfig = require("GameConfig");
var AnimLayerTool = require("AnimLayerTool");
var GameTools = require("GameTools");
var GameUiTools = require("GameUiTools");
cc.Class({
    extends: cc.Component,
    // name: 'GameOver',
    properties: {
        backColor: cc.Node,
        game_over: cc.Node,
        scoreLabel: cc.Label,
        bestScoreLabel: cc.Label,
        rankButton: cc.Node, //排行榜按钮
        shareButton: cc.Node, //分享按钮
        backButton: cc.Node, //返回按钮
        restartButton: cc.Node, //重新开始按钮
        rankingScrollView: cc.Sprite,//显示排行榜
    },

    onLoad() {
        this.node.zIndex = 1050;

        GameUiTools.setButtonClickEvents(this, this.rankButton, "buttonFunc");
        GameUiTools.setButtonClickEvents(this, this.shareButton, "buttonFunc");
        this.save();
        // GameUiTools.setButtonClickEvents(this, this.backButton, "buttonFunc");
        // GameUiTools.setButtonClickEvents(this, this.restartButton, "buttonFunc");
        this.showAnimation(true);
        this.onHideSave();
        this.node.active = false;
    },
    onHideSave(){
        // window.wx.onHide(function callback(res){
        //     console.log('进入后台，已保存！');
        //     this.save();
        // })
    },

    save () {
        cc.log(GameConfig.IS_GAME_PARSE);
        this.scoreLabel.string = GameConfig.GameCore;
        GameConfig.GameHeightScore = GameConfig.GameHeightScore > GameConfig.GameCore ? GameConfig.GameHeightScore : GameConfig.GameCore;
        this.bestScoreLabel.string = GameConfig.GameHeightScore;
        GameTools.submitScore(GameConfig.GameHeightScore); //提交得分
        if (CC_WECHATGAME) {
            this.tex = new cc.Texture2D();
            window.sharedCanvas.width = 375;
            window.sharedCanvas.height = 667;
            window.wx.postMessage({// 发消息给子域
                messageType: 4,
                MAIN_MENU_NUM: GameConfig.MAIN_MENU_NUM,
            });
        } else {
            cc.log("获取排行榜数据。" + GameConfig.MAIN_MENU_NUM);
            this.rankButton.getParent().active = false;
        }
    },

    buttonFunc: function (event) {
        let button = event.target;
        console.log(button)
        if (this.rankButton == button) {
            // GameTools.playSimpleAudioEngine(0);
            GameTools.getRankData();
        } else if (this.shareButton == button) {
            // GameTools.playSimpleAudioEngine(0);
            setTimeout(() => {
                GameTools.sharePicture();
            }, 100);
        } else if (this.restartButton == button) {
            // GameTools.playSimpleAudioEngine(0);
            this.restartResource("GameScene");
        } else if (this.backButton == button) {
            // GameTools.playSimpleAudioEngine(0);
            this.restartResource("MenuUI");
        }
        return true;
    },
    restartResource(sceneName) {
        GameTools.removeRankData();
        GameUiTools.loadingScene(sceneName)
    },
    // 刷新子域的纹理
    _updateSubDomainCanvas() {
        if (CC_WECHATGAME) {
            if (window.sharedCanvas != undefined) {
                this.tex.initWithElement(window.sharedCanvas);
                this.tex.handleLoadedTexture();
                this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
            }
        }
    },
    update() {
        this._updateSubDomainCanvas();
    },
    showAnimation(isShow) {
        if (isShow) {
            AnimLayerTool.bottonAnim(this.game_over);
            AnimLayerTool.bottonAnim(this.shareButton);
            AnimLayerTool.bottonAnim(this.restartButton);
            AnimLayerTool.bottonAnim(this.backButton);
        }
    }
});
