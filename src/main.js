import * as THREE from 'three';
import './style.css';

const container = document.querySelector('#scene-container');
const objectName = document.querySelector('#object-name');

const scene = new THREE.Scene();
scene.background = new THREE.Color('#f5f1e8');

const camera = new THREE.PerspectiveCamera(
  38,
  container.clientWidth / container.clientHeight,
  0.1,
  100,
);
camera.position.set(0, 1.4, 7.5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const ambientLight = new THREE.HemisphereLight('#fffaf0', '#b6a68b', 2.2);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight('#fff7dc', 4.5);
keyLight.position.set(-3, 6, 4);
keyLight.castShadow = true;
scene.add(keyLight);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(5, 64),
  new THREE.MeshStandardMaterial({ color: '#e6dbc7', roughness: 1 }),
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.1;
floor.receiveShadow = true;
scene.add(floor);

const objects = [];

function addObject(name, geometry, color, position, rotation = [0, 0, 0]) {
  const material = new THREE.MeshToonMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  mesh.userData.baseY = position[1];
  mesh.userData.baseScale = 1;
  mesh.userData.phase = Math.random() * Math.PI * 2;
  scene.add(mesh);
  objects.push(mesh);
  return mesh;
}

addObject(
  '蓝色小球',
  new THREE.IcosahedronGeometry(0.82, 1),
  '#5d83a8',
  [-1.85, 0.1, 0.2],
  [0.2, 0.3, 0.1],
);
addObject(
  '黄色圆柱',
  new THREE.CylinderGeometry(0.72, 0.9, 1.65, 6),
  '#e4b84d',
  [0, 0.1, -0.25],
  [0, 0.4, 0],
);
addObject(
  '粉色甜甜圈',
  new THREE.TorusGeometry(0.78, 0.28, 12, 32),
  '#df8a83',
  [1.9, 0.3, 0.15],
  [0.4, -0.2, 0.45],
);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(10, 10);
let hoveredObject = null;
let selectedObject = null;
const clock = new THREE.Clock();

function updatePointer(event) {
  const bounds = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
}

function updateHover() {
  raycaster.setFromCamera(pointer, camera);
  const [intersection] = raycaster.intersectObjects(objects);
  const nextObject = intersection?.object ?? null;

  if (hoveredObject && hoveredObject !== nextObject) {
    hoveredObject.userData.baseScale = 1;
  }
  hoveredObject = nextObject;

  if (hoveredObject) {
    objectName.textContent = `${hoveredObject.name} · 点击我`;
    container.style.cursor = 'pointer';
  } else {
    objectName.textContent = selectedObject
      ? `${selectedObject.name} · 已选中`
      : '等待你的探索';
    container.style.cursor = 'default';
  }
}

function selectObject() {
  if (!hoveredObject) return;
  selectedObject = hoveredObject;
  objectName.textContent = `${selectedObject.name} · 已选中`;
}

function animate() {
  const elapsed = clock.getElapsedTime();

  objects.forEach((object, index) => {
    object.rotation.y += 0.004 + index * 0.001;
    object.position.y = object.userData.baseY + Math.sin(elapsed * 1.3 + object.userData.phase) * 0.08;
    const targetScale = object === hoveredObject || object === selectedObject ? 1.12 : 1;
    object.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
  });

  camera.position.x += (pointer.x * 0.35 - camera.position.x) * 0.025;
  camera.position.y += (1.4 - pointer.y * 0.15 - camera.position.y) * 0.025;
  camera.lookAt(0, 0, 0);

  updateHover();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function resize() {
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

container.addEventListener('pointermove', updatePointer);
container.addEventListener('pointerleave', () => {
  pointer.set(10, 10);
});
container.addEventListener('click', selectObject);
window.addEventListener('resize', resize);

animate();
