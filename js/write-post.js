$('.image-add-button').click( ()=> {
    $('.image-add-button').hide()
    $(".input-add-image").toggleClass("d-none")
    

})
let newPostObject = {
                    "date": "20201210",
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
    $("#savePost").click( () =>{
        savePost(newPostObject)
    })





