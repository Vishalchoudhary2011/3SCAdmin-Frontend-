/*
Cache  Management 
-- Add api data to cache 
-- Remove data from cache 
-- Retrieve data from cache 
-- Clear entire cache
*/

let isCacheSupported = 'caches' in window;
let cacheName = 'userSettings'; 
let url = '/api/get/usersettings';

// Add
export const cacheAdd = (key,data) => {

  if ('caches' in window) {
    // Opening given cache and putting our data into it
    caches.open(cacheName).then((cache) => {
      cache.add(key, data);
      alert('Data Added into cache!')
    });
  }  
}

// Add All
export const cacheAddAll = () => {
    let urls = ['/get/userSettings?userId=1', '/get/userDetails'];
    caches.open(cacheName).then( cache => {
      cache.addAll(urls).then( () => {
          console.log("Data cached ")
          });
    });
}

// Put data to cache
export const cachePut = () => {
    fetch(url).then(res => {
      return caches.open(cacheName).then(cache => {
          return cache.put(url, res);
      })
    })
}

// Retrieving from a cache
export const cacheMatch = () => {
  caches.open(cacheName).then(cache => {
    cache.match(url).then(settings => {
      console.log(settings);
    });
  });
}

// Retrieving all caches
const cacheGetItem = () => {
  caches.keys().then(keys => {
      // keys is an array with the list of keys
  })
}

//   Remove an item from the cache
const cacheRemoveItem = () => {
  cacheName = 'userSettings'; 
  let urlToDelete = url;
  caches.open(cacheName).then(cache => {
    cache.delete(urlToDelete)
  })
}

// Remove the cache completely
const cacheClear = () => {
  caches.delete(cacheName).then(() => {
      console.log('Cache successfully deleted!');
  })
}
