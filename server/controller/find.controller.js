const Sch =require( '../model/schedule.model');

module.exports = find = async (req, res) => {
    var schedule = new Sch();
    Sch.find({},((err, result) =>{
        if (err) throw err;
        console.log(result);
        return res.json(result);
      }));
}