async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
      OR: [
        { url_contains: args.filter },
        { description_contains: args.filter },
      ],
    }
    : {}

  const queriedLinks = await context.db.query.links(
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

  const linksConnection = await context.db.query.linksConnection({}, countSelectionSet)

  return {
    count: linksConnection.aggregate.count,
    linkIds: queriedLinks.map(link => link.id),
  }
}

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

  return context.db.query.games(
    { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
    info,
  )
}

module.exports = {
  feed,
  games,
}
