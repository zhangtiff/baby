function Item(n, desc, t, dir) {
    this.name = n; 
    this.description = desc; 

    this.direction = dir; 

    this.locked = false; 

 	if(t == true )
 		this.takable = true; 
 	else
	    this.takable = false; 


    this.canTake = function(){
    	return this.takable; 
    };

    this.takeMessage = function(){
    	if(this.canTake())
    		return 'You put ' + n + ' in your inventory. ';

    	return "You can't take " + n + "!";
    };

    this.canBreak = function(){
    	return this.parts; 
    };

    this.toString = function(){
    	return name; 
    };

    this.getDestination = function(){
    	return false; 
    };

    this.equals = function(item){
        return this.name == item.name;
    };

}


function Door(n, desc, lock, r, c, dir, pass){
	this.name = n; 
	this.description = desc; 

	this.passingDescription = pass; 

	this.isDoor = true; 

    this.direction = dir; 

    // Destination 
    this.row = r; 
    this.col = c; 

    if(lock != null)
	    this.locked = lock;
	else
		this.locked = false; 

    this.isLocked = function(){
    	return this.locked; 
    };

    //To be overidden by object
    this.canUnlock = function(){
        return true; 
    };

    this.unlock = function(){
        if(!this.isLocked())
            return "That door is already unlocked. ";

        if(this.canUnlock()){
            this.locked = false; 

            if(this.unlockMessage)
                return this.unlockMessage(); 

            return 'You unlocked the door. ';
        }
        if(this.lockedMessage)
            return this.lockedMessage();

        return "You can't unlock the door like that. ";
    };

    this.getDestination = function(){
    	return map[r][c];
    };

     this.canTake = function(){
    	return false; 
    };

    this.takeMessage = function(){
    	return "You can't take a door! ";
    };

    this.canBreak = function(){
    	return this.parts; 
    };

    this.toString = function(){
    	return name; 
    };

    this.passMessage = function(){
    	if(this.passingDescription != null)
	    	return this.passingDescription;
	    return false; 
    };

    this.equals = function(item){
        return this.name == item.name;
    };
}