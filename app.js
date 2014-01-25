//Define gobally accessible functions

var pullForm = function(){
		newContent = $("#quote-input").val();
		newAuthor = $("#author-input").val();
	};

	var counter = 0;
	var quote = [0];
	var newContent;
	var newAuthor;
	var lastDelete = 0;
	var authorID = 0;
	var authorTest;

//=========== Begin ready function ==============
$(document).ready(function(){ 

	//Button toggle show/hide edit form
	$("#show-form").click(function(){
		$("#quote-form-container").slideToggle("fast");
		if ( $("#show-form").text()==="Post Quote" ) {
			$("#show-form").text("Hide");
		} else {$("#show-form").text("Post Quote");
			}
		} 
	);

// =================== Generate new quote ===============================

	
	
	function quoteObj(idnum, quoteContent, author, rating, quoteColor){
		this.idnum = idnum;
		this.quoteContent = quoteContent;
		this.author = author;
		this.rating = rating;
		this.quoteColor = quoteColor;
	}

	var genQuote = function(){
		counter = counter + 1;
		quote.push(counter);
		quote[counter] = new quoteObj(counter, newContent, newAuthor, 0, "green");
		if (quote[counter].idnum % 2){
			quote[counter].quoteColor = "blue";
			} else {quote[counter].quoteColor = "green";}
		$("#quote0").clone().attr('id', 'quote'+ counter).appendTo("#quote-list");
		$("#quote"+counter).find("blockquote").text(quote[counter].quoteContent);
		$("#quote"+counter).find(".author-link").text(quote[counter].author);
		$("#quote"+counter).find(".quote-num").text(quote[counter].idnum);
		if (quote[counter].quoteColor === "blue"){
			$("#quote"+counter).addClass("blue");
			} else {$("#quote"+counter).addClass("green");}
		console.log(quote[counter]);
	};

	//Prevent submit default; Master submit function
	$("#quote-form").submit(function(e){
		e.preventDefault();
		pullForm();
		if (newAuthor === "") {alert("Please fill out author field.");
		} if (newContent === "") {alert("Please fill out quote field.");
		} else {
		genQuote();}
	} );
//===========================================================================
	//Delete Button
	$(document).on("click", ".delete-button", function(){
		lastDelete = $(this).parent().find(".quote-num").text();
		console.log(lastDelete);
		$(this).parent().remove();
	});

	//Undo Button
	$(document).on("click", "#undo", function(){
		if (lastDelete === 0) {alert("Nothing to undo.");} else {
			$("#quote0").clone().attr('id', 'quote'+ lastDelete).appendTo("#quote-list");
			$("#quote"+lastDelete).find("blockquote").text(quote[lastDelete].quoteContent);
			$("#quote"+lastDelete).find(".author-link").text(quote[lastDelete].author);
			$("#quote"+lastDelete).find(".quote-num").text(quote[lastDelete].idnum);
			if (quote[lastDelete].quoteColor === "blue"){
				$("#quote"+lastDelete).addClass("blue");
				} else {$("#quote"+lastDelete).addClass("green");}
			lastDelete = 0;
		}		
	});	

	//Author display
	$(document).on("click", ".author-link", function(){
		authorTest = $(this).text();
		console.log(authorTest);
		var selector = ".quote-wrapper:contains("+authorTest+")";
		$(".lightbox-background").toggle("fast");		
		$(".lightbox-content").append("<h2>Quotes by " + authorTest+":</h2>");
		$(selector).clone().appendTo("#lightbox-content");			
	});

	//Close and clear lightbox
	$(document).on("click", ".lightbox-button", function(){
		$(".lightbox-content").html("");
		$(".lightbox-background").toggle("fast");
	});
	


}); //============End ready function ====================