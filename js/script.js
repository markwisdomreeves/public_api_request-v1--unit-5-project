
//global variables
const gellaryContainer = document.querySelector("#gallery");
const body = document.querySelector("BODY");
const randomuserUrl = "https://randomuser.me/api/?results=12&nat=us"
let userData = [];

// This function is use to get data from the randomuser Api and return it
async function getData() 
    {
        let response = await fetch(randomuserUrl);
        let data = await response.json()
        userCardsFunc(data.results);
        userData = [...data.results]
        return userData;
    }
getData()


//function to generate HTML
const userCardsFunc = function(userInfo) {
  for(var i = 0; i < userInfo.length; i++) {
    const allCards = 
      `<div title="${i}" class="card">
          <div title="${i}" class="card-img-container">
              <img title="${i}" class="card-img" src="${userInfo[i].picture.large}" alt="profile picture">
          </div>
          <div title="${i}" class="card-info-container">
              <h3 title="${i}" id="name" class="card-name cap">${userInfo[i].name.first} ${userInfo[i].name.last}</h3>
              <p title="${i}" class="card-text">${userInfo[i].email}</p>
              <p title="${i}" class="card-text cap">${userInfo[i].location.city}, ${userInfo[i].location.state}</p>
          </div>
      </div>`;
    gellaryContainer.insertAdjacentHTML('afterbegin', allCards) 
  }
  
}

//function to create modal window
function createModalBox(user) {
  let divOverlay = document.createElement('div');
  divOverlay.className = 'modal-container';
  divOverlay.innerHTML = 
    `<div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src=${user.picture.large} alt="profile picture">
              <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
              <p class="modal-text">${user.email}</p>
              <p class="modal-text cap">${user.location.city}</p>
              <hr>
              <p class="modal-text">${user.phone}</p>
              <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
              <p class="modal-text">Birthday: ${user.dob.date.slice(5,7)}-${user.dob.date.slice(8,10)}-${user.dob.date.slice(0,4)}</p>
          </div>
      </div>`;    
  body.appendChild(divOverlay);
  
  
// event to close the popup modal by clicking the close btn
  const btnClose = document.getElementById('modal-close-btn');
  btnClose.addEventListener('click', () => {
        divOverlay.remove();
  });

}

// This add event listener is to display the modal when it is click on
gellaryContainer.addEventListener('click', (event) => {
  if (event.target.className.includes('card')) {
    createModalBox(userData[event.target.title]);
  }
});
