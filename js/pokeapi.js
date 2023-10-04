const fetchAPI = async pokemonName => {
  try {
    const pokemonNameCorrect = pokemonName.split(' ').join('-').toLowerCase()

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonNameCorrect}`,
    )

    if (!response.ok)
      throw new Error('Não foi possível obter os dados do Pokémon!')

    return response.json()
  } catch ({ name, message }) {
    alert(`${name}: ${message}`)
  }
}
