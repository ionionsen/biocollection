var express = require('express');
const nodemailer = require('nodemailer');
const { query,body, validationResult } = require('express-validator');
var router = express.Router();
const fs = require('fs');

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.yandex.ru",
  auth: {
      user: '',
      pass: '',
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

    router.post('/',
      body('customer_name').notEmpty().withMessage('Не указано имя Заказчика').escape(),
      body('customer_email')
        .escape()
        .notEmpty()
        .withMessage('Не указан адрес электронной почты')
        .isEmail()
        .withMessage('Некоректный адрес электронной почты'), 
      async (req, res) => {
        const result = validationResult(req);
        const errors = result.array();
        const result2 = result.formatWith(error => error.msg );
        const errors2 = result2.array();
        const {customer_name, customer_email,subject, text } = req.body;
        
        const mailData = {
                from: '',
                to: '',
                subject: 'Заявку на оказание услуг Коллекции НИИВС',
                text: 'text',
                html: '',
            };
        
        if (result.isEmpty()) {

        return info = await transporter.sendMail(mailData, (error, info,response)=>{
            
            if (error) {
                
              res.render('application', {errors: errors});
                                
              }
            
            
      
            
                
              });
        console.log(info);
        }

        res.render('application', {errors: errors2});
    });
router.get('/', function(req, res, next) {
  res.render('application', { message: '' });
});


module.exports = router;
