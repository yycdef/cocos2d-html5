var preBtn = document.getElementById("preBtn");
var rePlayBtn = document.getElementById("rePlayBtn");
var nextBtn = document.getElementById("nextBtn");
var testTitle = document.getElementById("testTitle");
var testJsPath = document.getElementById("testJsPath");

var testCaseIndex = -1;

function playTestCase(flag){
    if(typeof cc == "undefined") return;
    if(typeof cc.resCfg == "undefined") return;
    if(typeof cc.resCfg.gameModules == "undefined") return;
    var resCfg = cc.resCfg;
    var gms = resCfg.gameModules;
    testCaseIndex += flag;
    testCaseIndex = testCaseIndex >= gms.length ? 0 : testCaseIndex;
    testCaseIndex = testCaseIndex < 0 ? 0 : testCaseIndex;
    console.log(testCaseIndex);
    var cfgName = gms[testCaseIndex];
    var cfg = resCfg[cfgName];
    testTitle.innerHTML = cfg.title || "";
    testJsPath.innerHTML = cfgName.replace(/\[\%[\w\d\-_]*\%\]/, "")
    cc.test(cfgName);
}

preBtn.addEventListener("click", function(){
    playTestCase(-1);
});
rePlayBtn.addEventListener("click", function(){
    playTestCase(0);
});
nextBtn.addEventListener("click", function(){
    playTestCase(1);
});

var cocos2dApp = cc.Application.extend({
    config : document["ccConfig"],
    ctor : function(){
        this._super();
        cc.COCOS2D_DEBUG = this.config["COCOS2D_DEBUG"];
        cc.initDebugSetting();
        cc.setup(this.config["tag"]);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },

    applicationDidFinishLaunching : function(){
        var config = this.config;
        // initialize director
        var director = cc.Director.getInstance();

        // turn on display FPS
        director.setDisplayStats(config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / config['frameRate']);

        playTestCase(1);
        return true;
    }

});

new cocos2dApp();