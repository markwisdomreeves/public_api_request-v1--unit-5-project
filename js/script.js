
// Global variables
const searchParent = document.querySelector(".search-container");
const gellaryContainer = document.querySelector("#gallery");
const searchForm = document.querySelector('form');
const randomuserUrl = "https://randomuser.me/api/?results=12&nat=us";
let hpCharacters = [];


// create search bar function section
const searchBar = () => {
    const createSearchForm = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`;
      // searchParent.appendChild(createSearchForm)
      searchParent.insertAdjacentHTML('afterbegin', createSearchForm)
      console.log(searchParent)
  }
  searchBar();
  
// This function is to allow users to filter or search data in the input field
searchForm.addEventListener('keyup', (event) => {
    console.log(searchBar)
    const searchString = event.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

// This function fetch data from the Api
const loadCharacters = async () => {
    try {
        const res = await fetch(randomuserUrl);
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

// This function display data on the page
const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src=${character.picture.thumbnail} alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${character.name.first} ${character.name.last}</h3>
                    <p class="card-text">${character.email}</p>
                    <p class="card-text cap">${character.location.city} ${character.location.state}</p>
                </div>
            </div>
        `;
        })
        .join('');
    gellaryContainer.innerHTML = htmlString;
};

loadCharacters();

