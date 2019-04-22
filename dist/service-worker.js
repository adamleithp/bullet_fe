importScripts("/precache-manifest.11f82351b5395a9b6c75fbd5e6e10fd1.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* eslint-disable no-console */
/* eslint-disable no-undef */
if (workbox) {
    console.log(`Workbox is loaded`);

    workbox.precaching.precacheAndRoute(self.__precacheManifest);
}
else {
    console.log(`Workbox didn't load`);
}
