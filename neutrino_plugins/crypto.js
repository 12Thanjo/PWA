module.exports=function($pending_plugins,$get_plugin){$pending_plugins.set('crypto',()=>{let plugin={metadata:{"name":"crypto","version":"0.1.0","description":"extention to the built in crypto module to nodejs","main":"index.js","author":"12Thanjo","dependancies":[]}};// plugin: crypto
// description: extention to the built in crypto module to nodejs
// author: 12Thanjo

var crypto;
try{
	crypto = require('crypto');
}catch{
 	console.error('crypto is not supported');
};


plugin.randomString = function(length){
	return crypto.randomBytes(length).toString("hex");
}

plugin.sha256 = function(data, secretKey){
	return crypto.createHmac('sha256', secretKey)
	        .update(data)
	        .digest('hex');	
};

plugin.scrypt = function(data, salt, length){
	var key = crypto.scryptSync(data, salt, length);
	return key.toString('hex');
};


plugin.equal = function(a, b){
	if(a.length == b.length){
		var a_buffer = Buffer.from(a);
		var b_buffer = Buffer.from(b);
		return crypto.timingSafeEqual(a_buffer, b_buffer);
	}else{
		return false;
	};
};


/////////////////////////////////////////////////////////////////////////////

plugin.generateIV = function(){
	return crypto.randomBytes(16);
};

plugin.encrypt = function(text, iv, secretKey){
    var cipher = crypto.createCipheriv('aes-256-ctr', secretKey, iv);
    var encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        content: encrypted.toString('hex'),
        iv: iv.toString('hex')
    };
};

plugin.decrypt = function(content, iv, secretKey){
    var decipher = crypto.createDecipheriv('aes-256-ctr', secretKey, Buffer.from(iv, 'hex'));
    var decrpyted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};




/////////////////////////////////////////////////////////////////////////////


plugin.diffieHellman = {};


plugin.diffieHellman.generate = function(){
	var dh = crypto.createECDH('secp256k1');
	dh.generateKeys();
	return {
		publicKey: dh.getPublicKey().toString('hex'),
		privateKey: dh.getPrivateKey().toString('hex')
	};
};

plugin.diffieHellman.compute = function(privateKey, theirPublicKey){
	privateKey = Buffer.from(privateKey, 'hex');
	theirPublicKey = Buffer.from(theirPublicKey, 'hex');

	var dh = crypto.createECDH('secp256k1');
	dh.setPrivateKey(privateKey);
	return dh.computeSecret(theirPublicKey, 'base64', 'hex')
};



/////////////////////////////////////////////////////////////////////////////



plugin.sign = function(data, secretKey){
	var signature = plugin.sha256(data, secretKey);
	return data + "." + signature;
};

plugin.unsign = function(signed){
	if(signed.includes('.')){
		return signed.substring(0, signed.lastIndexOf('.'));
	}else{
		console.error("not a signed string");
	}
}


plugin.verify = function(signed, secretKey){
	if(signed.includes('.')){
		var sign_test = plugin.sign(plugin.unsign(signed), secretKey);
		return plugin.equal(sign_test, signed);
	}else{
		return false;
	};
};



/////////////////////////////////////////////////////////////////////////////
// UUID v4


var uuid = {};


uuid.regex = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
uuid.validate = function(to_validate){
	return typeof to_validate == "string" && uuid.regex.test(to_validate);
};

// stringify
uuid.byte_to_hex = [];
for(var i=0; i<256;i++){
	uuid.byte_to_hex.push((i + 0x100).toString(16).substr(1));
};

uuid.stringify = function(arr){
	var new_uuid = (
	    uuid.byte_to_hex[arr[0]] +
	    uuid.byte_to_hex[arr[1]] +
	    uuid.byte_to_hex[arr[2]] +
	    uuid.byte_to_hex[arr[3]] +
	    '-' +
	    uuid.byte_to_hex[arr[4]] +
	    uuid.byte_to_hex[arr[5]] +
	    '-' +
	    uuid.byte_to_hex[arr[6]] +
	    uuid.byte_to_hex[arr[7]] +
	    '-' +
	    uuid.byte_to_hex[arr[8]] +
	    uuid.byte_to_hex[arr[9]] +
	    '-' +
	    uuid.byte_to_hex[arr[10]] +
	    uuid.byte_to_hex[arr[11]] +
	    uuid.byte_to_hex[arr[12]] +
	    uuid.byte_to_hex[arr[13]] +
	    uuid.byte_to_hex[arr[14]] +
	    uuid.byte_to_hex[arr[15]]
	).toLowerCase();

	if(!uuid.validate(new_uuid)){
		throw TypeError('stringify created an Invalid UUID');
	};

	return new_uuid;
};


uuid.u_int_8_array = new Uint8Array(256);
uuid.pool_prt = uuid.u_int_8_array.length;
uuid.rng = function(){
	if (uuid.pool_prt > uuid.u_int_8_array.length - 16) {
		crypto.randomFillSync(uuid.u_int_8_array);
		uuid.pool_prt = 0;
	};

	return uuid.u_int_8_array.slice(uuid.pool_prt, (uuid.pool_prt += 16));
};


plugin.uuid = function(){
	var rnds = uuid.rng();
	rnds[6] = (rnds[6] & 0x0f) | 0x40;
	rnds[8] = (rnds[8] & 0x3f) | 0x80;


	return uuid.stringify(rnds);
};







;return plugin;});};