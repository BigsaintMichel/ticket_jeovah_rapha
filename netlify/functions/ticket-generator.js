// Fichier : netlify/functions/ticket-generator.js

exports.handler = async (event, context) => {
    // S'assurer que la méthode est bien POST
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ result: "error", message: "Méthode non autorisée" })
        };
    }

    try {
        const data = JSON.parse(event.body);
        const { nom, prenom, contact } = data;

        // --- Logique de Génération du Ticket ---
        const date = new Date();
        const ticketBase = date.getTime().toString().slice(-6); 
        const randomSuffix = Math.floor(Math.random() * 99).toString().padStart(2, '0');
        const newTicketNumber = ticketBase + randomSuffix; 

        // --- Log --- (La "liste" sera visible dans l'administration Netlify)
        console.log(`[NOUVEL ENREGISTREMENT] Ticket: ${newTicketNumber}, Nom: ${prenom} ${nom}, Contact: ${contact}`);

        // --- Réponse au Client (pour le QR code) ---
        return {
            statusCode: 200,
            body: JSON.stringify({ "result": "success", "ticket": newTicketNumber })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ "result": "error", "message": error.toString() })
        };
    }
};