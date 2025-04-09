let circles = [];
let introWindow; // 用於儲存自我介紹視窗的變數
let quizWindow; // 用於儲存測驗卷視窗的變數
let weekWindow; // 用於儲存第一周視窗的變數
let videoWindow; // 用於儲存教學影片視窗的變數
let dropdownVisible = false; // 用於控制下拉選單的顯示狀態
let menuVisible = false; // 用於控制選單的顯示狀態

function setup() {
  // 產生全視窗畫布
  createCanvas(windowWidth, windowHeight);

  // 建立選單
  let menu = createDiv();
  menu.id('menu');
  menu.style('position', 'absolute');
  menu.style('top', '10px');
  menu.style('left', '-200px'); // 初始位置在畫布外
  menu.style('width', '200px');
  menu.style('background-color', '#ffffff');
  menu.style('padding', '10px');
  menu.style('border-radius', '5px');
  menu.style('box-shadow', '0 2px 5px rgba(0, 0, 0, 0.2)');
  menu.style('transition', 'left 0.5s'); // 添加滑動動畫

  let ul = createElement('ul');
  ul.style('list-style', 'none');
  ul.style('margin', '0');
  ul.style('padding', '0');

  let items = ['自我介紹', '作品集', '測驗卷', '教學影片'];
  for (let item of items) {
    let li = createElement('li', item);
    li.style('margin', '100px 0'); // 每個選項之間的間隔設為 100px
    li.style('padding', '10px'); // 增加內部間距
    li.style('cursor', 'pointer');
    li.style('color', '#ffffff'); // 文字顏色為白色
    li.style('background-color', '#403d39'); // 背景顏色為 #403d39
    li.style('border', '1px solid #403d39'); // 邊框顏色為 #403d39
    li.style('border-radius', '10px'); // 圓角方框
    li.style('text-align', 'center'); // 文字置中
    li.style('text-decoration', 'none'); // 移除下劃線
    li.mousePressed(() => {
      if (item === '自我介紹') {
        showIntroWindow(); // 點擊自我介紹時顯示視窗
      } else if (item === '測驗卷') {
        showQuizWindow(); // 點擊測驗卷時顯示 iframe 視窗
      } else if (item === '作品集') {
        toggleDropdown(li); // 點擊作品集時顯示下拉選單
      } else if (item === '教學影片') {
        showVideoWindow('https://cfchen58.synology.me/%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%882024/B2/week3/20250303_104548.mp4'); // 點擊教學影片時顯示視窗
        alert(`${item} 被點擊了`);
      }
    });
    ul.child(li);
  }

  menu.child(ul);

  // 設定背景顏色#588157
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(30, 50),
      color: color(random(255), random(255), random(255)),
      sizeOffset: random(0, TWO_PI) // 用於大小變化的偏移值
    });
  }
}

function draw() {
  background('#b0c4b1');
  
  for (let circle of circles) {
    // 使用正弦函數讓大小隨時間變化
    let dynamicSize = map(sin(frameCount * 0.05 + circle.sizeOffset), -1, 1, 20, 80);
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.size + dynamicSize);
  }

  // 滑鼠移到左邊時顯示選單
  if (mouseX < 50 && !menuVisible) {
    let menu = select('#menu');
    menu.style('left', '0px'); // 選單滑出
    menuVisible = true;
  }

  // 滑鼠移到中間或右邊時隱藏選單
  if (mouseX > 200 && menuVisible) {
    let menu = select('#menu');
    menu.style('left', '-200px'); // 選單滑回
    menuVisible = false;
  }
}

// 顯示下拉選單
function toggleDropdown(parentLi) {
  // 如果下拉選單已存在，則移除
  if (dropdownVisible) {
    let dropdown = select('#dropdown');
    if (dropdown) dropdown.remove();
    dropdownVisible = false;
    return;
  }

  // 建立下拉選單
  let dropdown = createElement('ul');
  dropdown.id('dropdown');
  dropdown.style('list-style', 'none');
  dropdown.style('margin', '10px 0 0 0');
  dropdown.style('padding', '0');
  dropdown.style('background-color', '#ffffff');
  dropdown.style('border', '1px solid #ccc');
  dropdown.style('border-radius', '5px');
  dropdown.style('box-shadow', '0 2px 5px rgba(0, 0, 0, 0.2)');
  dropdown.style('position', 'absolute');
  dropdown.style('left', '10px');
  dropdown.style('top', `${parentLi.elt.offsetTop + parentLi.elt.offsetHeight}px`);

  // 定義下拉選單的 4 個子項目
  let subItems = ['第一周', '第二周', '第三周', 'Hackmd'];
  for (let subItem of subItems) {
    let subLi = createElement('li', subItem);
    subLi.style('margin', '5px 0');
    subLi.style('padding', '10px');
    subLi.style('cursor', 'pointer');
    subLi.style('color', '#403d39');
    subLi.style('background-color', '#f5f5f5');
    subLi.style('border-radius', '5px');
    subLi.style('text-align', 'center');
    subLi.style('text-decoration', 'none');
    subLi.mousePressed(() => {
      if (subItem === '第一周') {
        showWeekWindow('https://wei10144.github.io/0303/');
      } else if (subItem === '第二周') {
        showWeekWindow('https://wei10144.github.io/0310/');
      } else if (subItem === '第三周') {
        showWeekWindow('https://wei10144.github.io/3/');
      } else if (subItem === 'Hackmd') {
        showWeekWindow('https://hackmd.io/@weii05/SJMt_QZ01g');
      } else {
        alert(`${subItem} 被點擊了`);
      }
    });
    dropdown.child(subLi); // 將子項目附加到下拉選單
  }

  // 使用原生 DOM 方法將下拉選單附加到父元素
  parentLi.parent().elt.appendChild(dropdown.elt); // 修正這一行

  dropdownVisible = true;
}

// 顯示自我介紹視窗
function showIntroWindow() {
  if (introWindow) return;

  introWindow = createDiv('大家好，我叫郭冠緯，平常興趣玩LOL，喜歡聽西洋音樂');
  introWindow.style('position', 'absolute');
  introWindow.style('top', '50%');
  introWindow.style('left', '50%');
  introWindow.style('transform', 'translate(-50%, -50%)');
  introWindow.style('width', '1200px');
  introWindow.style('height', '800px');
  introWindow.style('background-color', 'rgba(0, 0, 0, 0.5)');
  introWindow.style('color', '#ffffff');
  introWindow.style('display', 'flex');
  introWindow.style('align-items', 'center');
  introWindow.style('justify-content', 'center');
  introWindow.style('font-size', '24px');
  introWindow.style('text-align', 'center');
  introWindow.style('border-radius', '10px');
  introWindow.style('z-index', '1000');
  introWindow.style('cursor', 'pointer');

  introWindow.mousePressed(() => {
    introWindow.remove();
    introWindow = null;
  });
}

// 顯示測驗卷視窗
function showQuizWindow() {
  if (quizWindow) return;

  quizWindow = createDiv();
  quizWindow.style('position', 'absolute');
  quizWindow.style('top', '50%');
  quizWindow.style('left', '50%');
  quizWindow.style('transform', 'translate(-50%, -50%)');
  quizWindow.style('width', '1200px');
  quizWindow.style('height', '800px');
  quizWindow.style('background-color', 'rgba(0, 0, 0, 0.5)');
  quizWindow.style('display', 'flex');
  quizWindow.style('align-items', 'center');
  quizWindow.style('justify-content', 'center');
  quizWindow.style('border-radius', '10px');
  quizWindow.style('z-index', '1000');
  quizWindow.style('cursor', 'pointer');

  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://wei10144.github.io/0310/');
  iframe.style('width', '100%');
  iframe.style('height', '100%');
  iframe.style('border', 'none');
  quizWindow.child(iframe);

  quizWindow.mousePressed(() => {
    quizWindow.remove();
    quizWindow = null;
  });
}

// 顯示第一周、第二周或第三周視窗
function showWeekWindow(url) {
  // 如果視窗已存在，則更新 iframe 的內容
  if (weekWindow) {
    let iframe = weekWindow.elt.querySelector('iframe'); // 使用原生 DOM 方法獲取 iframe
    if (iframe) {
      iframe.src = url; // 更新 iframe 的 src 屬性
    }
    return;
  }

  // 建立新的視窗
  weekWindow = createDiv();
  weekWindow.style('position', 'absolute');
  weekWindow.style('top', '50%');
  weekWindow.style('left', '50%');
  weekWindow.style('transform', 'translate(-50%, -50%)');
  weekWindow.style('width', '1200px');
  weekWindow.style('height', '800px');
  weekWindow.style('background-color', 'rgba(0, 0, 0, 0.5)');
  weekWindow.style('display', 'flex');
  weekWindow.style('align-items', 'center');
  weekWindow.style('justify-content', 'center');
  weekWindow.style('border-radius', '10px');
  weekWindow.style('z-index', '1000');
  weekWindow.style('cursor', 'pointer');

  // 建立 iframe 並嵌入網頁
  let iframe = document.createElement('iframe'); // 使用原生 DOM 方法創建 iframe
  iframe.src = url; // 設置 iframe 的 src 屬性
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  weekWindow.elt.appendChild(iframe); // 使用原生 DOM 方法將 iframe 添加到 weekWindow

  // 點擊視窗時關閉
  weekWindow.mousePressed(() => {
    weekWindow.remove();
    weekWindow = null;
  });
}

// 顯示教學影片視窗
function showVideoWindow(url) {
  // 如果視窗已存在，則更新 iframe 的內容
  if (videoWindow) {
    let iframe = videoWindow.elt.querySelector('iframe'); // 使用原生 DOM 方法獲取 iframe
    if (iframe) {
      iframe.src = url; // 更新 iframe 的 src 屬性
    }
    return;
  }

  // 建立新的視窗
  videoWindow = createDiv();
  videoWindow.style('position', 'absolute');
  videoWindow.style('top', '50%');
  videoWindow.style('left', '50%');
  videoWindow.style('transform', 'translate(-50%, -50%)');
  videoWindow.style('width', '1200px');
  videoWindow.style('height', '800px');
  videoWindow.style('background-color', 'rgba(0, 0, 0, 0.5)');
  videoWindow.style('display', 'flex');
  videoWindow.style('align-items', 'center');
  videoWindow.style('justify-content', 'center');
  videoWindow.style('border-radius', '10px');
  videoWindow.style('z-index', '1000');
  videoWindow.style('cursor', 'pointer');

  // 建立 iframe 並嵌入影片
  let iframe = document.createElement('iframe'); // 使用原生 DOM 方法創建 iframe
  iframe.src = url; // 設置 iframe 的 src 屬性
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  videoWindow.elt.appendChild(iframe); // 使用原生 DOM 方法將 iframe 添加到 videoWindow

  // 點擊視窗時關閉
  videoWindow.mousePressed(() => {
    videoWindow.remove();
    videoWindow = null;
  });
}
