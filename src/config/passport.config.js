import passport from 'passport'
import local from 'passport-local'
import passport_jwt, { ExtractJwt } from 'passport-jwt'

import { createHash, isValidPassword, cookieExtractor } from '../utils.js'

const LocalStrategy = local.Strategy
const JWTStrategy = passport_jwt.Strategy

const initializePassport = () => {
	
	passport.use('jwt', new JWTStrategy({
		jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
		secretOrKey: jwtKey
	}, async (jwt_payload, done) => {
		try{
			return done(null, jwt_payload)
		} catch(error){
			return done(error)
		}
	}))

	passport.use('register', new LocalStrategy({
		passReqToCallback: true,
		usernameField: 'email',
	}, async (req, username, password, done) => {
	}))

	passport.use('login', new LocalStrategy({
		usernameField: 'email',
	}, async (username, password, done) => {
	}))

	passport.serializeUser((user, done) => {
	})

	passport.deserializeUser(async (id, done) => {
	})

}

export default initializePassport