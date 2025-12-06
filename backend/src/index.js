import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors()); // Evite le Blocage entres les appels du back et du front
app.use(express.json()); // Quand le frontend envoie du JSON, express le recupere et en fait des objets JS

// Routes
app.get('/api/health', (req, res) => {
	res.json({ status: 'ok', message: 'Backend is running'});
});

// GET /api/profile - Retourner le profil
app.get('/api/profile', (req, res) => {
	res.json({ // Après données venant de la base de donnée
		name: 'Marc Milliot',
		title: 'Développeur Fullstack',
		school: 'École 42',
		skills: ['React', 'Typescript', 'Docker', 'Node.js', 'Express'],
		location: 'Mulhouse, France'
	});
});

// POST /api/contact - Recevoir un message de contact
app.post('/api/contact', (req, res) => {
	const { name, email, message } = req.body;

	console.log('📧 Message reçu:', { name, email, message });

	// Plus tard, on sauvegardera en base de données
	res.json({
		success: true,
		message: 'Message recu avec succès !'
	})
})

// Démarrage du serveur
app.listen(PORT, () => {
	console.log(`🚀 Backend API listening on http://localhost:${PORT}`);
})