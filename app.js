const form = document.querySelector(".form-quizz");
let tableauResultats = [];
const emoji = ['✔', '✨', '👀', '😭', '👎'];
const tableauReponses = ['c', 'a', 'b', 'a', 'c'];
const titreResultat = document.querySelector('.resultats h2');
const noteResultat = document.querySelector('.note');
const aideResultat = document.querySelector('.aide');
const toutesLesQuestions = document.querySelectorAll('.question-block');
let tableauVerif = [];

form.addEventListener('submit', (e) => {
    e.preventDefault()

    for (let i = 1; i < 6; i++) {
        tableauResultats.push(document.querySelector(`input[name="q${i}"]:checked`).value);
    }
    verif(tableauResultats);
    tableauResultats = [];
    
    function verif(results) {
        for (let j = 0; j < 5; j++) {
            if (results[j] === tableauReponses[j]) {
                tableauVerif.push(true);
            } else {
                tableauVerif.push(false);
            }
        }
        afficherResultats(tableauVerif);
        ajoutCouleur(tableauVerif);
        tableauVerif = [];
    }

    function afficherResultats(tabVerif) {
        const nbFautes = tabVerif.filter(item => item !== true).length;
        switch (nbFautes) {
            case 0:
                titreResultat.innerText = `✔️ Bravo, c'est un sans faute ! ✔️`
                aideResultat.innerText = ''
                noteResultat.innerText = '5/5'
                break;
            case 1:
                titreResultat.innerText = '✨ Vous y êtes presque ! ✨'
                aideResultat.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !'
                noteResultat.innerText = '4/5'
                break;
            case 2:
                titreResultat.innerText = `✨ Encore un effort ... 👀`
                aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
                noteResultat.innerText = '3/5'
                break;
            case 3:
                titreResultat.innerText = `👀 Il reste quelques erreurs. 😭`
                aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
                noteResultat.innerText = '2/5'
                break;
            case 4:
                titreResultat.innerText = `😭 Peux mieux faire ! 😭`
                aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
                noteResultat.innerText = '1/5'
                break;
            case 5:
                titreResultat.innerText = `👎 Peux mieux faire ! 👎`
                aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
                noteResultat.innerText = '0/5'
                break;

            default:
                'Wops, cas innatendu.';
        }
    }

    function ajoutCouleur(boolTab) {
        for (let i = 0; i < boolTab.length; i++) {
            if (boolTab[i] === true) {
                toutesLesQuestions[i].style.background = 'green';
            } else {
                toutesLesQuestions[i].style.background = 'red';
                toutesLesQuestions[i].classList.add('echec');

                setTimeout(() => {
                    toutesLesQuestions[i].classList.remove("echec")
                }, 500);
            }
            toutesLesQuestions.forEach(item => item.addEventListener('click', () => {
                item.style.background = "white";
            }))
        }
    }
})