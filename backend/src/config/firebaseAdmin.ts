import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
const serviceAccount = require('./firebaseServiceAccount.json');


dotenv.config();  // Carregar variáveis de ambiente

// Importa a chave de serviço


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chaos-aa729.firebaseio.com"  // Certifique-se que o URL está correto
});

// Inicializa o Firestore
const db = admin.firestore();

export { db };
