var stripe = Stripe('pk_test_51QvHAhPPXY2FzTMFFWXyKl3M7KMsInWeH2XcZhaUwPttsbsR1b9xe9RREGlRdCORY777C8Jv5AV0ndKufYTQsj6700G6vVDJxa');
var elements = stripe.elements();

var style = {
  base: {
    color: "#32325d",
    lineHeight: "24px",
    fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};

var card = elements.create("card", { style: style });
card.mount("#card-element");

var form = document.getElementById("payment-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  stripe
    .createToken(card)
    .then(function(result) {
      if (result.error) {
        // Inform the user if there was an error.
        var errorElement = document.getElementById("card-errors");
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server.
        stripeTokenHandler(result.token);
      }
    });
});

function stripeTokenHandler(token) {
  // Sende das Token an deinen Server
  var data = { token: token.id };

  fetch('/create-charge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    // Erfolgreiche Zahlung
    console.log("Zahlung erfolgreich:", data);
  })
  .catch((error) => {
    console.error("Fehler:", error);
  });
}
