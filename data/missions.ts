// 疯狂：5
// 特变困难：4
// 困难：3
// 正常：2
// 简单：1
// 特别简单：0

import type { Mission } from "@/types/mission";

export const learning: Mission = {
  id: new Number(0), // 使用包装对象类型
  name: "教程",
  level: 0, // 严格匹配数字字面量类型
  describe: new String(
    "当一切陷入地狱之前，我们只听到了警报的声音。我们很幸运，离一家购物中心很近，但是现在，我们已经没有食物了并且援助还没到。我们要知道外面到底发生了什么。"
  ),
  target: new String(
    "找到4桶燃料并逃到你们从屋顶上看到的一辆远处的面包车里。当所有人都成功上车并且你们有足够的燃料，你们就能开车逃离这里了。"
  ),
  else: new String("所有玩家在购物中心地图块。该地图块初始时是展示的"),
  map: [
    new String("购物中心"),
    new String("森林"),
    new String("强盗营地"),
    new String("城市街道"),
    new String("旷野"),
    new String("警察局"),
    new String("加油站"),
    new String("加油站"), // 手动重复x2
    new String("避难所"),
    new String("医院"),
    new String("河流"),
    new String("农场"),
    new String("农场"), // 手动重复x2
  ],
  explore: {
    red: [
      new String("食物"),
      new String("食物"),
      new String("燃料"),
      new String("燃料"),
      new String("燃料"),
      new String("燃料"),
      new String("医疗用品"),
      new String("医疗用品"),
      new String("弹药"),
      new String("双筒望远镜"),
      new String("多余配件"),
      new String("一无所获"),
    ],
    green: [
      new String("食物"),
      new String("食物"),
      new String("食物"),
      new String("食物"),
      new String("食物"),
      new String("食物"),
      new String("燃料"),
      new String("燃料"),
      new String("弹药"),
      new String("手电筒"),
      new String("多余配件"),
      new String("一无所获"),
    ],
    blue: [
      new String("食物"),
      new String("食物"),
      new String("燃料"),
      new String("燃料"),
      new String("弹药"),
      new String("弹药"),
      new String("弹药"),
      new String("双筒望远镜"),
      new String("手枪"),
      new String("对讲机"),
      new String("多余配件"),
      new String("一无所获"),
    ],
  },
};

export const rescueMission: Mission = {
  id: 1,
  name: "解救科学家",
  level: 1, // 简单
  describe:
    "你们在收音机里听到一条嘈杂的信息。有人还活着，并且他说他能结束这场噩梦。他们在警察局设了路障来保护自己，但是时间不多了。",
  target:
    "解救警察局的科学家。当在警察局时，你可以花费2个行动来解救科学家。把科学家带回你们的面包车里并逃离该区域。",
  else: "把科学家和首领卡放到一边。到达警察局的第一名玩家抓取首领卡",
  map: [
    "墓地",
    ...Array(2).fill("森林"),
    ...Array(2).fill("农场"),
    "城市街道",
    ...Array(2).fill("旷野"),
    ...Array(2).fill("强盗营地"),
    ...Array(2).fill("加油站"),
    "医院",
    "警察局",
    ...Array(2).fill("河流"),
    ...Array(2).fill("避难所"),
    ...Array(2).fill("隧道"),
  ],
  explore: {
    red: [
      ...Array(2).fill("食物"),
      ...Array(4).fill("燃料"),
      ...Array(2).fill("医疗用品"),
      "弹药",
      "双筒望远镜",
      "多余配件",
      "一无所获",
      "伏击 !",
    ],
    green: [
      ...Array(6).fill("食物"),
      ...Array(2).fill("燃料"),
      "弹药",
      "手电筒",
      "多余配件",
      "一无所获",
      "伏击 !",
    ],
    blue: [
      ...Array(2).fill("食物"),
      ...Array(2).fill("燃料"),
      ...Array(3).fill("弹药"),
      "双筒望远镜",
      "手枪",
      "对讲机",
      "多余配件",
      ...Array(2).fill("一无所获"),
    ],
  },
};

export const sampleCollectionMission: Mission = {
  id: new Number(2),
  name: "收集样本",
  level: 0, // 非常简单对应等级0
  describe: new String(
    "科学家说他需要一些样本来研制解药，所以我们要去那边杀死一些僵尸。"
  ),
  target: new String(
    "杀死8个僵尸并收集样本。每次1个僵尸被杀死，就把那张牌加入到本目标。收集下列怪物各2个：僵尸步行者、僵尸喷吐者、僵尸狗和僵尸士兵来完成本目标。收集到所有样本和燃料后，返回面包车里逃离。"
  ),
  else: new String(
    "从怪物牌库中抓9张牌，把首领卡加入其中并正面朝下洗混。把这10张牌放到怪物牌库底"
  ),
  map: [
    new String("墓地"),
    ...Array(2).fill(new String("旷野")),
    new String("警察局"),
    ...Array(2).fill(new String("城市街道")),
    new String("医院"),
    ...Array(2).fill(new String("隧道")),
    ...Array(3).fill(new String("加油站")),
    ...Array(2).fill(new String("避难所")),
    new String("购物中心"),
    ...Array(2).fill(new String("河流")),
    ...Array(2).fill(new String("农场")),
    new String("百货商店"),
    ...Array(2).fill(new String("森林")),
    ...Array(2).fill(new String("强盗营地")),
  ],
  explore: {
    red: [
      ...Array(2).fill(new String("食物")),
      ...Array(4).fill(new String("燃料")),
      ...Array(2).fill(new String("医疗用品")),
      new String("弹药"),
      new String("双筒望远镜"),
      new String("多余配件"),
      new String("一无所获"),
      new String("伏击 !"),
    ],
    green: [
      ...Array(6).fill(new String("食物")),
      ...Array(2).fill(new String("燃料")),
      new String("弹药"),
      new String("手电筒"),
      new String("多余配件"),
      new String("一无所获"),
      new String("伏击 !"),
    ],
    blue: [
      ...Array(2).fill(new String("食物")),
      ...Array(2).fill(new String("燃料")),
      ...Array(3).fill(new String("弹药")),
      new String("双筒望远镜"),
      new String("手枪"),
      new String("对讲机"),
      new String("多余配件"),
      ...Array(2).fill(new String("一无所获")),
    ],
  },
};

export const developAntidoteMission: Mission = {
  id: new Number(3),
  name: "研制解药",
  level: 1, // 简单对应等级1
  describe: new String(
    "目标：收集2个医疗用品和3个解毒剂并把科学家带到医院来治疗僵尸。科学家会一直装备在一位求生者的面前。如果你和另一名求生者在同一地点，你们可以像交易其它拾荒牌一样交易科学家。当你们带着对应的卡牌将科学家带到医院且该回合结束时没有死亡，你们就获胜。"
  ),
  target: new String("收集2个医疗用品和3个解毒剂并把科学家带到医院"),
  else: new String(
    "从怪物牌库中抓9张牌，把首领卡加入其中并正面朝下洗混。把这10张牌放到怪物牌库底"
  ),
  map: [
    new String("墓地"),
    ...Array(2).fill(new String("旷野")),
    new String("警察局"),
    ...Array(2).fill(new String("城市街道")),
    new String("医院"),
    ...Array(2).fill(new String("隧道")),
    ...Array(3).fill(new String("加油站")),
    ...Array(2).fill(new String("避难所")),
    new String("购物中心"),
    ...Array(2).fill(new String("河流")),
    ...Array(2).fill(new String("农场")),
    new String("百货商店"),
    ...Array(2).fill(new String("森林")),
    ...Array(2).fill(new String("强盗营地")),
  ],
  explore: {
    red: [
      ...Array(2).fill(new String("食物")),
      ...Array(4).fill(new String("燃料")),
      ...Array(2).fill(new String("医疗用品")),
      new String("弹药"),
      new String("双筒望远镜"),
      new String("多余配件"),
      new String("一无所获"),
      new String("伏击 !"),
      ...Array(2).fill(new String("解毒剂")), // 新增2个解毒剂
    ],
    green: [
      ...Array(6).fill(new String("食物")),
      ...Array(2).fill(new String("燃料")),
      new String("弹药"),
      new String("手电筒"),
      new String("多余配件"),
      new String("一无所获"),
      new String("伏击 !"),
      ...Array(2).fill(new String("解毒剂")), // 新增2个解毒剂
    ],
    blue: [
      ...Array(2).fill(new String("食物")),
      ...Array(2).fill(new String("燃料")),
      ...Array(3).fill(new String("弹药")),
      new String("双筒望远镜"),
      new String("手枪"),
      new String("对讲机"),
      new String("多余配件"),
      ...Array(2).fill(new String("一无所获")),
      new String("解毒剂"), // 新增1个解毒剂
      new String("医疗用品"), // 新增1个医疗用品
    ],
  },
};

export const nuclearWinterMission: Mission = {
  id: new Number(4),
  name: "核冬天",
  level: 2, // 正常对应等级2
  describe: new String(
    "炸弹毫无预兆地爆炸了。所有大城市顷刻间化为灰尘。冬季马上就要到来，如果我们不储存足够的食物并找到一处安全地点的话，我们就没法过冬。"
  ),
  target: new String(
    "收集3个燃料、2个脏毯子、2张老报纸，且食物增加到5。带这些物品返回到避难所并摧毁所有尾随求生者的怪物。当所有玩家都在避难所里且所有怪物被摧毁，你们获得胜利。"
  ),
  else: new String(
    "从怪物牌库中抓9张牌，把首领卡加入其中并正面朝下洗混。把这10张牌放到怪物牌库底"
  ),
  map: [
    ...Array(2).fill(new String("加油站")),
    new String("避难所"),
    new String("医院"),
    ...Array(2).fill(new String("城市街道")),
    new String("农场"),
    new String("电厂"),
    ...Array(2).fill(new String("强盗营地")),
    new String("百货商店"),
    new String("沙漠"),
    ...Array(2).fill(new String("旷野")),
    new String("警察局"),
    ...Array(2).fill(new String("隧道")),
    new String("购物中心"),
  ],
  explore: {
    red: [
      ...Array(3).fill(new String("食物")),
      ...Array(4).fill(new String("燃料")),
      ...Array(3).fill(new String("医疗用品")),
      ...Array(2).fill(new String("解毒剂")),
      new String("弹药"),
      new String("手枪"),
      new String("背包"),
      new String("脏毯子"),
      ...Array(2).fill(new String("一无所获")),
      new String("伏击 !"),
    ],
    green: [
      ...Array(9).fill(new String("食物")),
      new String("燃料"),
      ...Array(2).fill(new String("解毒剂")),
      ...Array(2).fill(new String("弹药")),
      new String("双筒望远镜"),
      new String("多余配件"),
      new String("老报纸"),
      ...Array(2).fill(new String("脏毯子")),
    ],
    blue: [
      ...Array(3).fill(new String("食物")),
      ...Array(2).fill(new String("燃料")),
      new String("解毒剂"),
      ...Array(4).fill(new String("弹药")),
      ...Array(2).fill(new String("手电筒")),
      new String("手枪"),
      new String("对讲机"),
      new String("双筒望远镜"),
      new String("伏击 !"),
      ...Array(2).fill(new String("老报纸")),
    ],
  },
};

export const disarmBombMission: Mission = {
  id: new Number(5),
  name: "拆除炸弹",
  level: 3, // 假设"难度加点拨"对应困难级别
  describe: new String("有传闻说，一枚锁在电厂里的炸弹即将爆炸，这将使整个反应堆燃烧。很明显，它被锁在一处只有高级人员才能出入的地方。一名老员工写的满是灰尘的日记本应该能帮我们进去。我们要阻止炸弹爆炸！"),
  target: new String("找到满是灰尘的日记本然后前往电厂。花费2个行动来解除炸弹。在解除炸弹后，你们只有3个回合来返回面包车上。"),
  else: new String("把一个目标标记放到离你们的面包车至少5个地图块的一个地图块上。当你到达该地图块时，获得满是灰尘的日记本并抓取首领牌"),
  map: [
    ...Array(3).fill(new String("加油站")),
    ...Array(2).fill(new String("避难所")),
    new String("医院"),
    ...Array(2).fill(new String("城市街道")),
    ...Array(2).fill(new String("农场")),
    new String("电厂"),
    ...Array(2).fill(new String("强盗营地")),
    new String("百货商店"),
    ...Array(2).fill(new String("沙漠")),
    ...Array(2).fill(new String("旷野")),
    new String("警察局"),
    ...Array(2).fill(new String("隧道")),
    new String("购物中心")
  ],
  explore: {
    red: [
      ...Array(3).fill(new String("食物")),
      ...Array(4).fill(new String("燃料")),
      ...Array(3).fill(new String("医疗用品")),
      ...Array(2).fill(new String("解毒剂")),
      new String("弹药"),
      new String("手枪"),
      new String("背包"),
      ...Array(2).fill(new String("多余配件")),
      new String("一无所获"),
      new String("伏击 !")
    ],
    green: [
      ...Array(9).fill(new String("食物")),
      new String("燃料"),
      ...Array(2).fill(new String("解毒剂")),
      ...Array(2).fill(new String("弹药")),
      new String("双筒望远镜"),
      new String("多余配件"),
      new String("伏击 !"),
      ...Array(2).fill(new String("一无所获"))
    ],
    blue: [
      ...Array(3).fill(new String("食物")),
      ...Array(2).fill(new String("燃料")),
      new String("解毒剂"),
      ...Array(4).fill(new String("弹药")),
      ...Array(2).fill(new String("手电筒")),
      new String("手枪"),
      new String("对讲机"),
      new String("双筒望远镜"),
      new String("伏击 !"),
      ...Array(3).fill(new String("多余配件"))
    ]
  }
};

export const nuclearRadiationMission: Mission = {
  id: new Number(6),
  name: "核辐射",
  level: 2, // 正常对应等级2
  describe: new String("我们开车离开时，看见了远处的蘑菇云。我们心烦意乱，撞上了一辆侧翻的废弃汽车，我们的面包车嘎吱嘎吱地停了下来。我们要在核辐射杀死我们之前离开这。"),
  target: new String("收集3个多余配件并修理面包车来逃离。作为1个行动，你可以打出1张多余配件来修理面包车。面包车需要被修理3次。当怪物出生阶段投出7时，展示地图最外围的一个地图块。当所有的外围地图块被展示后，再次投出7时，移除一个外围地图块。"),
  else: new String("把面包车放在地图的最中间。确保你们的地图是从面包车向外构建的"),
  map: [
    ...Array(3).fill(new String("加油站")),
    ...Array(2).fill(new String("避难所")),
    new String("电厂"),
    ...Array(2).fill(new String("城市街道")),
    ...Array(2).fill(new String("农场")),
    ...Array(2).fill(new String("沙漠")),
    ...Array(2).fill(new String("强盗营地")),
    new String("警察局"),
    new String("监狱"),
    ...Array(2).fill(new String("旷野")),
    new String("购物中心"),
    new String("绿洲"),
    ...Array(2).fill(new String("隧道")),
    new String("医院"),
    new String("机场")
  ],
  explore: {
    red: [
      ...Array(3).fill(new String("食物")),
      ...Array(4).fill(new String("燃料")),
      ...Array(3).fill(new String("医疗用品")),
      ...Array(2).fill(new String("解毒剂")),
      new String("弹药"),
      new String("手枪"),
      new String("背包"),
      ...Array(2).fill(new String("多余配件")),
      new String("一无所获"),
      new String("伏击 !")
    ],
    green: [
      ...Array(9).fill(new String("食物")),
      new String("燃料"),
      ...Array(2).fill(new String("解毒剂")),
      ...Array(2).fill(new String("弹药")),
      new String("双筒望远镜"),
      new String("多余配件"),
      new String("伏击 !"),
      ...Array(2).fill(new String("一无所获"))
    ],
    blue: [
      ...Array(3).fill(new String("食物")),
      ...Array(2).fill(new String("燃料")),
      new String("解毒剂"),
      ...Array(4).fill(new String("弹药")),
      ...Array(2).fill(new String("手电筒")),
      new String("手枪"),
      new String("对讲机"),
      new String("双筒望远镜"),
      new String("伏击 !"),
      ...Array(3).fill(new String("多余配件"))
    ]
  }
};

export const alienReconMission: Mission = {
  id: new Number(7),
  name: "侦查外星人地区",
  level: 4, // 困难对应等级4
  describe: new String("我们的军事实力不及外星人。但是，如果他们认为我们会在他们摧毁我们的文明之后坐以待毙，那么他们就大错特错了。我们要侦察一下这个地区，这样我们就知道发起攻击的最佳地点。"),
  target: new String("展示所有地图块，然后带着足够多的燃料返回面包车上逃跑。"),
  else: new String("选择一个地图块，在上面放置1个目标标记。展示该地图块的玩家抓取首领牌"),
  map: [
    ...Array(2).fill(new String("加油站")),
    new String("河流"),
    new String("机场"),
    ...Array(2).fill(new String("山")),
    new String("百货商店"),
    new String("电厂"),
    ...Array(2).fill(new String("隧道")),
    new String("警察局"),
    new String("坠毁点"),
    ...Array(2).fill(new String("避难所")),
    new String("医院"),
    new String("游乐园"),
    ...Array(2).fill(new String("城市街道")),
    new String("强盗营地"),
    ...Array(2).fill(new String("农场")),
    new String("沙漠")
  ],
  explore: {
    red: [
      ...Array(2).fill(new String("食物")),
      ...Array(4).fill(new String("燃料")),
      ...Array(2).fill(new String("医疗用品")),
      ...Array(2).fill(new String("弹药")),
      new String("双筒望远镜"),
      new String("多余配件"),
      new String("满足灰尘的日记本"),
      new String("伏击 !"),
      new String("一无所获")
    ],
    green: [
      ...Array(6).fill(new String("食物")),
      ...Array(2).fill(new String("燃料")),
      ...Array(2).fill(new String("弹药")),
      new String("手电筒"),
      new String("背包"),
      new String("多余配件"),
      new String("一无所获"),
      new String("伏击 !")
    ],
    blue: [
      ...Array(2).fill(new String("食物")),
      ...Array(2).fill(new String("燃料")),
      ...Array(4).fill(new String("弹药")),
      new String("手枪"),
      new String("对讲机"),
      new String("手电筒"),
      ...Array(2).fill(new String("多余配件")),
      new String("满足灰尘的日记本"),
      new String("伏击 !"),
      new String("一无所获")
    ]
  }
};

export const intelligenceRecoveryMission: Mission = {
  id: new Number(8),
  name: "情报恢复",
  level: 4, // 困难对应等级4
  describe: new String("我们的一名科学家成功黑入外星母舰并窃取了一些情报。但是我们最近与他失去了联系。我们需要你去调查一下他最近出现的地点，务必带着日记本，不管他说什么，都记下带回来。"),
  target: new String("到达目标标记所在地图块并带着信息返回军事基地。当到达目标标记所在地图块时，投一次潜行检定。如果成功，科学家还活着，你们可以花费1个行动来解救他，把他装备到一名玩家面前。如果失败，且该玩家拥有日记本，你们记下来科学家弥留之际对你们说的信息。如果失败且该玩家没有日记本，你们输掉游戏。"),
  else: new String("正面向上放置军事基地地图块。把1个目标标记放到离军事基地至少5个地图块距离的1个地图块上。把科学家拾荒卡放到一边。第一个到达目标标记所在地图块的玩家抓取首领卡"),
  map: [
    ...Array(2).fill(new String("加油站")),
    new String("河流"),
    new String("机场"),
    ...Array(2).fill(new String("山")),
    new String("百货商店"),
    new String("绿洲"),
    ...Array(2).fill(new String("隧道")),
    new String("警察局"),
    new String("坠毁点"),
    ...Array(2).fill(new String("避难所")),
    new String("医院"),
    new String("工厂"),
    ...Array(2).fill(new String("城市街道")),
    new String("强盗营地"),
    new String("军事基地"),
    ...Array(2).fill(new String("农场")),
    new String("沙漠"),
    new String("监狱")
  ],
  explore: {
    red: [
      ...Array(2).fill(new String("食物")),
      ...Array(4).fill(new String("燃料")),
      ...Array(2).fill(new String("医疗用品")),
      ...Array(2).fill(new String("弹药")),
      new String("双筒望远镜"),
      new String("多余配件"),
      new String("满足灰尘的日记本"),
      new String("伏击 !"),
      new String("一无所获")
    ],
    green: [
      ...Array(6).fill(new String("食物")),
      ...Array(2).fill(new String("燃料")),
      ...Array(2).fill(new String("弹药")),
      new String("手电筒"),
      new String("背包"),
      new String("多余配件"),
      new String("一无所获"),
      new String("伏击 !")
    ],
    blue: [
      ...Array(2).fill(new String("食物")),
      ...Array(2).fill(new String("燃料")),
      ...Array(4).fill(new String("弹药")),
      new String("手枪"),
      new String("对讲机"),
      new String("手电筒"),
      ...Array(2).fill(new String("多余配件")),
      new String("满足灰尘的日记本"),
      new String("伏击 !"),
      new String("一无所获")
    ]
  }
};

export const HumanFightMission:Mission = {
  id: 9,
  name: "人类反击",
  level: 4,
  describe: "根据你找到的情报，我们绘制出了控制他们的机械和无人机的外星神经网络图。我们团队的科学家们写了一个让他们瘫痪的病毒。我们击毁了一艘外星飞船，现在需要到那里上传病毒。",
  target: "摧毁2个外星发射器，然后把科学家带道现场去上传病毒。",
  else: "把1个目标标记和3个怪物标记各放到2个地图块上。这代表被守卫的外星发射器。你可以花费1个行动来摧毁1个发射器。选择1名玩家，装备科学家牌。首领: 把2张首领卡洗入怪物牌库。",
  map: [
    "加油站", "加油站",
    "隧道", "隧道",
    "城市街道", "城市街道",
    "河流",
    "警察局",
    "强盗营地",
    "机场",
    "坠毁点",
    "军事基地",
    "山", "山",
    "避难所", "避难所",
    "农场", "农场",
    "百货商店",
    "医院",
    "沙漠",
    "绿洲",
    "工厂",
    "监狱"
  ],
  explore: {
    red: [
      "食物", "食物",
      "燃料", "燃料", "燃料", "燃料",
      "医疗用品", "医疗用品",
      "弹药", "弹药",
      "双筒望远镜",
      "多余配件",
      "满是灰尘的日记本",
      "伏击!",
      "一无所获"
    ],
    green: [
      "食物", "食物", "食物", "食物", "食物", "食物",
      "燃料", "燃料",
      "弹药", "弹药",
      "手电筒",
      "背包",
      "多余配件",
      "一无所获",
      "伏击!"
    ],
    blue: [
      "食物", "食物",
      "燃料", "燃料",
      "弹药", "弹药", "弹药", "弹药",
      "手枪",
      "对讲机",
      "手电筒",
      "多余配件", "多余配件",
      "满是灰尘的日记本",
      "伏击!",
      "一无所获"
    ]
  }
};

export const TransitionMission: Mission = {
  id: 10,
  name: "运输",
  level: 3,
  describe: "机器人们继续抓捕或杀死任何他们遇到的人类。我们必须继续抵抗。",
  target: "带着6个燃料、3个脏毯子、2个医疗用品和2个多余零件返回基地。",
  else: "把面包车和军事基地地图块分别放在地图相对的两边。把3个目标标记彼此距离至少2个地图块放到地图上。玩家初始共有4张燃料牌，由玩家选择如何分配。第1名到达每个目标标记的玩家触发以下效果：标记1:收集3个多余零件和2个医疗用品。标记2:抓取首领卡，收集3个脏毯子。标记3:收集2个燃料和1个医疗用品 (这些物品不要从拾荒牌库中拿取)。",
  map: [
    "加油站", "加油站",
    "隧道", "隧道",
    "城市街道", "城市街道",
    "旷野", "旷野",
    "警察局",
    "强盗营地",
    "避难所",
    "工厂",
    "监狱",
    "山", "山",
    "森林", "森林",
    "农场", "农场",
    "百货商店",
    "医院",
    "沙漠",
    "机场",
    "军事基地"
  ],
  explore: {
    red: [
      "食物", "食物",
      "燃料", "燃料",
      "医疗用品", "医疗用品",
      "弹药", "弹药",
      "双筒望远镜",
      "多余配件",
      "伏击!",
      "一无所获", "一无所获"
    ],
    green: [
      "食物", "食物", "食物", "食物", "食物", "食物",
      "燃料",
      "弹药", "弹药",
      "手电筒",
      "背包",
      "多余配件",
      "一无所获",
      "伏击!"
    ],
    blue: [
      "食物", "食物",
      "燃料",
      "弹药", "弹药", "弹药", "弹药",
      "手枪",
      "对讲机",
      "手电筒",
      "多余配件",
      "伏击!",
      "一无所获"
    ]
  }
};

export const protectBaseMission: Mission = {
  id: new Number(11),
  name: "保护基地",
  level: 4, // 困难对应等级4
  describe: new String("多亏了你们带来的补给，我们有一个小组正在研制一些自制炸弹。但机器人攻击部队正在该地区巡逻，寻找我们的基地。摧毁这些攻击部队并返回基地，我们要发起一次反击。"),
  target: new String("清除3个目标标记。当目标标记所在地图块的所有怪物标记都被清除后，移除该目标标记。返回军事基地并杀死所有玩家面前的怪物卡。"),
  else: new String("玩家在军事基地地图块开始，并且在任务开始时不会抓取怪物卡。把3个目标标记彼此距离至少3个地图块且与基地距离至少3个地图块放置。在每个目标标记的地图块上放置3个怪物标记。把首领卡洗入怪物牌库下半部中"),
  map: [
    ...Array(2).fill(new String("加油站")),
    ...Array(2).fill(new String("旷野")),
    ...Array(2).fill(new String("避难所")),
    ...Array(2).fill(new String("山")),
    new String("百货商店"),
    new String("机场"),
    ...Array(2).fill(new String("隧道")),
    new String("警察局"),
    new String("工厂"),
    ...Array(2).fill(new String("森林")),
    new String("医院"),
    new String("军事基地"),
    ...Array(2).fill(new String("城市街道")),
    ...Array(2).fill(new String("强盗营地")),
    new String("监狱"),
    ...Array(2).fill(new String("农场")),
    ...Array(2).fill(new String("沙漠")),
    new String("游乐园")
  ],
  explore: {
    red: [
      ...Array(2).fill(new String("食物")),
      ...Array(4).fill(new String("燃料")),
      ...Array(2).fill(new String("医疗用品")),
      ...Array(2).fill(new String("弹药")),
      new String("双筒望远镜"),
      new String("多余配件"),
      new String("伏击 !"),
      ...Array(2).fill(new String("一无所获"))
    ],
    green: [
      ...Array(6).fill(new String("食物")),
      ...Array(2).fill(new String("燃料")),
      ...Array(2).fill(new String("弹药")),
      new String("手电筒"),
      new String("背包"),
      new String("多余配件"),
      new String("一无所获"),
      new String("伏击 !")
    ],
    blue: [
      ...Array(2).fill(new String("食物")),
      ...Array(2).fill(new String("燃料")),
      ...Array(4).fill(new String("弹药")),
      new String("手枪"),
      new String("对讲机"),
      new String("手电筒"),
      ...Array(2).fill(new String("多余配件")),
      new String("伏击 !"),
      new String("一无所获")
    ]
  }
};

export const FireRobotMission :Mission = {
  id: 12,
  name: "烧死那群机器人",
  level: 4,
  describe: "是时间给这些就会算数的机器一些教训了。我们定位了3个重要的目标，我们必须摧毁这些目标，抵抗组织才能够重新控制这一区域。",
  target: "摧毁3个标记的面包车，你们就可以完成任务并成功逃离。",
  else: "在地图上放置3个目标标记。每个标记必须与其它所有标记至少距离3个地图块。在被标记的地图块被玩家进入后，任何玩家可以花费1个行动来摧毁该地点和上面的一切。小心别摧毁了你回去的路。把首领卡随机洗入怪物牌库。在牌库底额外放一张首领卡。",
  map: [
    "加油站", "加油站",
    "隧道", "隧道",
    "城市街道", "城市街道",
    "旷野", "旷野",
    "警察局",
    "强盗营地", "强盗营地",
    "避难所", "避难所",
    "工厂",
    "监狱",
    "山", "山",
    "森林", "森林",
    "农场", "农场",
    "百货商店",
    "医院",
    "沙漠", "沙漠",
    "机场",
    "军事基地",
    "游乐园"
  ],
  explore: {
    red: [
      "食物", "食物",
      "燃料", "燃料", "燃料", "燃料",
      "医疗用品", "医疗用品",
      "弹药", "弹药",
      "双筒望远镜",
      "多余配件",
      "伏击!",
      "一无所获", "一无所获"
    ],
    green: [
      "食物", "食物", "食物", "食物", "食物", "食物",
      "燃料", "燃料",
      "弹药", "弹药",
      "手电筒",
      "背包",
      "多余配件",
      "一无所获",
      "伏击!"
    ],
    blue: [
      "食物", "食物",
      "燃料", "燃料",
      "弹药", "弹药", "弹药", "弹药",
      "手枪",
      "对讲机",
      "手电筒",
      "多余配件", "多余配件",
      "伏击!",
      "一无所获"
    ]
  }
};

export const baseMission = [
  learning,
  rescueMission,sampleCollectionMission,developAntidoteMission,
  nuclearWinterMission,disarmBombMission,nuclearRadiationMission,
  alienReconMission,intelligenceRecoveryMission,HumanFightMission,
  TransitionMission,protectBaseMission,FireRobotMission
]
