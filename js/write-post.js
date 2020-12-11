$('.image-add-button').click( ()=> {
    $('.image-add-button').hide()
    $(".input-add-image").toggleClass("d-none")
    

})
let cardsCollections = {};
let newPostObject = {
                    "date": moment().format("YYYY-MM-DD HH:mm:ss"),
                    "name": "JuanPa",
                    "lastName": "Sánchez" 
                    }
let tagsArray = []
$("input, textarea").change(event => {
    let name = event.target.name
    let value = event.target.value
    value = event.target.name == "tags"? newPostObject[name] = value.split(" ") : event.target.value
    newPostObject[name] = value
    console.log(newPostObject)
})
const getCards = () =>{
    $.ajax({
        url: "https://cards-6f1a0-default-rtdb.firebaseio.com/.json",
        method: "GET",
        success: response => {
            cardsCollections = response; 
            console.log( cardsCollections )
            printCards(cardsCollections)
            addToCardListener()  
        },
        error: error => {
            console.log( error )
        }
    });
}


const printCards = cardsToPrint => {
    console.log(cardsToPrint)
    $("#pills-feed").empty()
    for(key in cardsToPrint){
        let {name, lastName, picUrl, date, title, text, tags} = cardsToPrint[key]
        console.log(typeof(cardsToPrint[key].date))
        console.log(tags)

        let entryCard = `<div class="card" data-card-key=${key}>
                                <span class=""><img class="card-img-top" src="${picUrl}"
                                    alt="Card image cap"></span>
                                <div class="card-body">
                                <img class="profile_min" src="images/aside1/prision-mike.png" alt="">
                                <div class="info_personal d-inline-block flex-column">
                                    <span class="card-text d-block name"><a class="">${name} ${lastName}</a></span>
                                    <span class="card-text d-block date"><a class="">${moment(date, "YYYY-MM-DD HH:mm:ss").fromNow()}</a></span>
                                </div>

                                <div class="content-center">
                                    <h1 class="card-title mt-3"> <a href="#">${title}</a></h1>
                                    <div class="hashtags">
                                    <a href=""><span class="crayon">#</span>${tags}</a>
                                    </div>

                                    <div class="card-b-content d-flex justify-content-between align-items-center">
                                    <div class="icon-right">
                                        <a href="">
                                        <img src="images/icon_cards/icono_corazon.svg" alt="">
                                        <span>8 reaction</span>
                                        </a>
                                        <a href="">
                                        <img src="images/icon_cards/icon_comment.svg" alt="">
                                        <span>Add comment</span>
                                        </a>
                                    </div>

                                    <div class="icon-left">
                                        <small class="text-muted timer">1 min read</small>
                                        <button type="button" class="btn btn-less-light" onclick="clickSave(this)">
                                        Save
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>`
                            $("#pills-feed").prepend(entryCard);
    }
}




const savePost = newPost => {

    $.ajax({
        url: "https://cards-6f1a0-default-rtdb.firebaseio.com/.json",
        method: "POST",
        data: JSON.stringify(newPost),
        success: response => {
            console.log( response )
            
        },
        error: error => {
            console.log( error )
        }
    });
}

const addToCardListener = () => {
    $('#pills-feed .card').click(event => {
        console.log(event.target)
        let cardKey = $(event.target).closest(".card").data("card-key")
        let selectedCard = cardsCollections[cardkey]

        
        let {picUrl, title, tags, name, lastName, text, date} = selectedCard
        $("#myTopImg").attr("src", picUrl );
        $("#nombreDeUsuario").text(name + " " + lastName)
        $("#fechaDelPost").text(moment(date, "YYYY-MM-DD HH:mm:ss").fromNow())
        $("#misHashTags").empty()
        selectedCard[tags].forEach((item, index) =>{
            $("#misHashTags").append(`<a href=""><span class="crayon">${item[index]}</span>beginners</a>`)
        })
        $("#mytitlePage").text(title)
        $("#myText").text(text)
        
        window.location.href = "post.html"
    })
}

    
$("#savePost").click( () =>{
        savePost(newPostObject)
        window.location.href = "index.html";
        // getCards();
 })

getCards();
  
  




