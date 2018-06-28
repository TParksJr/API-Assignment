$(function() {
    //declaring variables
    var giphyAPIKey = "DPJ6mgUrj8JV2BoktzbF6voOqEpNjNys",
        queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + giphyAPIKey + "&limit=10",
        searchTerm = "",
        input = "",
        animals = ["cat", "dog", "bear", "horse", "skunk", "raccoon", "bird", "deer", "moose", "rabbit", "hamster", "turtle", "chicken", "pig", "goat", "sheep", "hedgehog", "gineapig"];
    
    //generating search buttons
    for (i = 0; i < animals.length; i++) {
        $("#buttons").append("<button class='animalButton'>" + animals[i] + "</button>").data("animal", animals[i]);
    };

    //function to add new buttons *** does not work - the added button immediately disapears ***
    $("#submit").on("click", function() {
        input = $("#input").val().trim();
        input.push(animals);
        $("#buttons").append("<button class='animalButton'>" + $("#input").val().trim() + "</button>");
    });

    //function to get data from Giphy
    $(".animalButton").on("click", function() {
        searchTerm = "cat";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            $("#gifs").empty();
            for (i = 0; i < response.data.length; i++) {
                $("#gifs").append("<img src='https://media.giphy.com/media/" + response.data[i].id + "/giphy.gif'>");
            };
        }); 
    });
});