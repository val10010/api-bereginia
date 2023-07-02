const {Router} = require('express');
const router = Router();
const axios = require('axios');

const TOKEN = process.env.TOKEN;
const CHATID = process.env.CHATID;

router.post('/', async (req, res) => {
    if (req.body.name && req.body.phone && req.body.formName) {
        let txt = '';

        txt += `<b>Назва контакт форми: </b> <u>${req.body.formName}</u>\n`;

        if (req.body.fromPage) {
            txt+= `<b>З якої сторінки? </b> <u>${req.body.fromPage}</u>\n`
        }

        if (req.body.vacancyName) {
            txt+= `<b>Назва вакансії: </b> <u>${req.body.vacancyName}</u>\n`
        }

        if (req.body.productName) {
            txt+= `<b>Назва плана:</b> <u>${req.body.productName}</u>\n`
        }

        txt += `<b>Призвище Ім’я: </b> <u>${req.body.name}</u>\n`;
        txt += `<b>Телефон або нікнейм: </b> <u>${req.body.phone}</u>\n`;

        if (req.body.messenger) {
            txt+= `<b>Месенджер:</b> <u>${req.body.messenger}</u>\n`
        }

        if (req.body.purpose) {
            txt+= `<b>Ціль навчання: </b> <u>${req.body.purpose}</u>\n`
        }

        if (req.body.experience) {
            txt+= `<b>Чи є досвід вивченная англійскої мови?</b> <u>${req.body.experience}</u>\n`
        }

        if (req.body.comment) {
            txt+= `<b>Коментар: </b> <u>${req.body.comment}</u>\n`
        }

        try {
            const response = await axios.get(
                `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHATID}&text=${encodeURIComponent(txt)}&parse_mode=HTML`
            );

            res.status(200).json({ success: response.data.ok });
        } catch (error) {
            res.status(500).json({ message: 'Oh, snap...something went wrong.' })
        }

    } else  {
        res.send('ERROR!');
    }
});

router.get('/', async (req, res) => {
    try {
        res.send('serve is work!');
    } catch (e) {
        res.status(500).json({ message: 'Oh, snap...something went wrong.' })
    }
});

module.exports = router;
