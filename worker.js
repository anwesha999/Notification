console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Notified by Anwesha!",
   
    icon: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.dreamglossary.com%2Fwp-content%2Fuploads%2F2019%2F07%2Ficon.jpg&imgrefurl=https%3A%2F%2Fwww.dreamglossary.com%2Fi%2Ficon%2F&tbnid=Oc6aALlcC4cQFM&vet=12ahUKEwi76YKx6OfvAhUYsksFHdOJBF8QMygMegUIARDRAQ..i&docid=RJ0Yl5VSYUOpGM&w=950&h=584&q=image%20of%20an%20icon&ved=2ahUKEwi76YKx6OfvAhUYsksFHdOJBF8QMygMegUIARDRAQ"
  });
});