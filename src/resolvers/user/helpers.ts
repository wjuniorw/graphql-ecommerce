import bcrypt from 'bcrypt'

const hashingPass = async (pass: string) => {
  try {
    const salts = Math.floor(Math.random() * 9) + 2
    const salt = await bcrypt.genSalt(salts)
    const hash = await bcrypt.hash(pass, salt)
    console.log('hashingPass=====>', hash)
    return hash
  } catch (e) {
    console.log('error hashingPass=====>', e.message)
  }
}

export const createUser = async (data: any, Model: any) => {
  try {
    data.password = await hashingPass(data.password)
    const user = await Model.create(data)
    return user
  } catch (e) {
    throw new Error(e.message)
  }
}
