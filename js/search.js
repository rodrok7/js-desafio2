$(window).on("load", function () {

    const searcher = (selector) => {
        $(selector).keyup(event => {
            // Si mi tecla "shift" está presionada toma el valor de la siguiente tecla
            $("#pills-feed-tab").trigger("click");
            let result = searchPost(event)
            //Si se cumplieron con las condiciones de ser letras, cuando se pone mayúsculas
            //event.keyCode === 8 tecla borrar en unicode
            // event.keyCode === 32 tecla espace
            //event.keyCode === 13 tecla enter para que funcione si copiamos y pegamos
            event.key.match(/^[a-z]$/gim) || event.shiftKey || event.keyCode === 8 || event.keyCode === 32 || event.keyCode === 13 ? printCards("", result) : null
        })
    }
    const searchPost = event =>{
        let filterObjects = {};
           
            if (event.shiftKey ||event.target.value.match(/[a-z]/gim) || event.keyCode === 32 || event.keyCode === 13) {
                // Los datos a iterar son JSON, no arrays
                for (key in cardsCollection) {
                    let { title } = cardsCollection[key];
                    let character = event.target.value.toLowerCase();
                    let find = title.toLowerCase().includes(character);
                    find ? (filterObjects[key] = cardsCollection[key]) : null;
                }
            }
            if (event.keyCode === 8) {
                for (key in cardsCollection) {
                    let { title } = cardsCollection[key];
                    let character = event.target.value.toLowerCase();
                    let find = title.toLowerCase().includes(character);
                    find ? (filterObjects[key] = cardsCollection[key]) : null;
                }
            }
            return filterObjects
    }
    searcher("#search-posts");
});
