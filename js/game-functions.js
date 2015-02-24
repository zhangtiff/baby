game.callHelp = function(){
	var string = "Hey, thanks for asking for help! Some basic commands are: ";
	string += "/nl";
	string += "/nx <object>";
	string += "/ni";
	string += "/nm <direction>";

	return string; 
};

game.callUnlock = function(item, p, p2){
	name = item; 
	if(!item)
		return 'Unlock what? ';
	if((items = game.findItems(item)) == false)
		return "You couldn't find " + name + ". ";

	i = 0;
	item = items[i];
	while(item.locked == false && i < items.length){
		i++; 
		item = items[i];
	}

	if(!item.isDoor)
		return game.callOpen(item, p, p2);
	
	return item.unlock();
};

game.callOpen = function(item, p, p2){
	name = item; 
	if(!item)
		return 'Open what? ';

	if((item = game.findItem(item)) == false)
		return "You couldn't find " + name + ". ";

	if(item.open)
		return item.open(p, p2); 
	return "You can't open " + item.name + ". "; 
};

game.callGo = function(dir){
	if(!dir)
		return 'Where do you want to go? ';
	dir = dir.charAt(0).toLowerCase();

	place = game.getLocation();

	item = place.findDirection(dir); 

	if(!item)
		return "You can't move in that direction. ";

	if(!item.isDoor)
		return game.callExamine(item);


	if(item.isLocked())
		return "You can't go that way because the door is locked. ";

	game.move(item.row, item.col);

	if((message = item.passMessage()) == false)
		message = 'You move from ' + place.name.toLowerCase() + ' to ' + 
			game.getLocation().name.toLowerCase() + '. ';
	return message + '\n\n' + game.callLook();
};

game.callNorth = function(){
	return game.callGo('n');
};

game.callSouth = function(){
	return game.callGo('s');
};

game.callEast = function(){
	return game.callGo('e');
};

game.callWest = function(){
	return game.callGo('w');
};

game.callLook = function(p, p2){
	item = p; 
	if(p == 'at')
		item = p2; 

	if(p == 'in'){
		item = p2; 
		return game.callOpen(item);
	}

	if(item)
		return game.callExamine(item);

	return game.getLocation().toString();
};

game.callExamine = function(item){
	name = item; 
	if(!item)
		return 'Examine what?';
	if(!(item instanceof Item))
		item = game.findItem(item);

	if(!item)
		return "I couldn't find anything called '" + name +"'. ";
	
	if(item.examine) 
		item.examine();
	return item.description;
};

game.callTake = function(item){
	name = item;
	if(!item)
		return 'Take what?';

	if(!(item instanceof Item))
		item = game.findItem(item);

	if(!item)
		return "I couldn't find anything called '" + name +"'. ";

	if(item.canTake()){
		game.addItem(item);
		if(item.take)
			item.take();
	}

	return item.takeMessage();
};

game.callInventory = function(){
	keys = Object.keys(game.inventory);
	len = keys.length; 

	if(len < 1)
		return "You aren't holding anything!";

	return 'You are holding: ' + keys.join(', ');
	
};

game.callTransform = function(name){
	item = name; 
	if(!item)
		return 'Examine what?';
	if(!(item instanceof Item))
		item = game.findItem(item);

	if(!item)
		return "I couldn't find anything called '" + name +"'. ";
	if(!item.transform)
		return "You can't transform that item. ";

	result = item.transform(); 

	names = [];
	for(i = 0; i < result.length; i++){
		it = result[i];
		names[names.length] = it.name; 
		game.addItem(it); 
	}
	game.removeItem(item.name); 

	if(item.transformMessage)
		return item.transformMessage;
	return "You changed " + item.name + " into " + names.toString();
};

game.callBend = function(item){
	name = item; 
	if(!item)
		return 'Bend what?';
	if(!(item instanceof Item))
		item = game.findItem(item);

	if(!item)
		return "I couldn't find anything called '" + name +"'. ";

	if(item.equals(nursery_hanger))
		return game.callTransform(item);
	return "You can't bend " + item.name + "!";
};

game.callBreak = function(item){
	name = item; 
	if(!item)
		return 'Break what?';
	if(!(item instanceof Item))
		item = game.findItem(item);

	if(!item)
		return "I couldn't find anything called '" + name +"'. ";

	if(item.break)
		return item.break();
	return "You can't break " + item.name + "!";
};

game.callWatch = function(item){
	name = item; 
	if(!item)
		return 'Watch what?';
	if(!(item instanceof Item))
		item = game.findItem(item);

	if(!item)
		return "I couldn't find anything called '" + name +"'. ";

	if(item.watch)
		return item.watch();
	return "You can't watch " + item.name + "!";
};


game.callPlug = function(p, p2){
	item = p; 
	name = p; 

	if(!item)
		return 'Plug in what?';

	if(item == "in"){
		item = p2; 
		name = p2; 
	}

	
	if(!(item instanceof Item))
		item = game.findItem(item);

	if(!item)
		return "I couldn't find anything called '" + name +"'. ";

	if(item.plug)
		return item.plug(); 
	return "You can't plug in " + item.name + "!";
};

game.callTurn = function(p, p2){
	item = p; 
	name = p; 

	if(!item)
		return 'Turn what?';

	if(item == "on"){
		item = p2; 
		return game.callPower(item); 
	}

	
	if(!(item instanceof Item))
		item = game.findItem(item);

	if(!item)
		return "I couldn't find anything called '" + name +"'. ";

	if(item.turn)
		return item.turn(); 
	return "You can't turn " + item.name + "!";
};

game.callPower = function(p, p2){
	item = p; 
	name = p; 

	if(!item)
		return 'Power on what?';

	if(item == "on"){
		item = p2; 
		name = p2; 
	}

	
	if(!(item instanceof Item))
		item = game.findItem(item);

	if(!item)
		return "I couldn't find anything called '" + name +"'. ";

	if(item.power)
		return item.power(); 
	return "You can't turn on " + item.name + "!";
};


game.callCombine = function(p, p2, p3){
	item1 = p; 
	n1 = p; 
	item2 = p2; 
	n2 = p2;

	if(item2 == 'and' || item2 == 'with' || item2 == 'in' || item2 == 'on' || item2 == 'inside'){
		item2 = p3; 
		n2 = p3; 
	}

	if(!(item1 && item2))
		return "Please enter two different items to combine. ";

	if(!(item1 instanceof Item))
		item1 = game.findItem(item1);

	if(!(item2 instanceof Item))
		item2 = game.findItem(item2);

	if(!item1)
		return "I couldn't find anything called '" + n1 +"'. ";

	if(!item2)
		return "I couldn't find anything called '" + n2 +"'. ";

	if(item1.combine)
		return item1.combine(item2);

	if(item2.combine)
		return item2.combine(item1);

	return "You can't combine those two items! ";
};



game.functions = [
				[game.callUnlock, 'unlock', 'open'],
				[game.callGo, 'go', 'move', 'mv', 'm', 'g', 'enter'],
				[game.callNorth, 'n', 'north'],
				[game.callSouth, 's', 'south'],
				[game.callEast, 'e', 'east'],
				[game.callWest, 'w', 'west'],
				[game.callLook, 'l', 'look', 'circumspect', 'around'],
				[game.callExamine, 'x', 'ex', 'examine', 'exam', 'inspect', 'see'], 
				[game.callTake, 't', 'take', 'get', 'steal', 'gain', 'capture', 'acquire', 'bring'],
				[game.callInventory, 'i', 'inv', 'in', 'inventory', 'pack', 'items', 'bag'],
				[game.callTransform, 'trans', 'transform'],
				[game.callBend, 'unbend', 'straighten', 'bend'],
				[game.callPlug, 'plug'],
				[game.callTurn, 'turn'],
				[game.callPower, 'power'],
				[game.callOpen, 'search', 'clear'],
				[game.callWatch, 'watch', 'play'],
				[game.callBreak, 'break', 'separate', 'pull', 'twist', 'split'],
				[game.callCombine, 'combine', 'unite', 'merge', 'fuse', 'mix', 'put'],
				[game.callHelp, 'help', 'h', 'halp', '?', '???', 'what'],
				];

game.staticCommands = {'' : '', 
					'talk to self' : "It's quite an interesting conversation. ", 
					'sigh' : '...', 
					'break window' : "Now, now, where's the fun in that? ",
					'break sweat' : "You chop your sweat with the force of a thousand suns. ",
					'girls' : 'Nope, none of them here. ',
					"thingyoutype" : "thingthathappens" ,
					"sing" : "Please don't sing. ",
					"this" : "that",
					"shoot laser" : "You fire your laser gun, but it has no effect. ",
					"sleep" :  " You sleep for a bit…" ,
					"run" : "You run in a circle. Why did you do that?" ,
					"learn" : "You learn much, and gain wisdom. " ,
					"achieve" : "You accomplish one of your life goals. " ,
					"exist" : "You continue existing... for now." ,
					"cry" : ":_(",
					"flip table" : "(╯&#176;□&#176;)╯ ┻━┻",
					"dance" : " Nice moves." ,
					"sit" : "You have a seat to think things over…",
					"capitalize" : "LIKE THIS?" ,
					"collaborate" : "With whom?" ,
					"crouch" : "You drop into a crouch." ,
					"fall" : "You fall over." ,
					"finance" : "Not at these rates!",
					"hypothesize" : "You come up with a hypothesis.",
					"win" : "Haha, Nice try." ,
					'rosebud' : "It was his sled. ", 

				};


game.commands = {};

for(i = 0; i < game.functions.length; i++){
	for(j = 1; j < game.functions[i].length; j++){
		slug = game.functions[i][j];
		game.commands[slug] = i; 
	}
}

