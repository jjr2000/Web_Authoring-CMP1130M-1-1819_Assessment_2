$('body').on('click', '.hamburger-toggle', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($('.hamburger-menu').is(":checked")) {
        hideMenuIfVisible();
    } else {
        $('.hamburger-menu').prop('checked', true);
        $('html').on('click', hideMenuIfVisible);
        $('nav').on('click', stopPropagation);
    }
})

$('body').on('change', '.category', function () {
    if (this.checked)
        $(this).parent().siblings().find('.category').prop('checked', false);
});

function hideMenuIfVisible() {
    if ($('.hamburger-menu').is(":checked")) {
        $('.hamburger-menu, nav input[type="checkbox"]').prop('checked', false);
        $('html').off('click', hideMenuIfVisible);
        $('nav').off('click', stopPropagation);
    }
}
function stopPropagation(e) {
    e.stopPropagation();
}







//Three js shoe loader

// var container, stats;
// var camera, scene, renderer;
// var windowHalfX = window.innerWidth / 4;
// var windowHalfY = window.innerHeight / 4;
// init();
// animate();
// function init() {
//     container = $(".three-container")[0]
//     document.body.appendChild(container);
//     camera = new THREE.PerspectiveCamera(45, (window.innerWidth / 2) / (window.innerHeight / 2), 1, 2000);
//     camera.position.z = 100;
//     // scene
//     scene = new THREE.Scene();

//     scene.background = new THREE.Color( 0xE8E8E8 );

//     var ambientLight = new THREE.AmbientLight(0xcccccc, 1);
//     scene.add(ambientLight);

//     var pointLight = new THREE.PointLight(0xffffff, 0.4);
//     camera.add(pointLight);
//     scene.add(camera);
//     // model
//     var onProgress = function (xhr) {
//         if (xhr.lengthComputable) {
//             var percentComplete = xhr.loaded / xhr.total * 100;
//             console.log(Math.round(percentComplete, 2) + '% downloaded');
//         }
//     };
//     var onError = function () { };
//      new THREE.MTLLoader()
//          .setPath('Content/assets/')
//          .load('shoe.mtl', function (materials) {
//              materials.preload();
//             new THREE.OBJLoader()
//                 .setMaterials(materials)
//                 .setPath('Content/assets/')
//                 .load('shoe.obj', function (object) {
//                     object.position.y = 0;
//                     scene.add(object);
//                 }, onProgress, onError);
//          });
    
//     renderer = new THREE.WebGLRenderer();
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
//     container.appendChild(renderer.domElement);

//     controls = new THREE.OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.25;
//     controls.enableZoom = false;
//     //
//     window.addEventListener('resize', onWindowResize, false);
// }
// function onWindowResize() {
//     windowHalfX = window.innerWidth / 4;
//     windowHalfY = window.innerHeight / 4;
//     camera.aspect = (window.innerWidth / 2) / (window.innerHeight / 2);
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
// }

// function animate() {
//     requestAnimationFrame(animate);
//     render();
// }
// function render() {
//     renderer.render(scene, camera);
// }