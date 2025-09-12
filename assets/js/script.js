

// Function to fetch data from NFSA API
async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Full API Response:", data);
    displayResults(data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("objectsContainer").innerHTML = `<p>Error fetching data. Please try again later.</p>`;
  }
}

// Function to display API results
function displayResults(results) {
  const objectsContainer = document.getElementById("objectsContainer");
  objectsContainer.innerHTML = ""; // Clear previous results

  results.forEach(item => {
    console.log("Item:", item); // Step to log each item

    // Extract the preview array
    const imgArr = item.preview || []; // Default to empty array

    // Initialize empty image URL
    let imgurl = "assets/img/No_Image_Available.jpg";

    // // Loop through the preview array to find an image
    // const baseurl = "https://media.nfsacollection.net/";
    // for (let i = 0; i < imgArr.length; i++) {
    //   console.log("Preview object:", imgArr[i]); // Log preview object
    //   if (imgArr[i].hasOwnProperty("filePath")) {
    //     imgurl = baseurl + imgArr[i].filePath;
    //     break; // Use the first valid image
    //   }
    //   else {
    //     imgurl = "assets/img/No_Image_Available.jpg"
    //   }
    // }

    // 1. Create a container for the item
    const itemContainer = document.createElement("div");
    const surpriseFeatureContainer = document.createElement("div");

const fromYear = results;
console.log(fromYear); // 1983

    // 2. Use template literals to embed the item details in HTML
    itemContainer.innerHTML = `<div class="card h-100" style="width: 24rem;">
    <img src="${imgurl}" class="card-img-top" alt="...">
    <div class="card-body d-flex flex-column">
       <h5 class="card-title">${item.title}</h5>
     <p class="card-text mb-4">${item.name}</p>
     <button type="button" class="btn btn-primary mt-auto">Learn more</button>
    </div>
</div>
      `;

      // 2. Use template literals to embed the surprise me container in HTML
    surpriseContainer.innerHTML = `
    <button type="button" class="btn btn-dark mb-4 mt-4 w-25 m-auto">Surprise me</button>
    <div class="card h-100 w-50 m-auto">
    <img src="${imgurl}" class="card-img-top img-fluid" alt="..." style="max-height: 450px;">
    <div class="container p-4">
      <button type="none" class="btn btn-light me-2">${fromYear[0].productionDates[0].fromYear}</button>
      <button type="none" class="btn btn-light me-2">${fromYear[0].subMedium}</button>
      <button type="none" class="btn btn-light me-2">${fromYear[0].languages}</button>

    </div>
    <div class="card-body d-flex flex-column">
       <h5 class="card-title">${item.title}</h5>
     <p class="card-text mb-4">${item.summary}</p>
     <button type="button" class="btn btn-primary mt-auto">Learn more</button>
    </div>
</div>
      `;

    // 3. Append the item container to the objects container
    objectsContainer.appendChild(itemContainer);
    surpriseContainer.appendChild(surpriseFeatureContainer);
  });
}

getData("https://api.collection.nfsa.gov.au/search?query=cinema");