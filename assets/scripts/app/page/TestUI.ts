import { ViewBase } from "../../base/core/mvc/ViewBase";
import { HttpUtil } from "../../base/utils/HttpUtil";


export class TestUI extends ViewBase {

    static UIName = "TestUI";
    static ResourcePath = "prefabs/TestUI";

    private label: cc.Label;

    onLoad() {
        this.bindView("label", "testLabel", cc.Label);
        this.bindEvent("HELLO", this.sayHello.bind(this));
    }

    start() {
        console.log("TestUI:测试代码");
        this.Test();
    }

    Test() {
        // DataManager
        App.Utils.DataManager.loadJsonData("config/Sounds", "Sounds", true, (config) => {
            // AudioManager
            const bgm = App.Utils.DataManager.getDataByNameAndId("Sounds", "MUSIC_BGM");
            App.Utils.AudioManager.playMusic(bgm[`Name`]);
        });

        // StorageManager
        App.Utils.StorageManager.setObject("StorageTest", { x: 100, y: 100 });
        console.log(App.Utils.StorageManager.getObject("StorageTest"));

        // TimerManager
        let s = 0;
        const handler = App.Utils.TimerManager.runLoopTimer((dt: number) => {
            console.log("Timer:", ++s, " dt =", dt);
            s == 10 && App.Utils.TimerManager.removeTimer(handler);
        }, 1);

        // Event
        this.scheduleOnce(() => {
            this.Event.emit("HELLO", "Hello, this is a event message.");
        }, 10);

        // Base64
        const encode = App.Utils.Base64.encode("测试Base64编码解码");
        const decode = App.Utils.Base64.decode(encode);
        console.log(encode, '=>', decode);

        // HttpUtil
        HttpUtil.HttpGet("https://assets-remote.oss-cn-hangzhou.aliyuncs.com/ball-line/assets-remote/version.json", null, (res) => { });
    }

    sayHello(data) {
        this.label.string = data;
    }

}