const PLACEHOLDER_IMG = "no_image_available";
const DECADES = ["1920", "1930", "1940", "1950", "1960", "1970", "1980"];
const BASE_MEDIA_URL = "https://media.nfsacollection.net/";

let currentCarouselIndex = 0;
let currentMovies = [];
let allMoviesData = [];

// Generate a random hex color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to get image URL from preview array (not used for colored divs, kept for reference)
function getImageUrl(item) {
  const imgArr = item.preview || [];
  for (let i = 0; i < imgArr.length; i++) {
    if (imgArr[i].hasOwnProperty("filePath")) {
      return BASE_MEDIA_URL + imgArr[i].filePath;
    }
  }
  return PLACEHOLDER_IMG;
}

// Function to fetch data from NFSA API
async function getData(decade) {
  const container = document.getElementById('moviesContainer');
  container.innerHTML = '<div class="loading">Loading movies...</div>';
  
  try {
    const fromYear = parseInt(decade);
    const toYear = fromYear + 9;
    const url = `https://api.collection.nfsa.gov.au/search?query=cinema&fromYear=${fromYear}&toYear=${toYear}`;
    
    const response = await fetch(url);
    const data = await response.json();

    console.log("API Response for " + decade + "s:", data);
    
    if (data.results && data.results.length > 0) {
      displayResults(data.results);
    } else {
      container.innerHTML = '<div class="loading">No movies found for this decade.</div>';
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    container.innerHTML = '<div class="loading">Error fetching data. Please try again later.</div>';
  }
}

// Function to fetch random movie for surprise me
async function getRandomMovie() {
  try {
    const url = `https://api.collection.nfsa.gov.au/search?query=cinema`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      allMoviesData = data.results;
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      displaySurpriseMovie(randomMovie);
    }
  } catch (error) {
    console.error("Error fetching random movie:", error);
  }
}

// Create movie card HTML with random background color
function createMovieCard(movie) {
  const director = movie.name || "Unknown Director";
  const randomColor = getRandomColor(); // Assign a random color to the div

  return `
    <div class="card h-100 movie-card">
      <div class="card-img-top movie-image" style="background-color: ${randomColor}; height: 200px;"></div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text mb-4">${director}</p>
        <button type="button" class="btn btn-primary mt-auto learn-more-btn">Learn more</button>
      </div>
    </div>
  `;
}

// Display API results
function displayResults(results) {
  const container = document.getElementById('moviesContainer');
  currentMovies = results;
  currentCarouselIndex = 0;
  
  container.innerHTML = '';
  results.forEach(movie => {
    const card = document.createElement('div');
    card.innerHTML = createMovieCard(movie);
    card.querySelector('.learn-more-btn').addEventListener('click', () => showMovieDetail(movie));
    container.appendChild(card);
  });
  
  updateCarousel();
}

// Display surprise movie
function displaySurpriseMovie(movie) {
  const container = document.getElementById('surpriseContainer');
  const year = movie.productionDates && movie.productionDates[0] ? movie.productionDates[0].fromYear : 'Unknown';
  const type = movie.subMedium || 'Unknown';
  const languages = movie.languages ? movie.languages.join(', ') : 'Unknown';
  const summary = movie.summary || 'No summary available.';

  container.innerHTML = `
    <div class="d-flex flex-column align-items-center w-100">
      <button type="button" class="btn btn-dark mb-4 mt-4 w-100 w-md-25" id="surpriseMeBtn" style="max-width: 200px;">
        <i class="bi bi-dice-5 me-2 fs-5"></i> Surprise me
      </button>

      <div class="card h-100 w-100" style="max-width: 500px;">
        <div class="card-img-top movie-image" style="background-color: ${getRandomColor()}; height: 200px;"></div>
        <div class="p-3 d-flex flex-wrap gap-2 justify-content-center">
          <button type="button" class="btn btn-light btn-sm">${year}</button>
          <button type="button" class="btn btn-light btn-sm">${type}</button>
          <button type="button" class="btn btn-light btn-sm">${languages}</button>
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text mb-4">${summary}</p>
          <button type="button" class="btn btn-primary mt-auto" id="surpriseLearnMoreBtn">Learn more</button>
        </div>
      </div>
    </div>
  `;

  // Event listeners
  document.getElementById('surpriseMeBtn').addEventListener('click', getRandomMovie);

  // Attach listener directly to the "Learn more" button inside this card
  document.getElementById('surpriseLearnMoreBtn').addEventListener('click', () => showMovieDetail(movie));
}


// Carousel navigation
function updateCarousel() {
  const container = document.getElementById('moviesContainer');
  const offset = currentCarouselIndex * 400;
  container.style.transform = `translateX(-${offset}px)`;
}

document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentCarouselIndex > 0) {
    currentCarouselIndex--;
    updateCarousel();
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  const maxIndex = Math.max(0, currentMovies.length - 3);
  if (currentCarouselIndex < maxIndex) {
    currentCarouselIndex++;
    updateCarousel();
  }
});

// Decade button functionality
function initDecadeButtons() {
  const container = document.getElementById('decadeButtons');
  DECADES.forEach(decade => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-light me-2';
    btn.textContent = `${decade}'s`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('#decadeButtons button').forEach(b => b.classList.remove('decade-btn-active'));
      btn.classList.add('decade-btn-active');
      getData(decade);
    });
    container.appendChild(btn);
  });
  
  // Set default decade and load data
  container.firstChild.classList.add('decade-btn-active');
}

function initSurprise() {
  const container = document.getElementById('surpriseContainer');
  container.innerHTML = `
    <div class="d-flex flex-column align-items-center w-100">
      <button type="button" class="btn btn-dark mb-4 mt-4 w-100 w-md-25" id="surpriseMeBtn" style="max-width: 200px;">
        <i class="bi bi-dice-5 me-2 fs-5"></i> Surprise me
      </button>
    </div>
  `;

  document.getElementById('surpriseMeBtn').addEventListener('click', getRandomMovie);
}

// Show movie detail page
function showMovieDetail(movie) {
  const imgUrl = getImageUrl(movie);
  const year = movie.productionDates && movie.productionDates[0] ? movie.productionDates[0].fromYear : 'Unknown';
  const type = movie.subMedium || 'Unknown';
  const languages = movie.languages ? movie.languages.join(', ') : 'Unknown';
  const summary = movie.summary || 'No summary available.';
  const director = movie.name || 'Unknown Director';
  
  document.getElementById('detailTitle').textContent = movie.title;
  const detailImageDiv = document.getElementById('detailImage');
detailImageDiv.style.backgroundColor = getRandomColor();
  document.getElementById('detailDirector').textContent = director;
  document.getElementById('detailYear').textContent = year;
  document.getElementById('detailType').textContent = type;
  document.getElementById('detailLanguages').textContent = languages;
  document.getElementById('detailSummary').textContent = summary;
  
  document.getElementById('mainPage').classList.remove('active');
  document.getElementById('detailPage').classList.add('active');
  window.scrollTo(0, 0);
}

// Back button
document.getElementById('backBtn').addEventListener('click', () => {
  document.getElementById('detailPage').classList.remove('active');
  document.getElementById('mainPage').classList.add('active');
  window.scrollTo(0, 0);
});

// Initialize app
initDecadeButtons();
getData('1920'); // Load initial decade data
initSurprise();
