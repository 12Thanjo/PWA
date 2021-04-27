// new Special_Card('Start', "#000000", ()=>{
// 	while(queue.length > 0){
// 		show_cards(queue[queue.length-1]);
// 		queue.pop();
// 	}
// });
new Special_Card('Back', "#111111", ()=>{
    if(queue.length != 0){
		show_cards(queue[queue.length-1]);
		queue.pop();
    }else{
        show_cards(default_aac);
    }
});

// Me
new Card("Me", cyan, ["I __", "me", "my", "I"]);
    new Card("I", teal);
    new Card("I __", teal, ["I want __", "I am", "I have"]);
        new Card("I want __", cyan, ["I want", "I want to", "I want a", "I want some"]).label("want");
            new Card("I want", cyan).label("want");
            new Card("I want to", blue).label("to");
            new Card("I want a", blue).label("a");
            new Card("I want some", blue).label("some");
        new Card("I am", gray_blue);
        new Card("I have", navy);
    new Card("me", blue);
    new Card("my", blue);

// Actions
new Card('Actions', purple, ["Future", "Sports", "eat", 'go', 'go to', 'help', 'get', 'sleep']);
    new Card('Future', gray_blue, ['going to', 'will']);
        new Card("going to", pink).size(2, 3.8);
        new Card("will", purple);
    new Card("Sports", green, ["run", "tennis"]);
        new Card("run", yellow).text("go for a run");
        new Card("tennis", green).text("play tennis");
	new Card("eat", purple);
	new Card("go", pink);
    new Card("go to", pink);
    new Card("get", dark_purple);
    new Card("sleep", navy);
    new Card("help", muted_red);

// Locations
new Card('Locations', green, ['Skidmore', 'Home', "Supermarket", "CVS"]).size(1.8, 3);
    new Card("Home", light_green);
    new Card("Skidmore", dark_green, ["Trails", "Apartment", "IT", "Case", "DHall", "Howe", "Zankel"]).size(1.8, 3.2);
        new Card("Trails", brown, ['North Woods', "SMBA"]);
            new Card("North Woods", brown);
            new Card("SMBA", brown).text("the SMBA trails");
        new Card("Apartment", light_green, ['my apartment', 'our apartment', 'the apartment']).size(1.6, 2.7);
            new Card("my apartment", light_green).label("my");
            new Card("our apartment", light_green).label("our");
            new Card("the apartment", light_green).label("the");
        new Card("IT", dark_green);
        new Card("Case", dark_green);
        new Card("DHall", dark_green);
        new Card("Howe", dark_green);
        new Card("Zankel", dark_green);
    new Card("Supermarket", purple).size(1.3, 2.4).text("the Supermarket");
    new Card("CVS", muted_red);

// Things
new Card("Things", dark_yellow, ["food", "computer", "trombone"]);
    new Card("food", dark_green);
    new Card("computer", gray).size(1.8, 3.2);
    new Card("trombone", dark_yellow).size(1.8, 3.2);

// People
new Card("People", muted_blue, ["Names", 'you', 'your', "their", "our"]);
    new Card("Names", cyan, ["Kylie", "Payton", "Nate", "Feldmom", "Joshua"]);
        new Card("Kylie", dark_green);
        new Card("Payton", dark_green);
        new Card("Nate", dark_green);
        new Card("Feldmom", orange).size(1.8, 3.2);
        new Card("Joshua", orange);
    new Card("you", muted_blue);
    new Card("your", muted_blue);
    new Card("their", muted_blue);
    new Card("our", sky);

// Questions
new Card("Questions", pink, ["who", "what", "where", "when", "why", "how", "is", 'please', "can"]).size(1.7, 3.2);
    new Card("who", pink, ["who is", 'who are', 'who who']);
        new Card("who is", pink).label("is").text("who is");
        new Card("who are", pink).label("are").text("who are");
        new Card("who who", pink).label("who").text("who");
    new Card("what", pink, ["what is", 'what are', 'what what']);
        new Card("what is", pink).label("is").text("what is");
        new Card("what are", pink).label("are").text("what are");
        new Card("what what", pink).label("what").text("what");
    new Card("where", pink, ["where is", 'where are', 'where where']);
        new Card("where is", pink).label("is").text("where is");
        new Card("where are", pink).label("are").text("where are");
        new Card("where where", pink).label("where").text("where");
    new Card("when", pink, ["when is", 'when are', 'when when']);
        new Card("when is", pink).label("is").text("when is");
        new Card("when are", pink).label("are").text("when are");
        new Card("when when", pink).label("when").text("when");
    new Card("why", pink, ["why is", 'why are', 'why why']);
        new Card("why is", pink).label("is").text("why is");
        new Card("why are", pink).label("are").text("why are");
        new Card("why why", pink).label("why").text("why");
    new Card("how", pink, ["how is", 'how are', 'how how']);
        new Card("how is", pink).label("is").text("how is");
        new Card("how are", pink).label("are").text("how are");
        new Card("how how", pink).label("how").text("how");
    new Card("is", cyan);
    new Card("please", cyan);
    new Card("can", cyan, ["can I", "can we", "can can"]);
        new Card("can I").label("I");
        new Card("can we").label("we");
        new Card("can can").label("can");

// Feelings
new Card("Feelings", orange, ["like", "don't like", "happy", "sad", "tired"]).size(2, 3.8);
    new Card("like", muted_yellow);
    new Card("don't like", muted_red);
    new Card("happy", yellow);
    new Card("sad", blue);
    new Card("tired", navy);

// Amount
new Card("Amount", gray, ["Time", "a little", "a lot", "very"]).size(2, 3.8);
    new Card("Time", gray, ["Days", "now", 'later', 'soon']);
        new Card("Days", gray, ['yesterday', 'today', 'tomorrow']);
            new Card("yesterday", gray).size(1.8, 3);
            new Card("today", gray);
            new Card("tomorrow", gray).size(1.8, 3);
        new Card("now", gray);
        new Card("later", gray);
        new Card("soon", gray);
    new Card("a little", gray);
    new Card("a lot", gray);
    new Card("very", gray);


// ND
new Card("ND", red, ["having Panic", "having Anxiety", "unsafe", "overwhelmed", "over stimulated", "Disabilities"]);
    new Card("having Panic", red).text("having a panic attack").label("Panic");
    new Card("having Anxiety", red).text("having an anxiety attack").label("Anxiety");
    new Card("unsafe", red);
    new Card("overwhelmed", muted_orange).size(1.3, 2.3);
    new Card("over stimulated", muted_orange).size(1.6, 2.9).text("over-stimulated");
    new Card("Disabilities", muted_yellow, ["Anxiety", "MDD", "ADHD", "OCD", "Autism"]).size(1.6, 2.7);
        new Card("Anxiety", muted_yellow);
        new Card("MDD", muted_yellow);
        new Card("ADHD", muted_yellow);
        new Card("OCD", muted_yellow);
        new Card("Autism", muted_orange);


// Punctuation
new Card("Punctuation", darker_gray, ["?", ".", ","]).size(1.4, 2.5);
    new Card("?", dark_gray);
    new Card(".", dark_gray);
    new Card(",", dark_gray);


default_aac = ["Me", 'Actions', 'Locations', "Things", "People", "Questions", "Feelings", "Amount", "ND", "Punctuation"];

///////////////////////////////////////////////////////////////////////////////////////////////////////

element('greeting').hidden = true;
element('close_greeting').onclick = function(){
    element('greeting').hidden = true;
}

new Special_Card('Greeting', sky, ()=>{
    element('greeting').hidden = false;
}).size(2, 3.4);


//////////////////////////////////////////////////////////////////

element('Name_DOB').hidden = true;
element('close_Name_DOB').onclick = function(){
	element('Name_DOB').hidden = true;
}

new Special_Card('Name / DOB', gray, ()=>{
	element('Name_DOB').hidden = false;
});


//////////////////////////////////////////////////////////////////

var noSleep = new NoSleep();
var wakeLockEnabled = false;
var no_sleep_card = new Special_Card("No Sleep", dark_red, ()=>{
    if(!wakeLockEnabled){
        noSleep.enable();
        wakeLockEnabled = true;
        console.log("NoSleep enabled");
        no_sleep_card.card.style.borderColor = dark_green;
    }else{
        noSleep.disable(); // let the screen turn off.
        wakeLockEnabled = false;
        console.log("NoSleep disabled");
        no_sleep_card.card.style.borderColor = dark_red;
   }
});         

//////////////////////////////////////////////////////////////////            


element('update').hidden = true;
element('close_update').onclick = function(){
    element('update').hidden = true;
}

element('update_update').onclick = function(){
    location.reload();
}

new Special_Card('Update', navy, ()=>{
    element('update').hidden = false;
    if(window.navigator.onLine){
        element('update_online').innerHTML = "Online";
        element('update_online').style.color = dark_green;
    }else{
        element('update_online').innerHTML = "Offline";
        element('update_online').style.color = muted_red;
    }
});

//////////////////////////////////////////////////////////////////  

new Special_Card("MyID", red, ()=>{
    window.open("https://getmyid.com/profile/00nDm8FW");
});

//////////////////////////////////////////////////////////////////


element('maximize').hidden = true;
element('close_maximize').onclick = function(){
    element("maximize").hidden = true;
}

var maximize_card = new Special_Card("Maximize", cyan, ()=>{
    if(output.value != ""){
        element('maximize').hidden = false;
        element('maximize_text').innerHTML = output.value;
    }else{
        maximize_card.card.style.backgroundColor = muted_red;
        setTimeout(()=>{
            maximize_card.card.style.backgroundColor = "#777777";
        },300);
    }
}).size(1.7,3.1);


//////////////////////////////////////////////////////////////////  



default_tools = ["Greeting", "Name / DOB", "MyID", "Update", "No Sleep", "Maximize"];

element('tools').innerHTML = "<h1>Tools</h1>";
element('tools').onclick = function(){
	if(this.innerHTML == "<h1>Tools</h1>"){
		// switch to AAC
		this.innerHTML = "<h1>AAC</h1>";
		show_cards(default_tools);
	}else{
		// Switch to Pages
		this.innerHTML = "<h1>Tools</h1>";
		show_cards(default_aac);
	}
}



///////////////////////////////////////////////////////////////////////////////////////////////////////
var buffer = new Special_Card("Buffer", ()=>{});
buffer.card.style.height = "50vw";
buffer.card.style.visibility = "hidden";
resize_events.forEach((event)=>{
    event();
    if(window.matchMedia("(orientation: portrait)").matches){
        // vertical
        buffer.card.style.height = "50vw";
    }else{
        // horizontal
        buffer.card.style.height = "20vh";
    }
});
show_cards(default_aac);