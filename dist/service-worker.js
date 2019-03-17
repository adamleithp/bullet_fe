importScripts("/precache-manifest.141958b04228f7be159f9bf642ae5c95.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* eslint-disable no-console */
/* eslint-disable no-undef */
if (workbox) {
    console.log(`Workbox is loaded`);

    workbox.precaching.precacheAndRoute(self.__precacheManifest);
}
else {
    console.log(`Workbox didn't load`);
}
