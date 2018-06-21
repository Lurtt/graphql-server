async function games(parent, args, context, info) {
  const where = args.filter
    ? {
      OR: [
        { name_contains: args.filter },
        { description_contains: args.filter },
        { url_contains: args.filter },
      ],
    }
    : {}

  const queriedGames = await context.db.query.games(
    { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
    `{ id }`,
  )

  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `

  const gamesConnection = await context.db.query.gamesConnection({}, countSelectionSet)

  return {
    count: gamesConnection.aggregate.count,
    gameIds: queriedGames.map(game => game.id),
  }

}

module.exports = {
  games,
}
