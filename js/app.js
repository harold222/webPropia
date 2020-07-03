$(document).ready(function () {

  // path sw
  const url = window.location.href;
  const swLocation = '/webPropia/sw.js';

    if(navigator.serviceWorker){

      if(url.includes("localhost")) swLocation = '/sw.js';
      
      navigator.serviceWorker.register(swLocation);
    }

    new WOW().init();

    particlesJS(
        {
            "particles": {
              "number": {
                "value": 30,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              "color": {
                "value": "#cae123"
              },
              "shape": {
                "type": "circle",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "img/github.svg",
                  "width": 100,
                  "height": 100
                }
              },
              "opacity": {
                "value": 1,
                "random": true,
                "anim": {
                  "enable": true,
                  "speed": 1,
                  "opacity_min": 0,
                  "sync": false
                }
              },
              "size": {
                "value": 5,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 4,
                  "size_min": 0.3,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 600
                }
              }
            },
            "interactivity": {
              "detect_on": "canvas",
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "bubble"
                },
                "onclick": {
                  "enable": true,
                  "mode": "repulse"
                },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 400,
                  "line_linked": {
                    "opacity": 1
                  }
                },
                "bubble": {
                  "distance": 250,
                  "size": 0,
                  "duration": 2,
                  "opacity": 0,
                  "speed": 3
                },
                "repulse": {
                  "distance": 400,
                  "duration": 0.4
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            },
            "retina_detect": true
          }
    );

    let btns = $('.project-area .button-group button');

    btns.click(function(e){
        $('.project-area .button-group button').removeClass('active');
        e.target.classList.add("active");

        let selector = $(e.target).attr('data-filter');
        $('.project-area .grid').isotope({
            filter: selector
        });

        return false;
    });

    $('.project-area .button-group #btn-1').trigger('click');

    $('.project-area .grid .test-popup-link').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    let nav_offset_top = $('.header_area').height() + 50;

    function navbarFixed() {
        if($('.header_area').length){
            $(window).scroll(function() {
                let scroll = $(window).scrollTop();
                if(scroll >= nav_offset_top){
                    $('.header_area .main-menu').addClass('navbar_fixed');
                    $('.ctn_pre_header').show();
                  }else{
                    $('.header_area .main-menu').removeClass('navbar_fixed');
                    $('.ctn_pre_header').hide();
                }
            });
        }
    }

    navbarFixed();

    //--------Parte boton ir arriba--------------
    window.onscroll = function () {
        if(document.documentElement.scrollTop > 150){
            document.querySelector('.ir-arriba')
            .classList.add('show');
        }else{
            document.querySelector('.ir-arriba')
            .classList.remove('show');
        }
    }

    document.querySelector('.ir-arriba').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // -----------Boton dark---------------
    const DarkOrWhite = document.querySelector('#darkMode');

    DarkOrWhite.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        //$("body").css("background-image", "url('img/banner/home-banner-dark.svg')");

        $("body").toggleClass("dark_theme");

        DarkOrWhite.classList.toggle('encender');

        if($(this).attr("estado") === 0){
          $(this).attr("estado", 1);
          $(".white_col").attr("stop-color", "rgba(255,255,255,0)");
        }else{
          $(this).attr("estado", 0);
          $(".white_col").attr("stop-color", "rgba(0,0,0,0)");
        }

     });

});
