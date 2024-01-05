// Function to fetch dog breeds and display them
async function fetchAndDisplayDogBreeds() {
  const breeds = await fetchDogBreeds();
  displayDogBreeds(breeds);
}


async function fetchDogBreeds() {
  const apiKey = 'live_jyEase7lMURLTfyPEAet20aGmHhAnf81uuLrf04NV0ybpYsSgCLfTMiRr2l2NwP0';
  const response = await fetch('https://api.thedogapi.com/v1/breeds', {
    headers: {
      'x-api-key': apiKey
    }
  });
  const data = await response.json();
  return data;
}

async function fetchBreedDetails(breedId) {
  const apiKey = 'live_jyEase7lMURLTfyPEAet20aGmHhAnf81uuLrf04NV0ybpYsSgCLfTMiRr2l2NwP0';
  const response = await fetch(`https://api.thedogapi.com/v1/breeds/${breedId}`, {
    headers: {
      'x-api-key': apiKey
    }
  });

  if (response.ok) {
    const breedDetails = await response.json();
    return breedDetails;
  } else {
    return null;
  }
}


function displayDogBreeds(breeds) {
  const container = document.querySelector('.breeds-container');

  breeds.forEach(breed => {
    const card = document.createElement('div');
    card.classList.add('dog-card');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const breedName = document.createElement('h2');
    breedName.textContent = breed.name;

    if (breed.name.length > 16) {
      breedName.style.fontSize = '14px';
    }

    const breedImage = document.createElement('img');
    breedImage.src = breed.image.url;
    breedImage.alt = breed.name;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    const breedDetails = document.createElement('div');
    breedDetails.innerHTML = `
      <p>Temperament: ${breed.temperament}</p>
      <p>Origin: ${breed.origin}</p>
      <p>Life Span: ${breed.life_span}</p>
      <p>Height: ${breed.height.metric}</p>
      <p>Weight: ${breed.weight.metric}</p>
      <!-- Include other details as needed -->
    `;
    
    cardFront.appendChild(breedName);
    cardFront.appendChild(breedImage);
    
    cardBack.appendChild(breedDetails);
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    
    container.appendChild(card);
  });
}


// Function to display all dog breeds
function displayAllBreeds() {
  const breedCards = document.querySelectorAll('.dog-card');
  breedCards.forEach(card => {
    card.style.display = 'block';
  });
}


// Function to search dog breeds
function searchDogBreeds() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const breedCards = document.querySelectorAll('.dog-card');

  breedCards.forEach(card => {
    const breedName = card.querySelector('.card-front h2').textContent.toLowerCase();
    if (breedName.includes(searchInput)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Event listeners for search functionality
document.getElementById('search-button').addEventListener('click', searchDogBreeds);
document.getElementById('search-input').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    searchDogBreeds();
  }
});


// Event listener to show all breeds again
document.getElementById('show-all-button').addEventListener('click', displayAllBreeds);


// Function to toggle the 'is-flipped' class on click
function flipCard() {
  this.classList.toggle('is-flipped');
}


// Initialization function
async function init() {
  await fetchAndDisplayDogBreeds();

  // Add click event listener to all dog cards
  document.querySelectorAll('.dog-card').forEach(card => {
    card.addEventListener('click', flipCard);
  });

  // Add event listener for search button
  document.getElementById('search-button').addEventListener('click', searchDogBreeds);

  // Add event listener for search input keyup
  document.getElementById('search-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      searchDogBreeds();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
