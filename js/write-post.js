$('.image-add-button').click( ()=> {
    $('.image-add-button').hide()
    $(".input-add-image").toggleClass("d-none")
})

let cardsCollection = {};
let newPostObject = {
                    "date": moment().format("YYYY-MM-DD HH:mm:ss"),
                    "name": "JuanPa",
                    "lastName": "Sánchez",
                    "savedPost": false
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
    console.log(cardsToPrint)
    placeToPrint = placeToPrint == "" ? 'feed' : placeToPrint
    $(`#pills-${placeToPrint}`).empty()
    for(key in cardsToPrint){
        let {name, lastName, picUrl, date, title, text, tags, savedPost} = cardsToPrint[key]
        let entryCard = `
            <div class="card">
                <a href="./post.html?postid=${key}" class="singleCard">
                    <span class="">${picUrl !== "" ? `<img class="card-img-top" src="${picUrl}" alt="Card image cap">` : ``}
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
                        <div id="myHashtags" class="hashtags">
                        ${(tags || []).map(item => `<a href=""><span class="crayon">${item}</span></a>`).join(` `)}
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
                                <button type="button" data-key="${key}" data-savedpost="${savedPost}" class="btn btn-less-light save-key">
                                ${savedPost ? 'Saved' : 'Save'}
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

// Añadir eventHandler a button dinámico
$(document).on("click", ".save-key", event => {
    console.log(event.target)
    let id = $(event.target).data("key");
    let savedValue = $(event.target).data("savedpost");
    saveReadingList(id, savedValue)
    $(event.target).data("savedpost", !savedValue);
    $(event.target).text(savedValue ? "Save" : "Saved")
})

const saveReadingList = (id, savedValue) => {
    console.log(savedValue)
    let data = {"savedPost": !savedValue}
    $.ajax({
        url : `https://cards-6f1a0-default-rtdb.firebaseio.com/${id}.json`,
        data : JSON.stringify(data),
        type : 'PATCH',
        // contentType : 'application/json',
        success: function() {
            return console.log("Todo ok")
        }
    });     
}

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

const sortPosts = filteredPosts => {
    let orderedPosts = {}
    let keysSorted = Object.keys(filteredPosts).sort( (a,b) => moment(filteredPosts[b].date) - moment(filteredPosts[a].date));
    keysSorted.forEach(key => { orderedPosts[key] = filteredPosts[key] })
    return orderedPosts;
}
    
$("#savePost").click( () =>{
        savePost(newPostObject)
        window.location.href = "index.html";
 })

$("#pills-week-tab").click(() => {
    let filteredPosts = {}
    let todaysDate = moment()
    for (key in cardsCollection) {
        let cardDate = moment(cardsCollection[key].date, "YYYYMMDD HH:mm:ss")
        if (todaysDate.diff(cardDate, "weeks") <= 1) {
            filteredPosts[key]= cardsCollection[key]
        }
    }
    filteredPosts = sortPosts(filteredPosts);
    printCards("week",filteredPosts)
})

$("#pills-month-tab").click(() => {
    let filteredPosts = {}
    let todaysDate = moment()
    for (key in cardsCollection) {
        let cardDate = moment(cardsCollection[key].date, "YYYYMMDD HH:mm:ss")
        if (todaysDate.diff(cardDate, "months") <= 1) {
            filteredPosts[key]= cardsCollection[key]
        }
    }
    filteredPosts = sortPosts(filteredPosts);
    printCards("month",filteredPosts)
})

$("#pills-year-tab").click(() => {
    let filteredPosts = {}
    let todaysDate = moment()
    for (key in cardsCollection) {
        let cardDate = moment(cardsCollection[key].date, "YYYYMMDD HH:mm:ss")
        if (todaysDate.diff(cardDate, "years") <= 1) {
            filteredPosts[key]= cardsCollection[key]
        }
    }
    filteredPosts = sortPosts(filteredPosts);
    printCards("year",filteredPosts)
})

$("#pills-infinity-tab").click(() => {
    let filteredPosts = {}
    let todaysDate = moment()
    for (key in cardsCollection) {
        let cardDate = moment(cardsCollection[key].date, "YYYY-MM-DD HH:mm:ss")
        if (todaysDate.diff(cardDate, "days") >= 0) {
            filteredPosts[key]= cardsCollection[key]
        }
    }
    filteredPosts = sortPosts(filteredPosts);
    printCards("infinity",filteredPosts)
})

$("#pills-latest-tab").click(() => {
    let filteredPosts = {}
    let currentPosts = {}
    let contador = 0;
    let todaysDate = moment()
    for (key in cardsCollection) {
        let cardDate = moment(cardsCollection[key].date, "YYYY-MM-DD HH:mm:ss")
        if (todaysDate.diff(cardDate, "days") >= 0) {
            filteredPosts[key]= cardsCollection[key]
        }
    }
    filteredPosts = sortPosts(filteredPosts);
    console.log(Object.keys(filteredPosts))
    console.log(Object.values(filteredPosts))
   
        for(key in filteredPosts){
            if(contador < 10){
            currentPosts[key] = filteredPosts[key]
            }
            contador++
        }

    printCards("latest",currentPosts)
})

