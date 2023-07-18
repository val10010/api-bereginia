const {Router} = require('express');
const router = Router();
const axios = require('axios');

const TOKEN = process.env.TOKEN;
const CHATID = process.env.CHATID;

router.post('/', async (req, res) => {
    if (req.body.name && req.body.phone && req.body.formName) {
        let txt = '';

        txt += `<b>Название формы: </b> <u>${req.body.formName}</u>\n`;


        if (req.body.price) {
            txt+= `<b>Цена услги:</b> <u>${req.body.price}</u>\n`
        }

        txt += `<b>Фамилия Имя: </b> <u>${req.body.name}</u>\n`;
        txt += `<b>Телефон или никнейм месенджера: </b> <u>${req.body.phone}</u>\n`;

        if (req.body.messenger) {
            txt+= `<b>Месенджер:</b> <u>${req.body.messenger}</u>\n`
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
