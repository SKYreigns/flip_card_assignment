// Data: Machine Learning Flashcards
const flashcardsData = [
    { q: "What is Supervised Learning?", a: "Learning from labeled data to map inputs to outputs." },
    { q: "Supervised vs Unsupervised?", a: "Supervised uses labeled data (known outputs). Unsupervised finds patterns in unlabeled data." },
    { q: "What is a Training Dataset?", a: "A subset of data used to teach a model to recognize patterns." },
    { q: "What is Overfitting?", a: "When a model learns training noise too well and performs poorly on new data." },
    { q: "What is a Neural Network?", a: "A model inspired by the human brain, consisting of layers of interconnected nodes." },
    { q: "What is Gradient Descent?", a: "Optimization algorithm used to minimize the loss function by iteratively moving towards the minimum." },
    { q: "What is Bias?", a: "Error introduced by approximating a real-world problem with a simplified model." },
    { q: "What is Variance?", a: "Error due to the model's sensitivity to small fluctuations in the training set." },
    { q: "Regression vs Classification?", a: "Regression predicts continuous values (e.g., price). Classification predicts categories (e.g., cat/dog)." },
    { q: "What is a Hyperparameter?", a: "Configuration settings used to tune how the model learns (e.g., learning rate) set before training." }
];

const slider = document.getElementById('slider');
const btnFlip = document.getElementById('btn-flip');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const btnKnew = document.getElementById('btn-knew');
const btnDidnt = document.getElementById('btn-didnt');
const interactionPanel = document.querySelector('.interaction-panel');
const ratingPanel = document.querySelector('.rating-panel');

let activeIndex = 0;
let scores = { known: 0, review: 0 };
const totalCards = flashcardsData.length;
const anglePerCard = 360 / totalCards;

// Initialize the 3D Slider
// ... [Keep your flashcardsData array] ...

function initDeck() {
    slider.style.setProperty('--quantity', totalCards);
    
    flashcardsData.forEach((card, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.style.setProperty('--position', index + 1);

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner'); 
        cardInner.id = `card-${index}`;

        // Front Face
        const front = document.createElement('div');
        front.classList.add('card-face', 'front');
        front.innerHTML = `
            <h3>Question ${index + 1}</h3> 
            <p>${card.q}</p>
        `;

        // Back Face
        const back = document.createElement('div');
        back.classList.add('card-face', 'back');
        back.innerHTML = `
            <h3>Answer</h3>
            <p>${card.a}</p>
        `;

        cardInner.appendChild(front);
        cardInner.appendChild(back);
        itemDiv.appendChild(cardInner);
        slider.appendChild(itemDiv);
    });

    rotateSlider();
}

// ... [Keep the rest of your Logic: rotateSlider, flipCard, etc.] ...

// Rotate the slider to show the active card
function rotateSlider() {
    // We rotate the container negative degrees to bring the target item to 0deg (front)
    const rotateY = -(activeIndex * anglePerCard); 
    slider.style.transform = `perspective(1000px) rotateY(${rotateY}deg)`;
    
    // Reset the UI for the new card
    resetCardState();
}

// Reset Flip and Buttons for the current card
function resetCardState() {
    // Ensure all cards are flipped back to front
    document.querySelectorAll('.card-inner').forEach(c => c.classList.remove('is-flipped'));
    
    // Show "Show Answer" button, hide rating buttons
    interactionPanel.style.display = 'block';
    ratingPanel.style.display = 'none';
}

// Flip the current card
function flipCard() {
    const currentCard = document.getElementById(`card-${activeIndex}`);
    currentCard.classList.add('is-flipped');
    
    // Switch buttons
    interactionPanel.style.display = 'none';
    ratingPanel.style.display = 'flex';
}

// Handle Navigation
function nextCard() {
    activeIndex = (activeIndex + 1) % totalCards;
    rotateSlider();
}

function prevCard() {
    // Javascript modulo bug workaround for negative numbers
    activeIndex = (activeIndex - 1 + totalCards) % totalCards;
    rotateSlider();
}

// Handle Scoring
function handleScore(known) {
    if (known) {
        scores.known++;
        document.getElementById('score-known').innerText = scores.known;
    } else {
        scores.review++;
        document.getElementById('score-review').innerText = scores.review;
    }
    // Auto advance after rating
    setTimeout(nextCard, 500);
}

// Event Listeners
btnFlip.addEventListener('click', flipCard);
btnNext.addEventListener('click', nextCard);
btnPrev.addEventListener('click', prevCard);

btnKnew.addEventListener('click', () => handleScore(true));
btnDidnt.addEventListener('click', () => handleScore(false));

// Initialize on load
initDeck();