// Récupérer l'ID de la session à partir du lien
const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get("session");

// Fonction pour accéder à la caméra et afficher le flux vidéo
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then((stream) => {
    // Sélectionner l'élément video et afficher le flux
    const videoElement = document.getElementById("video");
    videoElement.srcObject = stream;

    // Créer une connexion WebRTC (ceci peut être amélioré selon la logique WebRTC)
    const socket = new WebSocket('ws://localhost:3000'); // Remplacer par ton serveur WebSocket
    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: 'offer',
        sessionId: sessionId,
        video: true,
        audio: false
      }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Gérer ici la réponse du serveur WebRTC si nécessaire
    };
  })
  .catch((err) => {
    console.error("Erreur d'accès à la caméra :", err);
    alert("Veuillez autoriser l'accès à la caméra.");
  });
