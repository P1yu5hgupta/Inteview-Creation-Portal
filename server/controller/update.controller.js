const Sch = require( '../model/schedule.model');
const nodemailer =  require('nodemailer')

module.exports = update = async (req, res) => {
    const startTime = new Date(req.body.newStartTime);
    const endTime = new Date(req.body.newEndTime);
    var flag=0;
    await Sch.find({email: req.body.email},(async (err, result) =>{
        if (err) throw err;
        result.forEach(schedule => {
            if(result._id!=req.body._id){
                var tmpStartTime=schedule.startTime;
                var tmpEndTime=schedule.endTime;
                if(startTime <= tmpEndTime && tmpStartTime <= endTime){
                    flag=1;
                    return res.json({
                        status: false,
                        message: "Slot not Available"
                    })
                }
            }
        });
        if(startTime.getTime()>endTime.getTime() && startTime.getDate()==endTime.getDate()){
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
        else if(startTime<Date.now()|| endTime<Date.now()){
            flag=1;
            return res.json({
                status: false,
                message: "Slot Timings Expired"
            })
        }
        if(!flag){
            try {
                console.log("reach");
                Sch.deleteOne({_id:req.body._id}, async(err,result)=>{
                    if(err)
                        throw err;
                    console.log(result);
                    const Schedule = new Sch({
                        email:req.body.email,
                        startTime: new Date(startTime),
                        endTime: new Date(endTime)
                    });
                    console.log(Schedule);
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
                    return res.status(200).json({
                        status: false,
                        message: "Error while scheduling!"
                    })
                    }
                }); 
              }
              catch (err) {
                return res.status(200).json({
                    status: false,
                    message: "Error while scheduling!"
                })
              }
        } 
        }));
  }