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
new Card("Me", cyan).folder().size(5).label("🤵🏻");
    new Card("I", teal, "Me");
    new Card("I __", teal, "Me").folder();
        new Card("I want __", cyan, "I __").folder().label("want");
            new Card("I want", cyan, "I want __").label("want");
            new Card("I want to", blue, "I want __").label("to");
            new Card("I want a", blue, "I want __").label("a");
            new Card("I want some", blue, "I want __").label("some");
        new Card("I need", purple, "I __").folder().label("need");
            new Card("I need need", dark_purple, "I need").label("need").text("I need");
            new Card("I need to", purple, "I need").label("to");
            new Card("I need some", purple, "I need").label("some");
        new Card("I am", gray_blue, "I __").label("am");
        new Card("I have", navy, "I __").label("have");
    new Card("me", blue, "Me");
    new Card("my", blue, "Me");

// Actions
new Card('Actions', purple).folder().size(1.4);
    new Card('Future', gray_blue, "Actions").folder();
        new Card("going to", pink, "Future").size(2);
        new Card("will", purple, 'Future');
    new Card("Sports", green, "Actions").folder();
        new Card("run", yellow, "Sports").text("run").label("🏃🏻‍♂️").size(5);
        new Card("tennis", green, "Sports").text("play tennis").label("🎾").size(5);
    new Card("get", dark_purple, "Actions");
	new Card("eat", purple, "Actions").label("🍽").size(5);
    new Card("coding", cyan, "Actions").label("💻").size(5);
    new Card("sleep", navy, "Actions").label("😴").size(5);
    new Card("help", muted_red, "Actions");
	new Card("go", pink, "Actions");
    new Card("go to", pink, "Actions");

// Places
new Card('Places', green).size(4).folder().label("🏘");
    new Card("Home", light_green, "Places").label("🏡").size(5);
    new Card("Skidmore", dark_green, "Places").folder().image("skidmore");
        new Card("Skidmore Skidmore", dark_green, "Skidmore").image("skidmore").text("Skidmore");
        new Card("Trails", brown, "Skidmore").folder();
            new Card("North Woods", brown, "Trails");
            new Card("SMBA", brown, 'Trails').text("the SMBA trails");
        new Card("Apartment", light_green, "Skidmore").size(1).folder();
            new Card("my apartment", light_green, "Apartment").label("my");
            new Card("our apartment", light_green, "Apartment").label("our");
            new Card("the apartment", light_green, "Apartment").label("the");
        new Card("IT", dark_green, "Skidmore");
        new Card("Case", dark_green, "Skidmore");
        new Card("DHall", dark_green, "Skidmore");
        new Card("Howe", dark_green, "Skidmore");
        new Card("Zankel", dark_green, "Skidmore");
    new Card("Supermarket", purple, "Places").size(4).text("the Supermarket").label("🛒");
    new Card("CVS", muted_red, "Places").size(2.4);

// Things
new Card("Things", dark_yellow).folder().size(1.4);
    new Card("food", dark_green, "Things").folder().label("🍽").size(5);
        new Card("food food", dark_green, "food").text("food").label("food");
        new Card("pizza", muted_yellow, "food").label("🍕").size(5);
        new Card("icecream", muted_yellow, "food").label("🍦").size(5);
    new Card("computer", gray, "Things").label("💻").size(5);
    new Card("trombone", dark_yellow, "Things").image("trombone");

// People
new Card("People", muted_blue).folder().label("👨‍👩‍👧‍👦").size(5);
    new Card("Names", cyan, "People").folder();
        new Card("Kylie", dark_green, "Names").image('kylie');
        new Card("Payton", dark_green, "Names").image("payton");
        new Card("Nate", dark_green, "Names").image('nate');
        new Card("Feldmom", orange, "Names").image('feldmom');
        new Card("Joshua", orange, "Names").image('joshua');
    new Card("you", muted_blue, "People");
    new Card("your", muted_blue, "People");
    new Card("their", muted_blue, "People");
    new Card("our", sky, "People");
    new Card("we", muted_blue, "People");

// Questions
new Card("Questions", pink).folder().label("?").size(5);
    new Card("who", pink, "Questions").folder();
        new Card("who is", pink, "who").label("is").text("who is");
        new Card("who are", pink, "who").label("are").text("who are");
        new Card("who who", pink, "who").label("who").text("who");
    new Card("what", pink, "Questions").folder();
        new Card("what is", pink, "what").label("is").text("what is");
        new Card("what are", pink, "what").label("are").text("what are");
        new Card("what what", pink, "what").label("what").text("what");
    new Card("where", pink, "Questions").folder();
        new Card("where is", pink, "where").label("is").text("where is");
        new Card("where are", pink, "where").label("are").text("where are");
        new Card("where where", pink, "where").label("where").text("where");
    new Card("when", pink, "Questions").folder();
        new Card("when is", pink, "when").label("is").text("when is");
        new Card("when are", pink, "when").label("are").text("when are");
        new Card("when when", pink, "when").label("when").text("when");
    new Card("why", pink, "Questions").folder();
        new Card("why is", pink, "why").label("is").text("why is");
        new Card("why are", pink, "why").label("are").text("why are");
        new Card("why why", pink, "why").label("why").text("why");
    new Card("how", pink, "Questions").folder();
        new Card("how is", pink, "how").label("is").text("how is");
        new Card("how are", pink, "how").label("are").text("how are");
        new Card("how how", pink, "how").label("how").text("how");
    new Card("is", cyan, "Questions");
    new Card("please", cyan, "Questions");
    new Card("can", cyan, "Questions").folder();
        new Card("can I", cyan, 'can').label("I").folder();
            new Card("can I I", blue, "can I").label("I");
            new Card("can I have", cyan, "can I").label("have");
            new Card("can I go", cyan, "can I").label("go");
            new Card("can I get", cyan, "can I").label("get");
        new Card("can we", cyan, "can").label("we").folder();
            new Card("can we I", blue, "can we").label("we");
            new Card("can we have", cyan, "can we").label("have");
            new Card("can we go", cyan, "can we").label("go");
            new Card("can we get", cyan, "can we").label("get");
        new Card("can can", blue, 'can').label("can").text("can");

// Feelings
new Card("Feelings", orange).folder().size(1.2);
    new Card("like", muted_yellow, "Feelings").label("👍🏻").size(5).folder();
       new Card("like like", muted_yellow, "like").label("like");
       new Card("like good", muted_yellow, "like").label("good");
    new Card("bad", muted_red, "Feelings").label("👎🏻").size(5).folder();
        new Card("bad like", muted_yellow, "bad").label("don't like");
        new Card("bad bad", muted_yellow, "bad").label("bad");
    new Card("happy", yellow, "Feelings").label("😃").size(5);
    new Card("sad", blue, "Feelings").label("😢").size(5);
    new Card("tired", navy, "Feelings").label("😴").size(5);

// Amount
new Card("Amount", gray).size(4).folder().label("#");
    new Card("number", sky, "Amount").folder();
        new Card("7", sky, "number").no_back();
        new Card("8", sky, "number").no_back();
        new Card("9", sky, "number").no_back();
        new Special_Card("number Home", dark_gray, ()=>{
            show_cards(default_aac);
        }, 'number').label("Home");
        new Card("4", sky, "number").no_back();
        new Card("5", sky, "number").no_back();
        new Card("6", sky, "number").no_back();
        new Card("number $", darker_gray, 'number').label('$').text("$").no_back();
        new Card("1", sky, "number").no_back();
        new Card("2", sky, "number").no_back();
        new Card("3", sky, "number").no_back();
        new Card("number ,", darker_gray, 'number').label(',').text(",").no_back();
        new Card("number .", darker_gray, 'number').label('.').text(".").no_back();
        new Card("0", sky).no_back();
    new Card("Time", gray, "Amount").folder();
        new Card("Days", gray, "Time").folder();
            new Card("yesterday", gray, "Days").size(1.8);
            new Card("today", gray, "Days");
            new Card("tomorrow", gray, "Days").size(1.8);
        new Card("now", gray, "Time");
        new Card("later", gray, "Time");
        new Card("soon", gray, "Time");
    new Card("a little", gray, "Amount");
    new Card("a lot", gray, "Amount");
    new Card("very", gray, "Amount");
    new Card("some", gray, "Amount");
    new Card("more", gray_blue, "Amount");
    new Card("less", gray_blue, "Amount");


// ND
new Card("ND", red).folder().size(3, 3);
    new Card("having Panic", red, "ND").text("having a panic attack").label("Panic");
    new Card("having Anxiety", red, "ND").text("having an anxiety attack").label("Anxiety");
    new Card("unsafe", red, "ND");
    new Card("over- whelmed", muted_orange, "ND").size(1.2);
    new Card("over stimulated", muted_orange, "ND").size(1.1).text("over-stimulated");
    new Card("Disabilities", muted_yellow, "ND").size(1).folder();
        new Card("Anxiety", muted_yellow, "Disabilities");
        new Card("MDD", muted_yellow, "Disabilities");
        new Card("ADHD", muted_yellow, "Disabilities");
        new Card("OCD", muted_yellow, "Disabilities");
        new Card("Autism", muted_orange, "Disabilities");


// Punctuation
new Card("Punctuation", darker_gray).size(0.9).folder();
    new Card("?", dark_gray, "Punctuation");
    new Card(".", dark_gray, "Punctuation");
    new Card(",", dark_gray, "Punctuation");


default_aac = ["Me", 'Actions', 'Places', "Things", "People", "Questions", "Feelings", "Amount", "ND", "Punctuation"];

// alert(screen.width * window.devicePixelRatio);
///////////////////////////////////////////////////////////////////////////////////////////////////////

element('greeting').hidden = true;
element('close_greeting').onclick = function(){
    element('greeting').hidden = true;
}

new Special_Card('Greeting', sky, ()=>{
    element('greeting').hidden = false;
}).size(5).label("👋🏻");


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
}).size(5).label("📄");


//////////////////////////////////////////////////////////////////  

new Special_Card("MyID", red, ()=>{
    window.open("https://getmyid.com/profile/00nDm8FW");
}).size(2);

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
}).size(1.5);


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