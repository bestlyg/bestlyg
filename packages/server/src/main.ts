import('./bootstrap')
    .then(mod => mod.bootstrap())
    .catch(err => {
        console.log('Server Bootstrap Error', err);
    });
