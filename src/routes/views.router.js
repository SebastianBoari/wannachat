import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
	res.render('index', {
		title: 'wannachat',
		style: 'index'
	})
})

router.get('/session', (req, res) => {
	res.render('session/session.handlebars', {
		title: 'wannachat',
		style: 'index'
	})
})

export default router