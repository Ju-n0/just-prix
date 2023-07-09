/**
 * Le juste prix est un jeu où l'ordinateur choisit un nombre.
 * L'utilisateur doit deviner ce nombre en x essais maximum.
 * A chaque essai, l'ordinateur indique si le nombre est plus grand ou plus petit que le nombre à deviner.
 * Si l'utilisateur trouve le nombre, il gagne.
 * Si l'utilisateur n'a pas trouvé le nombre en x essais, il perd.
 * Il peut proposer un nombre tant que le nombre d'essais n'est pas atteint et que le nombre n'a pas été trouvé.
 *
 * Le jeu doit être jouable dans le navigateur.
 * On peut utiliser les fonctions natives de JavaScript pour interagir avec l'utilisateur.
 * - prompt() - Pour demander un nombre à l'utilisateur
 * @see https://developer.mozilla.org/fr/docs/Web/API/Window/prompt
 * - alert() - Pour afficher un message à l'utilisateur
 * @see https://developer.mozilla.org/fr/docs/Web/API/Window/alert
 * - confirm() - Pour demander une confirmation à l'utilisateur
 * @see https://developer.mozilla.org/fr/docs/Web/API/Window/confirm
 *
 * /!\ Attention à la saisie de l'utilisateur. Il faut vérifier que l'utilisateur a bien saisi un nombre. /!\
 * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/isNaN
 * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number
 * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/parseInt
 * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/parseFloat
 * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/toString
 * @see https://developer.mozilla.org/fr/docs/Glossary/Type_Conversion
 *
 * On peut utiliser des boucles et des conditions pour implémenter le jeu.
 * @see https://developer.mozilla.org/fr/docs/Learn/JavaScript/Building_blocks/conditionals
 * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Boucles_et_it%C3%A9ration
 * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_and_Operators#op%C3%A9rateurs_de_comparaison
 *
 * On va devoir utiliser des variables pour stocker les informations.
 * @see https://developer.mozilla.org/fr/docs/Learn/JavaScript/First_steps/Variables
 *
 * Pour débugger le code, on peut utiliser la console du navigateur.
 * @see https://developer.mozilla.org/fr/docs/Web/API/Console
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// let misteryNumber = getRandomInt(101);
// let userGuess;
// let maxTry = 6;
// let userTries = 0;

// do {
//   userGuess = prompt('Quel est le nombre mystère?');

//   if (userGuess === null) {
//     alert('teubé va');
//     break;
//   }
//   userGuess = Number(userGuess);
//   if (isNaN(userGuess)) {
//     alert("Merci d'indiquer une valeur numérique");
//   }
//   userTries = userTries + 1;
//   if (userGuess < misteryNumber) {
//     alert("c'est plus");
//   } else if (userGuess > misteryNumber) {
//     alert("c'est moins");
//   }
// } while (userGuess !== misteryNumber && userTries < maxTry);

// if (userGuess !== misteryNumber && userTries === maxTry) {
//   alert("t'as perdu");
// }
// if (userGuess === misteryNumber) {
//   alert("t'as gagné");
// }

/**
 * Implémenter la même logique de jeu mais utiliser le DOM plutôt que les popups natives du navigateur.
 *
 * Quelques instructions:
 * - Créer un formulaire avec un input et un bouton.
 * - Lorsque l'utilisateur clique sur le bouton, on récupère la valeur de l'input.
 * - On vérifie que la valeur est un nombre.
 * - On vérifie que la valeur est comprise entre un minimum et un maximum.
 * - On vérifie que le nombre d'essais n'est pas atteint.
 * - On vérifie si le nombre est plus grand ou plus petit que le nombre à deviner.
 * - On affiche un message à l'utilisateur.
 * - On affiche le nombre d'essais restants.
 * - On affiche un message de victoire ou de défaite.
 *
 * Quelques conseils/contraintes:
 * - Interdiction d'utiliser des popups natives du navigateur puisque l'on veut utiliser le DOM.
 * - Interdiction de modifier la page HTML (seul JavaScript est autorisé à le faire)
 * - Rechercher sur Google pour trouver comment utiliser le DOM/les événements.
 * - Utiliser des fonctions si besoin pour découper le code en morceaux, le rendre plus lisible et plus maintenable.
 * - Empêcher l'utilisateur de soumettre le formulaire si pas de valeur ou la valeur n'est pas un nombre.
 * - La page ne doit pas se recharger à chaque soumission du formulaire.
 *
 * Bonus:
 * - Utiliser CSS pour améliorer l'aspect de la page.
 * - Stocker les propositions déjà faites par l'utilisateur et les afficher sur la page.
 * - Empêcher l'utilisateur de soumettre le formulaire si la valeur est déjà proposée en affichant une phrase humoristique différente à chaque fois.
 * - Afficher une fenêtre modale de victoire/défaite à la fin du jeu avec un bouton pour rejouer.
 *
 */

const humoristicMessages = [
  "C'est pas possible, tu as déjà proposé cette valeur!",
  'Faut arrêter de faire des essais inutiles!',
  'Tu es sûr de ce que tu fais?',
  "T'es bourré ou quoi?",
];

let userGuesses = [];
let misteryNumber;

let remainingTries;

const formElement = document.createElement('form');
const inputElement = document.createElement('input');
inputElement.className = 'ipt';

const buttonElement = document.createElement('button');
buttonElement.textContent = 'valider';
buttonElement.className = 'btn';

const paragraphElement = document.createElement('p');
paragraphElement.textContent = 'Trouve le juste prix';

const feedbackElement = document.createElement('p');

const maxTriesElement = document.createElement('p');
// maxTriesElement.textContent =
//   'Il te reste ' + remainingTries + ' essai' + (remainingTries > 1 ? 's' : '') + '!';
maxTriesElement.className = 'max-tries-element';

const answerElement = document.createElement('ul');

formElement.append(
  paragraphElement,
  maxTriesElement,
  feedbackElement,
  inputElement,
  buttonElement,
);

const dialogElement = document.createElement('dialog');
dialogElement.className = 'modal';

const gameOverMessageElement = document.createElement('p');
gameOverMessageElement.className = 'game-over';

const modalTextElement = document.createElement('p');
modalTextElement.textContent = 'Voulez-vous rejouer ?';

const modalButtonContainerElement = document.createElement('div');

const modalCancelButtonElement = document.createElement('button');
modalCancelButtonElement.textContent = 'Non';
modalCancelButtonElement.classList.add('btn', 'btn--cancel');

modalCancelButtonElement.addEventListener('click', () => {
  document.querySelector('.btn').setAttribute('disabled', 'true');
  dialogElement.close();
});

const modalSuccessButtonElement = document.createElement('button');
modalSuccessButtonElement.textContent = 'Oui';
modalSuccessButtonElement.classList.add('btn', 'btn--success');

modalSuccessButtonElement.addEventListener('click', startGame);

modalButtonContainerElement.append(modalCancelButtonElement, modalSuccessButtonElement);

dialogElement.append(
  gameOverMessageElement,
  modalTextElement,
  modalButtonContainerElement,
);

document.body.append(formElement, answerElement, dialogElement);

function startGame() {
  misteryNumber = getRandomInt(101);
  dialogElement.close();
  remainingTries = 6;
  maxTriesElement.textContent =
    'Il te reste ' + remainingTries + ' essai' + (remainingTries > 1 ? 's' : '') + '!';
  feedbackElement.textContent = '';
  feedbackElement.className = '';
  answerElement.textContent = '';
  inputElement.value = '';
  inputElement.focus();
  userGuesses = [];
}

startGame();

function onFormSubmit(submitEvent) {
  submitEvent.preventDefault();
  console.log(misteryNumber); // TODO: remove

  const inputValue = Number(inputElement.value);

  if (inputValue === misteryNumber) {
    gameOverMessageElement.textContent = 'Tu as gagné!';
    gameOverMessageElement.className = 'success';
    dialogElement.showModal();
    return;
  }

  if (remainingTries > 0) {
    remainingTries--;
    maxTriesElement.textContent =
      'Il te reste ' + remainingTries + ' essai' + (remainingTries > 1 ? 's' : '') + '!';
  }

  if (remainingTries <= 0) {
    gameOverMessageElement.textContent = 'Tu as perdu!';
    gameOverMessageElement.className = 'looser';
    dialogElement.showModal();
    return;
  }

  const newAnswer = document.createElement('li');
  newAnswer.textContent = inputElement.value;

  if (userGuesses.includes(inputElement.value)) {
    const randomIndex = getRandomInt(humoristicMessages.length - 1);
    feedbackElement.textContent = humoristicMessages[randomIndex];
    feedbackElement.className = 'info';

    return;
  }

  userGuesses.push(inputElement.value);

  if (isNaN(inputValue)) {
    feedbackElement.textContent = "Merci d'indiquer une valeur numérique";
    feedbackElement.className = 'info';

    newAnswer.textContent += ' (gros débile)';
  } else if (inputValue < 0 || inputValue > 100) {
    feedbackElement.textContent = "Merci d'indiquer une valeur entre 0 et 100";
    feedbackElement.className = 'info';
  } else if (inputValue > misteryNumber) {
    feedbackElement.textContent = "C'est moins";
    feedbackElement.className = 'info';
  } else if (inputValue < misteryNumber) {
    feedbackElement.textContent = "C'est plus";
    feedbackElement.className = 'info';
  }

  answerElement.append(newAnswer);
}

formElement.addEventListener('submit', onFormSubmit);
/**
 * Inversez le jeu.
 * L'utilisateur choisit un nombre et l'ordinateur doit le deviner.
 * L'utilisateur doit indiquer si le nombre est plus grand ou plus petit que le nombre à deviner.
 * - on peut utiliser "+" et "-" pour indiquer si le nombre est plus grand ou plus petit.
 * - on peut utiliser "plus grand" et "plus petit" pour indiquer si le nombre est plus grand ou plus petit.
 * - on peut utiliser "c'est plus" et "c'est moins" pour indiquer si le nombre est plus grand ou plus petit.
 * - etc...
 * L'ordinateur doit proposer un nombre tant que le nombre d'essais n'est pas atteint et que le nombre n'a pas été trouvé.
 *
 */
// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const misteryNumber = prompt('Donne moi un nombre, je ferme les yeux!');
// let max = 100;
// let min = 0;
// let computerGuess;

// do {
//   computerGuess = getRandomInt(min, max);
//   let userAnswer = prompt('est ce ' + computerGuess + '?');

//   if (userAnswer === '+') {
//     if (min === computerGuess) {
//       min = computerGuess + 1;
//     } else {
//       min = computerGuess;
//     }
//   } else if (userAnswer === '-') {
//     if (max === computerGuess) {
//       max = computerGuess - 1;
//     } else {
//       max = computerGuess;
//     }
//   } else if (userAnswer === '=') {
//     alert("t'as gagné");
//     break;
//   }
// } while (true);
