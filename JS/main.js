$('body').on('click', '.hamburger-toggle', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($('.hamburger-menu').is(":checked")) {
        hideMenuIfVisible();
    } else {
        $('.hamburger-menu').prop('checked', true);
        $('html').on('click', hideMenuIfVisible);
        $('nav').on('click', navClick);
    }
})

$('body').on('change', '.category', function () {
    if (this.checked)
        $(this).parent().siblings().find('.category').prop('checked', false);
});

$('body').on('click', 'nav a', function () {
    alert('clicked');
});

function hideMenuIfVisible() {
    if ($('.hamburger-menu').is(":checked")) {
        $('.hamburger-menu, nav input[type="checkbox"]').prop('checked', false);
        $('html').off('click', hideMenuIfVisible);
        $('nav').off('click', navClick);
    }
}
function navClick(e) {
    e.stopPropagation();
    var target = $(e.target)
    if (target.is('a[href^="#"]')) {
        hideMenuIfVisible()
        $('html, body').animate({
            scrollTop: $(target.attr('href')).offset().top - $('#header').outerHeight()
        }, 500);
    }
}



var sections = $('[data-music]');

//preload
for (var index = 0; index < sections.length; index++) {
    new Howl({
        preload: true,
        src: "Content/music/" + $(sections[index]).data('music'),
        loop: true,
        volume: 0,
        autoplay: false,
        pos: 0,
        onfade: function (id) {
            if (this._volume === 0)
                this.pause();
        }
    });
}

function audioScroll(e) {
    //alert($(document).scrollTop());
    var scrollPos = $(document).scrollTop() + $('#header').outerHeight()

    var success = false;
    for (var index = 0; index < sections.length; index++) {
        var element = $(sections[index]);
        if (scrollPos >= element.offset().top && scrollPos < (element.offset().top + element.outerHeight())) {
            success = true;
            if (currentSection !== index) {
                currentSection = index;
                $.each(Howler._howls, function (key, howl) {
                    if (key === index) {
                        existingHowl = true;
                        if (howl._volume !== 1)
                            howl.fade(howl._volume, 1, 500 * (1 - howl._volume))
                        if (howl._sounds[0] && howl._sounds[0]._paused) {
                            howl.play();
                        }
                    } else {
                        if (howl._volume !== 0)
                            howl.fade(howl._volume, 0, 500 * howl._volume);
                    }
                });

                if (!existingHowl) {
                    var newClip = new Howl({
                        preload: true,
                        src: "Content/music/" + element.data('music'),
                        loop: true,
                        volume: 0,
                        autoplay: false,
                        pos: 0,
                        onfade: function (id) {
                            if (this._volume === 0)
                                this.pause();
                        }
                    });
                    newClip.fade(0, 1, 500);
                    newClip.play();
                }
            }
            break;
        }
    }
    if (!success && currentSection !== -1) {
        currentSection = -1;
        if (Howler.state = "running") {
            $.each(Howler._howls, function (key, howl) {
                if (howl._volume !== 0)
                    howl.fade(howl._volume, 0, 5000 * howl._volume);
            });
        }
    }

}

audioScroll();
document.addEventListener('scroll', audioScroll);



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