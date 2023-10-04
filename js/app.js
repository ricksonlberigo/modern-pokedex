const searchPokemon = document.querySelector('#search')
const pokemonCardContainer = document.querySelector('#data')
const pokemonID = document.querySelector('#number')
const pokemonImageContainer = document.querySelector('#poke-image-placeholder')
const typesContainer = document.querySelector('#types')
const pokedex = document.querySelector('#pokedex')
const baseStatsText = document.querySelector('#base-stats')
const statNumber = document.querySelectorAll('.stat-number')
const statDesc = document.querySelectorAll('.stat-desc')
const barInner = document.querySelectorAll('.bar-inner')
const barOuter = document.querySelectorAll('.bar-outer')

const typeColors = {
  rock: [182, 158, 49],
  ghost: [112, 85, 155],
  steel: [183, 185, 208],
  water: [100, 147, 235],
  grass: [116, 203, 72],
  psychic: [251, 85, 132],
  ice: [154, 214, 223],
  dark: [117, 87, 76],
  fairy: [230, 158, 172],
  normal: [170, 166, 127],
  fighting: [193, 34, 57],
  flying: [168, 145, 236],
  poison: [164, 62, 158],
  ground: [222, 193, 107],
  bug: [167, 183, 35],
  fire: [245, 125, 49],
  electric: [249, 207, 48],
  dragon: [112, 55, 255],
}

const addZeroAndStartString = value => value.toString().padStart(3, '0')

const showCardPokemonInfo = () => {
  const isExistsClassHiddenInCard =
    pokemonCardContainer.classList.contains('hidden')

  if (isExistsClassHiddenInCard) {
    pokemonCardContainer.classList.remove('hidden')
  }
}

const showPokemonDataInfo = async inputValue => {
  const { id, sprites, types, stats } = await fetchAPI(inputValue)

  const mainColor = typeColors[types[0].type.name]

  showCardPokemonInfo()

  pokedex.style.backgroundColor = `rgb(${mainColor})`
  baseStatsText.style.color = `rgb(${mainColor})`

  pokemonID.innerHTML = `#${addZeroAndStartString(id)}`

  const pokemonImage = `<img src="${sprites.other.home.front_default}" id="pokemon-image" />`
  pokemonImageContainer.innerHTML = pokemonImage

  typesContainer.innerHTML = ''
  types.forEach(({ type }) => {
    const colors = typeColors[type.name]
    let typeSpan = document.createElement('span')

    typeSpan.innerHTML = type.name
    typeSpan.classList.add('type')
    typeSpan.style.backgroundColor = `rgb(${colors})`

    typesContainer.appendChild(typeSpan)
  })

  stats.forEach(({ base_stat }, index) => {
    statNumber[index].textContent = `${addZeroAndStartString(base_stat)}`
    statDesc[index].style.color = `rgba(${mainColor})`

    barOuter[index].style.backgroundColor = `rgba(${mainColor}, 0.3)`
    barInner[index].style.backgroundColor = `rgb(${mainColor})`
    barInner[index].style.width = `${base_stat}%`
  })
}

searchPokemon.addEventListener('change', async event => {
  const inputValue = event.target.value.trim()

  if (inputValue.length) {
    showPokemonDataInfo(inputValue)
  }
})
