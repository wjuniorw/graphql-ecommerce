import { jwtVerify } from 'jose/jwt/verify'
import { parseJwk } from 'jose/jwk/parse'
import { SignJWT, KeyLike } from 'jose/jwt/sign'

import db from '~/db'

const {
  D_KEY,
  X_KEY,
  Y_KEY,
} = process.env

export const getUser = async(token: string) => {
  try {
    if(!token) return {}

    const publicKey: KeyLike = await generatePublic()
    const { payload } = await verifyToken(token, publicKey)

    if(payload) {
      const user = await db.User.findById(payload.id)
      return user
    }
  }
  catch (e) {
    return {}
  }
}

export const generatePrivate = async() => {
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

export const generatePublic = async() => {
  const publicKey = await parseJwk({
    alg: 'ES256',
    crv: 'P-256',
    kty: 'EC',
    x: X_KEY,
    y: Y_KEY,
  })

  return publicKey
}

export const generateToken = async(privateKey: KeyLike) => {
  const jwt = await new SignJWT({ 'urn:ecommerce:claim': true })
  .setProtectedHeader({ alg: 'ES256' })
  .setIssuedAt().setIssuer('urn:ecommerce:issuer')
  .setAudience('urn:ecommerce:audience').setExpirationTime('2h')
  .sign(privateKey)
  console.log(jwt)
  return jwt
}

export const verifyToken = async(jwt: string, publicKey: KeyLike) => {
  try {
    const { payload, protectedHeader } = await jwtVerify(jwt, publicKey, {
      issuer: 'urn:ecommerce:issuer',
      audience: 'urn:ecommerce:audience'
    })
    return { payload }
  }
  catch (e) {
    console.log('<====verifyToken error ======>', e.message)
    return {}
  }
}
