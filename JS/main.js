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

if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}
var container = $(".three-container")[0];
var camera, controls, scene, renderer;
var lighting, ambient, keyLight, fillLight, backLight;
init();
animate();
function init() {
    /* Camera */
    camera = new THREE.PerspectiveCamera(45, (window.innerWidth / 2) / (window.innerHeight / 2), 1, 1000);
    camera.position.z = 3;
    /* Scene */
    scene = new THREE.Scene();
    lighting = false;
    ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);
    keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);
    fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);
    backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();
    /* Model */
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setBaseUrl('Content/assets/');
    mtlLoader.setPath('Content/assets/');
    mtlLoader.load('ConverseSneakers.mtl', function (materials) {
        materials.preload();
        materials.materials.default.map.magFilter = THREE.NearestFilter;
        materials.materials.default.map.minFilter = THREE.LinearFilter;
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('Content/assets/');
        objLoader.load('ConverseSneakers.obj', function (object) {
            scene.add(object);
        });
    });
    /* Renderer */
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));
    container.appendChild(renderer.domElement);
    /* Controls */
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    /* Events */
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('keydown', onKeyboardEvent, false);
}
function onWindowResize() {
    camera.aspect = (window.innerWidth / 2) / (window.innerHeight / 2);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
}
function onKeyboardEvent(e) {
    if (e.code === 'KeyL') {
        lighting = !lighting;
        if (lighting) {
            ambient.intensity = 0.25;
            scene.add(keyLight);
            scene.add(fillLight);
            scene.add(backLight);
        } else {
            ambient.intensity = 1.0;
            scene.remove(keyLight);
            scene.remove(fillLight);
            scene.remove(backLight);
        }
    }
}
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}
function render() {
    renderer.render(scene, camera);
}