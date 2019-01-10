/* Stops howlers default auto unlock as it isn't needed with the sites design having 
   a user interaction before music starts. */
Howler.autoUnlock = false;

// Wait for the page to finish loading before executing the scripts inside this.
$(function () {
    // If the user has previously left the site in a muted state restore this muted state.
    if (localStorage.getItem('mute') === 'true') {
        Howler.mute(true);
        $('#mute').addClass('muted');
    }

    $('body').on('click', '#enter', function (e) {
        $("#entry").fadeOut(500);
        $("#site").fadeIn(500, function () {
            /* Once the user has clicked enter we can then start loading audio 
               since a user interaction has been made. */
            audioScroll();
        });
    })

    $('body').on('click', '#mute', function (e) {
        e.preventDefault();
        var that = $(this);
        // Toggle the current state of mute.
        Howler.mute(!that.hasClass('muted'));
        // Store the toggled state in case of refresh or re-visit.
        localStorage.setItem('mute', !that.hasClass('muted'));
        // Update the mute icon accordingly.
        that.toggleClass('muted');
    })

    $('body').on('click', '.hamburger-toggle', function (e) {
        //Stop all defualt behaviours and any further scripts.
        e.preventDefault();
        e.stopPropagation();

        if ($('.hamburger-menu').is(":checked")) {
            // Menu is already open so close it.
            hideMenuIfVisible();
        } else {
            /* Open the menu and apply the click handlers the make it function
               and close when clicked off. */
            $('.hamburger-menu').prop('checked', true);
            $('html').on('click', hideMenuIfVisible);
            $('nav').on('click', navClick);
        }
    })

    $('body').on('change', '.category', function () {
        // If menu item has been opened make sure all siblings are closed.
        if (this.checked)
            $(this).parent().siblings().find('.category').prop('checked', false);
    });

    function hideMenuIfVisible() {
        if ($('.hamburger-menu').is(":checked")) {
            $('.hamburger-menu, nav input[type="checkbox"]').prop('checked', false);
            $('html').off('click', hideMenuIfVisible);
            $('nav').off('click', navClick);
        }
    }
    function navClick(e) {
        //This will stop the close script which is bound to the html from firing.
        e.stopPropagation();
        var target = $(e.target);
        // If the user has clicked on the link scroll to it's point in the page and close the menu.
        if (target.is('a[href^="#"]')) {
            hideMenuIfVisible();
            $('html, body').animate({
                scrollTop: $(target.attr('href')).offset().top - $('#header').outerHeight()
            }, 500);
        }
    }

    // Shoe Customizer
    /* Upon clicking a new album artwork get the shoe artwork from the data attribute
       set the shoe picture to this artwork, get the album name from the alt attribute
       and set the heading under the image to that, then save their selection into
       local storage so the on site referesh or re-visit they are presented with 
       their selected shoe. */
    $('body').on('click', '[data-shoe]', function (e) {
        var that = $(this);
        $('#shoe img').attr('src', 'Content/shoes/' + that.data('shoe'));
        $('#shoe h3').text(that.attr('alt'));
        localStorage.setItem('shoe', that.data('shoe'))
    });

    // If they have previously selected a shoe, trigger the selection.
    if (localStorage.getItem('shoe'))
        $('[data-shoe="' + localStorage.getItem('shoe') + '"]').click();


    //Start Region Scrolling Music Playback

    var currentSection;
    //Pull all the sections with attached music from the page.
    var sections = $('[data-music]');
    // Generate new instance of howler.js Howl for each distinct track
    for (var index = 0; index < sections.length; index++) {
        new Howl({
            /* Auto load the first howls media since it will be the first to need playing,
               not loading the rest will help prevent serious page hang */
            preload: index === 0,
            src: "Content/music/" + $(sections[index]).data('music'),
            loop: true,
            volume: 0,
            autoplay: false,
            onfade: function (id) {
                // If the track is faded out it will reach volume 0, then pause as to not loose track position.
                if (this._volume === 0) {
                    this.pause();
                }
            }
        });
    }

    function audioScroll(e) {
        /* Get the users current scroll position as if the bottom of the header where
           the top of the page with a few extra px to help lead-in to new sections. 
           Putting it here prevents it from being re-calculated in every loop. */
        var scrollPosition = $(document).scrollTop() + $('#header').outerHeight() + 2;

        var hasMusic = false;
        for (var index = 0; index < sections.length; index++) {
            var element = $(sections[index]);
            // Simple bounds to check if the current element is envloping the scrollPosition.
            if (scrollPosition >= element.offset().top && scrollPosition < (element.offset().top + element.outerHeight())) {
                hasMusic = true;
                // Check if we where already in this section before scrolling. If not change to this sections music.
                if (currentSection !== index) {
                    currentSection = index;
                    $.each(Howler._howls, function (key, howl) {
                        if (key === index) {
                            if (howl._state === "unloaded")
                                howl.load();
                            /* Fade this Howl in using it's current volume to determine the length of the
                               fade in so if it was mid fade out the fade back it will be smooth and at it's
                               normal rate  */
                            howl.fade(howl._volume, 1, 500 * (1 - howl._volume))
                            /* If the Howl is paused which it will be in most cases (unless it was mid fade out),
                               play it. */
                            if (howl._sounds[0] && howl._sounds[0]._paused) {
                                howl.play();
                            }
                        } else {
                            /* Preemptively load the next Howl before scrolling to itm if it hasn't been loaded yet.
                               Doing this should allow tracks to be loaded only just before they are needed
                               saving bandwidth and improving speed. */
                            if (key === index + 1 && howl._state === "unloaded")
                                howl.load();

                            /* If this Howl isn't muted fade it's volume to 0 which will then auto
                               trigger it to pause once the fade is finished.
                               Incase the Howl is already mid fade, fade from it's current volume accounting
                               for how far it is into the fade for how much time it will take to have the same
                               smooth rate of fade. */
                            if (howl._volume !== 0)
                                howl.fade(howl._volume, 0, 500 * howl._volume);
                        }
                    });

                }
                break;
            }
        }
        /* If the user is in a section without music check if they where not already in a section without music,
           then if there where not fade out all playing music. */
        if (!hasMusic && currentSection !== -1) {
            currentSection = -1;
            if (Howler.state = "running") {
                $.each(Howler._howls, function (key, howl) {
                    if (howl._volume !== 0)
                        howl.fade(howl._volume, 0, 500 * howl._volume);
                });
            }
        }

    }

    /* This function detect when the user has finished scrolling before firing the audio change event,
       this prevents the change audio event from getting bombarded with change requests while scrolling quickly.  */
    $(window).scrollEnd(audioScroll, 100);
});

$.fn.scrollEnd = function (callback, timeout) {
    $(this).scroll(function () {
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
};

//End Region Scrolling Music Playback