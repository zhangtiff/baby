function Area(n, desc, inv){
	this.name = n;
	this.description = desc; 

    this.items = {};
    for(i = 0; i < inv.length; i++)
        this.items[inv[i].name] = inv[i];


    this.removeItem = function(item){  
        if(item instanceof Item)
            delete this.items[item.name];
        delete this.items[item]; 
    };

	this.findDirection = function(dir){
		for(i in this.items){
			if(this.items[i].direction == dir){
				return this.items[i]; 
			}
		}
	};

	this.toString = function(){
		return '<strong class="caps">' + this.name + '</strong>\n' + this.description; 
	};

	this.findItem = function(str){
		for(i in this.items){
			if(this.items[i].name.indexOf(str) >= 0){
				return this.items[i]; 
			}
		}
		return false; 
	};

    this.findItems = function(str){
        array = []; 
        for(i in this.items){
            if(this.items[i].name.indexOf(str) >= 0){
                array[array.length] = this.items[i]; 
            }
        }
        if(array.length > 0)
            return array; 
        return false; 
    };
}


nursery_door = new Door('the north door', 
					'The door is wooden, light green in color, unchipped, and firmly shut, locked with some sort of childproof mechanism. ', 
					true, 1, 1, 'n', "Passing through the nursery's door, you walk into the living room. ");

straight_hanger = new Item('bent hanger', 'The hook on the golden hanger has been bent into a straight wire. ', false);

nursery_hanger = new Item('a metal wire hanger', 'The hanger is made of bent metal wire and painted with glistening gold. ', true);

nursery_hanger.transformMessage = 'You straighten the metal wire hanger with your hands. ';

nursery_hanger.bend = function(){
    return this.transform();
};

nursery_hanger.transform = function(){
    return [straight_hanger]; 
};

nursery_door.canUnlock = function(){
    if(game.hasItem(straight_hanger))
        return true; 
    return false; 
};

nursery_door.lockedMessage = function(){
    if(game.hasItem(nursery_hanger))
        return "You try to pick at the lock with the curly end of the hanger but it can't reach far enough.";
    return 'You fiddle with the child lock, but the door is firmly shut. ';
};
nursery_door.unlockMessage = function(){
    return 'You poke the bent metal wire hanger around in the child lock until the door clicks open. ';
};




nursery_items = [
                new Item('the west closet', 'You find a variety of different baby outfits hanging up in the closet. To the side of the baby outfits, a few excess hangers hang. ', false, 'w'), 
                nursery_hanger,
                nursery_door, 
                new Item('the white plastic childproof doorknob cover', "The childproof doorknob cover is made of white plastic with a small hole leading to the lock. To the side of the cover are squeezable tabs. "),
                new Item('a baby outfit', 'The tiny baby outfit is blue and made of soft polyester. On the front of the baby outfit, a green car is embroidered. ', true),
                new Item('white crib', 'The white crib is made of wood and painted with a matter finish. It seems to be in very good condition. ', true), 
				new Item('the only window', "The long window hangs across the south wall of the room. The metal grate covers a decent portion of the window's view, but you can still see bits and pieces of the sky behind it. "), 
				new Item('the safety grate', "The safety grate is made of white painted steel, locked in a rectangular grid pattern. "),
                new Item('the outside view', "There's sunlight through the window, and it's a little blinding. But you can see a clear blue sky and scattered pieces of clouds. It looks like a nice day! "), 
                new Item('the sky blue walls', "The walls are freshly painted with a nice, calm blue. "), 
                new Item('clouds', "You can bearly see the fluffy white clouds behind the metal safet grate. "),
                new Item('the green and blue carpet', "The nursery carpet is decoratedwith printed green and blue puzzle pieces. "),
                new Item('the carpet puzzle pieces', "The puzzle pieces on the carpet are intertwining blue and green with different side patterns on each piece. "),
				];


nursery = new Area('The Child\'s Nursery', 
                'The nursery is painted sky blue with blue and green puzzle pieces printed on the carpet. The only window in the room has a metal safety grate installed. A white crib rests in the corner of the room. To the north a door with a childproof doorknob cover stands. To the west a closet door stands ajar.', 
                nursery_items);

atrium_door_n = new Door('the master bedroom door to the north', 
						'', false, 0, 1, 'n');
atrium_door_s = new Door('the nursery door to the south', 
						'', false, 2, 1, 's');

atrium_door_e = new Door('the east house door leading outside', 
						'', true, 1, 2, 'e', "You take a whiff of fresh air as you leave the house from the front door. "); 

atrium_door_w = new Door('the westward kitchen door', 
						'', false, 1, 0, 'w', 'You walk into the kitchen to the west of the living room.');

atrium_door_e.canUnlock = function() {
    if(game.hasItem(diamond_drill))
        return true; 
    return false; 
};

atrium_door_e.unlockMessage = function(){
    return "You break the lock with your diamond drill, but the drill breaks in the process. ";
};

atrium_door_e.lockedMessage = function(){
    if(game.hasItem(atrium_drill))
        return "You try to break the lock with your drill, but it's missing a drillbit. ";
    return "You try to break the lock, but the deadbolt is too strong. ";
};

atrium_tv = new Item('old crt tv television', "The TV is an old CRT style television with a built-in tape player. The cord is unplugged.", false);
atrium_tv.powered = false; 
atrium_tv.plug = function() {
    if(this.powered == true)
        return "You've already plugged in the TV. ";
    this.description = "The TV is an old CRT style television with a built-in tape player. The TV is on but seems to only show a blank blue screen. ";
    this.powered = true; 

    return 'You find the nearest wall outlet and plug in the CRT. ';
};

atrium_tv.power = function(){
    return this.plug();
};

atrium_tv.watch = function(){
    if(game.findItem(kitchen_tape))
        return kitchen_tape.watch();
    return "The TV doesn't appear to be getting any signal. You notice the VCR it's hooked up to is empty, though. ";
};

atrium_tv_cord = new Item('tv power cord', "The cord is thick with rubber but rather short looking. ", false);
atrium_tv_cord.plug = function(){
    return atrium_tv.plug();
};

atrium_drill = new Item('handheld electric power drill', 'The drill is bulky but small enough to fit in one hand. It seems to be missing the drillbit though.', true);

atrium_drill.take = function(){
     game.addItem(this);
     atrium.removeItem(this);
     atrium.description = "It's decorated with balloons and a banner which reads \"Welcome home Tommy.\" To the west is a small kitchen area, to the north is a master bedroom. To the east is the front door of the house. Aside from the decorations, the room appears to be undergoing a minor renovation. A switch is missing from the wall and a cordless drill is plugged in and charging below it. A leather couch sits against the southern wall of the room. At the base of the couch there is a row of 3 presents wrapped in red, blue, and white paper. The carpet has a slightly musty smell. A TV sits on a stand in the corner of the room. Below the TV there is a VCR with the clock unset. The front door to the house has the deadbolt locked and it needs a key to open. drill taken";
};

diamond_drill = new Item('diamond power drill', "A diamond from a wedding ring is lodged into the drillbit slot. The diamond's hard edges combined with the drill's powerful turning motions allow the drill to cut through even very tough materials. ");

atrium_drill.combine = function(item){
    if(!item.equals(parents_ring_diamond))
        return "You try to put " + item.name + " into the drill, but it doesn't fit. "; 

    this.take(); 

    game.removeItem(parents_ring_diamond);
    game.removeItem(atrium_drill);

    game.addItem(diamond_drill);

    return 'You put the diamond into the drill and it clicks into place. With a quick test, you see that the drill is working and spinning. ';

};

atrium_wall_switch = new Item('light switch hole in wall', "Chunks of drywall have been knocked out around the place where there used to be a light switch. The bare circuity can be seen across the hole, but you notice two hanging wire stips that were disconnected when the switch was removed. ");

atrium_items = [atrium_tv,
                atrium_tv_cord,
                atrium_drill,
                atrium_door_n, 
				atrium_door_s,
				atrium_door_e,
				atrium_door_w,
                new Item('the hanging "Welcome home Tommy" banner', "The banner is starting to droop a litle bit at one side and it reminiscent of a Christmas tree that hasn't been taken down yet in the middle of July. "),
                new Item("a leather couch", "The leather couch looks a little rugged. "),
                new Item("the red present", "The red present box is shiny and tied with some nice white ribbons. "),
                new Item("the white present", "The white present box lies open, but there's nothing but white tissue paper inside. It looks like someone already took the gift out. "),
                new Item("the blue present", "The blue present box is about the color of a dull sky. "),
                new Item("the hole from the missing wall switch", "There are torn edges in the wall around the area with the wall switch. Inside, two ends of a torn wire hang loosely. "),
				];

atrium = new Area('The Living Room', 
                "The living room is decorated with balloons and a banner reading \"Welcome home Tommy.\" A leather couch sits against the southern wall of the room. At the base of the couch there is a row of three presents wrapped in red, blue, and white paper. A TV sits on a stand in the corner of the room. Below the TV there is a VCR with the clock unset. Aside from the decorations, the room appears to be undergoing a minor renovation. A switch is missing from the wall and a cordless drill is plugged in and charging below it. To the west is a small kitchen area, to the north is a master bedroom. To the east is the front door of the house. The front door to the house has the deadbolt locked and it needs a key to open.", 
                atrium_items);

kitchen_door_e = new Door('the east door leading to the living room', '', false, 1, 1, 'e');

kitchen_tape = new Item('a home vhs tape', "The VHS tape is labeled with curvy but messy handwriting that reads 'Our Wedding'. ", false);
kitchen_tape.watch = function(){
    if(game.findItem(atrium_tv.name)){
        if(!atrium_tv.powered)
            return "You have to turn on the TV before you can watch a VHS. ";


        return "You put the VHS tape inside of the VCR and watch the TV. After fiddling with the VHS settings a bit, the TV starts to play a somewhat blurry but comprehensible video. \n\nThe video is long and the audio is soft and accompanied by the music of static. Attentively, you notice the video to be set in roughly the living room that you're in right now, but the furniture back then seems to have been a bit different. More interestingly, though, the room in the video is occupied by a man and a woman. They seem to be giggling a bit as they start up recording and laughing at inside jokes that you don't really get, but, nonetheless, their chemistry seems to be ever present.  \n\nYou drift off a bit watching the video of the couple: they spend an awful lot of time just giggling and looking somewhat dreamy while they discuss mundane aspects of life. The woman casually talks about how she'd like to have kids one day, and the man seems a little less excited, but accepts that he'd be fine with that partticular future. They tease and joke and laugh and complain about the furniture in endearing ways and it's all a little nostalgic, in the most nostalgic way that videos of strangers you barely know can be. \n\nYou're glazed over in daydreaming watching the TV when you suddenly notice the woman putting her wedding ring inside of a vault.  \n\n\"Hehe, it's kind of funny that I'm still using the default combination for this lock,\" she says.  \n\n\"Haha, the most secure vault in the world's right here, and the owner hasn't even changed the default combination,\" the man retorts. \n\n\"Hey, hey, hey, I swear I'll change it one day. Honestly, I forgot how to, though,\" the woman chuckles. ";
    }
    return "You can't watch a VHS without a TV! ";
};

kitchen_cabinets = new Item('the wall cabinets', 'The kitchen wall is lined with white-painted cabinets with loosely closed doors. ', false);

kitchen_cabinets.contains = kitchen_tape; 
kitchen_cabinets.open = function(){
    if(this.contains){
        game.addItem(this.contains);
        this.contains = false; 
        return "You take a VHS tape labeled 'Our Wedding' in the kitchen cabinet. ";
    }
    return "You search the cabinets again, but strangely enough, they're empty. ";
};

kitchen_items = [kitchen_cabinets,
                kitchen_door_e,
                new Item("the tiled floor", "The black and white tiled floor is honestly a little kitschy looking, but it works for a kitchen. "), 
                new Item("a refrigerator in the corner", "The refrigerator's soft hums assure you that the food inside is probably fresh and safe. "), 
                new Item("the white electric stove", "The stove is a little dirty with grease spils on the side, but it looks like it'd still work. "),
                ];

kitchen = new Area('The Kitchen', 'The floor is tiled in black and white and there is a white electric stove in the center of the room. A refrigerator hums quietly in the corner. Cabinets line the walls, painted white to match the rest of the room. A door leads east, back to the atrium. ', kitchen_items);


parents_blanket = new Item('the messy blanket on the floor', 'The blanket is scattered everywhere into an indiscernible lump of blanketness. ', false);
parents_safe = new Item('a small safe', 'The safe has a four digit combination lock on it. ', false);
parents_ring = new Item('a diamond and gold wedding ring', 'The ring is very beautiful with glistening white diamond and smooth, shiny gold. As you touch the diamond though, you notice the gold holing it in place is rather soft. ', false);
parents_ring_diamond = new Item('a diamond', 'The diamond is very shiny, very sparkly very white, and very real. As you stroke your fingers across it, you can feel its sharp, hard edges. ');
parents_ring_gold = new Item('a gold band', 'The gold ring band came from a wedding ring and seems to be made of extremely high quality, shiny gold.');
parents_ring.contains = [parents_ring_gold, parents_ring_diamond];

parents_ring.break = function(){    
    if(this.contains){
        game.addItem(this.contains[0]);
        game.addItem(this.contains[1]);
        game.removeItem(this.name);
        this.contains = false; 

        return "You pull and twist at the diamond on the ring and manage to separate it from the gold band. ";
    }
    return "How can you break a brokken diamond ring again? ";
};

parents_safe.contains = parents_ring; 

parents_safe.open = function(p, p2){

    pass = p; 
    if(p == 'with')
        pass = p2; 

    if(!this.contains)
        return "You've already opened this safe. ";

    if(!pass )
        return 'Use open safe &lt;combination&gt; to try a combination for this safe. ';

    if(!pass.match(/\d\d\d\d/g))
        return "'" + pass + "' is an invalid combination. Enter a four digit combination for this safe. ";
       
    if(pass == '1111' || pass == '1234' || pass == '0000'){ 
        game.addItem(this.contains);
        this.contains = false; 
        return 'You open the safe to find a diamond wedding ring. ';
    }

    return "You enter the combination '" + pass + "'" + ' but fail to unlock the safe. ';

};

parents_blanket.contains = parents_safe; 
parents_blanket.open = function(){
    if(this.contains){
        game.addItem(this.contains);
        this.contains = false; 
        return "You find a small safe hidden under the blanket and put it in your inventory. ";
    }
    return "You move the blanket around, but there's nothing to be found. ";
};

parents_door_s = new Door('the south door to the living room', '', false, 1, 1, 's');
parents_items = [parents_blanket, 
                parents_door_s, 
                new Item("the overturned lamp", "The lamp seems to be in decent condition although there's a dent in the lampshade. Someone must have knocked it over rather suddenly. "), 
                ];

parents = new Area('The Master Bedroom', 'You stand in a master bedroom. It is well-furnished but disorganized, with the blanket thrown onto the floor, and a lamp overturned. To the south, you see the door leading back to the atrium. ', parents_items);


outside_door_w = new Door('the west door leading inside', '', false, 1, 1, 'w')
outside_door_s = new Door('the south door leading to the garage', '', false, 2, 2, 's');
outside_items = [outside_door_w, 
                outside_door_s, ];


garage_door_n = new Door('the north door leading outside', 'The burgundy door is very sturdy and contains both a deadbolt and a normal house lock. ', false, 1, 2, 'n');
garage_baby_shoes = new Item('a pair of new baby shoes', "The baby shoes look untouched and seem to still have the price tag on them. Below, a sign reads: \n\n'For sale: baby shoes, never worn", false);
garage_baby_shoes.examine = function(){
    winGame();
};
garage_items = [garage_door_n, 
                garage_baby_shoes, ];


outside = new Area('The Outside', "You stand outside in broad daylight. From here, you can see the that the house's off-white vinyl coating exterior coating seems rather fresh. To the south, you see an open garage door. ", outside_items);




garage = new Area('The Garage', "The garage seems relatively unused and surprisingly fresh in its scents. A lawnmower and a few gardening supplies seemed to have been neatly stowed away to the side of the wall. Oddly enough, though, a pair of new baby shoes seems to be sitting on a card table in one corner of the garage. ", garage_items);



map = [
		[null, parents, null], 
		[kitchen, atrium, outside],
		[null, nursery, garage],
		];

