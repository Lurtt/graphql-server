function list(parent, args, context, info) {
  console.log('XXX', {parent, args});
  return context.db.query.games({ where: { id_in: parent.gameIds } }, info)
}

module.exports = {
  list,
}
