export type Mission = {

    //任务编号
    id: Number,

    //人物名
    name: String,

    /*难度等级：
        0: 特别简单, 1: 简单, 2: 正常
        3: 困难, 4: 特别困难, 5: 疯狂
    */
    level:  0 | 1 | 2 | 3 | 4 | 5,

    //任务描述
    describe: String,

    //任务目标
    target: String,

    //其他任务设置
    else: String,

    //地图块
    map: Array<String>,

    //拾荒牌库
    explore: Explore,
}

//拾荒牌库类型
export type Explore = {
    
    //红色
    red: Array<String>,

    //绿色
    green: Array<String>,

    //蓝色
    blue: Array<String>
}
