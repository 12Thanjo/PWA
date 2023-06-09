var MODULE=function(code){
	return code();
}

debug=new MODULE(()=>{return {error:function(type,message){window.onerror=function(){console.error(`Virtuosity ${type}Error: ${message}`); return true; }; throw new Error(); }, warn:function(type,message){console.warn(`Virtuosity ${type}Warning: ${message}`); } } });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

strings=new MODULE(()=>{
	var stringify_map=function(map){return JSON.stringify([...map]);}
	var parse_map=function(jsonStr){return new Map(JSON.parse(jsonStr));}
	var parse_set=function(set){return new Set(JSON.parse(set));}

	return{
		stringifyMap:(map)=>{return stringify_map(map);},
		parseMap:(map)=>{return parse_map(map);},
		stringifySet:(set)=>{return stringify_map(set);},
		parseSet:(set)=>{return parse_set(set);}
	}
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
time=new MODULE(()=>{
	var timer=function(duration,func){setTimeout(func,duration);}
	var advancedTimer=function(duration,func){
		this.func=func;this.DATA={started:0,duration:duration,replay:0,running:false,paused:false};
		Object.defineProperty(this,'running',{get:()=>{return this.DATA.running;}});Object.defineProperty(this,'paused',{get:()=>{return this.DATA.paused;}});Object.defineProperty(this,"duration",{get:()=>{return this.DATA.duration;},set:(val)=>{this.DATA.duration=val;if(this.running){var now=new Date();if(now-this.DATA.started > val){clearTimeout(this.timer);this.func();}}}});this.start=function(){if(this.DATA.replay !=0){this.DATA.replay=0;this.DATA.started=new Date();this.running=true;this.timer=setTimeout(this.func,this.duration);}else{this.DATA.started=new Date();this.running=true;this.timer=setTimeout(this.func,this.duration);}}
		this.stop=function(){clearTimeout(this.timer);this.running=false;}
		this.pause=function(){this.paused=true;var now=new Date();this.DATA.replay=this.duration-(now-this.DATA.started);}
		this.getTimeLeft=function(){if(this.running){var now=new Date();return this.duration-(now-this.DATA.started);}else{return 0;}}
	}

	var interval=function(duration,func){setInterval(func,duration);}
	var advancedInterval=function(duration,func){
		this.func=func;
		this.DATA={duration:duration,running:false}
		Object.defineProperty(this,"duration",{get:()=>{return this.DATA.duration;},set:(val)=>{this.DATA.duration=val;if(this.running){clearInterval(this.timer);this.timer=setInterval(this.func,this.DATA.duration);}}});Object.defineProperty(this,"running",{get:()=>{return this.DATA.running;}});this.start=function(){this.running=true;this.timer=setInterval(this.func,this.duration);}
		this.stop=function(){clearInterval(this.timer);this.running=false;}
	}


	return {timer:timer,advancedTimer:advancedTimer,interval:interval,advancedInterval:advancedInterval}
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
collisionManager=new MODULE(()=>{
	var Point=function(x,y){this.x=x;this.y=y;this.position=function(x,y){this.x=x;this.y=y;}}
	var Box=function(x,y,width,height){this.x=x;this.y=y;this.width=width;this.hieght=height;this.position=function(x,y){this.x=x;this.y=y;};this.scaling=function(width,hieght){this.width=width;this.hieght=height;}};
	var Circle=function(x,y,r){this.x=x;this.y=y;this.r=r;this.position=function(x,y){this.x=x;this.y=y;};this.scaling=function(r){this.r=r;}};
	var Line=function(x1,y1,x2,y2){this.x1=x1;this.y1=y1;this.x2=x2;this.y2=y2;this.width=1;this.position1=function(x1,y1){this.x1=x1;this.y1=y1;};this.position2=function(x2,y2){this.x2=x2;this.y2=y2;};this.scaling=function(width){this.width=width;if(this.width < 1){this.width=1;}}};
	var Polygon=function(points){this.set=function(pnts){this.points=[];pnts.forEach((point)=>{if(point instanceof Point){this.points.push(point);}else{this.points.push(new Point(point[0],point[1]));}});};this.set(points);};var distanceSquared=function(x1,y1,x2,y2){return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));};var dot=function(v1,v2){return (v1[0]*v2[0])+(v1[1]*v2[1]);};var point_point=function(a,b){return a.x==b.x && a.y==b.y;};var box_point=function(a,b){return b.x >=a.x && b.x <=a.x+a.width && b.y >=a.y && b.y <=a.y+a.hieght;};var box_box=function(a,b){return a.x < b.x+b.width && a.x+a.width > b.x && a.y < b.y+b.hieght && a.y+a.hieght > b.y;};var box_circle=function(a,b){var hw=a.width/2;var hh=a.hieght/2;var distX=Math.abs(b.x-(a.x+a.width/2));var distY=Math.abs(b.y-(a.y+a.hieght/2));if (distX > hw+b.r || distY > hh+b.r){return false;}if (distX <=hw || distY <=hh){return true;}var x=distX-hw;var y=distY-hh;return x*x+y*y <=b.r*b.r;};var circle_point=function(a,b){var x=b.x-a.x;var y=b.y-a.y;return x*x+y*y <=a.r*a.r;};var circle_circle=function(a,b){var x=a.x-b.x;var y=b.y-a.y;var radii=a.r+b.r;return x*x+y*y <=radii*radii;};var line_point=function(a,b,tolerance){tolerance=tolerance || 1;return Math.abs(distanceSquared(a.x1,a.y1,a.x2,a.y2)-(distanceSquared(a.x1,a.y1,b.x,b.y)+distanceSquared(a.x2,a.y2,b.x,b.y))) <=tolerance;};var line_box=function(a,b){if(box_point(b,new Point(a.x1,a.y1)) || box_point(b,new Point(a.x2,a.y2))){return true;}else{return line_line(a,new Line(xb,yb,xb+wb,yb)) || line_line(a,new Line(xb+wb,yb,xb+wb,yb+hb)) || line_line(a,new Line(xb,yb+hb,xb+wb,yb+hb)) || line_line(a,new Line(xb,yb,xb,yb+hb));}};var line_circle=function(a,b){var ac=[b.x-a.x1,b.y-a.y1];var ab=[a.x2-a.x1,a.y2-a.y1];var ab2=dot(ab,ab);var acab=dot(ac,ab);var t=acab/ab2;t=(t < 0) ? 0 :t;t=(t > 1) ? 1 :t;var h=[(ab[0]*t+a.x1)-b.x,(ab[1]*t+a.y1)-b.y];var h2=dot(h,h);return h2 <=rc*rc;};var line_line=function(a,b){if(a.width !=1 || b.width !=1){var s1_x=a.x2-a.x1;var s1_y=a.y2-a.y1;var s2_x=b.x4-b.x3;var s2_y=b.y4-b.y3;var s=(-s1_y*(a.x1-b.x3)+s1_x*(a.y1-b.y3))/(-s2_x*s1_y+s1_x*s2_y);var t=(s2_x*(a.y1-b.y3)-s2_y*(a.x1-b.x3))/(-s2_x*s1_y+s1_x*s2_y);return s >=0 && s <=1 && t >=0 && t <=1;}else{}};var polygon_point=function(a,b,tolerance){var length=a.points.length;var c=false;var i,j;for(i=0,j=length-2;i < length;i +=1){if(((a.points[i].y > b.y) !==(a.points[j].y > b.y)) && (b.x < (a.points[j].x-a.points[i].x)*(b.y-a.points[i].y)/(a.points[j].y-a.points[i].y)+a.points[i].x)){c=!c;}j=i;}if(c){return true;}for(i=0;i < length;i +=1){var p1x=a.points[i].x;var p1y=a.points[i].y;var p2x,p2y;if(i===length-1){p2x=a.points[0].x;p2y=a.points[0].y;}else{p2x=a.points[i+1].x;p2y=a.points[i+1].y;}if(line_point(new Line(p1x,p1y,p2x,p2y),b,tolerance)){return true;}}return false;};var polygon_box=function(a,b){return polygon_polygon(a,new Polygon(b.x,b.y,b.x+b.width,b.y+b.height));};var polygon_circle=function(a,b,tolerance){if(polygon_point(a,new Point(b.x,b.y),tolerance)){return true;}var count=a.points.length;for(var i=0;i < count-1;i +=1){if(line_circle(new Line(a.points[i].x,a.points[i].y,a.points[i+1].x,a.points[i+1].y),b)){return true;}}return line_circle(new Line(a.points[i].x,a.points[i].y,a.points[count-1].x,a.points[count-1].y),b);};var polygon_line=function(a,b,tolerance){var length=a.points.length;if(polygon_point(a,new Point(b.x1,b.y1),tolerance)){return true}for(var i=0;i < length;i +=1){var j=(i+1) % length;if(line_line(b,new Line(a.points[i].x,a.points[i].y,a.points[i+1].x,a.points[i+1].y))){return true;}}return false;};var poly_poly_check=function(target,a,b){var minA,maxA,projected,minB,maxB,j;for(var i1=0;i1 < target.points.length;i1 +=1){var i2=(i1+1) % target.points.length;var normal=new Point(target.points[i2].y-target.points[i1].y,target.points[i1].x-target.points[i2].x);minA=maxA=null;for(j=0;j < a.points.length;j +=1){projected=normal.x*a.points[j].x+normal.y*a.points[j].y;if(minA===null || projected < minA){minA=projected;}if(maxA===null || projected > maxA){maxA=projected;}}minB=maxB=null;for(j=0;j < b.points.length;j +=2){projected=normal.x*b.points[j].x+normal.y*b.points[j].y;if(minB===null || projected < minB){minB=projected;}if(maxB===null || projected > maxB){maxB=projected;}}if(maxA < minB || maxB < minA){return false;}}};var polygon_polygon=function(a,b){var check1=poly_poly_check(a,a,b);if(check1 !=null){return check1;}var check2=poly_poly_check(b,a,b);if(check2 !=null){return check2;}return true;};

	return{
		shape:{Point:function(x,y){return new Point(x,y);},Box:function(x,y,w,h){return new Box(x,y,w,h);},Circle:function(x,y,r){return new Circle(x,y,r);},Line:function(x1,y1,x2,y2){return new Line(x1,y1,x2,y2);},Polygon:function(points){return new Polygon(points);}},
		collision:{
			auto:function(a,b){if(a instanceof Point){if(b instanceof Point){return point_point(a,b);}else if(b instanceof Box){return box_point(b,a);}else if(b instanceof Circle){return circle_point(b,a);}else if(b instanceof Line){return line_point(b,a);}else if(b instanceof Polygon){return polygon_point(b,a);}}else if(a instanceof Box){if(b instanceof Point){return box_point(a,b);}else if(b instanceof Box){return box_box(a,b);}else if(b instanceof Circle){return box_circle(a,b);}else if(b instanceof Line){return line_box(b,a);}else if(b instanceof Polygon){return polygon_box(b,a);}}else if(a instanceof Circle){if(b instanceof Point){return circle_point(a,b);}else if(b instanceof Box){return box_circle(b,a);}else if(b instanceof Circle){return circle_circle(a,b);}else if(b instanceof Line){return line_circle(b,a);}else if(b instanceof Polygon){return polygon_circle(b,a);}}else if(a instanceof Line){if(b instanceof Point){return line_point(a,b);}else if(b instanceof Box){return line_box(b,a);}else if(b instanceof Circle){return line_circle(a,b);}else if(b instanceof Line){return line_line(a,b);}else if(b instanceof Polygon){return polygon_line(b,a);}}else if(a instanceof Polygon){if(b instanceof Point){return polygon_point(a,b);}else if(b instanceof Box){return polygon_box(a,b);}else if(b instanceof Circle){return polygon_circle(a,b);}else if(b instanceof Line){return polygon_line(a,b);}else if(b instanceof Polygon){return polygon_polygon(a,b);}}},
			pointPoint:function(a,b){return point_point(a,b);},pointBox:function(a,b){return box_point(b,a);},pointCircle:function(a,b){return circle_point(b,a);},pointLine:function(a,b){return line_point(b,a);},pointPolygon:function(a,b){return line_point(b,a);},
			boxPoint:function(a,b){return box_point(a,b);},boxBox:function(a,b){return box_box(a,b);},boxCircle:function(a,b){return box_circle(a,b);},boxLine:function(a,b){return line_box(b,a);},boxPolygon:function(a,b){return line_box(b,a);},
			circlePoint:function(a,b){return circle_point(a,b);},circleBox:function(a,b){return box_circle(b,a);},circleCircle:function(a,b){return circle_circle(a,b);},circleLine:function(a,b){return line_circle(b,a);},circlePolygon:function(a,b){return line_circle(b,a);},linePoint:function(a,b){return line_point(a,b);},
			lineBox:function(a,b){return line_box(a,b);},lineCircle:function(a,b){return line_circle(a,b);},lineLine:function(a,b){return line_line(a,b);},linePolygon:function(a,b){return line_line(a,b);},
			polygonPoint:function(a,b){return polygon_point(a,b);},polygonBox:function(a,b){return polygon_box(a,b);},polygonCircle:function(a,b){return polygon_circle(a,b);},polygonLine:function(a,b){return polygon_polygon(a,b);},polygonPolygon:function(a,b){return polygon_polygon(a,b);}
		}
	}
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
inputManager=new MODULE(()=>{
	var DOWN=[255];var DOWN_MAP=new Map([["A",65],["B",66],["C",67],["D",68],["E",69],["F",70],["G",71],["H",72],["I",73],["J",74],["K",75],["L",76],["M",77],["N",78],["O",79],["P",80],["Q",81],["R",82],["S",83],["T",84],["U",85],["V",86],["W",87],["X",88],["Y",89],["Z",90],["ZERO",48],["ONE",49],["TWO",50],["THREE",51],["FOUR",52],["FIVE",53],["SIX",54],["SEVEN",55],["EIGHT",56],["NINE",57],["NUMPAD_0",96],["NUMPAD_1",97],["NUMPAD_2",98],["NUMPAD_3",99],["NUMPAD_4",100],["NUMPAD_5",101],["NUMPAD_6",102],["NUMPAD_7",103],["NUMPAD_8",104],["NUMPAD_9",105],["NUMPAD_MULTIPLY",106],["NUMPAD_ADD",107],["NUMPAD_ENTER",108],["NUMPAD_SUBTRACT",109],["NUMPAD_DECIMAL",110],["NUMPAD_DIVIDE",111],["F1",112],["F2",113],["F3",114],["F4",115],["F5",116],["F6",117],["F7",118],["F8",119],["F9",120],["F10",121],["F11",122],["F12",123],["F13",124],["F14",125],["F15",126],["COLON",186],["EQUALS",187],["COMMA",188],["UNDERSCORE",189],["PERIOD",190],["QUESTION_MARK",191],["TILDE",192],["OPEN_BRACKET",219],["BACKWARD_SLASH",220],["CLOSED_BRACKET",221],["QUOTES",222],["BACKSPACE",8],["TAB",9],["CLEAR",12],["ENTER",13],["SHIFT",16],["CONTROL",17],["ALT",18],["CAPS_LOCK",20],["ESC",27],["SPACE",32],["PAGE_UP",33],["PAGE_DOWN",34],["END",35],["HOME",36],["LEFT",37],["UP",38],["RIGHT",39],["DOWN",40],["PLUS",43],["MINUS",44],["INSERT",45],["DELETE",46],["HELP",47],["NUM_LOCK",144]]);
	var check_down=function(arr){var down=true; for(var i=arr.length-1;i>=0;i--){if(!DOWN[arr[i]]){down=false; break; } } return down; }; var keydown_listener=function(event){if(!DOWN[event.keyCode]){DOWN[event.keyCode]=true; var keydown_lookup_events=keydown_lookup[event.keyCode]; if(keydown_lookup_events !=null){keydown_lookup_events.forEach((event)=>{if(check_down(event.keys)){event.event(event); } }); } } }; var keyup_listener=function(event){var keyup_lookup_events=keyup_lookup[event.keyCode]; if(keyup_lookup_events !=null){keyup_lookup_events.forEach((event)=>{if(check_down(event.keys)){event.event(event); } }); } DOWN[event.keyCode]=false; }; var keydown_events=new Map(); var keydown_lookup=[255]; var Keydown_Event=function(name,keys,event){this.name=name; if(typeof keys=="string"){keys=[keys]; } keys=[...keys]; this.keys=keys; this.event=event; for(var i=this.keys.length-1;i>=0;i--){this.keys[i]=DOWN_MAP.get(this.keys[i]); } keys.forEach((key)=>{var lookup_location=keydown_lookup[key]; if(lookup_location==null){lookup_location=keydown_lookup[key]=new Map(); } lookup_location.set(name,this); }); keydown_events.set(name,this); }; var delete_keydown=function(name){var event_target=keydown_events.get(name); if(event_target !=null){event_target.keys.forEach((key)=>{var lookup_location=keydown_lookup[key]; if(lookup_location==null){lookup_location=keydown_lookup[key]=new Map(); } lookup_location.delete(name); }); }else{debug.error("ReferenceError",`keyDown event "${name}" doesn't exist`); } };var keyup_events=new Map(); var keyup_lookup=[255]; var Keyup_Event=function(name,keys,event){this.name=name; if(typeof keys=="string"){keys=[keys]; } this.keys=keys; this.event=event; for(var i=this.keys.length-1;i>=0;i--){this.keys[i]=DOWN_MAP.get(this.keys[i]); } keys.forEach((key)=>{var lookup_location=keyup_lookup[key]; if(lookup_location==null){lookup_location=keyup_lookup[key]=new Map(); } lookup_location.set(name,this); }); keyup_events.set(name,this); }; var delete_keyup=function(name){var event_target=keyup_events.get(name); if(event_target !=null){event_target.keys.forEach((key)=>{var lookup_location=keyup_lookup[key]; if(lookup_location==null){lookup_location=keyup_lookup[key]=new Map(); } lookup_location.delete(name); }); }else{debug.error("ReferenceError",`keyUp event "${name}" doesn't exist`); } };var mouse_x=0;var mouse_y=0;var dx=0;var dy=0;var screen_x=0;var screen_y=0;var mouse_position_offset_x=0;var mouse_position_offset_y=0;var left_down=false;var middle_down=false;var right_down=false;var back_down=false;var forward_down=false;var scroll_x=0;var scroll_y=0;var leftDown_events=new Map();var add_LeftDown_Event=function(name,event){if(!leftDown_events.has(name)){leftDown_events.set(name,event);}else{debug.warn("Overwrite",`leftDown event "${name}" already exists "${name}" has now been overwritten`);}};var delete_LeftDown_Event=function(name){if(leftDown_events.has(name)){leftDown_events.delete(name);}else{debug.error("ReferenceError",`leftDown event "${name}" doesn't exist`);}};var middleDown_events=new Map();var add_MiddleDown_Event=function(name,event){if(!middleDown_events.has(name)){middleDown_events.set(name,event);}else{debug.warn("Overwrite",`middleDown event "${name}" already exists "${name}" has now been overwritten`);}};var delete_MiddleDown_Event=function(name){if(middleDown_events.has(name)){middleDown_events.delete(name);}else{debug.error("ReferenceError",`middleDown event "${name}" doesn't exist`);}};var rightDown_events=new Map();var add_RightDown_Event=function(name,event){if(!rightDown_events.has(name)){rightDown_events.set(name,event);}else{debug.warn("Overwrite",`rightDown event "${name}" already exists "${name}" has now been overwritten`);}};var delete_RightDown_Event=function(name){if(rightDown_events.has(name)){rightDown_events.delete(name);}else{debug.error("ReferenceError",`rightDown event "${name}" doesn't exist`);}};var backDown_events=new Map();var add_BackDown_Event=function(name,event){if(!backDown_events.has(name)){backDown_events.set(name,event);}else{debug.warn("Overwrite",`backDown event "${name}" already exists "${name}" has now been overwritten`);}};var delete_BackDown_Event=function(name){if(backDown_events.has(name)){backDown_events.delete(name);}else{debug.error("ReferenceError",`backDown event "${name}" doesn't exist`);}};var forwardDown_events=new Map();var add_ForwardDown_Event=function(name,event){if(!forwardDown_events.has(name)){forwardDown_events.set(name,event);}else{debug.warn("Overwrite",`forwardDown event "${name}" already exists "${name}" has now been overwritten`);}};var delete_ForwardDown_Event=function(name){if(forwardDown_events.has(name)){forwardDown_events.delete(name);}else{debug.error("ReferenceError",`forwardDown event "${name}" doesn't exist`);}};var mousedown_listener=function(e){switch(e.button){case 0:left_down=true;leftDown_events.forEach((event)=>{event();});break;case 1:middle_down=true;middleDown_events.forEach((event)=>{event();});event.preventDefault();break;case 2:right_down=true;rightDown_events.forEach((event)=>{event();});break;case 3:back_down=true;backDown_events.forEach((event)=>{event();});break;case 4:forward_down=true;forwardDown_events.forEach((event)=>{event();});break;}};var leftUp_events=new Map();var add_LeftUp_Event=function(name,event){if(!leftUp_events.has(name)){leftUp_events.set(name,event);}else{debug.warn("Overwrite",`leftUp event "${name}" already exists "${name}" has now been overwritten`);}};var delete_LeftUp_Event=function(name){if(leftUp_events.has(name)){leftUp_events.delete(name);}else{debug.error("ReferenceError",`leftUp event "${name}" doesn't exist`);}};var middleUp_events=new Map();var add_MiddleUp_Event=function(name,event){if(!middleUp_events.has(name)){middleUp_events.set(name,event);}else{debug.warn("Overwrite",`middleUp event "${name}" already exists "${name}" has now been overwritten`);}};var delete_MiddleUp_Event=function(name){if(middleUp_events.has(name)){middleUp_events.delete(name);}else{debug.error("ReferenceError",`middleUp event "${name}" doesn't exist`);}};var rightUp_events=new Map();var add_RightUp_Event=function(name,event){if(!rightUp_events.has(name)){rightUp_events.set(name,event);}else{debug.warn("Overwrite",`rightUp event "${name}" already exists "${name}" has now been overwritten`);}};var delete_RightUp_Event=function(name){if(rightUp_events.has(name)){rightUp_events.delete(name);}else{debug.error("ReferenceError",`rightUp event "${name}" doesn't exist`);}};var backUp_events=new Map();var add_BackUp_Event=function(name,event){if(!backUp_events.has(name)){backUp_events.set(name,event);}else{debug.warn("Overwrite",`backUp event "${name}" already exists "${name}" has now been overwritten`);}};var delete_BackUp_Event=function(name){if(backUp_events.has(name)){backUp_events.delete(name);}else{debug.error("ReferenceError",`backUp event "${name}" doesn't exist`);}};var forwardUp_events=new Map();var add_ForwardUp_Event=function(name,event){if(!forwardUp_events.has(name)){forwardUp_events.set(name,event);}else{debug.warn("Overwrite",`forwardUp event "${name}" already exists "${name}" has now been overwritten`);}};var delete_ForwardUp_Event=function(name){if(forwardUp_events.has(name)){forwardUp_events.delete(name);}else{debug.error("ReferenceError",`forwardUp event "${name}" doesn't exist`);}};var mouseMove_events=new Map();var add_mouseMove_event=function(name,event){if(!mouseMove_events.has(name)){mouseMove_events.set(name,event);}else{debug.warn("Overwrite",`mouseMove event "${name}" already exists "${name}" has now been overwritten`);}};var delete_mouseMove_event=function(name){if(mouseMove_events.has(name)){mouseMove_events.delete(name);}else{debug.error("ReferenceError",`mouseMove event "${name}" doesn't exist`);}};var mouseup_listener=function(e){switch(e.button){case 0:left_down=false;leftUp_events.forEach((event)=>{event();});break;case 1:middle_down=false;middleUp_events.forEach((event)=>{event();});event.preventDefault();break;case 2:right_down=false;rightUp_events.forEach((event)=>{event();});break;case 3:back_down=false;backUp_events.forEach((event)=>{event();});break;case 4:forward_down=false;forwardUp_events.forEach((event)=>{event();});break;}};var mousemove_listener=function(e){mouse_x=e.clientX;mouse_y=e.clientY;dx=e.movementX;dy=e.movementY;screen_x=e.screenX;screen_y=e.screenY;mouseMove_events.forEach((event)=>{event();});};var clear_deltas=function(){dx=0;dy=0;};var scroll_events=new Map();var add_scroll_event=function(name,event){scroll_events.set(name,event);};var delete_scroll_event=function(name){scroll_events.delete(name);};

	var wheel_listener=function(e){
		// console.log(e);
		scroll_events.forEach((event)=>{
			event(e.deltaY,e.deltaX);
		});
	};

	var controllerMap=new Map();controllerMap.set('A',0);controllerMap.set('B',1);controllerMap.set('X',2);controllerMap.set('Y',3);controllerMap.set('LB',4);controllerMap.set('RB',5);controllerMap.set('LT',6);controllerMap.set('RT',7);controllerMap.set('Back',8);controllerMap.set('Start',9);controllerMap.set('LS',10);controllerMap.set('RS',11);controllerMap.set('Up',12);controllerMap.set('Down',13);controllerMap.set('Left',14);controllerMap.set('Right',15);controllerMap.set('Home',16);var get_connected_controllers=function(){var connected=[];for(var i=0;i<4;i++){connected.push( navigator.getGamepads()[i] !=null);}return connected;};var controller_connect=function(evt){console.log("connected controller "+evt.gamepad.index);};var controller_disconnect=function(evt){console.log("disconnected controller "+evt.gamepad.index);};var controller_buttonPressed=function(id,btn){var cntrlr= navigator.getGamepads()[id];if(cntrlr){return cntrlr.buttons[controllerMap.get(btn)].value;}};var joystick_leftX=function(id){var cntrlr= navigator.getGamepads()[id];if(cntrlr){return cntrlr.axes[0];}};var joystick_leftY=function(id){var cntrlr= navigator.getGamepads()[id];if(cntrlr){return cntrlr.axes[1];}};var joystick_rightX=function(id){var cntrlr= navigator.getGamepads()[id];if(cntrlr){return cntrlr.axes[2];}};var joystick_rightY=function(id){var cntrlr= navigator.getGamepads()[id];if(cntrlr){return cntrlr.axes[3];}};add_listeners=function(){document.addEventListener('keydown',keydown_listener);document.addEventListener('keyup',keyup_listener);document.addEventListener('mousedown',mousedown_listener);document.addEventListener('mouseup',mouseup_listener);document.addEventListener('mousemove',mousemove_listener);document.addEventListener('wheel',wheel_listener);window.addEventListener("gamepadconnected",controller_connect);window.addEventListener("gamepaddisconnected",controller_disconnect);};remove_listeners=function(){document.removeEventListener('keydown',keydown_listener);document.removeEventListener('keyup',keyup_listener);document.removeEventListener('mousedown',mousedown_listener);document.removeEventListener('mouseup',mouseup_listener);document.removeEventListener('mousemove',mousemove_listener);document.removeEventListener('wheel',onwheel_listener);window.removeEventListener("gamepadconnected",controller_connect);window.removeEventListener("gamepaddisconnected",controller_disconnect);};var pointerLocked=false;exports={keyboard:{add:{keyDown:(name,keys,event)=>{new Keydown_Event(name,keys,event);},keyUp:(name,keys,event)=>{new Keyup_Event(name,keys,event);}},delete:{keyDown:(name)=>{delete_keydown(name);},keyUp:(name)=>{delete_keyup(name);}},down:(keys)=>{if(typeof keys=="string"){keys=[keys];}for(var i=keys.length-1;i>=0;i--){keys[i]=DOWN_MAP.get(keys[i]);}return check_down(keys);}},mouse:{add:{leftDown:(name,event)=>{add_LeftDown_Event(name,event);},middleDown:(name,event)=>{add_MiddleDown_Event(name,event);},rightDown:(name,event)=>{add_RightDown_Event(name,event);},backDown:(name,event)=>{add_BackDown_Event(name,event);},forwardDown:(name,event)=>{add_ForwardDown_Event(name,event);},leftUp:(name,event)=>{add_LeftUp_Event(name,event);},middleUp:(name,event)=>{add_MiddleUp_Event(name,event);},rightUp:(name,event)=>{add_RightUp_Event(name,event);},backUp:(name,event)=>{add_BackUp_Event(name,event);},forwardUp:(name,event)=>{add_ForwardUp_Event(name,event);},scroll:(name,event)=>{add_scroll_event(name,event);},mouseMove:(name,event)=>{add_mouseMove_event(name,event);}},delete:{leftDown:(name)=>{delete_LeftDown_Event(name);},middleDown:(name)=>{delete_MiddleDown_Event(name);},rightDown:(name)=>{delete_RightDown_Event(name);},backDown:(name)=>{delete_BackDown_Event(name);},forwardDown:(name)=>{delete_ForwardDown_Event(name);},leftUp:(name)=>{delete_LeftUp_Event(name);},middleUp:(name)=>{delete_MiddleUp_Event(name);},rightUp:(name)=>{delete_RightUp_Event(name);},backUp:(name)=>{delete_BackUp_Event(name);},forwardUp:(name)=>{delete_ForwardUp_Event(name);},scroll:(name)=>{delete_scroll_event(name);},mouseMove:(name,event)=>{delete_mouseMove_event(name,event);}},clearDeltas:()=>{clear_deltas();},pointerLock:()=>{pointerLocked=true;document.getElementsByTagName('body')[0].requestPointerLock();},releasePointerLock:()=>{pointerLocked=false;document.exitPointerLock();}},gamepad:{leftX:(id)=>{return joystick_leftX(id);},leftY:(id)=>{return joystick_leftY(id);},rightX:(id)=>{return joystick_rightX(id);},rightY:(id)=>{return joystick_rightY(id);},button:(id,btn)=>{return controller_buttonPressed(id,btn);},getConnected:()=>{return get_connected_controllers();}},enable:()=>{add_listeners();},disable:()=>{remove_listeners();}};Object.defineProperty(exports.mouse,"x",{get:()=>{return mouse_x;}});Object.defineProperty(exports.mouse,"dx",{get:()=>{return dx;}});Object.defineProperty(exports.mouse,"screenX",{get:()=>{return screen_x;}});Object.defineProperty(exports.mouse,"y",{get:()=>{return mouse_y;}});Object.defineProperty(exports.mouse,"dy",{get:()=>{return dy;}});Object.defineProperty(exports.mouse,"screenY",{get:()=>{return screen_y;}});Object.defineProperty(exports.mouse,"left",{get:()=>{return left_down;}});Object.defineProperty(exports.mouse,"middle",{get:()=>{return middle_down;}});Object.defineProperty(exports.mouse,"right",{get:()=>{return right_down;}});Object.defineProperty(exports.mouse,"back",{get:()=>{return back_down;}});Object.defineProperty(exports.mouse,"forward",{get:()=>{return forward_down;}});Object.defineProperty(exports.mouse,"offsetX",{get:()=>{return mouse_position_offset_x;},set:(val)=>{mouse_position_offset_x=val;}});Object.defineProperty(exports.mouse,"offsetY",{get:()=>{return mouse_position_offset_y;},set:(val)=>{mouse_position_offset_y=val;}});Object.defineProperty(exports.mouse,"pointerLocked",{get:()=>{return pointerLocked;}});return exports;
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
structures = {};
structures.DoublyLinkedList=new MODULE(()=>{
	class Node{_data; _next; _previous; constructor(data){this._data = data; this._next = null; this._previous = null; }; getData = function(){return this._data; }; setData = function(data){this._data = data; }; getNext = function(){return this._next; }; setNext = function(next){this._next = next; }; getPrevious = function(){return this._previous; }; setPrevious = function(previous){this._previous = previous; }; };
	class DoublyLinkedList{_front; _rear; _size; constructor(){this._front = null; this._rear = null; this._size = 0; }; push(data){if(this._front == null){this._front = new Node(data); this._rear = this._front; }else{var new_node = new Node(data); this._rear.setNext(new_node); new_node.setPrevious(this._rear); this._rear = new_node; } this._size += 1; }; delete(i){if(i > this._size - 1 || i < 0){return null; }else{if(i == 0){var output = this._front; this._front = output.getNext(); this._front.setPrevious(null); return output; }else if(i == this._size - 1){var output = this._rear; this._rear = output.getPrevious(); this._rear.setNext(null); return ouput; }else{if(i / this._size < 0.5){var target = this._front; while(i > 1){target = target.getNext(); i -= 1; } var previous = target; var next = target.getNext().getNext(); next.setPrevious(previous); previous.setNext(next); return target; }else{i = this._size - i; var target = this._front; while(i > 1){target = target.getPrevious(); i -= 1; } var next = target; var previous = target.getPrevious().getPrevious(); next.setPrevious(previous); previous.setNext(next); return target; } } } }; get(i){if(i > this._size - 1 || i < 0){return null; }else{if(i / this._size < 0.5){var target = this._front; while(i > 0){target = target.getNext(); i -= 1; } return target; }else{i = this._size - i; var target = this._rear; while(i > 0){target = target.getPrevious(); i -= 1; } return target; } } }; peek(){return this._front; }; size(){return this._size; }; print(){var output = []; var target = this._front; while(target != null){output.push(target.getData()); target = target.getNext(); } return output; }; };
	return DoublyLinkedList;
});
structures.LinkedList=new MODULE(()=>{
	class Node{_data; _next; constructor(data){this._data = data; this._next = null; }; getData = function(){return this._data; }; setData = function(data){this._data = data; }; getNext = function(){return this._next; }; setNext = function(next){this._next = next; }; };
	class LinkedList{_head; _size; constructor(){this._head = null; this._size = 0; }; push(data){if(this._head == null){this._head = new Node(data); }else{var target = this._head; while(target.getNext() != null){target = target.getNext(); } target.setNext(new Node(data)); } this._size += 1; }; delete(i){if(i > this._size - 1 || i < 0){return null; }else{if(i == 0){var output = this._head; this._head = target.getNext(); return output; }else{var target = this._head; while(i > 1){target = target.getNext(); i -= 1; } if(target.getNext != null){var output = target.getNext(); target.setNext(output.getNext()); return output; } } } }; get(i){if(i > this._size - 1 || i < 0){return null; }else{var target = this._head; while(i > 0){target = target.getNext(); i -= 1; } return target; } }; peek(){return this._head; }; size(){return this._size; }; print(){var output = []; var target = this._head; while(target != null){output.push(target.getData()); target = target.getNext(); } return output; }; };
	return LinkedList;
});
structures.Heap=new MODULE(()=>{
	class Heap{_arr; constructor(){this._arr = []; }; size = function(){return this._arr.length; }; push = function(val){var index = this._arr.length; var parent = Math.floor((index-1)/2); while(this._arr[parent] > val && index != 0){this._arr[index] = this._arr[parent]; index = parent; parent = Math.floor((index-1)/2); } this._arr[index] = val; }; print = function(){return this._arr; }; peek = function(){return this._arr[0]; }; pop = function(){return this.remove(0); }; remove = function(i){var output = this._arr[i]; var target = this._arr.pop(); this._arr[i] = target; while(true){var left_i = 2*i+1; var right_i = 2*i+2; var left = this._arr[left_i]; var right = this._arr[right_i]; if(left == null){break; }else if(target < left && target < right){break; }else{if(right == null || left < right){this._arr[i] = left; this._arr[left_i] = target; i = left_i; }else{this._arr[i] = right; this._arr[right_i] = target; i = right_i; } } } return output; }; }
	return Heap;
});
structures.ReverseHeap=new MODULE(()=>{
	class ReverseHeap{_arr; constructor(){this._arr = []; }; size = function(){return this._arr.length; }; push = function(val){var index = this._arr.length; var parent = Math.floor((index-1)/2); while(this._arr[parent] < val && index != 0){this._arr[index] = this._arr[parent]; index = parent; parent = Math.floor((index-1)/2); } this._arr[index] = val; }; print = function(){return this._arr; }; peek = function(){return this._arr[0]; }; pop = function(){return this.remove(0); }; remove = function(i){var output = this._arr[i]; var target = this._arr.pop(); this._arr[i] = target; while(true){var left_i = 2*i+1; var right_i = 2*i+2; var left = this._arr[left_i]; var right = this._arr[right_i]; if(left == null){break; }else if(target > left && target > right){break; }else{if(right == null || left > right){this._arr[i] = left; this._arr[left_i] = target; i = left_i; }else{this._arr[i] = right; this._arr[right_i] = target; i = right_i; } } } return output; }; };
	return ReverseHeap;
});
structures.Queue=new MODULE(()=>{
	class Node{_data; _next; constructor(data){this._data = data; this._next = null; }; getData = function(){return this._data; }; setData = function(data){this._data = data; }; getNext = function(){return this._next; }; setNext = function(next){this._next = next; }; };
	class Queue{_front; _rear; _size; constructor(){this._front = null; this._rear = null; this._size = 0; }; push(data){var newRear = new Node(data); if(this._size == 0){this._front = newRear; this._rear = newRear; }else{this._rear.setNext(newRear); this._rear = newRear; } this._size += 1; }; pop(){var output = this._front; this._size -= 1; if(this._size == 0){return null; }else{this._front = output.getNext(); return output; } }; peek(){return this._front; }; size(){return this._size; }; print(){var output = []; var target = this._front; while(target != null){output.push(target.getData()); target = target.getNext(); } return output; }; };
	return Queue;
});
structures.Stack=new MODULE(()=>{
	class Node{_data; _next; constructor(data){this._data = data; this._next = null; }; getData = function(){return this._data; }; setData = function(data){this._data = data; }; getNext = function(){return this._next; }; setNext = function(next){this._next = next; }; };
	class Stack{_top; _size; constructor(){this._top = null; this._size = 0; }; push(data){var newTop = new Node(data); newTop.setNext(this._top); this._top = newTop; this._size += 1; }; pop(){if(this._size == 0){return null; }else{this._size += 1; output = top; top = output.getNext(); return output; } }; peek(){return this._top; }; size(){return this._size; }; print(){var output = []; var target = this._top; while(target != null){output.push(target.getData()); target = target.getNext(); } return output; }; };
	return Stack;
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ocs=new MODULE(()=>{
	var OCS = function(){
		var EEO = class{
			_store;
			_event;
			_keys;
			constructor(obj, event){
				this._store = {}
				this._event = event;
				this.entity = {};
				this._keys = [];

				var self = this;
				var odp = function(key){
					Object.defineProperty(self, key, {
						get: ()=>{
							return self._store[key];
						},
						set: (val)=>{
							self._store[key] = val;
							if(self._event(self.entity, key, val) != null){
								self._store[key] = val;
							}
						}
					});					
				}
				for(var key in obj){
					this._store[key] = obj[key];
					odp(key);
					this._keys.push(key);
				}

				Object.defineProperty(this, "keys", {
					get: ()=>{
						return this._keys;
					}
				});

				Object.defineProperty(this, "event", {
					get: ()=>{
						return this._event;
					}
				});
			}
		}


		var environments = new Map();
		var Environment = class{
			_name;
			constructor(name){
				this._name = name;
				Object.defineProperty(this, "name", {
					get: ()=>{
						return this._name;
					}
				});
				environments.set(name, this);
				components.set(name, new Map());
				entities.set(name, new Map());
				components_entities.set(name, new Map());
			}

			getComponent = function(name){
				return components.get(this._name).get(name);
			}
			addComponent = function(environment, component){
				var env = components.get(environment);
				env.get(component).duplicate(this._name);
			}
			hasComponent = function(component){
				return components.get(this._name).has(component);
			}
			removeComponent = function(component){
				var env = components.get(this._name);
				env.delete(component);
			}
			printComponents = function(){
				var output = [];
				components.get(this._name).forEach((component)=>{
					output.push(component.name);
				});
				return output;
			}

			addEntity = function(entity){
				return new Entity(this._name, entity);
			}
			getEntity = function(entity){
				return entities.get(this._name).get(entity);
			}
			printEntities = function(){
				var output = [];
				entities.get(this._name).forEach((entity)=>{
					output.push(entity.name);
				});
				return output;
			}

		}

		var components = new Map();
		var components_entities = new Map();
		var Component = class{
			_name;
			_builder;
			_environment;
			constructor(environment, name, builder){
				this._name = name;
				Object.defineProperty(this, "name", {
					get: ()=>{
						return this._name;
					}
				});

				this._builder = builder;
				Object.defineProperty(this, "builder", {
					get: ()=>{
						return this._builder;
					}
				});

				this._environment = environments.get(environment);
				components_entities.get(environment).set(name, new Set());
				components.get(environment).set(name, this);
			}

			getEntities = function(){
				var output = [];
				var list = components_entities.get(this._environment.name).get(this._name);
				list.forEach((entity)=>{
					output.push(entity);
				});
				return output;
			}


			printEntities = function(){
				var output = [];
				var list = components_entities.get(this._environment.name).get(this._name);
				list.forEach((entity)=>{
					output.push(entity.name);
				});
				return output;
			}

			duplicate = function(environment){
				return new Component(environment, this._name, this._builder);
			}

			destroy = function(){
				var entities = this.getEntities();
				entities.forEach((entity)=>{
					entity.removeComponent(this._name);
				});
				this._environment.removeComponent(this._name);
			}
		}

		var entities = new Map();
		var Entity = class{
			_tags;
			_name;
			_components;
			_environment;
			_limit;
			_store;
			constructor(environment, name, limit){
				this._name = name;
				Object.defineProperty(this, "name", {
					get: ()=>{
						return this._name;
					}
				});

				this._tags = new Set();
				this._components = new Set();
				this._environment = environments.get(environment);
				entities.get(environment).set(name, this);

				this._limit = limit || 2;
				this._store = {};
			}

			addTag = function(tag){
				this._tags.add(tag);
				tags_entities.get(tag).add(this);
			}
			hasTag = function(tag){
				return this._tags.has(tag);
			}
			removeTag = function(tag){
				this._tags.delete(tag);
				tags_entities.get(tag).delete(this);
			}
			printTags = function(){
				return Array.from(this._tags);
			}

			addComponent = function(component, ...params){
				var comp = this._environment.getComponent(component);
				var builder = comp.builder(...params);
				if(builder instanceof EEO){
					builder.keys.forEach((key)=>{
						this._store[key] = builder[key];
						Object.defineProperty(this, key, {
							configurable: true,
							get: ()=>{
								return this._store[key];
							},
							set: (val)=>{
								this._store[key] = val;
								builder.event(this, key, val);
							}
						});
					});
				}else{
					var traverse_builder = function(target, self, count){
						if(typeof target == "object" && target != null && count > 0){
							if(target instanceof EEO){
								target.entity = self;
							}
							for(var key in target){
								traverse_builder(target[key], self, count-1);
							}
						}
					}
					traverse_builder(builder, this, this._limit);
					for(var key in builder){
						this[key] = builder[key];
					}
				}


				this._components.add(component);
				components_entities.get(this._environment.name).get(component).add(this);
				return this;
			}
			hasComponent = function(component){
				return this._components.has(component);
			}
			removeComponent = function(component){
				var comp = this._environment.getComponent(component);
				var builder = comp.builder();
				if(builder instanceof EEO){
					builder.keys.forEach((key)=>{
						Object.defineProperty(this, key, {
							get: ()=>{},
							set: ()=>{}
						});
						delete this._store[key];
					});
				}else{
					for(var key in builder){
						delete this[key];
					}
				}

				this._components.delete(component);
				return this;
			}

			printComponents = function(){
				var output = [];
				this._components.forEach((component)=>{
					output.push(component);
				});
				return output;
			}

			destroy = function(){
				entities.get(this._environment.name).delete(this._name);
				this._components.forEach((component)=>{
					components_entities.get(this._environment.name).get(component).delete(this);
				});
				this._tags.forEach((tag)=>{
					tags_entities.get(tag).delete(this);
				});
			}
		}

		var tags = new Map();
		var tags_entities = new Map();
		var Tag = class{
			_name;
			constructor(name){
				this._name = name;
				Object.defineProperty(this, "name", {
					get: ()=>{
						return this._name;
					}
				});

				tags.set(name, this);
				tags_entities.set(name, new Set());
			}

			getEntities = function(){
				var output = [];
				var list = tags_entities.get(this._name);
				list.forEach((entity)=>{
					output.push(entity);
				});
				return output;
			}


			printEntities = function(){
				var output = [];
				var list = tags_entities.get(this._name);
				list.forEach((entity)=>{
					output.push(entity.name);
				});
				return output;
			}

			destroy = function(){
				var entities = this.getEntities();
				entities.forEach((entity)=>{
					entity.removeTag(this._name);
				});
			}
		}


		var singletons = new Map();
		var Singleton = class{
			_name;
			_instance;
			constructor(name, instance){
				this._name = name;
				Object.defineProperty(this, "name", {
					get: ()=>{
						return this._name;
					}
				});

				this._instance = instance;
				Object.defineProperty(this, "instance", {
					get: ()=>{
						return this._instance;
					}
				});

				singletons.set(name, this);
			}

			duplicate = function(name){
				return new Singleton(name, this._instance);
			}

			destroy = function(){
				singletons.delete(this._name);
			}
		}


		
		this.getEnvironment = function(name){
			return environments.get(name);
		}
		this.getComponent = function(environment, name){
			return components.get(environment).get(name);
		}
		this.getEntity = function(environment, name){
			return entities.get(environment).get(name);
		}
		this.getTag = function(name){
			return tags.get(name);
		}
		this.getSingleton = function(name){
			return singletons.get(name);
		}

		this.getAllWithComponents = function(environment, components){
			if(components instanceof Array){
				if(components.length > 1){
					var list = this.getComponent(environment, components[0]).getEntities();
					var output = [];
					var env = environments.get(environment);
					list.forEach((entity_name)=>{
						var pass = true;
						var entity = env.getEntity(entity_name);

						for(var i = components.length - 1; i>0; i--){
							if(!entity.hasComponent(components[i])){
								pass = false;
								break;
							}
						}

						if(pass){
							output.push(entity);
						}
					});
					return output;
				}else{
					return this.getComponent(environment, components[0]).getEntities();
				}
			}else{
				return this.getComponent(environment, components).getEntities();
			}
		}

		this.printAllWithComponents = function(environment, components){
			if(components instanceof Array){
				if(components.length > 1){
					var list = this.getComponent(environment, components[0]).getEntities();
					var output = [];
					var env = environments.get(environment);
					list.forEach((entity_name)=>{
						var pass = true;
						var entity = env.getEntity(entity_name);

						for(var i = components.length - 1; i>0; i--){
							if(!entity.hasComponent(components[i])){
								pass = false;
								break;
							}
						}

						if(pass){
							output.push(entity.name);
						}
					});
					return output;
				}else{
					return this.getComponent(environment, components[0]).printEntities();
				}
			}else{
				return this.getComponent(environment, components).printEntities();
			}
		}

		Object.defineProperty(this, "Environment", {
			get: ()=>{
				return Environment;
			}
		});

		Object.defineProperty(this, "Component", {
			get: ()=>{
				return Component;
			}
		});

		Object.defineProperty(this, "Entity", {
			get: ()=>{
				return Entity;
			}
		});

		Object.defineProperty(this, "Tag", {
			get: ()=>{
				return Tag;
			}
		});

		Object.defineProperty(this, "EEO", {
			get: ()=>{
				return EEO;
			}
		});

		Object.defineProperty(this, "Singleton", {
			get: ()=>{
				return Singleton;
			}
		});
	}

	return new OCS();
});


var _graphics=new MODULE(()=>{
	return function(PIXI, canvases){
		var env = "engine2d-graphics";
		new ocs.Environment(env);

		var pos = new ocs.Component(env, 'position', (x, y)=>{
			return new ocs.EEO({
				x: x || 0,
				y: y || 0
			}, (entity)=>{
				containers.get(entity.container).draw();
			});
		});

		var color = new ocs.Component(env, 'color', (color)=>{
			return new ocs.EEO({
				color: color || 0xffffff
			}, (entity)=>{
				containers.get(entity.container).draw();	
			});
		});

		var alpha = new ocs.Component(env, 'alpha', (alpha)=>{
			return new ocs.EEO({
				alpha: alpha || 1
			}, (entity)=>{
				containers.get(entity.container).draw();
			});
		});

		var container = new ocs.Component(env, 'container', (container)=>{
			return new ocs.EEO({
				container: container
			}, (entity)=>{
				containers.get(entity.container).draw();
			});
		});



		var containers = new Map();
		var Container = function(name, canvas){
			containers.set(name, this);
			this.name = name;
			this.canvas = canvas;
			this.shapes = new Map();
			this.graphics = new PIXI.Graphics();
			this.clear = true;
			canvas.stage.addChild(this.graphics);
			canvas.containers.add(name);

			this.draw = function(){
				if(this.clear) this.graphics.clear();

				this.shapes.forEach((shape)=>{
					if(shape.hasTag('circle')){
						this.graphics.beginFill(shape.color, shape.alpha);
						this.graphics.drawCircle(shape.x, shape.y, shape.radius);
						this.graphics.endFill();
					}else if(shape.hasTag('rectangle')){
						this.graphics.beginFill(shape.color, shape.alpha);
						this.graphics.drawRect(shape.x, shape.y, shape.width, shape.height);
					}else if(shape.hasTag('box')){
						this.graphics.beginFill(shape.color, shape.alpha);
						this.graphics.drawRoundedRect(shape.x, shape.y, shape.width, shape.height, shape.radius);
					}else if(shape.hasTag('line')){
						this.graphics.lineStyle(shape.thickness, shape.color, shape.alpha);
						this.graphics.moveTo(shape.x, shape.y);
						this.graphics.lineTo(shape.x2, shape.y2);
					}else if(shape.hasTag('ellipse')){
						this.graphics.beginFill(shape.color, shape.alpha);
						this.graphics.drawEllipse(shape.x, shape.y, shape.width, shape.height);
						this.graphics.endFill();
					}else if(shape.hasTag('torus')){
						var radius = shape;
						this.graphics.beginFill(shape.color, shape.alpha);
						this.graphics.drawTorus(shape.x, shape.y, radius.innerRadius, radius.radius);
						this.graphics.endFill();
					}else if(shape.hasTag('polygon')){
						this.graphics.beginFill(shape.color, shape.alpha);
						this.graphics.drawPolygon(shape.points);
						this.graphics.endFill();
					}
				});
			}

			this.add = function(shape){
				this.shapes.set(shape.name, shape);
				this.graphics.clear();
				this.draw();
			}

			new ocs.Tag(name);
		}

		var radius = new ocs.Component(env, 'radius', (r, r2)=>{
			return new ocs.EEO({
				radius: r || 10,
				innerRadius: r2 || null
			}, (entity)=>{
				containers.get(entity.container).draw();
			});
		});

		new ocs.Tag('circle');
		var new_circle = function(name, container, x, y, radius, color){
			var new_circle = new ocs.Entity(env, `${name}╎${container}`)
			new_circle.addComponent('container', container)
				      .addComponent('position', x, y)
					  .addComponent('radius', radius)
					  .addComponent('color', color)
					  .addComponent('alpha')
					  .addTag('circle');

			containers.get(container).add(new_circle);
		}

		var scale = new ocs.Component(env, 'scale', (width, height)=>{
			return new ocs.EEO({
				width: width || 10,
				height: height || 10
			}, (entity)=>{
				containers.get(entity.container).draw();
			});
		});


		new ocs.Tag('rectangle');
		var new_rectangle = function(name, container, x, y, width, height, color){
			var new_rectangle = new ocs.Entity(env, `${name}╎${container}`)
			new_rectangle.addComponent('container', container)
				    	 .addComponent('position', x, y)
						 .addComponent('scale', width, height)
						 .addComponent('color', color)
					 	 .addComponent('alpha')
					 	 .addTag('rectangle');

			containers.get(container).add(new_rectangle);
		}

		var borderRadius = new ocs.Component(env, 'borderRadius', (radius)=>{
			return new ocs.EEO({
				borderRadius: radius || 0
			}, (entity)=>{
				containers.get(entity.container).draw();
			})
		});


		new ocs.Tag('box');
		var new_box = function(name, container, x, y, width, height, color, borderRadius){
			var new_box = new ocs.Entity(env, `${name}╎${container}`)
			new_box.addComponent('container', container)
				   .addComponent('position', x, y)
				   .addComponent('scale', width, height)
				   .addComponent('color', color)
				   .addComponent('borderRadius', borderRadius)
				   .addComponent('alpha')
				   .addTag('box');

			containers.get(container).add(new_box);
		}

		var pos2 = new ocs.Component(env, 'position2', (x, y)=>{
			return new ocs.EEO({
				x2: x || 0,
				y2: y || 0
			}, (entity)=>{
				containers.get(entity.container).draw();
			});
		});

		var thickness = new ocs.Component(env, 'thickness', (thickness)=>{
			return new ocs.EEO({
				thickness: thickness || 1
			}, (entity)=>{
				containers.get(entity.container).draw();
			});
		});

		new ocs.Tag('line');
		var new_line = function(name, container, x1, y1, x2, y2, color){
			var new_line = new ocs.Entity(env, `${name}╎${container}`)
			new_line.addComponent('container', container)
				    .addComponent('position', x1, y1)
					.addComponent('position2', x2, y2)
					.addComponent('color', color)
					.addComponent('thickness')
					.addComponent('alpha')
					.addTag('line');

			containers.get(container).add(new_line);
		}

		new ocs.Tag('ellipse');
		var new_ellipse = function(name, container, x, y, width, height, color){
			var new_ellipse = new ocs.Entity(env, `${name}╎${container}`)
			new_ellipse.addComponent('container', container)
				       .addComponent('position', x, y)
					   .addComponent('scale', width, height)
					   .addComponent('color', color)
					   .addComponent('alpha')
					   .addTag('ellipse');

			containers.get(container).add(new_ellipse);
		}

		new ocs.Tag('torus');
		var new_torus = function(name, container, x, y, innerRadius, outerRadius, color){
			var new_torus = new ocs.Entity(env, `${name}╎${container}`)
			new_torus.addComponent('container', container)
				     .addComponent('position', x, y)
					 .addComponent('radius', outerRadius, innerRadius)
					 .addComponent('color', color)
					 .addComponent('alpha')
					 .addTag('torus');

			containers.get(container).add(new_torus);
		}

		var points = new ocs.Component(env, 'points', (points)=>{
			return new ocs.EEO({
				points: points || [new PIXI.Point(0,0), new PIXI.Point(10, 0), new PIXI.Point(10, 10)]
			}, (entity)=>{
				containers.get(entity.container).draw();
			});
		});

		new ocs.Tag('polygon');
		var new_polygon = function(name, container, color, points){
			var new_polygon = new ocs.Entity(env, `${name}╎${container}`)
			new_polygon.addComponent('container', container)
				       .addComponent('color', color)
					   .addComponent('alpha')
					   .addComponent('points', points)
					   .addTag('polygon');
		 
			containers.get(container).add(new_polygon);
		}



		var container_check = function(container, action){
			if(containers.has(container)){
				return action(containers.get(container));
			}else{
				debug.error("ReferenceError", `graphics container (${container}) does not exist`);
			}
		}

		return {
			add: {
				container: (name, canvas)=>{
					new Container(name, canvas);
				},

				circle: (name, container, x, y, radius, color)=>{
					new_circle(name, container, x, y, radius, color);
				},

				rectangle: (name, container, x, y, width, height, color)=>{
					new_rectangle(name, container, x, y, width, height, color);
				},

				box: (name, container, x, y, width, height, color, borderRadius)=>{
					new_box(name, container, x, y, width, height, color, borderRadius);
				},

				line: (name, container, x1, y1, x2, y2, color)=>{
					new_line(name, container, x1, y1, x2, y2, color);
				},

				ellipse: (name, container, x, y, width, height, color)=>{
					new_ellipse(name, container, x, y, width, height, color);
				},

				torus: (name, container, x, y, width, height, color)=>{
					new_torus(name, container, x, y, width, height, color);	
				},

				polygon: (name, container, color, points)=>{
					new_polygon(name, container, color, points);	
				}
			},

			get: (name, container)=>{
				return container_check(container, (cntnr)=>{
					return cntnr.shapes.get(`${name}╎${container}`);
				});
			},

			delete: {
				container: (container)=>{
					return container_check(container, (cntnr)=>{
						cntnr.shapes.forEach((shape)=>{
							ocs.getEntity(env, shape.name).destroy();
						});
						cntnr.graphics.clear();
						cntnr.graphics.destroy();
					});	
				},
				shape: (name, container)=>{
					return container_check(container, (cntnr)=>{
						cntnr.shapes.delete(`${name}╎${container}`);
					});	
				}
			},

			containerClear: (container, clear)=>{
				return container_check(container, (cntnr)=>{
					if(clear != null){
						cntnr.clear = clear;
					}
					return cntnr.clear;
				});
			}
		}
	}
});

engine2d=new MODULE(()=>{
	var canvases = new Map();
	var new_canvas = function(name, config){
	    if(config.resolution == null){
	        config.resolution = 1;
	    }else{
	        config.resolution /= window.outerHeight;
	    }

	    if(config.antialias == null){
	        config.antialias = true;
	    }

	    if(config.powerPreference == null){
	        config.powerPreference = 'low-power';
	    }

	    var scale = 1;

	    if(config.defaultResolution){
	        scale = window.outerHeight / config.defaultResolution;
	    }

	    if(config.width == null){
	        config.width = window.outerWidth;
	    }

	    if(config.height == null){
	        config.height = window.outerHeight;
	    }

	    var new_ctx = new PIXI.Application({
	        width: config.width / scale,
	        height: config.height / scale, 
	        backgroundAlpha: 0,
	        powerPreference: config.powerPreference,
	        antialias: config.antialias,
	        transparent: true,
	        resolution: config.resolution
	    });
	    document.body.appendChild(new_ctx.view);
	    new_ctx.view.style.width = config.width + "px";
	    new_ctx.view.style.height = config.height + 'px';
	    if(config.y != null){
	        new_ctx.view.style.top = config.y+"px";
	    }else{
	        new_ctx.view.style.top = "0px";
	    }

	    if(config.x != null){
	        new_ctx.view.style.left = config.x+"px";
	    }else{
	        new_ctx.view.style.left = "0px";
	    }

	    canvases.set(name, new_ctx);

	    new_ctx.started = false;

	    if(config.preload != null){
	        config.preload();
	        start_load(name);
	    }

	    ///////////////////////////////////////////
	    new_ctx.images = new Map();
	    new_ctx.texts = new Map();
	    new_ctx.textboxes = new Map();
	    new_ctx.containers = new Set();
	    //////////////////////////////////////////

	    if(config.create != null){
	        config.create();
	    }

	    if(config.update == null){
	        config.update = ()=>{};
	    }
	    if(config.render == null){
	        config.render = ()=>{};
	    }

	    new_ctx.update_events = new Map();
	    new_ctx.render_events = new Map();

	    if(config.update != null){
	        new_ctx.update_events.set('config', config.update);
	    }

	    if(config.render != null){
	        new_ctx.render_events.set('config', config.render);
	    }


	    new_ctx.view.style.zIndex = 0;
	    Object.defineProperty(new_ctx, "zIndex", {
	        get: ()=>{
	            return new_ctx.view.style.zIndex;
	        }, set: (val)=>{
	            new_ctx.view.style.zIndex = val;
	        }
	    })


	    new_ctx.fpsTimer = window.performance.now();
	    new_ctx.fpsMax = -Infinity;
	    new_ctx.fpsMin = Infinity;
	    new_ctx.fpsBoundsWaitCounter = 120;
	    new_ctx.fps = 0;

	    var MAXSAMPLES = config.fpsBuffer || 1000;

	    new_ctx.tickindex = 0;
	    new_ctx.ticksum = 0;
	    new_ctx.ticklist = [MAXSAMPLES];
	    new_ctx.ticklist_size = 0;
	    new_ctx.fpsAvg = 0;

	    new_ctx.calcAverageTick = function(newtick){
	        if(new_ctx.ticklist_size == MAXSAMPLES){
	            new_ctx.ticksum -= new_ctx.ticklist[new_ctx.tickindex];  /* subtract value falling off */
	        }else{
	            new_ctx.ticklist_size += 1;
	        }
	        new_ctx.ticksum += newtick;              /* add new value */
	        new_ctx.ticklist[new_ctx.tickindex] = newtick;   /* save new value so it can be subtracted later */
	        new_ctx.tickindex += 1;
	        if(new_ctx.tickindex == MAXSAMPLES){/* inc buffer index */
	            new_ctx.tickindex = 0;
	        }    

	        /* return average */
	        if(new_ctx.ticklist_size == MAXSAMPLES){
	            return Math.floor(new_ctx.ticksum/MAXSAMPLES);
	        }else{
	            return Math.floor(new_ctx.ticksum/new_ctx.ticklist_size);
	        }
	    }


	    new_ctx.update = setInterval(()=>{
	        new_ctx.update_events.forEach((event)=>{
	            event();
	        });
	    }, 1000/(config.poll || 64));


	    new_ctx.ticker.add(()=>{
	        var diff = window.performance.now(new_ctx.fpsTimer);
	        new_ctx.fps = Math.floor(1e9 / (diff[0] * 1e9 + diff[1]));
	        new_ctx.fpsAvg = new_ctx.calcAverageTick(new_ctx.fps);
	        if(new_ctx.fpsBoundsWaitCounter == 0){
	            if(new_ctx.fps > new_ctx.fpsMax){
	                new_ctx.fpsMax = new_ctx.fps;
	            }
	            if(new_ctx.fps < new_ctx.fpsMin){
	                new_ctx.fpsMin = new_ctx.fps;
	            }
	        }else{
	            new_ctx.fpsBoundsWaitCounter -= 1;
	        }
	        new_ctx.fpsTimer = window.performance.now();

	        if(load_queue == 0){
	            new_ctx.started = true;
	        }

	        new_ctx.render_events.forEach((event)=>{
	            event();
	        });
	    });
	}


	var load_queue = 0;
	var textures = new Map();
	var loading_textures = new Map();
	var load_image = function(canvas, key, path){
	    load_queue += 1;
	    var ctx = canvases.get(canvas);
	    loading_textures.set(key, []);
	    ctx.loader.add(key, path);
	}

	var start_load = function(canvas){
	    canvases.get(canvas).loader.load((loader, resources)=>{
	        for(var prop in resources){
	            textures.set(prop, resources[prop].texture);
	            loading_textures.get(prop).forEach((action)=>{
	                action();
	            });
	            loading_textures.delete(prop);
	            load_queue -= 1;
	            console.log(`engine2d succesfully loaded: ${prop}`);
	        }
	    });
	}



	// ocs ///////////////////////////////////////////////////
	var env = new ocs.Environment('engine2d');

	new ocs.Component('engine2d', 'pixi', (pixi)=>{
	    return{
	        pixi: pixi
	    }
	});


	var position = new ocs.Component('engine2d', "position", (x, y)=>{
	    return new ocs.EEO({
	        x: x || 0,
	        y: y || 0
	    }, (entity, key, val)=>{
	        entity.pixi[key] = val;
	    });
	});


	var rotation = new ocs.Component('engine2d', "rotation", (r)=>{
	    return new ocs.EEO({
	        rotation: r || 0
	    }, (entity, key, val)=>{
	        entity.pixi.rotation = val;
	    });
	});

	var anchor = new ocs.Component('engine2d', "anchor", (x, y)=>{
	    return {
	        anchor: new ocs.EEO({
	                x: x || 0,
	                y: y || 0
	            }, (entity, key, val)=>{
	                entity.pixi.anchor[key] = val;
	            })
	    }
	});


	var alpha = new ocs.Component('engine2d', "alpha", (alpha)=>{
	    return new ocs.EEO({
	        alpha: 1 || alpha
	    }, (entity, key, val)=>{
	        entity.pixi.alpha = val;
	    });
	});

	var scale = new ocs.Component('engine2d', "scale", (width, height)=>{
	    return new ocs.EEO({
	        width: width,
	        height: height
	    }, (entity, key, val)=>{
	        entity.pixi[key] = val;
	    });
	});



	var add_image = function(canvas, name, x, y, key, onComplete){
	    if(textures.has(key)){
	        var ctx = canvases.get(canvas);
	        var new_img = new PIXI.Sprite(ctx.loader.resources[key].texture);

	        var new_entity = new ocs.Entity('engine2d', `${name}╎${canvas}╎image`)
	        new_entity.addComponent('pixi', new_img)
	                  .addComponent('position', x, y)
	                  .addComponent('rotation')
	                  .addComponent('anchor')
	                  .addComponent('alpha')
	                  .addComponent('scale', new_img.width, new_img.height);

	        new_entity.pixi.x = x;
	        new_entity.pixi.y = y;

	        ctx.stage.addChild(new_img);
	        if(onComplete!=null){
	            onComplete(new_entity);
	        }
	        ctx.images.set(name, new_entity)
	    }else if(loading_textures.has(key)){
	        console.log(`waiting for texture (${key}) to load`);
	        loading_textures.get(key).push(()=>{add_image(canvas, name, x, y, key, onComplete);});
	    }else{
	        debug.warn("ReferenceError", `texture (${key}) is not loaded or in load queue`);
	    }
	}


	var get_image = function(canvas, name){
	    var ctx = canvases.get(canvas);
	    if(ctx.images.has(name)){
	        return ctx.images.get(name);
	    }else{
	        debug.warn('ReferenceError', `image (${name}) in canvas (${canvas}) does not exist`);
	        return null;
	    }
	}


	var delete_image = function(canvas, name){
	    var ctx = canvases.get(canvas);
	    if(ctx.images.has(name)){
	        ocs.getEntity('engine2d', `${name}╎${canvas}╎image`).destroy();
	        ctx.images.get(name).pixi.destroy();
	        ctx.images.delete(name);
	    }else{
	        debug.warn('ReferenceError', `image (${name}) does not exist`);
	    }
	}




	/////////////////////////////////////////////////////////////////////////////////////////////////////
	var text = new ocs.Component('engine2d', "text", (text)=>{
	    return new ocs.EEO({
	        text: text
	    }, (entity, key, val)=>{
	        entity.pixi.text = val;    
	    });
	});

	var style = new ocs.Component('engine2d', "style", (fontSize, color)=>{
	    return new ocs.EEO({
	        fontSize: fontSize,
	        fontFamily: "Trebuchet",
	        fill: 0xffffff,
	        align: 'left',
	        stroke: color || "black",
	        strokeThickness: 0,
	        letterSpacing: 0,
	        lineHeight: fontSize + 2
	    }, (entity, key, val)=>{
	        entity.pixi.style[key] = val;
	    });
	});


	var add_text = function(canvas, name, x, y, text, fontSize, onComplete){
	    var ctx = canvases.get(canvas);
	    var new_txt = new PIXI.Text(text, {
	        fontSize: fontSize,
	        fill: 0xffffff,
	        fontFamily: "Trebuchet"
	    });

	    new_txt.x = x;
	    new_txt.y = y;

	    var new_entity = new ocs.Entity('engine2d', `${name}╎${canvas}╎text`)
	    new_entity.addComponent('pixi', new_txt)
	              .addComponent('position', x, y)
	              .addComponent('scale', new_txt.width, new_txt.height)
	              .addComponent('rotation')
	              .addComponent('anchor')
	              .addComponent('alpha')
	              .addComponent('style', fontSize)
	              .addComponent('text', text);


	    ctx.stage.addChild(new_txt);
	    if(onComplete!=null){
	        onComplete(new_entity);
	    }
	    ctx.texts.set(name, new_entity);
	}

	var get_text = function(canvas, name){
	    var ctx = canvases.get(canvas);
	    if(ctx.texts.has(name)){
	        return ctx.texts.get(name);
	    }else{
	        debug.warn('ReferenceError', `text (${name}) in canvas (${canvas}) does not exist`);
	        return null;
	    }
	}

	var delete_text = function(canvas, name){
	    var ctx = canvases.get(canvas);
	    if(ctx.texts.has(name)){
	        ocs.getEntity('engine2d', `${name}╎${canvas}╎text`).destroy();
	        ctx.texts.get(name).pixi.destroy();
	        ctx.texts.delete(name);
	    }else{
	        debug.warn('ReferenceError', `text (${name}) in canvas (${canvas}) does not exist`);
	    }
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var textbox_env = new ocs.Environment('engine2d-textbox');


	new ocs.Component('engine2d-textbox', 'textbox', (textbox)=>{
	    return {
	        textbox: textbox
	    }
	});

	var textbox_position = new ocs.Component('engine2d-textbox', 'position', (x, y)=>{
	    return new ocs.EEO({
	        x: x,
	        y: y
	    }, (entity, key, val)=>{
	        if(key == "x"){
	            entity.getComponent('style').style.left = val + "px";
	        }else{
	            entity.getComponent('style').style.top = val + "px";
	        }
	    });
	});


	var textbox_fontSize = new ocs.Component('engine2d-textbox', 'fontSize', (fontSize)=>{
	    return new ocs.EEO({
	        fontSize: fontSize
	    }, (entity, key, val)=>{
	        entity.style.fontSize = val + "px";
	    });
	});

	var textbox_width = new ocs.Component('engine2d-textbox', 'width', (width)=>{
	    return new ocs.EEO({
	        width: width
	    }, (entity, key, val)=>{
	        entity.style.width = val + "px";
	    });
	});

	var textbox_value = new ocs.Component('engine2d-textbox', 'value', (value)=>{
	    return new ocs.EEO({
	        value: value
	    }, (entity, key, val)=>{
	        entity.textbox.value = val;
	    });
	});

	var textbox_style = new ocs.Component('engine2d-textbox', 'style', (textbox)=>{
	    return {
	        style: textbox
	    }
	});


	var textbox_events = new ocs.Component('engine2d-textbox', 'events', ()=>{
	    return {
	        onkeypress: ()=>{},
	        onfocus: ()=>{},
	        onblur: ()=>{}
	    }
	});


	var add_textbox = function(canvas, name, x, y, onComplete){
	    new_ctx = canvases.get(canvas);
	    var new_ctx_x = engine2d.canvas.xPos(canvas);
	    var new_ctx_y = engine2d.canvas.yPos(canvas);

	    var input = document.createElement("input");
	    var style = input.style;
	    style.position = 'absolute';
	    style.top = (y + new_ctx_y) + "px";
	    style.left = (x + new_ctx_x) + "px";
	    style.border = "3px solid #666666";
	    style.backgroundColor = "#333333";
	    style.color = "#ffffff";
	    style.borderRadius = "4px";
	    style.fontSize = "20px";
	    style.outline = "none";
	    style.padding = "3px";
	    style.width = "100px";
	    style.fontFamily = "Trebuchet";
	    document.getElementsByTagName('html')[0].appendChild(input);

	    Object.defineProperty(input, "x", {
	        get: ()=>{
	            var left = input.style.left;
	            return JSON.parse(left.substring(0, left.lengt-3) - new_ctx_x);
	        },
	        set: (val)=>{
	            input.style.left = (val + new_ctx_x) + "px";
	        }
	    });

	    Object.defineProperty(input, "y", {
	        get: ()=>{
	            var top = input.style.top;
	            return JSON.parse(top.substring(0, top.lengt-3) - new_ctx_y);
	        },
	        set: (val)=>{
	            input.style.top = (val + new_ctx_y) + "px";
	        }
	    });


	    var new_textbox = new ocs.Entity('engine2d-textbox', `${name}╎${canvas}╎textbox`)
	    new_textbox.addComponent('textbox', input)
	               .addComponent('style', input.style)
	               .addComponent('position', x + new_ctx_x, y + new_ctx_y)
	               .addComponent('fontSize', 19)
	               .addComponent('width', 100)
	               .addComponent('value', input.value)
	               .addComponent('events');

	    input.starting_value = "";
	    input.onkeydown = (e)=>{
	        new_textbox.getComponent('value').value = input.value;
	        new_textbox.getComponent('events').onkeypress();
	        if(e.key == "Enter"){
	            input.starting_value = input.value;
	            input.blur();
	        }else if(e.key == "Escape"){
	            input.value = input.starting_value;
	            new_textbox.getComponent('value').value = input.value;
	            input.blur();
	        }
	    }
	    input.onfocus = ()=>{
	        new_textbox.getComponent('events').onfocus();
	    }
	    input.onblur = ()=>{
	        new_textbox.getComponent('events').onblur();
	    }


	    new_ctx.textboxes.set(name, new_textbox);

	    if(onComplete != null){
	        onComplete(new_textbox);
	    }
	}

	var get_textbox = function(canvas, name){
	    var ctx = canvases.get(canvas);
	    if(ctx.textboxes.has(name)){
	        return ctx.textboxes.get(name);
	    }else{
	        debug.warn('ReferenceError', `textbox (${name}) in canvas (${canvas}) does not exist`);
	        return null;
	    }
	}

	var delete_textbox = function(canvas, name){
	    var ctx = canvases.get(canvas);
	    if(ctx.textboxes.has(name)){
	        ocs.getEntity('engine2d textbox', `${name}╎${canvas}╎textbox`).destroy();
	        ctx.textboxes.get(name).pixi.destroy();
	        ctx.textboxes.delete(name);
	    }else{
	        debug.warn('ReferenceError', `textbox (${name}) in canvas (${canvas}) does not exist`);
	    }
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	var graphics = _graphics(PIXI, canvases);

	return {
	    newCanvas: (name, config)=>{
	        new_canvas(name, config);
	    },

	    loadQueue: {
	        image: function(canvas, key, path){
	            load_image(canvas, key, path);
	        },

	        load: (canvas)=>{
	            start_load(canvas);
	        }
	    },

	    add:{
	        image: function(canvas, name, x, y, key, onComplete){
	            add_image(canvas, name, x, y, key, onComplete);
	        },


	        text: function(canvas, name, x, y, text, fontSize, onComplete){
	            add_text(canvas, name, x, y, text, fontSize, onComplete);
	        },

	        textbox: function(canvas, name, x, y, onComplete){
	            add_textbox(canvas, name, x, y, onComplete);
	        }
	    },

	    get: {
	        image: function(canvas, name){
	            return get_image(canvas, name);
	        },

	        text: function(canvas, name){
	            return get_text(canvas, name);
	        },

	        textbox: function(canvas, name){
	            return get_textbox(canvas, name);
	        },

	        canvas: function(name){
	            return canvases.get(name).view;
	        }
	    },

	    delete: {
	        image: function(canvas, name){
	            return delete_image(canvas, name);
	        },

	        text: function(canvas, name){
	            return delete_text(canvas, name);
	        },

	        textbox: function(canvas, name){
	            return delete_textbox(canvas, name);
	        }
	    },

	    performance: {
	        fps: (canvas)=>{
	            return canvases.get(canvas).fps;
	        },

	        fpsMin: (canvas)=>{
	            return canvases.get(canvas).fpsMin;
	        },

	        fpsMax: (canvas)=>{
	            return canvases.get(canvas).fpsMax;
	        },

	        fpsAvg: (canvas)=>{
	            return canvases.get(canvas).fpsAvg;
	        }
	    },

	    graphics: {
	        add: {
	            container: (name, canvas)=>{
	                graphics.add.container(name, canvases.get(canvas));
	            },
	            circle: (...params)=>{
	                graphics.add.circle(...params);
	            },
	            rectangle: (...params)=>{
	                graphics.add.rectangle(...params);
	            },
	            box: (...params)=>{
	                graphics.add.box(...params);
	            },
	            line: (...params)=>{
	                graphics.add.line(...params);
	            },
	            ellipse: (...params)=>{
	                graphics.add.ellipse(...params);
	            },
	            torus: (...params)=>{
	                graphics.add.torus(...params);
	            },
	            polygon: (...params)=>{
	                graphics.add.polygon(...params);
	            },
	        },
	        get: graphics.get,
	        delete: graphics.delete,
	        containerClear: graphics.containerClear
	    },

	    update: {
	        add: function(canvas, name, event){
	            canvases.get(canvas).update_events.set(name, event);
	        },

	        remove: function(canvas, name){
	            canvases.get(canvas).update_events.delete(name);
	        }
	    },

	    render: {
	        add: function(canvas, name, event){
	            canvases.get(canvas).render_events.set(name, event);
	        },

	        remove: function(canvas, name){
	            canvases.get(canvas).render_events.delete(name);
	        }
	    },

	    canvas: {
	        xPos: function(canvas, x){
	            var ctx = canvases.get(canvas);
	            if(x != null){
	                ctx.view.style.left = x + "px";
	                return x;
	            }else{
	                var str = ctx.view.style.left;
	                return JSON.parse(str.substring(0, str.length-2))
	            }
	        },

	        yPos: function(canvas, y){
	            var ctx = canvases.get(canvas);
	            if(y != null){
	                ctx.view.style.top = y + "px";
	                return y;
	            }else{
	                var str = ctx.view.style.top;
	                return JSON.parse(str.substring(0, str.length-2))
	            }
	        },

	        width: function(canvas, width){
	            var ctx = canvases.get(canvas);
	            if(width != null){
	                ctx.view.style.width = width + "px";
	                var height_str = ctx.view.style.height;
	                ctx.renderer.resize(width, JSON.parse(height_str.substring(0, height_str.length-2)));
	                return width;
	            }else{
	                var str = ctx.view.style.width;
	                return JSON.parse(str.substring(0, str.length-2))
	            }
	        },

	        height: function(canvas, height){
	            var ctx = canvases.get(canvas);
	            if(height != null){
	                ctx.view.style.height = height + "px";
	                var width_str = ctx.view.style.width;
	                ctx.renderer.resize(JSON.parse(width_str.substring(0, width_str.length-2)), height);
	                return height;
	            }else{
	                var str = ctx.view.style.height;
	                return JSON.parse(str.substring(0, str.length-2))
	            }
	        },


	        zIndex: function(canvas, zIndex){
	            var ctx = canvases.get(canvas);
	            if(zIndex != null){
	                ctx.zIndex = zIndex;
	            }
	            return ctx.zIndex;
	        },

	        get: function(canvas){
	            return canvases.get(canvas);
	        },

	        destroy: function(canvas){
	            var ctx = canvases.get(canvas);
	            clearInterval(ctx.update);
	            ctx.images.forEach((image)=>{
	                delete_image(canvas, image.name.substring(0, image.name.indexOf("╎")));
	            });
	            ctx.texts.forEach((text)=>{
	                delete_text(canvas, text.name.substring(0, text.name.indexOf("╎")));
	            });
	            ctx.textboxes.forEach((textbox)=>{
	                delete_textbox(canvas, textbox.name.substring(0, textbox.name.indexOf("╎")));
	            })
	            ctx.containers.forEach((container)=>{
	                graphics.delete.container(container);
	            });

	            canvases.delete(canvas);
	            ctx.destroy(true, {stageOptions: true});
	        }
	    },

	    expose: function(){
	        return PIXI;
	    }
	}

});

audioManager=new MODULE(()=>{
	var audios = new Map();
	var Audio = function(name, path){
		if(audios.has(name)){
			debug.error('Overwrite', `Audio ${name} already exists`);
		}

		audios.set(name, this);


		this.name = name;
		this.path = path;
		this.DATA = {
			x: 0,
			y: 0,
			z: 0,
			loaded: false,
		}
		
		this.DATA.howl = new Howl({
			src: [path],
			onload: ()=>{
				this.DATA.loaded = true;
			}
		});

		this.play = function(){
			this.DATA.howl.play();
			if(!this.DATA.loaded){
				console.log(`waiting for Audio (${this.name}) to load`);		
			}
		}

		this.pause = function(){
			this.DATA.howl.pause();
		}

		this.stop = function(){
			this.DATA.howl.stop();
		}

		this.fade = function(from, to, duration){
			this.DATA.howl.fade(from, to, duration);
		}


		Object.defineProperty(this, "x", {
			get: ()=>{
				return this.DATA.x;
			},
			set: (val)=>{
				this.DATA.x = val;
				this.DATA.howl.pos(this.DATA.x, this.DATA.y, this.DATA.z);
			}
		});

		Object.defineProperty(this, "y", {
			get: ()=>{
				return this.DATA.y;
			},
			set: (val)=>{
				this.DATA.y = val;
				this.DATA.howl.pos(this.DATA.x, this.DATA.y, this.DATA.z);
			}
		});

		Object.defineProperty(this, "z", {
			get: ()=>{
				return this.DATA.z;
			},
			set: (val)=>{
				this.DATA.z = val;
				this.DATA.howl.pos(this.DATA.x, this.DATA.y, this.DATA.z);
			}
		});

		Object.defineProperty(this, "volume", {
			get: ()=>{
				return this.DATA.howl.volume();
			},
			set: (val)=>{
				this.DATA.volume = val;
				this.DATA.howl.volume(val);
			}
		});

		Object.defineProperty(this, "length", {
			get: ()=>{
				return this.DATA.howl.duration();
			}
		});

		Object.defineProperty(this, "time", {
			get: ()=>{
				return this.DATA.howl.seek();
			},
			set: (val)=>{
				this.DATA.howl.seek(val);
			}
		});

		Object.defineProperty(this, "speed", {
			get: ()=>{
				return this.DATA.howl.rate();
			},
			set: (val)=>{
				this.DATA.howl.rate(val);
			}
		});

		Object.defineProperty(this, "loaded", {
			get: ()=>{
				return this.DATA.loaded;
			}
		});

		Object.defineProperty(this, "loop", {
			get: ()=>{
				return this.DATA.howl.loop();
			},
			set: (val)=>{
				this.DATA.howl.loop(val);
			}
		});
	}

	var set_volume = function(volume){
		Howler.volume(volume);
	}



	return {
		Audio: Audio,
		setGlobalVolume: (volume)=>{
			set_volume(volume);
		},

		get: (name)=>{
			if(!audios.has(name)){
				return audios.get(name);
			}else{
				debug.error('ReferenceError', `Audio ${name} doesn't exists`);
			}
		},

		delete: (name)=>{
			if(audios.has(name)){
				var audio_target = audios.get(name);
				var index = Howler._howls.indexOf(audio_target);
				if(index){
					Howler._howls.splice(index, 1);
				}
				audios.delete(name);
			}else{
				debug.error('ReferenceError', `Audio ${name} doesn't exists`);
			}
		}
	};
});