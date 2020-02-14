
// Global variables
const searchParent = document.querySelector(".search-container");
const gellaryContainer = document.querySelector("#gallery");
// const randomuserUrl = "https://randomuser.me/api/?results=12&nat=us";
const randomuserUrl = "https://randomuser.me/api/?nat=us&results=12"
let userData = [];


// fetching the data from the randomuser api section
function randomuserData() {
    fetch(randomuserUrl)
     .then(response => response.json())  
     .then(function(data) {
          userData = [...data.results]
          const randomUsers = userData
          .map(user => {
            return `
                <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src=${user.picture.thumbnail} alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="card-text">${user.email}</p>
                        <p class="card-text cap">${user.location.city} ${user.location.state}</p>
                    </div>
                </div>
            `
         })
         .join('');
         gellaryContainer.insertAdjacentHTML('afterbegin', randomUsers)
     })
     .catch(err => console.log('failed to fetch data from api: ', err));
 }
 randomuserData()


// create search bar function section
const searchBar = () => {
    const createSearchForm = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`;
    searchParent.insertAdjacentHTML('afterbegin', createSearchForm)
}
searchBar();


// create the pupup modal of a single user when click
const userPopUpModal = function(employee) {
    const modalContainer = document.createElement('div');
    modalContainer.className = '.modal-container';
    const body = document.querySelector('body');
    body.appendChild(modalContainer);
        const htmlString = `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.thumbnail}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.location.city}</p>
                    <hr>
                    <p class="modal-text">${employee.phone}</p>
                    <p class="modal-text">
                        ${employee.location.street.number} 
                        ${employee.location.street.name}, 
                        ${employee.location.state} 
                        ${employee.location.postcode} 
                    </p>
                    <p class="modal-text">Birthday: ${employee.dob.date}</p>
                </div>
            </div>
        `;
    modalContainer.innerHTML = htmlString;
    
    // modalContainer.insertAdjacentHTML('afterbegin', htmlString)
    const closeButton = document.querySelector('.modal-close-btn');
    closeButton.addEventListener('click', e => {
        userPopUpModal.remove()
    })

}

