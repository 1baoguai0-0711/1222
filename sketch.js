// 精靈動畫設定
let spriteImg;
let sprite2Img;
let sprite3Img;
let sprite4Img;
let sprite5Img;
let sprite6dImg; // 新增：第 6 個角色的倒下動畫
let sprite5qImg; // 新增：第 5 個角色的提問動畫
let sprite7Img;  // 新增：第 7 個動畫角色
let spritePandaImg; // 新增：熊貓角色
let spritePandaCloseImg; // 新增：熊貓接近動畫
let spriteBrianImg; // 新增：Brian角色
let spriteBrianAskingImg; // 新增：Brian 提問角色
let spriteBrianFallingImg; // 新增：Brian 倒下角色
let spriteCcImg; // 新增：cc角色
let spriteCcAskingImg; // 新增：cc 提問角色
let spriteCcFallingImg; // 新增：cc 倒下角色
let bgImg; // 新增：背景圖片
const TOTAL_FRAMES = 6; // 精靈表中有 6 張圖片
const TOTAL_FRAMES_2 = 9; // 2all.png 有 9 張圖片
const TOTAL_FRAMES_5Q = 6; // 5/提問all.png 有 6 張
const TOTAL_FRAMES_6D = 4; // 6/倒下all.png 有 4 張
const TOTAL_FRAMES_7 = 8; // 7/暫停all.png 有 8 張圖片
const TOTAL_FRAMES_PANDA = 10; // 熊貓/吃東西/吃東西all.png 有 10 張圖片
const TOTAL_FRAMES_PANDA_CLOSE = 7; // 熊貓/接近/接近all.png 有 7 張圖片
const TOTAL_FRAMES_BRIAN = 5; // Brian/等待/等待all.png 有 5 張圖片
const TOTAL_FRAMES_BRIAN_ASKING = 7; // Brian/提問/提問all.png 有 7 張圖片
const TOTAL_FRAMES_BRIAN_FALLING = 4; // Brian/倒下/倒下all.png 有 4 張圖片
const TOTAL_FRAMES_CC = 8; // cc/等待/等待all.png 有 8 張圖片
const TOTAL_FRAMES_CC_ASKING = 6; // cc/提問/提問all.png 有 6 張圖片
const TOTAL_FRAMES_CC_FALLING = 4; // cc/倒下/倒下all.png 有 4 張圖片
let frameW = 0;
let frameH = 0;
let frameW2 = 0;
let frameH2 = 0;
let frameW3 = 0;
let frameH3 = 0;
let frameW4 = 0; // 修正：改為初始化為 0，避免 Unexpected identifier 錯誤
let frameH4 = 0;
let frameW5 = 0;
let frameH5 = 0;
let frameW6d = 0;
let frameH6d = 0;
let frameW5q = 0;
let frameH5q = 0;
let frameW7 = 0;
let frameH7 = 0;
let frameWPanda = 0;
let frameHPanda = 0;
let frameWPandaClose = 0;
let frameHPandaClose = 0;
let frameWBrian = 0;
let frameHBrian = 0;
let frameWBrianAsking = 0;
let frameHBrianAsking = 0;
let frameWBrianFalling = 0;
let frameHBrianFalling = 0;
let frameWCc = 0;
let frameHCc = 0;
let frameWCcAsking = 0;
let frameHCcAsking = 0;
let frameWCcFalling = 0;
let frameHCcFalling = 0;
let frameDelay = 6; // 每幀持續的 draw 次數，數字越小動畫越快

// 角色位置與狀態
let posX1, posX2, posY; // 兩個獨立 x 位置：posX1 用於主要顯示，posX2 用於同時顯示另一張（1all/2all）
let posX7_fixed; // 新增：第 7 個角色的固定 X 位置
let pandaPosX_fixed; // 新增：熊貓角色的固定 X 位置
let speed = 4;
let movingLeft = false;
let movingRight = false;
let facing = 1; // 1 = 右, -1 = 左
let facing2 = 1; // 2all 的朝向（獨立於主角）
let lastFacing = 1; // 紀錄最近一次移動方向，用於靜止時的朝向
let displayScale = 3; // 放大倍數，可調
const interactionDistance = 100; // 角色互動的觸發距離
const pandaInteractionDistance = 150; // 熊貓互動的觸發距離

// --- 互動與問答遊戲相關 ---
let quizTable; // 儲存從 CSV 載入的題庫
let currentQuestion = null; // 當前抽到的題目物件
let currentQuestionIndex = -1; // 新增：當前題目的索引
let answeredQuestionIndices = []; // 新增：記錄已答對題目的索引
let quizState = 'idle'; // 遊戲狀態: 'idle', 'asking', 'feedback'
let inputBox;
let orangeText = "要來點挑戰嗎?"; // 角色2的對話文字
let isInteracting = false;
let isFallingDown = false; // 橘子角色是否正在倒下
let fallDownTick = 0;    // 倒下動畫的計數器
let interactionCooldown = 0; // 互動冷卻計數器
let correctAnswersCount = 0; // 答對題數計數
let isOrangeStageCleared = false; // 是否已通過橘子關卡
let isBrianFalling = false; // Brian 是否正在倒下
let brianFallTick = 0; // Brian 倒下動畫計數
const fallDownDelay = 8; // 倒下動畫的速度
let currentScore = 0; // 新增：遊戲分數
let isBrianStageCleared = false; // 是否已通過 Brian 關卡
let isCcFalling = false; // cc 是否正在倒下
let ccFallTick = 0; // cc 倒下動畫計數

// 新增：記錄最後繪製的作答區（輸入框）底部 Y，用於將題目顯示在作答區下方
let lastPromptBoxBottom = null;
let pandaHintText = "";
let lastAnswerCorrect = null;
// 提示框向下偏移量（正值往下移，可調）
// 從 30 改為 200，若要再往下移請增大此數值
let speechYOffset = 200;

// 跳躍相關
const TOTAL_FRAMES_3 = 4; // 3all.png 有 4 張
let isJumping = false;
let jumpTick = 0;
let jumpDelay = 8; // 跳躍動畫每幀持續時間
let jumpHeight = 80; // 跳起的像素高度（可調）
let baseY = 0;
let yOffset = 0;
// 空白鍵的動作（4all 播放完生成 5all 角色）
const TOTAL_FRAMES_4 = 4;
const TOTAL_FRAMES_5 = 4;
let isPlaying4 = false;
let play4Tick = 0;
let play4Delay = 8;
let spawnedChars = []; // 陣列保存被產生的新角色

// 新增候選背景路徑載入（會依序嘗試多個常見資料夾/檔名）
function preload() {
  // 載入精靈圖與題庫（回復為原本不額外載入背景圖片的 preload）
  spriteImg = loadImage('1all.png',
    img => { spriteImg = img; console.log('載入 1all.png 成功 (root)'); },
    err => {
      console.warn('未找到 root 的 1all.png，改從 ./1/1all.png 嘗試', err);
      spriteImg = loadImage('1/1all.png',
        img2 => { spriteImg = img2; console.log('載入 1/1all.png 成功 (./1/)'); },
        err2 => { console.error('載入 1all.png 失敗（嘗試 root 與 ./1/），請確認檔案位置', err2); }
      );
    }
  );

  // 載入 2all.png (走動動畫，用於左右移動)
  sprite2Img = loadImage('2all.png',
    img => { sprite2Img = img; console.log('載入 2all.png 成功 (root)'); },
    err => {
      console.warn('未找到 root 的 2all.png，改從 ./1/2all.png 或 ./2/2all.png 嘗試', err);
      sprite2Img = loadImage('1/2all.png',
        img2 => { sprite2Img = img2; console.log('載入 1/2all.png 成功 (./1/)'); },
        err2 => {
          sprite2Img = loadImage('2/2all.png',
            img3 => { sprite2Img = img3; console.log('載入 2/2all.png 成功 (./2/)'); },
            err3 => { console.error('載入 2all.png 失敗（嘗試多個路徑），請確認檔案位置', err3); }
          );
        }
      );
    }
  );

  // 載入 3all.png（跳躍動畫）
  sprite3Img = loadImage('3all.png',
    img => { sprite3Img = img; console.log('載入 3all.png 成功 (root)'); },
    err => {
      console.warn('未找到 root 的 3all.png，改從 ./1/3all.png 或 ./3/3all.png 嘗試', err);
      sprite3Img = loadImage('1/3all.png',
        img2 => { sprite3Img = img2; console.log('載入 1/3all.png 成功 (./1/)'); },
        err2 => {
          sprite3Img = loadImage('3/3all.png',
            img3 => { sprite3Img = img3; console.log('載入 3/3all.png 成功 (./3/)'); },
            err3 => { console.error('載入 3all.png 失敗（嘗試多個路徑），請確認檔案位置', err3); }
          );
        }
      );
    }
  );

  // 載入 4all.png（空白鍵動作）與 5all.png（被生成的角色）
  sprite4Img = loadImage('4all.png',
    img => { sprite4Img = img; console.log('載入 4all.png 成功 (root)'); },
    err => {
      console.warn('未找到 root 的 4all.png，嘗試 ./1/4all.png 或 ./4/4all.png', err);
      sprite4Img = loadImage('1/4all.png',
        img2 => { sprite4Img = img2; console.log('載入 1/4all.png 成功 (./1/)'); },
        err2 => {
          sprite4Img = loadImage('4/4all.png',
            img3 => { sprite4Img = img3; console.log('載入 4/4all.png 成功 (./4/)'); },
            err3 => { console.error('載入 4all.png 失敗（嘗試多個路徑），請確認檔案位置', err3); }
          );
        }
      );
    }
  );

  sprite5Img = loadImage('5all.png',
    img => { sprite5Img = img; console.log('載入 5all.png 成功 (root)'); },
    err => {
      console.warn('未找到 root 的 5all.png，嘗試 ./1/5all.png 或 ./5/5all.png', err);
      sprite5Img = loadImage('1/5all.png',
        img2 => { sprite5Img = img2; console.log('載入 1/5all.png 成功 (./1/)'); },
        err2 => {
          sprite5Img = loadImage('5/5all.png',
            img3 => { sprite5Img = img3; console.log('載入 5/5all.png 成功 (./5/)'); },
            err3 => { console.error('載入 5all.png 失敗（嘗試多個路徑），請確認檔案位置', err3); }
          );
        }
      );
    }
  );

  // 載入 5/提問all.png (互動動畫)
  sprite5qImg = loadImage('5/提問all.png',
    img => {
      sprite5qImg = img;
      console.log('載入 5/提問all.png 成功');
    },
    err => {
      console.warn('載入 5/提問all.png 失敗，請確認檔案路徑 `5/提問all.png` 是否正確', err);
    }
  );

  // 載入 6/倒下all.png (倒下動畫)
  sprite6dImg = loadImage('6/倒下all.png',
    img => {
      sprite6dImg = img;
      console.log('載入 6/倒下all.png 成功');
    },
    err => {
      console.warn('載入 6/倒下all.png 失敗，請確認檔案路徑 `6/倒下all.png` 是否正確', err);
    }
  );

  // 載入 7/暫停all.png (新角色)
  sprite7Img = loadImage('7/暫停all.png',
    img => {
      sprite7Img = img;
      console.log('載入 7/暫停all.png 成功');
    },
    err => {
      console.error('載入 7/暫停all.png 失敗，請確認檔案路徑 `7/暫停all.png` 是否正確', err);
    }
  );

  // 載入 熊貓 相關動畫
  spritePandaImg = loadImage('熊貓/吃東西/吃東西all.png',
    img => { spritePandaImg = img; console.log('載入 熊貓/吃東西/吃東西all.png 成功'); },
    err => { console.error('載入 熊貓/吃東西/吃東西all.png 失敗', err); }
  );
  spritePandaCloseImg = loadImage('熊貓/接近/接近all.png',
    img => { spritePandaCloseImg = img; console.log('載入 熊貓/接近/接近all.png 成功'); },
    err => { console.error('載入 熊貓/接近/接近all.png 失敗', err); }
  );

  // 載入 Brian 角色
  spriteBrianImg = loadImage('Brian/等待/等待all.png',
    img => { console.log('載入 Brian/等待/等待all.png 成功'); },
    err => { console.error('載入 Brian/等待/等待all.png 失敗', err); }
  );

  // 載入 Brian 提問角色
  spriteBrianAskingImg = loadImage('Brian/提問/提問all.png',
    img => { console.log('載入 Brian/提問/提問all.png 成功'); },
    err => { console.error('載入 Brian/提問/提問all.png 失敗', err); }
  );

  // 載入 Brian 倒下角色
  spriteBrianFallingImg = loadImage('Brian/倒下/倒下all.png',
    img => { console.log('載入 Brian/倒下/倒下all.png 成功'); },
    err => { console.error('載入 Brian/倒下/倒下all.png 失敗', err); }
  );

  // 載入 cc 角色
  spriteCcImg = loadImage('cc/等待/等待all.png',
    img => { console.log('載入 cc/等待/等待all.png 成功'); },
    err => { console.error('載入 cc/等待/等待all.png 失敗', err); }
  );

  // 載入 cc 提問角色
  spriteCcAskingImg = loadImage('cc/提問/提問all.png',
    img => { console.log('載入 cc/提問/提問all.png 成功'); },
    err => { console.error('載入 cc/提問/提問all.png 失敗', err); }
  );

  // 載入 cc 倒下角色
  spriteCcFallingImg = loadImage('cc/倒下/倒下all.png',
    img => { console.log('載入 cc/倒下/倒下all.png 成功'); },
    err => { console.error('載入 cc/倒下/倒下all.png 失敗', err); }
  );

  // 載入背景圖片
  bgImg = loadImage('背景/背景.png',
    img => { console.log('載入 背景/背景.png 成功'); },
    err => { console.error('載入 背景/背景.png 失敗', err); }
  );

  // 載入 CSV 題庫
  quizTable = loadTable('quiz.csv', 'csv', 'header',
    () => { console.log('成功載入 quiz.csv 題庫'); },
    (err) => { console.error('載入 quiz.csv 失敗，請確認檔案是否存在且格式正確', err); }
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  // 初始位置在畫面中間
  // 將兩張圖略微分開顯示，並同時可移動
  posX1 = width / 2 - 60;
  posX2 = width / 2 + 60;
  baseY = height / 2;
  posY = baseY;
  posX7_fixed = width / 2 - 300; // 將角色2（橘子）位置移到靠近中央的左側
  pandaPosX_fixed = width / 2 + 300; // 將熊貓角色位置固定在靠近中央的右側

  // 若圖片已載入，計算每幀寬高；若尚未載入，會在 draw 中延遲計算
  if (spriteImg && spriteImg.width) {
    frameW = floor(spriteImg.width / TOTAL_FRAMES);
    frameH = spriteImg.height;
  }
  if (sprite2Img && sprite2Img.width) {
    frameW2 = floor(sprite2Img.width / TOTAL_FRAMES_2);
    frameH2 = sprite2Img.height;
  }
  if (sprite3Img && sprite3Img.width) {
    frameW3 = floor(sprite3Img.width / TOTAL_FRAMES_3);
    frameH3 = sprite3Img.height;
  }
  if (sprite4Img && sprite4Img.width) {
    frameW4 = floor(sprite4Img.width / TOTAL_FRAMES_4);
    frameH4 = sprite4Img.height;
  }
  if (sprite5Img && sprite5Img.width) {
    frameW5 = floor(sprite5Img.width / TOTAL_FRAMES_5);
    frameH5 = sprite5Img.height;
  }
  // 新增：計算第 6 個倒下角色的影格尺寸
  if (sprite6dImg && sprite6dImg.width) {
    frameW6d = floor(sprite6dImg.width / TOTAL_FRAMES_6D); // 143 / 4 = 35.75 -> 35
    frameH6d = sprite6dImg.height; // 32
  }
  // 新增：計算第 5 個提問角色的影格尺寸
  if (sprite5qImg && sprite5qImg.width) {
    frameW5q = floor(sprite5qImg.width / TOTAL_FRAMES_5Q); // 223 / 6 = 37.16 -> 37
    frameH5q = sprite5qImg.height; // 32
  }
  // 新增：計算第 7 個角色的影格尺寸
  if (sprite7Img && sprite7Img.width) {
    frameW7 = floor(sprite7Img.width / TOTAL_FRAMES_7); // 364 / 8 = 45.5 -> floor(45.5) = 45
    frameH7 = sprite7Img.height; // 32
  }
  // 新增：計算熊貓角色的影格尺寸
  if (spritePandaImg && spritePandaImg.width) {
    frameWPanda = spritePandaImg.width / TOTAL_FRAMES_PANDA; // 575 / 10 = 57.5
    frameHPanda = spritePandaImg.height; // 54
  }
  // 新增：計算熊貓接近動畫的影格尺寸
  if (spritePandaCloseImg && spritePandaCloseImg.width) {
    frameWPandaClose = spritePandaCloseImg.width / TOTAL_FRAMES_PANDA_CLOSE; // 310 / 7 = 44.28
    frameHPandaClose = spritePandaCloseImg.height; // 46
  }
  // 新增：計算 Brian 角色的影格尺寸
  if (spriteBrianImg && spriteBrianImg.width) {
    frameWBrian = spriteBrianImg.width / TOTAL_FRAMES_BRIAN;
    frameHBrian = spriteBrianImg.height;
  }
  // 新增：計算 Brian 提問角色的影格尺寸
  if (spriteBrianAskingImg && spriteBrianAskingImg.width) {
    frameWBrianAsking = spriteBrianAskingImg.width / TOTAL_FRAMES_BRIAN_ASKING;
    frameHBrianAsking = spriteBrianAskingImg.height;
  }
  // 新增：計算 Brian 倒下角色的影格尺寸
  if (spriteBrianFallingImg && spriteBrianFallingImg.width) {
    frameWBrianFalling = spriteBrianFallingImg.width / TOTAL_FRAMES_BRIAN_FALLING;
    frameHBrianFalling = spriteBrianFallingImg.height;
  }
  // 新增：計算 cc 角色的影格尺寸
  if (spriteCcImg && spriteCcImg.width) {
    frameWCc = spriteCcImg.width / TOTAL_FRAMES_CC;
    frameHCc = spriteCcImg.height;
  }
  // 新增：計算 cc 提問角色的影格尺寸
  if (spriteCcAskingImg && spriteCcAskingImg.width) {
    frameWCcAsking = spriteCcAskingImg.width / TOTAL_FRAMES_CC_ASKING;
    frameHCcAsking = spriteCcAskingImg.height;
  }
  // 新增：計算 cc 倒下角色的影格尺寸
  if (spriteCcFallingImg && spriteCcFallingImg.width) {
    frameWCcFalling = spriteCcFallingImg.width / TOTAL_FRAMES_CC_FALLING;
    frameHCcFalling = spriteCcFallingImg.height;
  }

  // 建立文字輸入框
  inputBox = createInput('');
  inputBox.hide(); // 預設隱藏
  inputBox.changed(handleInput); // 當按下 Enter 或點擊別處時觸發
  imageMode(CENTER);
}

function draw() {
  // 還原為原本純色背景（不使用臨時 DEBUG）
  if (bgImg && bgImg.width > 0) {
    push();
    imageMode(CORNER); // 背景圖從左上角開始畫
    image(bgImg, 0, 0, width, height); // 拉伸圖片以填滿畫布
    pop();
  } else {
    background('#a2d2ff'); // 若圖片未載入，顯示原本的藍色背景
  }

  // 每幀更新互動冷卻
  if (interactionCooldown > 0) interactionCooldown--;

  // 更新移動狀態（支援按住鍵）
  movingLeft = keyIsDown(LEFT_ARROW);
  movingRight = keyIsDown(RIGHT_ARROW);

  // 決定使用哪個精靈表與幀數
  let currentImg = spriteImg;
  let currentFrames = TOTAL_FRAMES;
  let cw = frameW;
  let ch = frameH;
  // 先預設垂直偏移
  yOffset = 0;

  if (movingLeft) {
    // 按左鍵：用 2all 取代主角，向左前進，不翻轉（保持原向）
    if (sprite2Img) {
      currentImg = sprite2Img;
      currentFrames = TOTAL_FRAMES_2;
      cw = frameW2;
      ch = frameH2;
    }
    posX1 -= speed;     // 以主位置 posX1 移動
    facing = 1;         // 不翻轉（scale(1,1)）讓圖面向左
    lastFacing = 1;
  } else if (movingRight) {
    // 按右鍵：用 2all 取代主角，向右前進，需水平翻轉以面向右
    if (sprite2Img) {
      currentImg = sprite2Img;
      currentFrames = TOTAL_FRAMES_2;
      cw = frameW2;
      ch = frameH2;
    }
    posX1 += speed;     // 以主位置 posX1 移動
    facing = -1;        // 翻轉（scale(-1,1)）讓圖面向右
    lastFacing = -1;
  } else {
    // 靜止時使用 1all.png（idle）
    currentImg = spriteImg;
    currentFrames = TOTAL_FRAMES;
    cw = frameW;
    ch = frameH;
    // 靜止時採用最後移動方向的朝向
    facing = lastFacing;
  }

  // 處理跳躍（上鍵）狀態：若按下上鍵且尚未跳躍，啟動跳躍
  if (keyIsDown(UP_ARROW) && !isJumping) {
    isJumping = true;
    jumpTick = 0;
    // 立刻抬起（在第一幀前）
    yOffset = -jumpHeight;
  }

  // 若正在跳躍，切換使用 3all.png 並依跳躍進度控制垂直位移
  let jumpIdx = 0;
  if (isJumping) {
    if (sprite3Img) {
      currentImg = sprite3Img;
      currentFrames = TOTAL_FRAMES_3;
      cw = frameW3;
      ch = frameH3;
    }

    jumpIdx = floor(jumpTick / jumpDelay);
    if (jumpIdx < 1) {
      // 在第 1 幀之前，保持向上
      yOffset = -jumpHeight;
    } else {
      // 到第 2 張後往下（回到原位）
      yOffset = 0;
    }

    // 畫面到最後一幀後結束跳躍
    if (jumpIdx >= TOTAL_FRAMES_3) {
      isJumping = false;
      jumpTick = 0;
      yOffset = 0;
    } else {
      jumpTick++;
    }
  }

  // 處理空白鍵動作（4all），改為「按住空白鍵時持續顯示並播放 4all；放開時恢復 1all」
  // 判斷是否按住空白鍵：按住時顯示並播放 4all，放開時恢復為其他狀態
  const downArrowDown = keyIsDown(DOWN_ARROW);
  if (downArrowDown) { // 移除 !isInteracting，讓衝撞優先於對話
    isPlaying4 = true;
    // 切換為 4all 的圖與幀設定
    if (sprite4Img) {
      currentImg = sprite4Img;
      currentFrames = TOTAL_FRAMES_4;
      cw = frameW4;
      ch = frameH4;
    }
    // 4all 按住時持續向前移動（使用原先的移動方向邏輯）
    posX1 += (-facing) * speed;
    // 推進播放計數以驅動動畫（按住時循環）
    play4Tick++;
  } else {
    // 放開空白鍵：停止播放 4all，重置計數，畫面會使用其它 currentImg（通常為 1all）
    isPlaying4 = false;
    play4Tick = 0;
  }

  // 若當前圖片還沒載入，顯示提示文字
  if (!currentImg || !currentImg.width) {
    push();
    translate(width / 2, height / 2);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(18);
    text('等待載入精靈圖，或找不到 1all.png / 2all.png', 0, 0);
    pop();
    return;
  }

  // 若未預先計算幀寬高，現在計算一次
  if (currentImg === spriteImg && (!cw || !ch)) {
    frameW = floor(spriteImg.width / TOTAL_FRAMES);
    frameH = spriteImg.height;
    cw = frameW; ch = frameH;
  }
  if (currentImg === sprite2Img && (!cw || !ch)) {
    frameW2 = floor(sprite2Img.width / TOTAL_FRAMES_2);
    frameH2 = sprite2Img.height;
    cw = frameW2; ch = frameH2;
  }

  // 計算目前幀索引
  let idx;
  if (isPlaying4) {
    // 當正在播放 4all（按住空白鍵）時，讓 4all 連續循環播放
    // 使用 modulo 使動畫循環，不會停在最後一格
    idx = floor(play4Tick / play4Delay) % currentFrames;
  } else if (isJumping) {
    idx = constrain(floor(jumpTick / jumpDelay), 0, currentFrames - 1);
  } else {
    idx = floor(frameCount / frameDelay) % currentFrames;
  }
  const sx = idx * cw;
  const sy = 0;

  // 顯示大小
  const displayW = cw * displayScale;
  const displayH = ch * displayScale;

  // 邊界限制
  const halfWMain = displayW / 2;
  posX1 = constrain(posX1, halfWMain, width - halfWMain);
  // 另一張圖的顯示寬度（若未載入則使用 frameW2 欄位）
  const displayW2 = (frameW2 || (sprite2Img ? floor(sprite2Img.width / TOTAL_FRAMES_2) : 0)) * displayScale;
  const halfW2 = displayW2 / 2;
  posX2 = constrain(posX2, halfW2, width - halfW2);

  // 實際繪製位置包含跳躍偏移
  const drawY = baseY + yOffset;

  // --- 統一計算提示框與題目要對齊的 Y 座標（使提示語高度和題目高度平行） ---
  // 計算橘子與熊貓當前顯示高度（若尚未計算則退回到圖片高度）
  const displayH7_current = (frameH7 > 0 ? frameH7 * displayScale : (sprite7Img && sprite7Img.height ? sprite7Img.height * displayScale : 0));
  const displayHPanda_current = (frameHPanda > 0 ? frameHPanda * displayScale : (spritePandaImg && spritePandaImg.height ? spritePandaImg.height * displayScale : 0));
  // 統一的提示框中心 Y（根據兩者較高者決定，避免蓋到角色）；距離角色頂端留 16px
  const speechCenterY = baseY - Math.max(displayH7_current, displayHPanda_current) - 16;

  // --- 繪製固定不動的橘子角色 (第 7 個角色)，並加入互動邏輯 ---
  // 若橘子關卡已過，不再進行互動判定
  if (!isOrangeStageCleared) {
  const distance = abs(posX1 - posX7_fixed);

  // 完整的碰撞偵測，包含 X 和 Y 軸
  const playerHalfW = isPlaying4 ? (displayW * 0.9) / 2 : displayW / 2; // 衝撞時使用90%寬度的hitbox，更精確
  const playerHalfH = displayH / 2; // 高度不變
  const targetHalfW = (frameW7 * displayScale) / 2;
  const targetHalfH = (frameH7 * displayScale) / 2;

  // 判斷是否重疊
  const isOverlapping = (abs(posX1 - posX7_fixed) < (playerHalfW + targetHalfW)) && 
                        (abs(drawY - baseY) < (playerHalfH + targetHalfH));
  
  // 碰撞偵測：如果正在衝撞 (isPlaying4) 且尚未倒下 (isFallingDown)
  if (isPlaying4 && !isFallingDown && isOverlapping) {
    isFallingDown = true; // 觸發倒下
    fallDownTick = 0;     // 重置倒下動畫計數器
    isInteracting = false; // 確保衝撞後可以穿過，而不是觸發對話
  }

  if (distance < interactionDistance) {
    // 如果角色之前是倒下的，現在靠近時將其恢復
    if (isFallingDown && !isPlaying4) { // 只有在非衝撞狀態靠近時才恢復
      isFallingDown = false;
      fallDownTick = 0;
      // 恢復後，暫時不進入互動狀態，避免立即顯示對話框
      // 同時重置問答遊戲
      resetQuiz();
      isInteracting = false;
      interactionCooldown = 30; // 設定30幀（約0.5秒）的冷卻時間
    } else if (!isFallingDown && interactionCooldown === 0) { // 只有在非倒下且冷卻結束時才互動
      // 進入互動狀態
      isInteracting = true;
      // 如果是第一次進入或剛回答完一題，就抽新題目
      if (quizState === 'idle' && quizTable && quizTable.getRowCount() > 0) {
        pickNewQuestion();
      }

      // 只有在提問階段才顯示輸入框
      if (quizState === 'asking') {
        // --- 繪製作答區塊 ---
        push();
        const promptText = "請作答：";
        const textInputWidth = inputBox.width;
        const padding = 10;
        textSize(16);
        const promptTextWidth = textWidth(promptText);
        
        const boxW = promptTextWidth + textInputWidth + padding * 2;
        const boxH = inputBox.height + padding;
        // 修改：將輸入框位置改為對齊提問者（橘子），並提高位置以預留空間給下方的題目文字
        const boxX = posX7_fixed - boxW / 2;
        const characterTop = baseY - (displayH7_current / 2);
        const boxY = characterTop - boxH - 60; // 預留 60px 給題目文字，避免擋住角色
        
        // 繪製背景方塊
        fill('#f0ebd8');
        noStroke();
        rect(boxX, boxY, boxW, boxH, 5);
        
        // 繪製文字
        fill(0);
        textAlign(LEFT, CENTER);
        text(promptText, boxX + padding, boxY + boxH / 2);
        pop();

        // 記錄作答區底部 Y（top + height），供題目顯示在作答區下方使用
        lastPromptBoxBottom = boxY + boxH;

        inputBox.show();
        inputBox.position(boxX + padding + promptTextWidth, boxY + padding / 2);
      }

    // 在角色2上方顯示帶有方框的文字（僅在非「答錯由熊貓提示」情況下顯示）
    // 若玩家答錯（quizState === 'feedback' && lastAnswerCorrect === false），提示改由熊貓顯示，故橘子不顯示該提示
    if (!(quizState === 'feedback' && lastAnswerCorrect === false && pandaHintText)) {
      push();
      textSize(16);
      textAlign(CENTER, CENTER);
      const textW = textWidth(orangeText);
      const padding = 10;
      const boxW = textW + padding * 2;
      const boxH = textSize() + padding * 2;

      // 若正在作答且已經繪製作答區，將題目顯示在作答區的「下方」
      const gapBelowPrompt = 12; // 作答區與題目之間的間距（可調）
      let boxCenterY;
      if (quizState === 'asking' && lastPromptBoxBottom !== null) {
        // lastPromptBoxBottom 是作答區底部 Y（top + height）
        boxCenterY = lastPromptBoxBottom + gapBelowPrompt + boxH / 2;
      } else {
        // 預設行為：題目顯示在角色上方（避免被角色遮擋）
        const characterTop = baseY - (displayH7_current / 2);
        const marginAboveCharacter = 24; // 泡泡離角色頂端的間距（可調）
        boxCenterY = characterTop - boxH / 2 - marginAboveCharacter;
      }

      // 防止題目泡泡超出畫面底部
      const bottomPadding = 8;
      if (boxCenterY + boxH / 2 > height - bottomPadding) {
        boxCenterY = height - bottomPadding - boxH / 2;
      }
      // 防止超出畫面頂端（保險）
      const topPadding = 8;
      if (boxCenterY - boxH / 2 < topPadding) {
        boxCenterY = topPadding + boxH / 2;
      }

      // 繪製方框與文字
      fill('#fdf0d5');
      noStroke();
      rect(posX7_fixed - boxW / 2, boxCenterY - boxH / 2, boxW, boxH, 5);
      fill(0);
      text(orangeText, posX7_fixed, boxCenterY);
      pop();
    }
    
    if (frameW5q === 0) { // 延遲計算
      frameW5q = floor(sprite5qImg.width / TOTAL_FRAMES_5Q);
      frameH5q = sprite5qImg.height;
    }
    const idx5q = floor(frameCount / frameDelay) % TOTAL_FRAMES_5Q;
    const sx5q = idx5q * frameW5q;
    const sy5q = 0;
    const displayW5q = frameW5q * displayScale;
    const displayH5q = frameH5q * displayScale;

    push();
    translate(posX7_fixed, baseY);
    image(sprite5qImg, 0, 0, displayW5q, displayH5q, sx5q, sy5q, frameW5q, frameH5q);
    pop();
    }
  } else { // 遠離時，或角色正在倒下時
    // 如果只是剛從互動狀態離開，重置對話UI
    if (isInteracting) {
      isInteracting = false;
      inputBox.hide();
      // 離開時重置整個問答狀態
      resetQuiz();
    }
  }
  } // end if (!isOrangeStageCleared)

  // --- 統一繪製橘子角色 ---
  // 根據狀態（倒下、互動、正常）決定繪製哪個動畫
  // 註：互動動畫 (5q) 已在上面 if 區塊中繪製，此處不再重複
  if (isOrangeStageCleared) {
    // --- Brian 階段邏輯 ---
    const distBrian = abs(posX1 - posX7_fixed);
    
    // 判斷 Brian 面向：若玩家在左側，Brian 需翻轉面向左
    let brianFacing = 1;
    if (posX1 < posX7_fixed) {
      brianFacing = -1;
    }

    // 若 Brian 關卡已過，進入 cc 階段
    if (isBrianStageCleared) {
      const distCc = abs(posX1 - posX7_fixed);

      // --- cc 碰撞偵測 ---
      const cW_stand = (frameWCc > 0 ? frameWCc : 58) * (displayScale * 0.7);
      const cH_stand = (frameHCc > 0 ? frameHCc : 95) * (displayScale * 0.7);
      
      const playerHalfW = isPlaying4 ? (displayW * 0.9) / 2 : displayW / 2;
      const playerHalfH = displayH / 2;
      const targetHalfW = cW_stand / 2;
      const targetHalfH = cH_stand / 2;

      const isOverlappingCc = (abs(posX1 - posX7_fixed) < (playerHalfW + targetHalfW)) && 
                                 (abs(drawY - baseY) < (playerHalfH + targetHalfH));

      // 如果正在衝撞 (isPlaying4) 且碰到 cc，觸發倒下
      if (isPlaying4 && !isCcFalling && isOverlappingCc) {
        isCcFalling = true;
        ccFallTick = 0;
        isInteracting = false;
        if (inputBox) inputBox.hide();
        resetQuiz();
      }

      // 恢復機制：若 cc 倒下中，且玩家停止衝撞並靠近，則恢復站立
      if (isCcFalling && !isPlaying4 && distCc < interactionDistance) {
         isCcFalling = false;
         ccFallTick = 0;
         isInteracting = false;
      }

      if (isCcFalling) {
        // 狀態A：cc 倒下中 (顯示倒下動畫，不提問)
        if (spriteCcFallingImg && spriteCcFallingImg.width) {
            if (frameWCcFalling === 0) {
                frameWCcFalling = floor(spriteCcFallingImg.width / TOTAL_FRAMES_CC_FALLING);
                frameHCcFalling = spriteCcFallingImg.height;
            }
            const maxFrame = TOTAL_FRAMES_CC_FALLING - 1;
            const idx = constrain(floor(ccFallTick / fallDownDelay), 0, maxFrame);
            if (idx < maxFrame) ccFallTick++;
            
            const sx = idx * frameWCcFalling;
            const dw = frameWCcFalling * (displayScale * 0.7);
            const dh = frameHCcFalling * (displayScale * 0.7);
            push();
            translate(posX7_fixed, baseY);
            image(spriteCcFallingImg, 0, 0, dw, dh, sx, 0, frameWCcFalling, frameHCcFalling);
            pop();
        }
      } else if (distCc < interactionDistance) { // 狀態B：靠近且正常站立 (提問互動)
        isInteracting = true;
        // 若閒置中且還有題目，抽取新題目
        if (quizState === 'idle' && quizTable && quizTable.getRowCount() > 0) {
          pickNewQuestion();
        }

        // 繪製 cc 提問動畫
        if (spriteCcAskingImg && spriteCcAskingImg.width) {
          if (frameWCcAsking === 0) {
            frameWCcAsking = floor(spriteCcAskingImg.width / TOTAL_FRAMES_CC_ASKING);
            frameHCcAsking = spriteCcAskingImg.height;
          }
          const idx = floor(frameCount / frameDelay) % TOTAL_FRAMES_CC_ASKING;
          const sx = idx * frameWCcAsking;
          const dw = frameWCcAsking * (displayScale * 0.7);
          const dh = frameHCcAsking * (displayScale * 0.7);

          push();
          translate(posX7_fixed, baseY);
          image(spriteCcAskingImg, 0, 0, dw, dh, sx, 0, frameWCcAsking, frameHCcAsking);
          pop();
        }

        // --- 顯示題目與輸入框 (cc 版本) ---
        if (quizState === 'asking') {
          push();
          const promptText = "請作答：";
          const textInputWidth = inputBox.width;
          const padding = 10;
          textSize(16);
          const promptTextWidth = textWidth(promptText);
          const boxW = promptTextWidth + textInputWidth + padding * 2;
          const boxH = inputBox.height + padding;
          
          // 對齊 cc，並根據 cc 高度調整位置
          const boxX = posX7_fixed - boxW / 2;
          let ccH = 95 * (displayScale * 0.7); // 預設高度
          if (frameHCcAsking > 0) ccH = frameHCcAsking * (displayScale * 0.7);
          
          const ccTop = baseY - ccH / 2;
          const boxY = ccTop - boxH - 60; // 預留空間
          
          fill('#f0ebd8');
          noStroke();
          rect(boxX, boxY, boxW, boxH, 5);
          fill(0);
          textAlign(LEFT, CENTER);
          text(promptText, boxX + padding, boxY + boxH / 2);
          pop();
          lastPromptBoxBottom = boxY + boxH;
          inputBox.show();
          inputBox.position(boxX + padding + promptTextWidth, boxY + padding / 2);
        }

        // 顯示對話泡泡
        if (!(quizState === 'feedback' && lastAnswerCorrect === false && pandaHintText)) {
          push();
          textSize(16);
          textAlign(CENTER, CENTER);
          const textW = textWidth(orangeText);
          const padding = 10;
          const boxW = textW + padding * 2;
          const boxH = textSize() + padding * 2;
          let boxCenterY;
          if (quizState === 'asking' && lastPromptBoxBottom !== null) {
            boxCenterY = lastPromptBoxBottom + 12 + boxH / 2;
          } else {
            const ccH = (frameHCcAsking > 0 ? frameHCcAsking : 95) * (displayScale * 0.7);
            boxCenterY = baseY - (ccH / 2) - boxH / 2 - 24;
          }
          // 繪製泡泡 (省略邊界檢查以簡化，邏輯同上)
          fill('#fdf0d5'); noStroke(); rect(posX7_fixed - boxW / 2, boxCenterY - boxH / 2, boxW, boxH, 5); fill(0); text(orangeText, posX7_fixed, boxCenterY); pop();
        }
      } else { // 狀態C：遠離 cc (顯示等待動畫)
        if (isInteracting) { isInteracting = false; inputBox.hide(); resetQuiz(); }
        if (spriteCcImg && spriteCcImg.width) {
        if (frameWCc === 0) {
          frameWCc = floor(spriteCcImg.width / TOTAL_FRAMES_CC);
          frameHCc = spriteCcImg.height;
        }
        const idxCc = floor(frameCount / frameDelay) % TOTAL_FRAMES_CC;
        const sxCc = idxCc * frameWCc;
        // cc 尺寸較大，比照 Brian 進行縮放
        const displayWCc = frameWCc * (displayScale * 0.7);
        const displayHCc = frameHCc * (displayScale * 0.7);

        push();
        translate(posX7_fixed, baseY);
        image(spriteCcImg, 0, 0, displayWCc, displayHCc, sxCc, 0, frameWCc, frameHCc);
        pop();
      }
      }
    } else {
    
    // --- Brian 碰撞偵測 ---
    // 使用 Brian 站立時的尺寸估算 Hitbox (若未載入則給預設值)
    const bW_stand = (frameWBrian > 0 ? frameWBrian : 55) * (displayScale * 0.7);
    const bH_stand = (frameHBrian > 0 ? frameHBrian : 85) * (displayScale * 0.7);
    
    const playerHalfW = isPlaying4 ? (displayW * 0.9) / 2 : displayW / 2;
    const playerHalfH = displayH / 2;
    const targetHalfW = bW_stand / 2;
    const targetHalfH = bH_stand / 2;

    const isOverlappingBrian = (abs(posX1 - posX7_fixed) < (playerHalfW + targetHalfW)) && 
                               (abs(drawY - baseY) < (playerHalfH + targetHalfH));

    // 如果正在衝撞 (isPlaying4) 且碰到 Brian，觸發倒下
    if (isPlaying4 && !isBrianFalling && isOverlappingBrian) {
      isBrianFalling = true;
      brianFallTick = 0;
      isInteracting = false;
      if (inputBox) inputBox.hide(); // 隱藏輸入框
      resetQuiz(); // 重置問答
    }

    // 恢復機制：若 Brian 倒下中，且玩家停止衝撞並靠近，則恢復站立
    if (isBrianFalling && !isPlaying4 && distBrian < interactionDistance) {
       isBrianFalling = false;
       brianFallTick = 0;
       isInteracting = false;
    }

    // --- 繪製邏輯分流 ---
    if (isBrianFalling) {
      // 狀態A：Brian 倒下中 (顯示倒下動畫，不提問)
      if (spriteBrianFallingImg && spriteBrianFallingImg.width) {
        if (frameWBrianFalling === 0) {
          frameWBrianFalling = floor(spriteBrianFallingImg.width / TOTAL_FRAMES_BRIAN_FALLING);
          frameHBrianFalling = spriteBrianFallingImg.height;
        }
        const maxFrame = TOTAL_FRAMES_BRIAN_FALLING - 1;
        const idx = constrain(floor(brianFallTick / fallDownDelay), 0, maxFrame);
        if (idx < maxFrame) brianFallTick++;
        
        const sx = idx * frameWBrianFalling;
        const dw = frameWBrianFalling * (displayScale * 0.7);
        const dh = frameHBrianFalling * (displayScale * 0.7);
        push();
        translate(posX7_fixed, baseY);
        scale(brianFacing, 1); // 應用翻轉
        image(spriteBrianFallingImg, 0, 0, dw, dh, sx, 0, frameWBrianFalling, frameHBrianFalling);
        pop();
      }
    } else if (distBrian < interactionDistance) { // 狀態B：靠近且正常站立 (提問互動)
      isInteracting = true;
      // 若閒置中且還有題目，抽取新題目
      if (quizState === 'idle' && quizTable && quizTable.getRowCount() > 0) {
        pickNewQuestion();
      }

      // 繪製 Brian 提問動畫
      if (spriteBrianAskingImg && spriteBrianAskingImg.width) {
        if (frameWBrianAsking === 0) {
          frameWBrianAsking = floor(spriteBrianAskingImg.width / TOTAL_FRAMES_BRIAN_ASKING);
          frameHBrianAsking = spriteBrianAskingImg.height;
        }
        const idx = floor(frameCount / frameDelay) % TOTAL_FRAMES_BRIAN_ASKING;
        const sx = idx * frameWBrianAsking;
        const dw = frameWBrianAsking * (displayScale * 0.7);
        const dh = frameHBrianAsking * (displayScale * 0.7);

        push();
        translate(posX7_fixed, baseY);
        scale(brianFacing, 1); // 應用翻轉
        image(spriteBrianAskingImg, 0, 0, dw, dh, sx, 0, frameWBrianAsking, frameHBrianAsking);
        pop();
      }

      // --- 顯示題目與輸入框 (複製自橘子階段的 UI 邏輯) ---
      if (quizState === 'asking') {
        push();
        const promptText = "請作答：";
        const textInputWidth = inputBox.width;
        const padding = 10;
        textSize(16);
        const promptTextWidth = textWidth(promptText);
        const boxW = promptTextWidth + textInputWidth + padding * 2;
        const boxH = inputBox.height + padding;
        
        // 修改：將輸入框位置改為對齊提問者（Brian），並根據 Brian 高度調整位置
        const boxX = posX7_fixed - boxW / 2;
        let brianH = 85 * (displayScale * 0.7);
        if (frameHBrianAsking > 0) {
             brianH = frameHBrianAsking * (displayScale * 0.7);
        }
        const brianTop = baseY - brianH / 2;
        const boxY = brianTop - boxH - 60; // 預留 60px 給題目文字，避免擋住 Brian
        
        fill('#f0ebd8');
        noStroke();
        rect(boxX, boxY, boxW, boxH, 5);
        fill(0);
        textAlign(LEFT, CENTER);
        text(promptText, boxX + padding, boxY + boxH / 2);
        pop();
        lastPromptBoxBottom = boxY + boxH;
        inputBox.show();
        inputBox.position(boxX + padding + promptTextWidth, boxY + padding / 2);
      }

      // 顯示對話泡泡 (題目或回饋)
      if (!(quizState === 'feedback' && lastAnswerCorrect === false && pandaHintText)) {
        push();
        textSize(16);
        textAlign(CENTER, CENTER);
        const textW = textWidth(orangeText);
        const padding = 10;
        const boxW = textW + padding * 2;
        const boxH = textSize() + padding * 2;
        let boxCenterY;
        if (quizState === 'asking' && lastPromptBoxBottom !== null) {
          boxCenterY = lastPromptBoxBottom + 12 + boxH / 2;
        } else {
          // 根據 Brian 高度調整泡泡位置
          const brianH = (frameHBrianAsking > 0 ? frameHBrianAsking : 85) * (displayScale * 0.7);
          boxCenterY = baseY - (brianH / 2) - boxH / 2 - 24;
        }
        // 邊界檢查
        if (boxCenterY + boxH / 2 > height - 8) boxCenterY = height - 8 - boxH / 2;
        if (boxCenterY - boxH / 2 < 8) boxCenterY = 8 + boxH / 2;

        fill('#fdf0d5');
        noStroke();
        rect(posX7_fixed - boxW / 2, boxCenterY - boxH / 2, boxW, boxH, 5);
        fill(0);
        text(orangeText, posX7_fixed, boxCenterY);
        pop();
      }

    } else { // 狀態C：遠離 (等待動畫)
      // 遠離 Brian：顯示等待動畫
      if (isInteracting) {
        isInteracting = false;
        inputBox.hide();
        resetQuiz();
      }
      if (spriteBrianImg && spriteBrianImg.width) {
        if (frameWBrian === 0) {
          frameWBrian = floor(spriteBrianImg.width / TOTAL_FRAMES_BRIAN);
          frameHBrian = spriteBrianImg.height;
        }
        const idxBrian = floor(frameCount / frameDelay) % TOTAL_FRAMES_BRIAN;
        const sxBrian = idxBrian * frameWBrian;
        const displayWBrian = frameWBrian * (displayScale * 0.7);
        const displayHBrian = frameHBrian * (displayScale * 0.7);

        push();
        translate(posX7_fixed, baseY);
        scale(brianFacing, 1); // 應用翻轉
        image(spriteBrianImg, 0, 0, displayWBrian, displayHBrian, sxBrian, 0, frameWBrian, frameHBrian);
        pop();
      }
    } // end else (Brian logic)
    }
  } else if (isFallingDown) {
    // 狀態1：倒下
    drawFallingDownAnimation();
  } else if (!isInteracting && sprite7Img && sprite7Img.width) {
    // 狀態2：正常站立 (遠離時)
    if (frameW7 === 0) { // 延遲計算
      frameW7 = floor(sprite7Img.width / TOTAL_FRAMES_7);
      frameH7 = sprite7Img.height;
    }
    const idx7 = floor(frameCount / frameDelay) % TOTAL_FRAMES_7;
    const sx7 = idx7 * frameW7;
    const displayW7 = frameW7 * displayScale;
    const displayH7 = frameH7 * displayScale;

    push();
    translate(posX7_fixed, baseY);
    image(sprite7Img, 0, 0, displayW7, displayH7, sx7, 0, frameW7, frameH7);
    pop();
  } else if (!isInteracting && !sprite7Img) {
    // 備用：如果橘子圖片也沒載入，可以顯示一個提示
    push();
    fill(0);
    textAlign(CENTER);
    text('等待橘子角色載入...', posX7_fixed, baseY);
    pop();
  }

  // --- 繪製新的熊貓角色 ---
  // 根據與角色1的距離，決定要顯示哪一個熊貓動畫
  const pandaDist = abs(posX1 - pandaPosX_fixed);
  let currentPandaImg, currentPandaFrames, currentPandaFrameW, currentPandaFrameH;

  if (pandaDist < pandaInteractionDistance && spritePandaCloseImg) {
    // 狀態1: 靠近時，使用「接近」動畫
    currentPandaImg = spritePandaCloseImg;
    currentPandaFrames = TOTAL_FRAMES_PANDA_CLOSE;
    if (frameWPandaClose === 0) { // 延遲計算
      frameWPandaClose = currentPandaImg.width / currentPandaFrames;
      frameHPandaClose = currentPandaImg.height;
    }
    currentPandaFrameW = frameWPandaClose;
    currentPandaFrameH = frameHPandaClose;
  } else if (spritePandaImg) {
    // 狀態2: 遠離時，使用「吃東西」動畫
    currentPandaImg = spritePandaImg;
    currentPandaFrames = TOTAL_FRAMES_PANDA;
    if (frameWPanda === 0) { // 延遲計算
      frameWPanda = currentPandaImg.width / currentPandaFrames;
      frameHPanda = currentPandaImg.height;
    }
    currentPandaFrameW = frameWPanda;
    currentPandaFrameH = frameHPanda;
  }

  // 如果有可顯示的熊貓圖片，就繪製它
  if (currentPandaImg && currentPandaImg.width) {
    const pandaIdx = floor(frameCount / frameDelay) % currentPandaFrames;
    const pandaSx = pandaIdx * currentPandaFrameW;
    const displayWPanda = currentPandaFrameW * displayScale;
    const displayHPanda = currentPandaFrameH * displayScale;

    const pandaPosX = pandaPosX_fixed;
    const pandaPosY = baseY;

    let pandaFacing = 1; // 預設朝向
    if (posX1 > pandaPosX) {
      pandaFacing = -1; // 角色在右邊，熊貓朝右
    }

    push();
    translate(pandaPosX, pandaPosY);
    scale(pandaFacing, 1);
    image(currentPandaImg, 0, 0, displayWPanda, displayHPanda, pandaSx, 0, currentPandaFrameW, currentPandaFrameH);
    pop();

    // 若玩家答錯且有熊貓提示文字，則在熊貓上方顯示提示（熊貓為提示者）
    // 修改：移除距離判斷，答錯即顯示提示
    if (quizState === 'feedback' && lastAnswerCorrect === false && pandaHintText) {
      push();
      textSize(16);
      textAlign(CENTER, CENTER);
      const tW = textWidth(pandaHintText);
      const pad = 10;
      const bW = tW + pad * 2;
      const bH = textSize() + pad * 2;
      const bX = pandaPosX - bW / 2;
      // 回復原始：熊貓提示顯示在熊貓上方（與角色頂端保留 10px）
      const bTopY = pandaPosY - (displayHPanda_current / 2) - 10 - bH;
      fill('#fff7cc');
      noStroke();
      rect(bX, bTopY, bW, bH, 5);
      fill(0);
      text(pandaHintText, pandaPosX, bTopY + bH / 2);
      pop();
    }
  }

  // 最後繪製主要角色，確保它在所有物件的最上層
  push();
  // 主要角色繪製（使用 posX1）
  translate(posX1, drawY);
  scale(facing, 1); // 若 facing 為 -1，會水平翻轉
  // 使用 image 的裁切版本，因為我們已經 translate 到中心，使用 (0,0)
  // 注意：當 scale(-1,1) 時，影像仍以正寬度繪製，所以不須調整 sx
  image(currentImg, 0, 0, displayW, displayH, sx, sy, cw, ch);
  pop();

  // --- 繪製分數框 (左上角) ---
  push();
  fill(255, 220); // 微透明白底
  stroke(0);
  strokeWeight(2);
  rect(20, 20, 140, 50, 10);
  fill(0);
  noStroke();
  textSize(24);
  textAlign(LEFT, CENTER);
  text("分數: " + currentScore, 35, 45);
  pop();

  // --- 遊戲結束結算畫面 ---
  if (quizState === 'finished') {
    push();
    fill(0, 180); // 半透明遮罩
    rect(0, 0, width, height);
    
    rectMode(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(4);
    rect(width / 2, height / 2, 500, 350, 20);
    
    textAlign(CENTER, CENTER);
    noStroke();
    fill(0);
    textSize(40);
    text("遊戲結束", width / 2, height / 2 - 80);
    
    fill('#d00000');
    textSize(60);
    text("總分: " + currentScore, width / 2, height / 2 + 10);
    
    fill(0);
    textSize(24);
    let feedback = "";
    if (currentScore >= 50) feedback = "太神啦！你是知識王！";
    else if (currentScore >= 30) feedback = "表現不錯，繼續加油！";
    else feedback = "再接再厲，下次會更好！";
    text(feedback, width / 2, height / 2 + 100);
    pop();
    noLoop(); // 停止畫面更新
  }
} // end draw()

function drawFallingDownAnimation() {
  if (!sprite6dImg || !sprite6dImg.width) return; // 如果圖片未載入則不執行

  if (frameW6d === 0) { // 延遲計算
    frameW6d = floor(sprite6dImg.width / TOTAL_FRAMES_6D);
    frameH6d = sprite6dImg.height;
  }

  // 計算倒下動畫的影格，並用 constrain 讓它停在最後一格
  const maxFrameIndex6d = TOTAL_FRAMES_6D - 1;
  const idx6d = constrain(floor(fallDownTick / fallDownDelay), 0, maxFrameIndex6d);

  // 只有在動畫還沒播完時才增加計數器
  if (idx6d < maxFrameIndex6d) {
    fallDownTick++;
  }

  const sx6d = idx6d * frameW6d;
  const displayW6d = frameW6d * displayScale;
  const displayH6d = frameH6d * displayScale;

  push();
  translate(posX7_fixed, baseY);
  image(sprite6dImg, 0, 0, displayW6d, displayH6d, sx6d, 0, frameW6d, frameH6d);
  pop();
}

function handleInput() {
  const inputText = this.value().trim(); // 取得輸入框的內容並去除頭尾空白
  if (!inputText || quizState !== 'asking' || !currentQuestion) return;

  // 比較答案
  if (inputText === currentQuestion.getString('answer')) {
    // 答對了：維持在橘子上顯示正確回饋
    orangeText = currentQuestion.getString('correct_feedback');
    lastAnswerCorrect = true;
    correctAnswersCount++; // 增加答對計數
    currentScore += 10; // 答對加分
    pandaHintText = "";
  } else {
    // 答錯了：提示改由熊貓顯示，不要設到橘子上
    lastAnswerCorrect = false;
    currentScore -= 10; // 答錯扣分
    pandaHintText = currentQuestion.getString('hint');
  }

  answeredQuestionIndices.push(currentQuestionIndex); // 無論對錯都記錄此題已回答
  quizState = 'feedback'; // 進入回饋狀態
  this.value(''); // 清空輸入框
  inputBox.hide(); // 隱藏輸入框

  // 設定一個計時器，幾秒後自動抽下一題
  setTimeout(pickNewQuestion, 2500); // 2.5秒後出新題目
}

function pickNewQuestion() {
  if (!quizTable || quizTable.getRowCount() === 0) return;

  // 新增：檢查是否已完成 6 題 (橘子2 + Brian2 + cc2)
  if (answeredQuestionIndices.length >= 6) {
    quizState = 'finished';
    return;
  }

  // 新增：檢查是否已完成 4 題 (橘子2 + Brian2) -> 切換到 cc
  if (!isBrianStageCleared && answeredQuestionIndices.length >= 4) {
    isBrianStageCleared = true;
    resetQuiz();
    return;
  }

  // 檢查是否已答對兩題
  if (!isOrangeStageCleared && answeredQuestionIndices.length >= 2) {
    isOrangeStageCleared = true; // 標記關卡通過
    resetQuiz(); // 重置問答狀態（隱藏輸入框等）
    return; // 不再抽取新題目
  }

  // 清除上一題的回饋狀態
  lastAnswerCorrect = null;
  pandaHintText = "";

  // 過濾出尚未答對的題目索引
  let availableIndices = [];
  const totalRows = quizTable.getRowCount();
  for (let i = 0; i < totalRows; i++) {
    if (!answeredQuestionIndices.includes(i)) {
      availableIndices.push(i);
    }
  }

  // 從可用題目中隨機選一題
  const randomIndex = random(availableIndices);
  currentQuestionIndex = randomIndex; // 記錄當前索引
  currentQuestion = quizTable.getRow(randomIndex);
  // 更新對話文字為題目（仍由橘子發問)
  orangeText = currentQuestion.getString('question');
  quizState = 'asking';
}

// 新增：重置問答狀態（保證檔案不會在此處中斷，並清理 UI 狀態）
function resetQuiz() {
  quizState = 'idle';
  currentQuestion = null;
  orangeText = "要來點挑戰嗎?"; // 重設起始文字
  pandaHintText = "";
  lastAnswerCorrect = null;
  if (inputBox) {
    inputBox.hide();
    inputBox.value('');
  }
}
