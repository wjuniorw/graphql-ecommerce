import { jwtVerify } from 'jose/jwt/verify'
import { parseJwk } from 'jose/jwk/parse'
import { SignJWT, KeyLike } from 'jose/jwt/sign'

import db from '~/db'

const { D_KEY, X_KEY, Y_KEY } = process.env

export const getUser = async (token: string) => {
  try {
    if (!token) return {}

    const publicKey: KeyLike = await generatePublic()
    const { payload } = await verifyToken(token, publicKey)

    if (payload) {
      const user = await db.User.findById(payload.userID)
      return user
    }
  } catch (e) {
    console.log('<==getUser error==>', e.message)
    return {}
  }
}

export const generatePrivate = async () => {
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

export const generatePublic = async () => {
  const publicKey = await parseJwk({
    alg: 'ES256',
    crv: 'P-256',
    kty: 'EC',
    x: X_KEY,
    y: Y_KEY,
  })

  return publicKey
}

export const generateToken = async (privateKey: KeyLike, id: string) => {
  const localTime = new Date().getUTCHours() - 3
  const date = new Date().setHours(localTime + 2)
  const expires = +new Date(date)
  const payload = {
    expires,
    userID: id,
    issuedAt: +new Date(),
    'urn:ecommerce:claim': true,
  }
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'ES256' })
    .setAudience('urn:ecommerce:audience')
    .setIssuer('urn:ecommerce:issuer')
    .setExpirationTime('2h')
    .setIssuedAt()
    .sign(privateKey)
  return jwt
}

export const verifyToken = async (jwt: string, publicKey: KeyLike) => {
  try {
    const { payload } = await jwtVerify(jwt, publicKey, {
      issuer: 'urn:ecommerce:issuer',
      audience: 'urn:ecommerce:audience',
    })
    return { payload }
  } catch (e) {
    console.log('<====verifyToken error ======>', e.message)
    return {}
  }
}
