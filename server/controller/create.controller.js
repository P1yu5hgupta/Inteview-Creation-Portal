const Sch = require( '../model/schedule.model');
const nodemailer =  require('nodemailer')

module.exports = create = async (req, res) => {
    const email=req.body.email;
    const startTime = new Date(req.body.startTime);
    const endTime = new Date(req.body.endTime);
    console.log(startTime); 
    var flag=0;
    await Sch.find({email: req.body.email},(async (err, result) =>{
        if (err) throw err;
        console.log(result);
        result.forEach(schedule => {
            var tmpStartTime=schedule.startTime;
            var tmpEndTime=schedule.endTime;
            if(startTime <= tmpEndTime && tmpStartTime <= endTime){
                flag=1;
                return res.json({
                    status: false,
                    message: "Slot not Available"
                })
            }
            else if(startTime.getTime()>endTime.getTime() && startTime.getDate()==endTime.getDate()){
                flag=1;
                return res.json({
                    status: false,
                    message: "Invalid Timings"
                })
            }
            else if(startTime.getDate()>endTime.getDate()){
                flag=1;
                return res.json({
                    status: false,
                    message: "Invalid Timings"
                })
            }
        })
        if(!flag){
            const Schedule = new Sch(req.body);
            try {
                await Schedule.save()
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'tempmailid3210@gmail.com',
                      pass: 'Qwertyuiop@3210'
                    }
                  });
                  
                  var mailOptions = {
                    from: 'tempmailid3210@gmail.com',
                    to: req.body.email,
                    subject: 'Interview Scheduled',
                    text: 'Gentle Reminder, You have an interview scheduled with IB Academy from ' + Schedule.startTime + ' to ' +  Schedule.endTime + '. All the Best for the Interview',
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                  
                return res.status(200).json({
                    status: true,
                    message: "Interview Scheduled Successfully"
                })
              }catch (err) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid Timings!"
                })
              }
        }   
        }));
  }