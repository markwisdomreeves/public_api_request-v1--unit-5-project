//global variables
const gellaryContainer = document.querySelector("#gallery");
// const body = document.querySelector('body');
const randomuserUrl = "https://randomuser.me/api/?results=12&nat=us"
let userData = [];


// // fetch data from the random user api
// fetch(randomuserUrl)
//   .then(res => res.json())
//   .then(data => {
//     userData = [...data.results];
//     userCardsFunc(data.results);
// })

async function getData() 
    {
        //await the response of the fetch call
        let response = await fetch(randomuserUrl);
        //proceed once the first promise is resolved.
        let data = await response.json()
        userData = [...data.results]
        userCardsFunc(data.results);
        //proceed only when the second promise is resolved
        return userData;
    }
//call getData function
getData()



//function to generate HTML
const userCardsFunc = function(userData) {
  for(var i = 0; i < userData.length; i++) {
    const allCards = `<div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${userData[i].picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${userData[i].name.first} ${userData[i].name.last}</h3>
                <p class="card-text">${userData[i].email}</p>
                <p class="card-text cap">${userData[i].location.city}, ${userData[i].location.state}</p>
            </div>
        </div>`;
    gellaryContainer.insertAdjacentHTML('afterbegin', allCards) 
  }
  
}


//function to create modal window
function createModalBox(data) {
  let divOverlay = document.createElement('div');
  divOverlay.className = 'modal-container';
  const htmlString = 
        `<div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${data.picture.thumbnail} alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${data.location.city}</p>
                <hr>
                <p class="modal-text">${data.phone}</p>
                <p class="modal-text">${data.location.street.number} 
                 ${data.location.street.name}, ${data.location.city}, 
                ${data.location.state} ${data.location.postcode}</p>
                <p class="modal-text">Birthday: ${data.dob.date}${data.dob.date}${data.dob.date}</p>
            </div>
        </div>`;
               
    gellaryContainer.appendChild(htmlString);
    // gellaryContainer.style.display = '';

    
    // event to close the popup modal by clicking the close btn
    const btnClose = document.getElementById('modal-close-btn');
    btnClose.addEventListener('click', () => {
        gellaryContainer.remove();
    });

}


//event to display the modal when click on
gellaryContainer.addEventListener('click', (event) => {
  if (event.target.className.includes('card')) {
    createModalBox(userData);
  }
});

