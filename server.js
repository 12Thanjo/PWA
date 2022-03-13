let $plugins=new Map();let $pending_plugins=new Map();let $get_plugin=function(name){if($plugins.has(name)){return $plugins.get(name);}else{let $plugin=$pending_plugins.get(name)();$plugins.set(name,$plugin);$pending_plugins.delete(name);return $plugin;};};
require("./neutrino_plugins/ferry.js")($pending_plugins,$get_plugin);
require("./neutrino_plugins/waterfall.js")($pending_plugins,$get_plugin);
require("./neutrino_plugins/files.js")($pending_plugins,$get_plugin);
require("./neutrino_plugins/stats.js")($pending_plugins,$get_plugin);
require("./neutrino_plugins/cmd.js")($pending_plugins,$get_plugin);
require("./neutrino_plugins/crypto.js")($pending_plugins,$get_plugin);
for(var[$key,$value]of $pending_plugins.entries()){$get_plugin($key);};
let ferry=$plugins.get('ferry'); //1:7
ferry.get("/",(req,res)=>{
	res.send("PWA Server"); //5:13 | server.nt
}); //4:10 | server.nt
ferry.get("/envaid",(req,res)=>{
	res.sendFile(__dirname+"/envaid/index.html"); //10:17 | server.nt
}); //9:10 | server.nt
ferry.get("/colors.css",(req,res)=>{
	res.sendFile(__dirname+"/envaid/colors.css"); //15:17 | server.nt
}); //14:10 | server.nt
ferry.get("/main.js",(req,res)=>{
	res.sendFile(__dirname+"/envaid/main.js"); //18:17 | server.nt
}); //17:10 | server.nt
ferry.start(); //23:12 | server.nt
let os=require("os"); //30:9 | server.nt
let nets=os.networkInterfaces(); //33:11 | server.nt
let results={}; //34:14 | server.nt
for(let name in nets){
	let net=nets[name];
	for(let i in net){
		let sub_net=net[i];
		if(sub_net.family=="IPv4"){
			if(results[name]==null){
				results[name]=[]; //40:24 | server.nt
			}; //39:15 | server.nt
			results[name].push(sub_net.address); //42:31 | server.nt
		}; //38:11 | server.nt
	}; //37:12 | server.nt
}; //36:8 | server.nt
console.log("-------------------------"); //47:12 | server.nt
for(let key in results){
	let address=results[key];
	console.log(key,address); //49:16 | server.nt
}; //48:8 | server.nt
console.log("-------------------------"); //51:12 | server.nt
