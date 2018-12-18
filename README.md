# Nodejs-tips-and-Tricks
personnal lib of tips and tricks for web dev with nodejs

## Login:
This piece of code provide a methode to generate a RSA key from a random passphrase with your own key size. This RSA key is asynchronously generated at the start of the server. With this thechnic you can improve the security of you'r system with (or without) HTTPS. I use it to don't use a CA and keep security.

In the login folder you can found every thing you need to test, you juste need to make a `npm install`, start the server and connect to it.

To use it you need this code :
```Javascript
const RSA = require ( './RSA_gen' );

RSA.status.on ( 'ready', () => 
{
	console.log( "new key available" );
});
RSA.status.on ( 'failed', () =>
{
	console.log( "can't create new key" );
});

RSA.init ( {length:1024} );
```

you could set the key length and pass phrase :
```Javascript
RSA.init ( { length: 1024, secret: "your string" } );
```

By default lenght is set to 4096 and the stirng is randomly generated.