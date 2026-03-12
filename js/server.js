const express = require('express');
const stripe = require('stripe')('sk_test_51QvHAhPPXY2FzTMFAZ9OGMV9knH41SN9PCVDNwCje0ZKSwHwWtxEWPjyvWYgtetAJmzQchuhTzYdJJZGSRc82qTx00psnFvpKW'); // Ersetze mit deinem geheimen API-Schlüssel
const cors = require('cors');

const app = express();
app.use(express.json());  // JSON-Verarbeitung aktivieren
app.use(cors());  // Falls dein Frontend auf einer anderen Domain läuft
app.use(express.static('public'));  // Statische Dateien wie HTML, JS

// **Zahlungs-Route**
app.post('/create-charge', async (req, res) => {
  try {
    const { token } = req.body; // Stripe-Token vom Frontend

    const charge = await stripe.charges.create({
      amount: 5000, // Betrag in Cent (z. B. 50,00 €)
      currency: 'eur',
      description: 'Testzahlung',
      source: token,  // Zahlungsquelle (vom Frontend übergeben)
    });

    res.json(charge); // Erfolg zurücksenden
  } catch (error) {
    res.status(500).json({ error: error.message }); // Fehlerbehandlung
  }
});

// **Server starten**
app.listen(3000, () => {
  console.log('Server läuft auf http://localhost:3000');
});
