$('.image-add-button').click( ()=> {
    $('.image-add-button').hide()
    $(".input-add-image").toggleClass("d-none")
    

})
let cardsCollection = {};
let newPostObject = {
                    "date": moment().subtract(30,"days").format("YYYY-MM-DD HH:mm:ss"),
                    "name": "JuanPa",
                    "lastName": "Sánchez" 
                    }
let tagsArray = []
$("input, textarea").change(event => {
    let name = event.target.name
    let value = event.target.value
    value = event.target.name == "tags"? newPostObject[name] = value.split(" ") : event.target.value
    newPostObject[name] = value
    
})
const getCards = () =>{
    $.ajax({
        url: "https://cards-6f1a0-default-rtdb.firebaseio.com/.json",
        method: "GET",
        success: response => {
            cardsCollection = response; 
            
            printCards("feed",cardsCollection)  
        },
        error: error => {
            console.log( error )
        }
    });
}


const printCards = (placeToPrint, cardsToPrint) => {
    
    placeToPrint = placeToPrint == "" ? 'feed' : placeToPrint
    $(`#pills-${placeToPrint}`).empty()
    for(key in cardsToPrint){
        console.log(cardsToPrint[key])
        let {name, lastName, picUrl, date, title, text, tags} = cardsToPrint[key]
        

const printCards = (cardsToPrint) => {
  console.log(cardsToPrint);
  $("#pills-feed").empty();
  for (key in cardsToPrint) {
    let { name, lastName, picUrl, date, title, text, tags } = cardsToPrint[key];
    
    let entryCard = `
        <div class="card">
            <a href="./post.html?postid=${key}" class="singleCard">
                <span class="">
                    <img class="card-img-top" src="${picUrl}" alt="Card image cap">
                </span>
            </a>
                
            <div class="card-body">
                <img class="profile_min" src="images/aside1/prision-mike.png" alt="">
                <div class="info_personal d-inline-block flex-column">
                    <span class="card-text d-block name">
                        <a class="">${name} ${lastName}</a>
                    </span>
                    <span class="card-text d-block date">
                        <a class="">${moment(
                            date,
                            "YYYY-MM-DD HH:mm:ss"
                            ).fromNow()}
                        </a>
                    </span>
                </div>

                <div class="content-center">
                    <h1 class="card-title mt-3">
                        <a href="./post.html?postid=${key}">${title}</a>
                    </h1>
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
                            $(`#pills-${placeToPrint}`).prepend(entryCard);
    }
}

getCards();

const savePost = newPost => {

    $.ajax({
        url: "https://cards-6f1a0-default-rtdb.firebaseio.com/.json",
        method: "POST",
        data: JSON.stringify(newPost),
        success: response => {
           

            
        },
        error: error => {
            console.log( error )
        }
    });
}
    
$("#savePost").click( () =>{
        savePost(newPostObject)
        window.location.href = "index.html";
        
 })

$("#pills-week-tab").click(() => {
    let filteredPosts = {}
    let cardDate = moment(cardsCollection[key].date, "YYYYMMDD")
    let todaysDate = moment()
    for (key in cardsCollection) {
        if (todaysDate.diff(cardDate, "weeks") === 0) {
            filteredPosts[key]= cardsCollection[key]
        }
        
        
    }
    printCards("week",filteredPosts)
})

$("#pills-month-tab").click(() => {
    let filteredPosts = {}
    let cardDate = moment(cardsCollection[key].date, "YYYYMMDD")
    let todaysDate = moment()
    for (key in cardsCollection) {
        if (todaysDate.diff(cardDate, "months") === 0) {
            filteredPosts[key]= cardsCollection[key]
        }
        
        
    }
    printCards("month",filteredPosts)
})

$("#pills-year-tab").click(() => {
    let filteredPosts = {}
    let cardDate = moment(cardsCollection[key].date, "YYYYMMDD")
    let todaysDate = moment()
    for (key in cardsCollection) {
        if (todaysDate.diff(cardDate, "years") === 0) {
            filteredPosts[key]= cardsCollection[key]
        }
        
        
    }
    printCards("year",filteredPosts)
})

$("#pills-infinity-tab").click(() => {
    let filteredPosts = {}
    let cardDate = moment(cardsCollection[key].date, "YYYYMMDD")
    let todaysDate = moment()
    for (key in cardsCollection) {
        if (todaysDate.diff(cardDate, "days") >= 0) {
            filteredPosts[key]= cardsCollection[key]
        }
        
        
    }
    printCards("infinity",filteredPosts)
})
    

$("#savePost").click(() => {
  savePost(newPostObject);
  window.location.href = "index.html";
  // getCards();
});
