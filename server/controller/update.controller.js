const Sch = require( '../model/schedule.model');
const nodemailer =  require('nodemailer')

module.exports = update = async (req, res) => {
    const email=req.body.email;
    const startTime = new Date(req.body.newStartTime);
    const endTime = new Date(req.body.newEndTime);
    var flag=0;
    await Sch.find({email: req.body.email},(async (err, result) =>{
        if (err) throw err;
        result.forEach(schedule => {
            if(result._id!=req.body._id){
                var tmpStartTime=schedule.startTime;
                var tmpEndTime=schedule.endTime;
                if(startTime.getDate() == tmpStartTime.getDate() || startTime.getDate() == tmpEndTime.getDate()){
                    if(startTime.getTime()>=tmpStartTime.getTime() && startTime.getTime()<=tmpEndTime.getTime()){
                        flag=1;
                        return res.json({
                            status: false,
                            message: "Slot not Available"
                        })
                    }
                }
                else if(endTime.getDate() == tmpStartTime.getDate() || endTime.getDate() == tmpEndTime.getDate()){
                    if(endTime.getTime()>=tmpStartTime.getTime() && endTime.getTime()<=tmpEndTime.getTime()){
                        flag=1;
                        return res.json({
                            status: false,
                            message: "Slot not Available"
                        })
                    }
                }
                else if(startTime.getDate() == tmpStartTime.getDate() || endTime.getDate() == tmpStartTime.getDate()){
                    if(startTime.getTime()<=tmpStartTime.getTime() && endTime.getTime()>=tmpStartTime.getTime()){
                        flag=1;
                        return res.json({
                            status: false,
                            message: "Slot not Available"
                        })
                    }
                }
                else if(startTime.getDate() == tmpEndTime.getDate() || endTime.getDate() == tmpEndTime.getDate()){
                    if(startTime.getTime()<=tmpEndTime.getTime() && endTime.getTime()>=tmpEndTime.getTime()){
                        flag=1;
                        return res.json({
                            status: false,
                            message: "Slot not Available"
                        })
                    }
                }
            }
        })
        if(!flag){
            try {
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
                return res.status(200).json({
                    status: false,
                    message: "Error while scheduling!"
                })
              }
        } 
        }));
  }