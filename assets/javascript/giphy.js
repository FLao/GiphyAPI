$(document).ready(function(){

    var topics = ["Super Mario", "The Legend of Zelda", "Mega Man", "Sonic the Hedgehog", "Pacman", "Star Fox", "Metroid", "Donkey Kong", "Kid Icarus", "Final Fantasy", "Street Fighter", "F-Zero", "Punch Out"];

    function displayVideogame(){

        $("#videogamesView").empty();
        var videogame = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + videogame + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";   

        $.ajax({url: queryURL, method: "GET"}).done(function(response) {

            for(var j = 0; j < limit; j++) {    

                var videogameDiv = $("<div>");
                videogameDiv.addClass("videogameHolder");
            
                var image = $("<img>");
                image.attr("src", response.data[j].images.downsized_still.url);
                image.attr("data-still", response.data[j].images.downsized_still.url);
                image.attr("data-animate", response.data[j].images.downsized.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                videogameDiv.append(image);

                var rating = response.data[j].rating;
                var pRating = $("<p>").text("Rating: " + rating);
                videogameDiv.append(pRating)

                $("#videogamesView").append(videogameDiv);
                
            }
        });
    }

    function renderButtons(){ 

        $("#buttonsView").empty();

        for (var i = 0; i < topics.length; i++){

            var v = $("<button>") 
            v.attr("class", "btn btn-default");
            v.attr("id", "videogame")  
            v.attr("data-name", topics[i]); 
            v.text(topics[i]); 
            $("#buttonsView").append(v); 
        }
    }

    function imageChangeState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

    $("#addVideogame").on("click", function(){

        var videogame = $("#videogame-input").val().trim();

        topics.push(videogame);
                
        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", "#videogame", displayVideogame);
    $(document).on("click", ".gif", imageChangeState);
});
