const API_Base = "https://v2.api.noroff.dev";
const API_Listings = "/auction/listings";

document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const searchTerm = document.querySelector("input[type='search']").value.trim();
  console.log("searchTerm", searchTerm);
  if (searchTerm) {
    window.location.href = `?search=${searchTerm}`;
  }
});

const params = new URLSearchParams(window.location.search);
const search = params.get("search");

console.log("search", search);

// const listings = [
//   {
//     title: "Luxury Villa",
//     image: "images/hus til salgs5.webp",
//     description: "A luxurious villa with a sea view, featuring 4 bedrooms and 2 bathrooms.",
//     currentBid: 150,
//     endsIn: "3 days 4 hours",
//   },
//   {
//     title: "City Center Apartment",
//     image: "images/hus til salgs6.webp",
//     description: "A modern apartment in a central location with easy access to transportation.",
//     currentBid: 150,
//     endsIn: "3 days 4 hours",
//   },
//   {
//     title: "Country House",
//     image: "images/hus til salgs7.webp",
//     description: "A peaceful country house surrounded by nature, featuring a large garden.",
//     currentBid: 150,
//     endsIn: "3 days 4 hours",
//   },
// ];

let listings = [];

try {
  fetch(`${API_Base}${API_Listings}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data.data);
      listings = data.data;
    })
    .catch((error) => {
      console.error("Error while fetching listings", error);
    })
    .finally(() => {
      console.log("listings", listings);
      renderListings(listings);
    });
} catch (error) {
  console.error("Error while fetching listings", error);
}

const renderListings = (listings) => {
  const filteredListings = listings.filter((listing) => {
    if (!search) return true;
    return listing.title.toLowerCase().includes(search.toLowerCase());
  });

  const listingHtml = filteredListings.map((listing) => {
    return `
                <div class="col">
                  <div class="card h-100">
                    ${listing.media[0]?.url ? `<img src="${listing.media[0].url}" class="card-img-top" alt="${listing.title}" />` : ""}
                    <div class="card-body">
                      <h5 class="card-title">${listing.title}</h5>
                      <p class="card-text">${listing.description}</p>
                      <p class="card-text"><strong>Current Bid:</strong> ${listing._count.bids} bids</p>
                      <p class="card-text"><strong>Ends in:</strong> ${new Date(listing.endsAt).toLocaleString()}</p>
                    </div>
                    <a id="${listing.id}" class="btn btn-primary btn-lg m-3">Bid now</a>
                  </div>
                </div>
              `;
  });

  document.querySelector(".row").innerHTML = listingHtml.join("");

  document.querySelectorAll(".btn-primary").forEach((element) => {
    element.addEventListener("click", function () {
      const listing = filteredListings.find((listing) => {
        return listing.id === element.id;
      });
      const params = new URLSearchParams({
        id: listing.id,
        title: listing.title,
        image: listing.media[0]?.url,
        description: listing.description,
        currentBid: listing._count.bids,
        endsIn: new Date(listing.endsAt).toLocaleString(),
      });
      const url = new URL("bid.html", window.location.origin);
      url.search = params;
      window.location.href = url.href;
    });
  });
};
