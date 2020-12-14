$(window).on("load", function () {// utilizamos $(window).on("load"... para que estas funciones
//se ejecuten una vez que se han cargado todos los elementos en el DOM, porque dependemos del
//Objeto que imprime nuestra función que obtiene los resultados de la base

    const searcher = (selector) => {
        $(selector).keyup(event => {
            $("#pills-feed-tab").trigger("click");
            $(".tab-pane").hide();
            $("#pills-feed").show();
            let result = searchPost(event)
            //Si se cumplieron con las condiciones de ser letras, cuando se pone mayúsculas
            //event.keyCode === 8 tecla borrar en unicode
            // event.keyCode === 32 tecla espace
            //event.keyCode === 13 tecla enter para que funcione si copiamos y pegamos
            console.log(Object.keys(result).length)
            event.key.match(/^[a-z]$/gim) || event.shiftKey || event.keyCode === 8 || event.keyCode === 32 || event.keyCode === 13 ? printCards("", result) : null
        })
    }
    const searchPost = event =>{
        let filterObjects = {};
           //Añadir puntos comas y dos puntos
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
