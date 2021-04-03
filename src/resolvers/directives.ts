const directiveResolvers: any = {
  hasRole(next: any, src: any, { roles }, context: any) {
    const pattern = new RegExp(roles[0], 'i')
    const hasPermission = context.user.role?.match(pattern)
    if (!hasPermission) {
      throw new Error('Permissao negada!')
    }
    return next()
  },
  sensibleField(next: any, src: any, { role }, context: any) {
    const pattern = new RegExp(role, 'i')
    const hasPermission = context.user.role?.match(pattern)
    if (!hasPermission) {
      return next().then(() => {
        // return blurryString(param) // TODO: blurryString function to mask sansible data
        // return null
        return 'no permission to see this'
      })
    }
    return next()
  },
  brCurrency(next: any, src: any) {
    // transform int price in readable price currency...
    // return next().then((str: any) => {
    return next().then(() => {
      const price = src._doc.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
      return price
    })
  },
}

export default directiveResolvers
