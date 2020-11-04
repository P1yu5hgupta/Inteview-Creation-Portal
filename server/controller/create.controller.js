const Sch = require( '../model/schedule.model');


module.exports = create = async (req, res) => {
    const Schedule = new Sch(req.body);
    try {
      await Schedule.save()
      return res.status(200).json({
        message: "Successfully created!"
      })
    } catch (err) {
      return res.status(400).json({
        error: "Error while scheduling!"
      })
    }
  }