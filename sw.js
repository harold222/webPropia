//
importScripts('js/sw.utils.js');

const cacheEstatico = 'static-v2',
    cacheDinamico = 'dynamic-v1',
    cacheInmutable = 'inmutable-v1';

const app_shell = [
    // '/',
    'index.html',
    'css/animaciones.css',
    'css/medias.css',
    'css/style.css',
    'img/favicon.ico',
    'img/portfolio/p1.jpg',
    'img/portfolio/p2.jpg',
    'img/portfolio/p3.jpg',
    'img/portfolio/p4.jpg',
    'img/portfolio/p5.jpg',
    'img/portfolio/p6.jpg',
    'img/portfolio/p7.jpg',
    'img/portfolio/p8.jpg',
    'img/portfolio/p9.jpg',
    'img/banner/banner-image.png',
    'js/animacionPalabras.js',
    'js/app.js',
    'js/sw.utils.js'
];

const app_shell_inmutable = [
    'https://fonts.googleapis.com/css?family=Roboto&display=swap',
    'https://kit.fontawesome.com/8612f68d80.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
    'css/animate.css',
    'js/Magnific-Popup-master/dist/magnific-popup.css',
    'https://code.jquery.com/jquery-3.4.1.slim.min.js',
    'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js',
    'js/particles.js',
    'js/isotope.js',
    'js/wow.min.js',
    'js/Magnific-Popup-master/dist/jquery.magnific-popup.min.js'
];

self.addEventListener('install', e => {

    const static = caches.open(cacheEstatico).then(cache => cache.addAll(app_shell));

    const inmutable = caches.open(cacheInmutable).then(cache => cache.addAll(app_shell_inmutable));

    e.waitUntil(Promise.all([static, inmutable]));
});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {
        keys.forEach( key => {
            if (  key !== cacheEstatico && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== cacheDinamico && key.includes('dynamic') ) {
                return caches.delete(key);
            }
        });
    });

    e.waitUntil( respuesta );
});

self.addEventListener('fetch', e => {

    const respuesta = caches.match(e.request).then(res => {
        if(res)
            return res;
        else{
            return fetch(e.request).then(newResp => {
                return actualizarCacheDinamico(cacheDinamico, e.request, newResp);
            });
        }
    })

    e.respondWith(respuesta);
});








