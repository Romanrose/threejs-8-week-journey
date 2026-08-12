import './style.css';

const button = document.querySelector('#change-message');
const title = document.querySelector('#demo-title');
const text = document.querySelector('#demo-text');
const hint = document.querySelector('#interaction-hint');
const objectName = document.querySelector('#object-name');
const demo = document.querySelector('.lesson-demo');

const messages = [
  ['你好，网页。', '这是一个用 HTML、CSS 和 JavaScript 做出来的小练习。'],
  ['你做到了！', '按钮事件改变了页面内容，这就是交互的起点。'],
  ['继续探索。', '下一步，我们会把这些基础带进 Three.js 的 3D 世界。'],
];
let messageIndex = 0;

button.addEventListener('click', () => {
  messageIndex = (messageIndex + 1) % messages.length;
  const [nextTitle, nextText] = messages[messageIndex];
  title.textContent = nextTitle;
  text.textContent = nextText;
  objectName.textContent = `JavaScript · 交互 ${messageIndex + 1}`;
  hint.textContent = '做得很好，再点击一次试试';
  demo.classList.toggle('is-active');
});
