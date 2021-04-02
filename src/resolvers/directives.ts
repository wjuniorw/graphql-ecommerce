
const directiveResolvers: any = {
  hasRole(
    next: any,
    src: any,
    { roles },
    context: any,
  ) {
    console.log('<====src====>', src)
    const pattern = new RegExp(roles[0], 'i')
    const hasPermission = context.user.role?.match(pattern)
    if(!hasPermission) {
      throw new Error('Permissao negada!')
    }
    return next()
  },
  fieldRole(
    next: any,
    src: any,
    { roles },
    context: any,
  ) {
    const pattern = new RegExp(roles[0], 'i')
    const hasPermission = context.user.role?.match(pattern)
    if(!hasPermission) {
      return next().then((param: any) => {
        console.log('<=====oq temos aqui?=====>', param)
        return 'Informação sensivel'
      })
    }
    return next()
  },
  brCurrency(
    next: any,
    src: any,
  ) {
    console.log('<====src in brCurrency resolver ===>', Object.keys(src._doc))
    return next().then((str: any) => {
      const price = (src._doc.price).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
      console.log('str field ===>', str)
      return price;
    });
  },
}

export default directiveResolvers
