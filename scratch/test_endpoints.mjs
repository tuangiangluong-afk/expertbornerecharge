const token = '17812171346a2b376eaab546a2b376eaab8c';
const url = 'https://www.viteundevis.com/api/get.php';

async function test() {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': `partenaire-apivud-${token}`
      },
      body: new URLSearchParams({
        key: token,
        nom: 'Dupont',
        prenom: 'Antoine',
        adresse1: '5 avenue Georges Clemenceau',
        adresse2: '',
        cp: '33260',
        ville: 'La Teste de Buch',
        email: 'antoine.dupont@gmail.com',
        tel: '0601020304',
        cp_projet: '33260',
        ville_projet: 'La Teste de Buch',
        pays: 'fr',
        permis: '3',
        terrain: '0',
        tp: '1',
        type_bien: '2',
        matin: '0',
        midi: '0',
        soir: '1',
        we: '0',
        delais: '4',
        situation: '1',
        description: 'Projet de demenagement test de l\'API en production',
        cat_id: '145', // Test category: Déménagement
        format_return: 'json',
        site_name: 'expertbornerecharge.com'
      })
    });
    const data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log(`Response:`, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
