const sharp = require('sharp');

sharp('assets/logos/logo-principal.png')
    .toFile('assets/logos/logo-principal.webp')
    .then(() => {
        console.log('Conversion successful');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error converting image:', err);
        process.exit(1);
    });
