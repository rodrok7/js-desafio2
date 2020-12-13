$( window ).on( "load", function() { 
    console.log(cardsCollection)
    
    $("#search-posts").keyup( event => {
        console.log(event.key)

        let filterObjects = {}
            // Si mi tecla "shift" está presionada toma el valor de la siguiente tecla
        $("#pills-feed-tab").trigger("click")
        
        if (event.shiftKey || event.target.value.match(/[a-z]/gmi || event.keyCode === 32 || event.keyCode === 13)) {
            console.log(event.key)
            // Los datos a iterar son JSON, no arrays
            for(key in cardsCollection){
                console.log(key)
                let {title} = cardsCollection[key]
                let character = event.target.value.toLowerCase();
                let find = title.toLowerCase().includes(character);
                console.log(find)
                find ? filterObjects[key] = cardsCollection[key] : null
            }

        }
        if (event.keyCode === 8) {
            console.log(event.key)
            for(key in cardsCollection){
                console.log(event.key)
                let {title} = cardsCollection[key]
                let character = event.target.value.toLowerCase();
                character = character.slice(0, -1);
                let find = title.toLowerCase().includes(character);
                find ? filterObjects[key] = cardsCollection[key] : null
            }
        }
            //printCards("", filterObjects)
        (event.key.match(/[a-z]/gmi) || event.shiftKey || event.keyCode === 8 || event.keyCode === 32) ? printCards("", filterObjects) : console.log("esta no es la tecla")
    })
})
