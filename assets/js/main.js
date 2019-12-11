/* eslint-env browser */
(function (window, document) {
  'use strict';

  // let bUserSubbed = false;
  // let serviceWorker = null;
  // const applicationServerPublicKey = 'BAIeThm_3KKY4aKy_JUScLKlGFjdPoGONR8MUP-kRg7cuR8ECTKUOiMfKZj2-hlNjlTvhaU9vMztVRO77m_JimI';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        serviceWorker = registration;
        console.log(`Service Worker Registered at scope: ${registration.scope}`);

        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              //TODO: prompt user for page reload
              location.reload();
            }
          };
        };
        subscriptionCheck();
      })
      .catch((err) => {
        console.log(`Service Worker failed registration: ${err}`);
      });
  }

  // function subscriptionCheck () {
  //   if ('PushManager' in window) {
  //     if (bUserSubbed) {
  //       unsubscribeUser();
  //     } else {
  //       subscribeUser();
  //     }

  //     // Set the initial subscription value
  //     serviceWorker.pushManager.getSubscription()
  //     .then((subscription) => {
  //       bUserSubbed = !(subscription === null);

  //       updateSubscriptionOnServer(subscription);

  //       if (bUserSubbed) {
  //         console.log('User IS subscribed.');
  //       } else {
  //         console.log('User is NOT subscribed.');
  //       }
  //     });
  //   } else {
  //     console.warn("Push Notifications are not supported in this browser.");
  //   }
  // }

  // function unsubscribeUser() {
  //   serviceWorker.pushManager.getSubscription()
  //   .then((subscription) => {
  //     if (subscription) {
  //       return subscription.unsubscribe();
  //     }
  //   })
  //   .catch((error) => {
  //     console.log('Error unsubscribing', error);
  //   })
  //   .finally(() => {
  //     updateSubscriptionOnServer(null);

  //     console.log('User is unsubscribed.');
  //     bUserSubbed = false;
  //   });
  // }

  // function subscribeUser() {
  //   const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  //   serviceWorker.pushManager.subscribe({
  //     userVisibleOnly: true,
  //     applicationServerKey: applicationServerKey
  //   })
  //   .then((subscription) => {
  //     console.log('User is subscribed.');

  //     updateSubscriptionOnServer(subscription);

  //     bUserSubbed = true;
  //   })
  //   .catch((err) => {
  //     console.error('Failed to subscribe the user: ', err);
  //   });
  // }

  // function updateSubscriptionOnServer(subscription) {
  //   // TODO: Send subscription to application server

  //   if (subscription) {
  //     const oData = JSON.stringify(subscription);
  //     console.log(oData);
  //   } 
  // }

  // function urlB64ToUint8Array(base64String) {
  //   const padding = '='.repeat((4 - base64String.length % 4) % 4);
  //   const base64 = (base64String + padding)
  //     .replace(/\-/g, '+')
  //     .replace(/_/g, '/');

  //   const rawData = window.atob(base64);
  //   const outputArray = new Uint8Array(rawData.length);

  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }
  //   return outputArray;
  // }
})(window, document);
