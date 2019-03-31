importScripts("/precache-manifest.16598c9179b1b73bf7af1fba62ce7fcf.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* eslint-disable no-console */
/* eslint-disable no-undef */
if (workbox) {
    console.log(`Workbox is loaded`);

    workbox.precaching.precacheAndRoute(self.__precacheManifest);
}
else {
    console.log(`Workbox didn't load`);
}
