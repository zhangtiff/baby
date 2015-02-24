function Game(){
	this.out = ""; 
	this.queue = []; 

	this.inventory = {}; 

	//Locations
	this.r = 2;
	this.c = 1; 

	this.doQueue = function(){
		if(this.queue)
			if(this.queue.length > 0)
				for(i = 0; i < this.queue.length; i++)
					this.queue[i](); 
		delete this.queue; 
	};
	
	this.move = function(r, c){
		this.r = r; 
		this.c = c;
	};

	this.getLocation = function(){
		return map[this.r][this.c];
	};

	this.findItem = function(item){
		res1 = this.getLocation().findItem(item);

		if(res1)
			return res1; 

		for(i in this.inventory){
			if(i.indexOf(item) >= 0){
				return this.inventory[i]; 
			}
		}
		return false; 
	};

	this.findItems = function(item){
		res1 = this.getLocation().findItems(item);

		array = [];
		if(res1)
			array = res1;

		for(i in this.inventory){
			if(i.indexOf(item) >= 0){
				array[array.length] = this.inventory[i]; 
			}
		}

		if(array.length > 0)
            return array; 
        return false; 
	};	

	this.hasItem = function(item){
		return this.inventory[item.name] != null;
	};

	this.addItem = function(item){
		this.inventory[item.name] = item; 
	};

	this.removeItem = function(i){
		if(i instanceof Item)
			i = i.name; 
		delete this.inventory[i];
	};


	this.addLine = function(text) {
		this.out = this.out + text + "<br /><br />";
	};

	this.output = function() {
		return this.out; 
	};

	this.clearOut = function() {
		this.out = ""; 
	};

	this.process = function(input) {
		//Clear ouput before starting processing 
		this.clearOut(); 

		this.addLine('&gt; ' + input );

		//Prepare input 
		input = $.trim(input);
		input = input.toLowerCase();
		input = input.replace(/\s+/g, " ");

		// First check to make sure there's no exact phrase match 
		if((str = this.staticCommands[input]) != null){
			this.addLine(str);
		}else{

			//Split 
			params = input.split(/\s+/g);

			if(params.length > 0){
				slug = $.trim(params[0]);
				if(slug in this.commands){
					index = this.commands[slug]; 

					this.addLine(this.functions[index][0](params[1], params[2], params[3]));
				}else if((str = this.staticCommands[slug]) != null)
					this.addLine(str);
				else
					this.addLine("I don't recognize that verb. ");
			}
		}

		return this.output(); 
	};
}

game = new Game();


