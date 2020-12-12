let params = new URLSearchParams(document.location.search.substring(1));
let idPost = params.get("postid");
console.log(idPost);

const saveToReadingList = id => {
    /*$.ajax({
                url: `https://cards-6f1a0-default-rtdb.firebaseio.com/${id}.json`,
                method: "PATCH",
                data:JSON.stringify({"savedPost": true}),
                success: (response) => {
                  console.log(response);
                 
                },
                error: (error) => {
                  console.log(error);
                }
    });*/
};
//saveToReadingList(idPost);

const getCards = () =>{
    $.ajax({
        url: "https://cards-6f1a0-default-rtdb.firebaseio.com/.json",
        method: "GET",
        success: response => {
            cardsCollection = response;

            printSaved(cardsCollection);
        },
        error: error => {
            console.log( error )
        }
    });
}

const printSaved = (cardsToPrint) => {
  $('#savedCards').empty();
  for(key in cardsToPrint) {
    let {name, lastName, picUrl, date, title, text, tags, savedPost} = cardsToPrint[key]
    console.log(savedPost);
    if(!savedPost) continue;
    let entryCard = `
      <div class="saved-card m-4 p-2">
        <div class="mb-2 d-inline-block">
          <img class="profile_min" src="images/aside1/prision-mike.png" alt="">
        </div>

        <div class="d-inline-block">
          <h1 class="card-title p-0 m-0">
            <a href="./post.html?postid=${key}">${title}</a>
          </h1>

          <span class="card-text name">
              <a class="">${name} ${lastName}</a>
          </span>
          <span class="card-text date">
            <a class="">${moment(
                date,
                "YYYY-MM-DD HH:mm:ss"
                ).fromNow()}
            </a>
          </span>
          <span class="text-muted timer">1 min read</span>

          <span class="hashtags">
              ${(tags || []).map(item => `<a href=""><span class="crayon">${item}</span></a>`).join(` `)}
          </span>
        </div>
      </div>
     <p>&nbsp;</p> `
    $('#savedCards').prepend(entryCard);
  }
}

getCards();
