const express = require('express');
const router = express.Router();
const path = require('path');

let RaspberryData = null;

router.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../../NearFront/dist/index.html'));
});
router.get('/raspData', (req, res, next) => {
	try {
		if (RaspberryData === 'Fucking') {
			res.send({
				response: RaspberryData,
				repeat: true,
			});
			console.log('Success');
		} else {
			res.send({
				response: 'Fail',
			});
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
});
//프론트에서 서버로 RaspberryData에 NULL값 넣기ㅣ
router.post('/raspNull', (req, res, next) => {
	RaspberryData = req.body.data;
});

router.post('/rasNotNull', (req, res, next) => {
	const RaspberryBack = true;
	res.send({
		RaspberryBack,
	});
});

//라즈베리 파이 프레스 신호 응답
router.post('/rasp', (req, res, next) => {
	try {
		let response = 'Signal Connect';
		// let data = req.body.Fuck;
		RaspberryData = req.body.Fuck;
		// console.log('파이썬 신호 : ' + data);
		console.log('전역변수 값 : ' + RaspberryData);
		res.json(response);
	} catch (e) {
		console.error(e);
		next(e);
	}
});

module.exports = router;
