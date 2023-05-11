document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.container');
  const containerFavoritos = document.querySelector('.favoritos');
  const tmp = document.getElementById('tmp').content;
  const buscadorButton = document.getElementById('buscadorB');
  const randomButton = document.getElementById('randomB');

  const renderFavoritos = () => {
    let favoritos = localStorage.getItem("favoritos") || "[]";
    favoritos = JSON.parse(favoritos);

    for (var x = 0; x < favoritos.length; x++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${favoritos[x]}/`)
      .then (response => response.json())
      .then (pokemon => {
        const clone = tmp.cloneNode(true);
        const fragment = document.createDocumentFragment();
      
        clone.querySelector('.front_sprite').setAttribute('src',pokemon.sprites.front_default);
        clone.querySelector('.name').textContent = pokemon.name;
        pokemon.types.forEach(e => {
          const typeText = document.createElement('div');
          typeText.className = 'type_text';
          typeText.textContent = e.type.name;
          clone.querySelector('.type').appendChild(typeText)})
        clone.querySelector('.stats .hp').innerHTML = `HP ${pokemon.stats[0].base_stat}`
        clone.querySelector('.stats .attack').innerHTML = `ATTACK ${pokemon.stats[1].base_stat}`
        clone.querySelector('.stats .defense').innerHTML = `DEFENSE ${pokemon.stats[2].base_stat}`
        clone.querySelector('.stats .special_attack').innerHTML = `SPECIAL ATTACK ${pokemon.stats[3].base_stat}`
        clone.querySelector('.stats .special_defense').innerHTML = `SPECIAL DEFENSE ${pokemon.stats[4].base_stat}`
        clone.querySelector('.stats .speed').innerHTML = `SPEED ${pokemon.stats[5].base_stat}`
    
        const favButton = clone.getElementById('buttonFav');
        favButton.innerHTML =  `NO FAV <i class="nes-icon heart is-small is-empty"></i>`
        favButton.addEventListener('click',() => {
          favear(pokemon)
        });
      
        fragment.appendChild(clone);
        containerFavoritos.appendChild(fragment);
      })
      .catch (error => console.log(error));
    }
    
  }

  const favear = (pokemon) => {
    let pokeId = pokemon.id;
    let favoritos = localStorage.getItem("favoritos") || "[]";
    favoritos = JSON.parse(favoritos);

    if (favoritos.includes(pokeId)) {
      let posId = favoritos.findIndex(e => e == pokeId);
      favoritos.splice(posId,1);
    } else {
      favoritos.push(pokeId);
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    console.log(favoritos)
    while (containerFavoritos.firstChild) {
      containerFavoritos.removeChild(containerFavoritos.lastChild);
    }
    renderFavoritos();
  }

const renderPokemon = id => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  .then (response => response.json())
  .then (pokemon => {
    const clone = tmp.cloneNode(true);
    const fragment = document.createDocumentFragment();
  
    clone.querySelector('.front_sprite').setAttribute('src',pokemon.sprites.front_default);
    clone.querySelector('.name').textContent = pokemon.name;
    pokemon.types.forEach(e => {
      const typeText = document.createElement('div');
      typeText.className = 'type_text';
      typeText.textContent = e.type.name;
      clone.querySelector('.type').appendChild(typeText)})
    clone.querySelector('.stats .hp').innerHTML = `HP ${pokemon.stats[0].base_stat}`
    clone.querySelector('.stats .attack').innerHTML = `ATTACK ${pokemon.stats[1].base_stat}`
    clone.querySelector('.stats .defense').innerHTML = `DEFENSE ${pokemon.stats[2].base_stat}`
    clone.querySelector('.stats .special_attack').innerHTML = `SPECIAL ATTACK ${pokemon.stats[3].base_stat}`
    clone.querySelector('.stats .special_defense').innerHTML = `SPECIAL DEFENSE ${pokemon.stats[4].base_stat}`
    clone.querySelector('.stats .speed').innerHTML = `SPEED ${pokemon.stats[5].base_stat}`

    const favButton = clone.getElementById('buttonFav');
    favButton.addEventListener('click',() => {
      favear(pokemon)
    });
  
    fragment.appendChild(clone);
    while (container.firstChild) {
      container.removeChild(container.firstChild)};
    container.appendChild(fragment);
  })
  .catch (error => console.log(error));
} 
  const randomPoke = () => {
    let random = Math.floor(Math.random() * (1011 - 1)) + 1;;
      renderPokemon(random);
  }

  buscadorButton.addEventListener('click',()=>{
    const poke = document.getElementById('buscador').value
    renderPokemon(poke.toLowerCase())
    document.getElementById('buscador').value = ''
  })
  randomButton.addEventListener('click',() => {randomPoke()});
  randomPoke()
  renderFavoritos()
})
