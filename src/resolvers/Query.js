function feed(root, args, context, info) {
  const where = args.filter
    ? {
      OR: [
        { url_contains: args.filter },
        { description_contains: args.filter },
      ],
    }
    : {}

  return context.db.query.links({ where }, info)
}

module.exports = {
  feed,
}
