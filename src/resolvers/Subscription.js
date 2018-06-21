function newGameSubscribe(parent, args, context, info) {
  return context.db.subscription.game(
    { where: { mutation_in: ['CREATED'] } },
    info,
  )
}

const newGame = {
  subscribe: newGameSubscribe
}

function newFavoriteSubscribe(parent, args, context, info) {
  return context.db.subscription.favorite(
    { where: { mutation_in: ['CREATED'] } },
    info,
  )
}

const newFavorite = {
  subscribe: newFavoriteSubscribe
}

module.exports = {
  newGame,
  newFavorite,
}
