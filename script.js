const renderTemplate = (pokemon) => {
  const container = document.querySelector('.container');
  const tmp = document.getElementById('tmp').content;
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

  fragment.appendChild(clone);
  while (container.firstChild) {
    container.removeChild(container.firstChild)};
  container.appendChild(fragment);
};

const renderPokemon = id => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  .then (response => response.json())
  .then (data => {
     renderTemplate(data)
  })
  .catch (error => console.log(error));
}

const randomPoke = () => {
  let random = Math.floor(Math.random() * (152 - 1)) + 1;;
    renderPokemon(random);
}

document.addEventListener("DOMContentLoaded", () => {
    randomPoke()
})

const buscador = () => {
  const poke = document.getElementById('buscador').value
  renderPokemon(poke.toLowerCase())
  document.getElementById('buscador').value = ''
}