var express = require('express');
const nodemailer = require('nodemailer');
const { query,body, validationResult } = require('express-validator');
var router = express.Router();
const fs = require('fs');

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.yandex.ru",
  auth: {
      user: 'notify@instmech.ru',
      pass: '1ruapgqrpvmoxzvre',
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
                from: 'notify@instmech.ru',
                to: 'lyubavskyi@instmech.ru',
                subject: 'Заявку на оказание услуг Коллекции НИИВС',
                text: 'text',
                html: `<b>Уважаемый Поддубиков А.А</b><br> Прошу рассмотреть заявку пользование коллекцией НИИВС<br/> 
                <br> От ${customer_name} на почту ${customer_email} <br/>`,
            };
        
        if (result.isEmpty()) {

        return info = await transporter.sendMail(mailData, (error, info,response)=>{
            
          // fs.writeFile('/project/ex/bio/biomailInfo.txt', 'Инфа', (err) =>{})
            if (error) {
                
              res.render('application', {errors: errors});
                                
              }
            
            
      
            
                
              });
        console.log(info);
        // fs.writeFile('/project/ex/bio/biomailInfo.txt', info, (err) =>{})

        // res.status(200).render('application',{message: 'Заявка отправлена'});

          
        }

        res.render('application', {errors: errors2});
    });
// router.post('/', (req, res,next) => {
//   const {customer_name, subject, text } = req.body;
//   const mailData = {
//       from: 'notify@instmech.ru',
//       to: 'lyubavskyi@instmech.ru',
//       subject: customer_name,
//       text: 'text',
//       html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
//   };
//       // res.send('Ok');
//       // console.log(req.body.customer_name);
//       // res.render('application', () =>{
//       //   alert('omg');
//       // });
//       // response.write("<h2>Applied successfully</h2>");
//       res.status(200).send(req.body.customer_name);
//       //   res.status(200).render('application', function (err, html) {
//       //   res.send(html)
//       // })
//       // res.status(200).render('application', { message: "Mail send" });
//   // transporter.sendMail(mailData, (error, info) => {
//   //     if (error) {
//   //         next(err)
//   //     }
//   //     res.status(200).send({ message: "Mail send", message_id: info.messageId });
//   // });
// });
// // middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('application', { message: '' });
  // console.log('LOGGED');
  // res.send('Birds home page');
});

// router.get('/strain/:id', function(req,res){
//   res.render('filters', { title: req.params.id });
//   // res.send("filters")
// })


module.exports = router;
