var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
});
// default bg canvas color //
// renderer.setClearColor(0x000000);
// renderer.background();

//  use device aspect ratio //
renderer.setPixelRatio(window.devicePixelRatio);
// set size of canvas within window //
renderer.setSize(window.innerWidth, window.innerHeight);

var scene = new THREE.Scene();
const loader = new THREE.TextureLoader();
// loader.load('https://images.pexels.com/photos/6985132/pexels-photo-6985132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' , function(texture)
//             {
//              scene.background = texture;
//             });
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 12, 12);
  // const material = new THREE.MeshStandardMaterial({ color: 0x620462 });
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  star.position.set(
    THREE.Math.randFloatSpread(150),
    THREE.Math.randFloatSpread(150),
    THREE.Math.randFloatSpread(150)
  );
  scene.add(star);
}

for (var i = 0; i < 100; i++) {
  addStar();
}


//OLD CODE
// const star = new THREE.Mesh(geometry, material);
// const [x, y, z] = Array(3)
//   .fill()
//   .map(() => THREE.Math.randFloatSpread(150));
// star.position.set(x, y, z);
// scene.add(star);
// scene.add(star);
// scene.add(star);
// scene.add(star);
// }

// Array(100).fill().forEach(addStar);
// Array(100).fill().forEach(addStar);


if (window.innerWidth < 900) {
  var sphere_geometry = new THREE.SphereGeometry(0.05, 84, 84);
} else {
  var sphere_geometry = new THREE.SphereGeometry(1, 84, 84);
}

var material = new THREE.MeshNormalMaterial();

var sphere = new THREE.Mesh(sphere_geometry, material);
scene.add(sphere);
sphere.position.x = 2;
sphere.position.z = -5;
if (window.innerWidth < 900) {
  sphere.position.set(0, 0, 0);
}
var update = function () {
  // change '0.003' for more aggressive animation
  var time = performance.now() * 0.003;
  //console.log(time)
  //go through vertices here and reposition them
  // change 'k' value for more spikes
  var k = 3;
  for (var i = 0; i < sphere.geometry.vertices.length; i++) {
    var p = sphere.geometry.vertices[i];
    p.normalize().multiplyScalar(
      1 + 0.3 * noise.perlin3(p.x * k + time, p.y * k, p.z * k)
    );
  }
  sphere.geometry.computeVertexNormals();
  sphere.geometry.normalsNeedUpdate = true;
  sphere.geometry.verticesNeedUpdate = true;
};

function animate() {
  //sphere.rotation.x += 0.01;
  //sphere.rotation.y += 0.01;

  update();
  /* render scene and camera */
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  sphere.rotation.x += 0.05;
  sphere.rotation.y += 0.075;
  sphere.rotation.z += 0.05;
  // logo.rotation.y += 0.01;
  // logo.rotation.z += 0.01;
  if (window.innerWidth > 900) {
    camera.position.z = t * -0.001;
    camera.position.x = t * -0.0015;
    camera.rotation.y = t * -0.0002;
  }
}

document.body.onscroll = moveCamera;
moveCamera();

requestAnimationFrame(animate);

// Button

var animateButton = function (e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove("animate");

  e.target.classList.add("animate");
  setTimeout(function () {
    e.target.classList.remove("animate");
  }, 700);
};

// var bubblyButtons = document.getElementsByClassName("bubbly-button");

// for (var i = 0; i < bubblyButtons.length; i++) {
//   bubblyButtons[i].addEventListener("click", animateButton, false);
// }

document.addEventListener("DOMContentLoaded", function () {
  el_autohide = document.querySelector(".autohide");

  navbar_height = document.querySelector(".navbar").offsetHeight;
  document.body.style.paddingTop = navbar_height + "px";

  if (el_autohide) {
    var last_scroll_top = 0;
    window.addEventListener("scroll", function () {
      let scroll_top = window.scrollY;
      if (scroll_top < last_scroll_top) {
        el_autohide.classList.remove("scrolled-down");
        el_autohide.classList.add("scrolled-up");
      } else {
        el_autohide.classList.remove("scrolled-up");
        el_autohide.classList.add("scrolled-down");
      }
      last_scroll_top = scroll_top;
    });
  }
});

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// $(".owl-carousel").owlCarousel({
//   loop: true,
//   margin: 10,
//   nav: true,
//   responsive: {
//     0: {
//       items: 1,
//     },
//     600: {
//       items: 3,
//     },
//     1000: {
//       items: 5,
//     },
//   },
// });

//MENU

function toggleMenu() {
  const hamburgur = document.querySelector(".fa-bars");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay-mobile"); // Removed incorrect class selector notation

  if (mobileMenu.style.display === "none" || mobileMenu.style.display === "") {
    mobileMenu.style.display = "flex";
    overlay.style.display = "block";
  } else {
    mobileMenu.style.display = "none";
    overlay.style.display = "none"; // Hide overlay when menu is closed
  }
}

function closeMenu() {
  const hamburgur = document.querySelector(".fa-bars");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay-mobile"); // Removed incorrect class selector notation
  console.log("object");

  if (mobileMenu.style.display === "flex") { // Corrected comparison operator
    mobileMenu.style.display = "none";
    overlay.style.display = "none"; // Hide overlay when menu is closed
  }
}