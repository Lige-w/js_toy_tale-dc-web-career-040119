const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false;

document.addEventListener('DOMContentLoaded', () =>{

  getToys();

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  });

  document.querySelector('form.add-toy-form').addEventListener('submit', postToy)
  const buttons = document.querySelectorAll('button.like-btn')
});

const getToys = () => {
  fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(toys => toys.forEach(renderToy))
};

const postToy = (e) => {
  e.preventDefault();

  const name = e.target.childNodes[3].value;
  const image = e.target.childNodes[7].value;


  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  })
      .then(response => response.json())
      .then(renderToy)

  e.target.reset()
};

const renderToy = toy => {
  const toyCollection = document.getElementById("toy-collection");

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.id = toy.id
  card.dataset.likes = toy.likes

  const name = document.createElement('h2');
  name.innerText = toy.name;
  card.appendChild(name);

  const image = document.createElement("img");
  image.src = toy.image;
  image.classList.add('toy-avatar');
  card.appendChild(image);

  const likes = document.createElement("p");
  likes.innerText = toy.likes + ' Likes';
  card.appendChild(likes);

  const likeButton = document.createElement("button");
  likeButton.classList.add('like-btn');
  likeButton.innerText = 'Like <3';
  likeButton.addEventListener('click', e => patchLike(e, parseInt(card.dataset.likes) + 1))
  card.appendChild(likeButton);


  toyCollection.appendChild(card)
};

const patchLike = (e, likes) => {

  fetch(`http://localhost:3000/toys/${e.target.parentElement.dataset.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: likes
    })
  })
      .then(response => response.json())
      .then(renderLike)
}

const renderLike = toy => {
  const likes = document.querySelector(`[data-id="${toy.id}"] p`)
  likes.innerText = toy.likes + " Likes"
  likes.parentElement.dataset.likes = toy.likes
}
