$(function () {
    //declaring variables
    var giphyAPIKey = "0iEGw7SxXaBUvPXVNuAimMJuX7LtFKYO",
        queryURL = "",
        searchTerm = "",
        input = "",
        animals = ["cat", "dog", "bear", "horse", "skunk", "raccoon", "bird", "deer", "moose", "rabbit", "hamster", "turtle", "chicken", "pig", "goat", "sheep", "hedgehog", "gineapig"];

    //generating search buttons
    function makeButtons() {
        $("#buttons").empty();
        for (i = 0; i < animals.length; i++) {
            var b = $("<button>");
            b.addClass("animalButton");
            b.attr("data-name", animals[i]);
            b.text(animals[i]);
            $("#buttons").append(b);
        };
    };
    makeButtons();

    //function to add new buttons
    $("#submit").on("click", function (event) {
        event.preventDefault();
        input = $("#input").val().trim();
        animals.push(input);
        makeButtons();
    });

    //function to get data from Giphy, changed to document to avoid issues with event bubbling
    $(document).on("click", ".animalButton", function (event) {
        event.preventDefault();
        searchTerm = $(this).attr("data-name").split(" ").join("+");
        queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + giphyAPIKey + "&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#gifs").empty();
            for (var i = 0; i < response.data.length; i++) {
                var d = $("<div>");
                var p = $("<p class='rating'>").text("Rating: " + response.data[i].rating);
                var img = $("<img>");
                img.addClass("gif")
                img.attr("src", response.data[i].images.fixed_height_still.url);
                img.attr("data-state", "still");
                img.attr("data-position", i);
                d.append(p);
                d.append(img);
                d.addClass("gifContainer")
                $("#gifs").append(d);
            };
            function gifToggle() {
                var state = $(this).attr("data-state");
                var position = parseInt($(this).attr("data-position"));
        
                if (state === "still") {
                    $(this).attr("src", response.data[position].images.fixed_height.url);
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", response.data[position].images.fixed_height_still.url);
                    $(this).attr("data-state", "still");
                };
            };
            $(document).on("click", ".gif", gifToggle);
        });
    });

    

    

});