$(document).ready(function(){
	$('#command').keypress(function (e) {
	  // Detect enter key
	  if (e.which == 13) {
	    input = $('#command').val();
	    $('#command').val("");

	    // Process input
	    out = game.process(input).replace(/\n/g, '<br />'); 
	    $("#text").append(out);
	   	$(document).scrollTop($("#container")[0].scrollHeight);

	   	game.doQueue();

	  //Detect up arrow key 
	  }else if (e.which == 38){

	  //Detect down arrow key 
	  }else if (e.which == 40){
	  	
	  }
	});

}
);


 winGame = function(){
	$("#text").append("<pre id='winned'></pre>");

	var text = $('#winText').html().split(/\r\n|\r|\n/g);


	var tid = setTimeout(mycode, 10);

	var i = [0];
	function mycode(){
	  $("#text").append('<br />' + text[i[0]]);
	  $(document).scrollTop($("#container")[0].scrollHeight);
	  if(i[0] < text.length - 1)
		  tid = setTimeout(mycode, 100); // repeat timer
	  i[0]++;
	}
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
