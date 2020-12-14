$(window).on("load", function () {

      function on() {
        document.getElementById("overlay").style.display = "block";
    }

    function off() {
        document.getElementById("overlay").style.display = "none";
    }

    // function changeView(value) {
    //     window.location.assign(value+'.html');
    // }

    function clickSave(content) {
      if (content.innerHTML == 'Saved') {
        content.innerHTML = 'Save';
      } else {
        content.innerHTML = 'Saved';
      }
    }


    $("#headingOne").click(function () {
      $("#headingOne").hide();
    });

    console.log(cardsCollection)
    // Select filters

});
