if (typeof window !== 'undefined') {
  const { worker } = require('../mocks/browser');
  worker.start();

  console.log('service worker started');
}

export {};
