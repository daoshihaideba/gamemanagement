let exp = module.exports;

exp.fishType = [
    { resIndex: 0, probability: 0.5, minMultiple: 2, maxMultiple: 2, moveSpeed: 1, animationSpeed: 1, bombCapture: true },
    { resIndex: 1, probability: 0.5, minMultiple: 2, maxMultiple: 2, moveSpeed: 1, animationSpeed: 1, bombCapture: true },
    { resIndex: 2, probability: 0.333, minMultiple: 3, maxMultiple: 3, moveSpeed: 0.95, animationSpeed: 0.8, bombCapture: true },
    { resIndex: 3, probability: 0.25, minMultiple: 4, maxMultiple: 4, moveSpeed: 0.95, animationSpeed: 0.8, bombCapture: true },
    { resIndex: 4, probability: 0.2, minMultiple: 5, maxMultiple: 5, moveSpeed: 0.9, animationSpeed: 0.8, bombCapture: true },
    { resIndex: 5, probability: 0.166, minMultiple: 6, maxMultiple: 6, moveSpeed: 0.85, animationSpeed: 0.7, bombCapture: true },
    { resIndex: 6, probability: 0.142, minMultiple: 7, maxMultiple: 7, moveSpeed: 0.8, animationSpeed: 0.87, bombCapture: true },
    { resIndex: 7, probability: 0.125, minMultiple: 8, maxMultiple: 8, moveSpeed: 0.8, animationSpeed: 0.7, bombCapture: true },
    { resIndex: 8, probability: 0.111, minMultiple: 9, maxMultiple: 9, moveSpeed: 0.65, animationSpeed: 0.7, bombCapture: true },
    { resIndex: 9, probability: 0.1, minMultiple: 10, maxMultiple: 10, moveSpeed: 0.65, animationSpeed: 0.6, bombCapture: true },
    { resIndex: 10, probability: 0.1, minMultiple: 10, maxMultiple: 10, moveSpeed: 0.65, animationSpeed: 0.6, yiwangdajin: true },
    { resIndex: 19, probability: 0.1, minMultiple: 10, maxMultiple: 10, moveSpeed: 0.65, animationSpeed: 0.6, yiwangdajin: true },
    { resIndex: 10, probability: 0.083, minMultiple: 12, maxMultiple: 12, moveSpeed: 0.65, animationSpeed: 0.6, bombCapture: true },
    { resIndex: 11, probability: 0.055, minMultiple: 18, maxMultiple: 18, moveSpeed: 0.65, animationSpeed: 0.6, bombCapture: true },
    { resIndex: 12, probability: 0.055, minMultiple: 18, maxMultiple: 18, moveSpeed: 0.6, animationSpeed: 0.6, bombCapture: true },
    { resIndex: 13, probability: 0.05, minMultiple: 20, maxMultiple: 20, moveSpeed: 0.6, animationSpeed: 0.6, bombCapture: true },
    { resIndex: 14, probability: 0.04, minMultiple: 25, maxMultiple: 25, moveSpeed: 0.6, animationSpeed: 0.5 },
    { resIndex: 15, probability: 0.033, minMultiple: 30, maxMultiple: 30, moveSpeed: 0.55, animationSpeed: 0.5 },
    { resIndex: 16, probability: 0.0285, minMultiple: 35, maxMultiple: 35, moveSpeed: 0.5, animationSpeed: 0.5 },
    { resIndex: 17, probability: 0.025, minMultiple: 40, maxMultiple: 40, moveSpeed: 0.45, animationSpeed: 0.4 },
    { resIndex: 18, probability: 0.0222, minMultiple: 45, maxMultiple: 45, moveSpeed: 0.4, animationSpeed: 0.4 },
    { resIndex: 21, probability: 0.02, minMultiple: 50, maxMultiple: 50, moveSpeed: 0.35, animationSpeed: 0.4, fishBoomEffect: true },
    { resIndex: 23, probability: 0.0142, minMultiple: 70, maxMultiple: 70, moveSpeed: 0.35, animationSpeed: 0.4, fishBoomEffect: true },
    { resIndex: 25, probability: 0.0125, minMultiple: 80, maxMultiple: 80, moveSpeed: 0.35, animationSpeed: 0.3,fishBoomEffect: true },

    { resIndex: 26, probability: 0.01, minMultiple: 50, maxMultiple: 100, moveSpeed: 0.3, animationSpeed: 0.3,AutoIncrement:true, fishBoomEffect: true },
    { resIndex: 27, probability: 0.0083, minMultiple: 80, maxMultiple: 120, moveSpeed: 0.3, animationSpeed: 0.3,AutoIncrement:true, toad: true, fishBoomEffect: true },
    { resIndex: 28, probability: 0.0083, minMultiple: 80, maxMultiple: 150, moveSpeed: 0.3, animationSpeed: 0.3,AutoIncrement:true,  fishBoomEffect: true },
    { resIndex: 29, probability: 0.005, minMultiple: 100, maxMultiple: 200, moveSpeed: 0.25, animationSpeed: 0.3,AutoIncrement:true,  fixedRotation: true, fishBoomEffect: true },

    { resIndex: 30, probability: 0.005, minMultiple: 100, maxMultiple: 300, moveSpeed: 0.25, animationSpeed: 0.3,AutoIncrement:true, boss: true, fixedRotation: true, fishBoomEffect: true },
    { resIndex: 31, probability: 0.005, minMultiple: 100, maxMultiple: 400, moveSpeed: 0.25, animationSpeed: 0.3,AutoIncrement:true, boss: true, fixedRotation: true, fishBoomEffect: true },
    { resIndex: 33, probability: 0.005, minMultiple: 100, maxMultiple: 500, moveSpeed: 0.25, animationSpeed: 0.3,AutoIncrement:true, boss: true, fixedRotation: true, fishBoomEffect: true },

    { resIndex: 32, probability: 0.005, minMultiple: 0, maxMultiple: 600, moveSpeed: 0.3, animationSpeed: 0.3, bomb: true,BombRadius:0.5, fixedRotation: true, fishBoomEffect: true },
    { resIndex: 36, probability: 0.005, minMultiple: 0, maxMultiple: 1200, moveSpeed: 0.3, animationSpeed: 0.3, bomb: true,BombRadius:1, fixedRotation: true, fishBoomEffect: true },
];
// 单位点的长宽，鱼的范围1800 * 1000， 分成20 * 20个点
exp.unitLengthX = 90;
exp.unitLengthY = 50;

// 鱼每秒移动的标准距离
exp.fishMoveBaseSpeed = 100;

// 鱼群设置
// 鱼群设置
exp.fishTide = [
    { fishTypeID: 0, startPos: { x: -9.5, y: 3.5 }, space: 1, maxCount: 38 },
    { fishTypeID: 0, startPos: { x: -9.5, y: -3.5 }, space: 1, maxCount: 38 },

    { fishTypeID: 1, startPos: { x: -9, y: -2.75 }, space: 1, maxCount: 39 },
    { fishTypeID: 1, startPos: { x: -9, y: 2.75 }, space: 1, maxCount: 39 },

    { fishTypeID: 2, startPos: { x: -9, y: -2 }, space: 0.75, maxCount: 52 },
    { fishTypeID: 2, startPos: { x: -9, y: 2 }, space: 0.75, maxCount: 52 },

    { fishTypeID: 4, startPos: { x: -9, y: -1.2 }, space: 0.75, maxCount: 5 },
    { fishTypeID: 4, startPos: { x: -9, y: 1.2 }, space: 0.75, maxCount: 5 },
    { fishTypeID: 5, startPos: { x: -9, y: 0 }, space: 0.75, maxCount: 5 },

    { fishTypeID: 18, startPos: { x: -14, y: 0 }, space: 0, maxCount: 1 },
    { fishTypeID: 19, startPos: { x: -17, y: 0 }, space: 0, maxCount: 1 },
    { fishTypeID: 23, startPos: { x: -20, y: 0 }, space: 0, maxCount: 1 },
    { fishTypeID: 20, startPos: { x: -23, y: 0 }, space: 0, maxCount: 1 },
    { fishTypeID: 25, startPos: { x: -26, y: 0 }, space: 0, maxCount: 1 },

    { fishTypeID: 4, startPos: { x: -30, y: -1.2 }, space: 0.75, maxCount: 4 },
    { fishTypeID: 4, startPos: { x: -30, y: 1.2 }, space: 0.75, maxCount: 4 },
    { fishTypeID: 5, startPos: { x: -30, y: 0 }, space: 0.75, maxCount: 4 },

    { fishTypeID: 23, startPos: { x: -34, y: 0 }, space: 0, maxCount: 1 },
    { fishTypeID: 22, startPos: { x: -38, y: 0 }, space: 0, maxCount: 1 },
    { fishTypeID: 24, startPos: { x: -42, y: 0 }, space: 0, maxCount: 1 },
    { fishTypeID: 21, startPos: { x: -46, y: 0 }, space: 0, maxCount: 1 },

    { fishTypeID: 4, startPos: { x: -48, y: -1.2 }, space: 0.75, maxCount: 4 },
    { fishTypeID: 4, startPos: { x: -48, y: 1.2 }, space: 0.75, maxCount: 4 },
    { fishTypeID: 5, startPos: { x: -48, y: 0 }, space: 0.75, maxCount: 4 }
];


exp.fishTideMoveSpeed = 0.6;
exp.fishContinueTime = 50 * exp.unitLengthX / exp.fishMoveBaseSpeed / exp.fishTideMoveSpeed;