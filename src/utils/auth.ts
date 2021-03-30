import { jwtVerify } from 'jose/jwt/verify'
import { parseJwk } from 'jose/jwk/parse'
import { SignJWT, KeyLike } from 'jose/jwt/sign'

import { User } from '~/db'

export const getUser = async(token: string) => {
  try {
    if(!token) return {}

    const publicKey: KeyLike = await generatePublic()
    const { payload } = await verifyToken(token, publicKey)

    if(payload) {
      const user = await User.findById(payload.id)
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
    d: 'VhsfgSRKcvHCGpLyygMbO_YpXc7bVKwi12KQTE4yOR4',
    x: 'ySK38C1jBdLwDsNWKzzBHqKYEE5Cgv-qjWvorUXk9fw',
    y: '_LeQBw07cf5t57Iavn4j-BqJsAD1dpoz8gokd3sBsOo'
  })

  return privateKey
}

export const generatePublic = async() => {
  const publicKey = await parseJwk({
    alg: 'ES256',
    crv: 'P-256',
    kty: 'EC',
    x: 'ySK38C1jBdLwDsNWKzzBHqKYEE5Cgv-qjWvorUXk9fw',
    y: '_LeQBw07cf5t57Iavn4j-BqJsAD1dpoz8gokd3sBsOo'
  })

  return publicKey
}

export const generateToken = async(privateKey: KeyLike) => {
  const jwt = await new SignJWT({ 'urn:example:claim': true })
  .setProtectedHeader({ alg: 'ES256' })
  .setIssuedAt().setIssuer('urn:example:issuer')
  .setAudience('urn:example:audience').setExpirationTime('2h')
  .sign(privateKey)
  console.log(jwt)
  return jwt
}

export const verifyToken = async(jwt: string, publicKey: KeyLike) => {
  try {
    const { payload, protectedHeader } = await jwtVerify(jwt, publicKey, {
      issuer: 'urn:example:issuer',
      audience: 'urn:example:audience'
    })
    return { payload }
  }
  catch (e) {
    console.log('<====verifyToken error ======>', e.message)
    return {}
  }
}
