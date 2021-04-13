require('dotenv').config()
const { jwtVerify } = require('jose/jwt/verify')
const { parseJwk } = require('jose/jwk/parse')
const { SignJWT, KeyLike } = require('jose/jwt/sign')

const db = require('./src/db')

const { D_KEY, X_KEY, Y_KEY } = process.env

const getUser = async (token) => {
  try {
    if (!token) return {}

    const publicKey = await generatePublic()
    const { payload } = await verifyToken(token, publicKey)

    if (payload) {
      const user = await db.User.findById(payload.id)
      return user
    }
  } catch (e) {
    console.log('<==getUser error==>', e.message)
    return {}
  }
}

const generatePrivate = async () => {
  const privateKey = await parseJwk({
    alg: 'ES256',
    crv: 'P-256',
    kty: 'EC',
    d: D_KEY,
    x: X_KEY,
    y: Y_KEY,
  })

  return privateKey
}

const generatePublic = async () => {
  const publicKey = await parseJwk({
    alg: 'ES256',
    crv: 'P-256',
    kty: 'EC',
    x: X_KEY,
    y: Y_KEY,
  })

  return publicKey
}

const generateToken = async (privateKey) => {
  const localTime = new Date().getUTCHours() - 3
  const date = new Date().setHours(localTime + 2)
  const expires = +new Date(date)
  const payload = {
    expires,
    issuedAt: +new Date(),
    userID: +new Date() + 'qerty',
  }
  // const jwt = await new SignJWT({ 'urn:ecommerce:claim': true })
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'ES256' })
    .setAudience('urn:ecommerce:audience')
    .setIssuer('urn:ecommerce:issuer')
    .setExpirationTime('2m')
    .setIssuedAt()
    .sign(privateKey)
  return jwt
}

const verifyToken = async (jwt, publicKey) => {
  try {
    const { payload } = await jwtVerify(jwt, publicKey, {
      issuer: 'urn:ecommerce:issuer',
      audience: 'urn:ecommerce:audience',
    })
    return { payload }
  } catch (e) {
    return {}
  }
}

const runTest = async () => {
  try {
    const private = await generatePrivate()
    console.log('<====private======>', private)
    const token = await generateToken(private)
    const public = await generatePublic()
    const verified = await verifyToken(token, public)
    console.log('<====verified======>', verified)
  } catch (e) {
    console.log('<=======error geral=======>', e.message)
  }
}

exports.generatePublic = generatePublic
exports.generatePrivate = generatePrivate
exports.generateToken = generateToken
exports.verifyToken = verifyToken
exports.run = runTest
// runTest()
