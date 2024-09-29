const API_Base = "https://v2.api.noroff.dev";
const API_Listings = "/auction/listings";
const API_Key = '469afe69-d51d-4f51-8e40-618b936a4e1a';

const params = new URLSearchParams(window.location.search);
const title = params.get("title");
const image = params.get("image");
const description = params.get("description");
const currentBid = params.get("currentBid");
const endsIn = params.get("endsIn");
const id = params.get("id");

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("listingImageContainer").src = image;
  document.getElementById("listingTitle").innerHTML = title;
  document.getElementById("listingBids").innerHTML = currentBid;
  document.getElementById("listingEndsAt").innerHTML = endsIn;
});

document.getElementById("bidForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const bidAmount = document.getElementById("bidAmount").value;

  console.log("bidAmount", bidAmount);

  const url = `${API_Base}${API_Listings}/${id}/bids?_bids=true`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "X-Noroff-API-Key": API_Key,
    },
    body: JSON.stringify({ amount: parseFloat(bidAmount) }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      if (data.errors) {
        data.errors.forEach((error) => {
          document.getElementById("addBidFormFeedback").textContent += `${error.message}\n`;
        });
        return;
      }
      document.getElementById("listingBids").innerHTML = data.amount;
      document.getElementById("addBidFormFeedback").textContent = "Bid added successfully!";
    })
    .catch((error) => {
      console.error("Error during bid:", error);
      document.getElementById("addBidFormFeedback").textContent = "Bid failed, please try again later";
    });
});
