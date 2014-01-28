//Define gobally accessible variables

	var counter = 0;
	var quote = [0];
	var newContent;
	var newAuthor;
	var lastDelete = 0;
	var lastData;
	var authorID = 0;	

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

	// =================== Generate new quote =========================
	
	function quoteObj(idnum, quoteContent, author, rating, quoteColor){
		this.idnum = idnum;
		this.quoteContent = quoteContent;
		this.author = author;
		this.rating = rating;
		this.quoteColor = quoteColor;
	}

	var pullForm = function(){
		newContent = $("#quote-input").val();
		newAuthor = $("#author-input").val();
	};

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
		$("#quote"+counter).find(".quote-num").text(counter);
		$("#quote"+counter).data('index', counter);
		$("#quote"+counter).data('rating', quote[counter].rating);
		if (quote[counter].quoteColor === "blue"){
			$("#quote"+counter).addClass("blue");
			} else {$("#quote"+counter).addClass("green");}
	};

	//Prevent submit default; Master submit function
	$("#quote-form").submit(function(e){
		e.preventDefault();
		pullForm();
		if (newAuthor === "") {alert("Please fill out author field.");
		} if (newContent === "") {alert("Please fill out quote field.");
		} else {genQuote();}
	});

	//============= Button functionality =====================
	//Delete Button
	$(document).on("click", ".delete-button", function(){
		lastDelete = $(this).closest(".quote-wrapper");
		lastData = $(this).closest(".quote-wrapper").data();
		$(this).closest(".quote-wrapper").remove();
	});

	//Undo Button
	$(document).on("click", "#undo", function(){
		if (lastDelete === 0) {alert("Nothing to undo.");
		} else {
			$(lastDelete).appendTo("#quote-list");
			$("#quote"+lastData.index).data(lastData);
			lastDelete = 0;
			lastData = "";
		}		
	});	

	//Author display
	$(document).on("click", ".author-link", function(){
		var authorTest = $(this).text();
		var selector = ".quote-wrapper:contains("+authorTest+")";
		$(".lightbox-background").show("fast");		
		$(".lightbox-content").append("<h2>Quotes by " + authorTest+":</h2>");
		$(selector).clone().appendTo("#lightbox-content");			
	});

	//Close and clear lightbox
	$(document).on("click", ".lightbox-button", function(){
		$(".lightbox-content").html("");
		$(".lightbox-background").hide("fast");
	});


	//Random quote button
	$(document).on("click", "#random-quote", function(){
		var randomNum = Math.round(Math.random() * quote.length);
		if(randomNum === 0) {randomNum = 1;}
		$(".lightbox-background").toggle("fast");		
		$(".lightbox-content").append("<h2>Random quote:</h2>");
		$("#quote"+randomNum).clone().appendTo("#lightbox-content");	
	});


	//================= Rating system ============================
	//Images for the stars
	var filledStar = "<img src='data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZERjg4IiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4='>";
	var emptyStar = "<img src='data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjREREREREIiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4='>";

	//Star rating function
	$(document).on("change",':radio', function(){
    var stars;
    var i = $(this).closest(".quote-wrapper").find(".quote-num").text();
    quote[i].rating = Number(this.value);
    $("#quote"+i).data('rating', quote[i].rating);
    if (quote[i].rating === 1) {$(this).closest(".rating").html(filledStar + emptyStar + emptyStar + emptyStar + emptyStar);}
    if (quote[i].rating === 2) {$(this).closest(".rating").html(filledStar + filledStar + emptyStar + emptyStar + emptyStar);}
    if (quote[i].rating === 3) {$(this).closest(".rating").html(filledStar + filledStar + filledStar + emptyStar + emptyStar);}
    if (quote[i].rating === 4) {$(this).closest(".rating").html(filledStar + filledStar + filledStar + filledStar + emptyStar);}
    if (quote[i].rating === 5) {$(this).closest(".rating").html(filledStar + filledStar + filledStar + filledStar + filledStar);}
	if (quote[i].rating > 1) {
		stars = "stars";} else {
			stars = "star";}
	$("#quote"+i).find(".rating-display").text(quote[i].rating + " " + stars);
	});

	//================== Sorting functions ==========================
	// Sort quotes by post order
	var sortPostOrder = function(){
		var currentList = $("#quote-list").find(".quote-wrapper").toArray();
		var sorted = currentList.sort(function(ob1, ob2){
            var $ob1 = $(ob1);
            var $ob2 = $(ob2);
           if($ob1.data('index') < $ob2.data('index'))
              return -1;
            if($ob1.data('index') > $ob2.data('index'))
            return 1;
            return 0;
          });
		for(var i = 0; i < sorted.length; i++) {
			$(sorted[i]).appendTo("#quote-list");
		}
	};
	
	//Post order button click-handler
	$(document).on("click", "#sort-post-order", function(){
		sortPostOrder();
	});


	//Sort quotes by rating function
	var sortByRating = function(){
		var currentList = $("#quote-list").find(".quote-wrapper").toArray();
		var sorted = currentList.sort(function(ob1, ob2){
            var $ob1 = $(ob1);
            var $ob2 = $(ob2);
           if($ob1.data('rating') > $ob2.data('rating'))
              return -1;
            if($ob1.data('rating') < $ob2.data('rating'))
            return 1;
            return 0;
          });
		for(var i = 0; i < sorted.length; i++) {
			$(sorted[i]).appendTo("#quote-list");
		}
	};
		
	//Rating button click-handler
	$(document).on("click", "#sort-rating", function(){
		sortByRating();
	});


}); //============End ready function ====================