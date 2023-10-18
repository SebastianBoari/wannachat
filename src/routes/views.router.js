import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
	res.render('index', {
		title: 'Websocket Chat',
		style: 'index'
	})
})

export default router