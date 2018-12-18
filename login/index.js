const bodyParser = require ( 'body-parser' );
const crypto = require ( 'crypto' );
const cryptico = require ( 'cryptico' );

const RSA = require ( './RSA_gen' );

const express = require ( 'express' );
var app = express ( );
app.use ( bodyParser.json( ) );
app.use ( bodyParser.urlencoded( {extended: true} ) );
app.use ( express.static ( __dirname + '/public' ) );
app.engine ( 'html', require ( 'ejs' ).renderFile );


app.all ( '/', function ( req, res )
{
	if ( req.body.data )
	{
		req.body.data = cryptico.decrypt ( req.body.data, RSA.private );

		if ( req.body.data.status &&
			( req.body.data.status == "failure" ) )
		{
			console.log( "failed to decrypt data" );
			res.writeHead ( 500 );
			res.end ( );
		}
		else
		{
			let tmp = JSON.parse ( req.body.data.plaintext );

			console.log( tmp.user ); // user in clear mode
			console.log( tmp.password ); // pass encryt by sha512

			res.writeHead ( 200 );
			res.end ( );
		}
	}
	else if ( RSA.public )
	{ // RSA pub key existe and user can try to connect
		res.render ( 'login.html', { pubKey:RSA.public } );
	}
	else
	{ // RSA pub key doesn't already exist, user should wait before tyring to connect
		console.log( "key not already available" );
		res.writeHead ( 500 );
		res.end ( );
	}
});

// RSA keygen part
RSA.status.on ( 'ready', () => 
{
	console.log( "new key available" );
});
RSA.status.on ( 'failed', () =>
{
	console.log( "can't create new key" );
});

RSA.init ( {length:1024} );
app.listen ( 65534, function ( )
{
	console.log ( "App Started" );
});