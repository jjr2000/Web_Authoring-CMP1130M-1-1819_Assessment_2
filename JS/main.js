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





if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var container, stats;
var camera, controls, scene, renderer;
var cross;

function init() {
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1e10 );
    camera.position.z = 6;

    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 5;
    controls.panSpeed = 2;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    scene = new THREE.Scene();
    scene.add( camera );

    var sphereMaterial =
          new THREE.MeshLambertMaterial(
            {
              color: 0xCC0000
            });

    // light

    var dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 200, 200, 1000 ).normalize();

    camera.add( dirLight );
    camera.add( dirLight.target );

    var loader = new THREE.VRMLLoader();
    loader.addEventListener( 'load', function ( event ) {
        var object = event.content; 
        object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                //child.material.map = texture;
                //child.material = sphereMaterial;
                child.material.side = THREE.DoubleSide;
              }
           } );

        scene.add(object);

    } );
    loader.load( "JS/three.js/examples/models/vrml/house.wrl" );

    // renderer

    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.setSize(200, 200);
    document.getElementById("threewindow").appendChild(renderer.domElement);
//              container = document.createElement( 'div' );
//              document.body.appendChild( container );
//              container.appendChild( renderer.domElement );

//              stats = new Stats();
//              stats.domElement.style.position = 'absolute';
//              stats.domElement.style.top = '0px';
//              container.appendChild( stats.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    animate();
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    controls.handleResize();

}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
    //stats.update();
}

init();