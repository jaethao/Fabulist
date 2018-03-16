$(document).ready(function() {

  //  See 15-Post-Game-Joins for examples of html handling code

  // Getting the intiial list of Games
  getGames();


  // A function for creating a Game. Calls getGames upon completion
  function upsertGame(GameData) {
    $.post("/api/Games", GameData)
      .then(getGames);
  }

  // Function for retrieving Games and getting them ready to be rendered to the page
  function getGames() {
    $.get("/api/Games", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createGameRow(data[i]));
      }
      renderGameList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of Games to the page
  function renderGameList(rows) {
    GameList.children().not(":last").remove();
    GameContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      GameList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no Games
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create a Game before you can add a Player.");
    GameContainer.append(alertDiv);
  }


});