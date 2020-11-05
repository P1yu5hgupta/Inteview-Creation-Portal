const Sch =require( '../model/schedule.model');

module.exports = del= async (req, res) => {
    await Sch.deleteOne({_id:req.body._id},(err,result)=>{
        if(err) {
            throw err;
        }
        console.log(result);
        return res.json({
            status:true,
            message:"Schedule Successfully Deleted"
        })
    }); 
}