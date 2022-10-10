const bcrypt = require("bcryptjs");
const User = require('./Model/User');
const donationData = require('./Model/donations')


exports.register_post = async(req, res) => {
    const { userName, password , password_2 , isCreator , profession  } = req.body;
    var userId;
  
    let user = await User.findOne({ userName });
  
    if (user) {
      req.session.error = "User Name already exists";
      return res.send("User already exist");
    }

    if(password !== password_2){
        req.session.error = "Password does not match.";
        return res.send('Password different')
    }
  
    const hasdPsw = await bcrypt.hash(password, 12);

    if(isCreator){
        let creators = await User.find({isCreator:true});
        let count = creators.length;

        if(count === 0){
            userId = 'C1'
        }else{
            userId = C + (count+1)
        }

    }else{
        let creators = await User.find({isCreator:false});
        let count = creators.length;

        if(count === 0){
            userId = 'N1'
        }else{
            userId = 'N' + (count+1)
        }

    }
  
    user = new User({
      userName,
      password: hasdPsw,
      isCreator,
      userId,
      profession
    });
  
    await user.save();
    res.redirect("/login");
 
};

  
exports.login_post = async(req, res) => {
    const { userName, password } = req.body;
  
    const user = await User.findOne({ userName });
  
    if (!user) {
      req.session.error = "Invalid Credentials";
      return res.redirect("/login");
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      req.session.error = "Invalid Credentials";
      return res.redirect("/login");
    }
  
    req.session.isAuth = true;
    req.session.loggedInUser = user.userId;
    res.redirect('/allCreators');

};

exports.logout = (req,res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/login");
    });
};

exports.allCreator = async(req,res) => {
    let allCreators = await User.find({isCreator:true},{_id:0,password:0,isCreator:0,userId:0});
    res.send(allCreators);
};

exports.donation = async(req,res) => {
    const{toCreator, currency, amount, name, message} = req.body;
    const from = req.session.loggedInUser;

    let data = new donationData({
        from, 
        toCreator,
        currency,
        amount,
        name,
        message
    });
    await data.save();
    res.redirect('/donation');
};

exports.particularDonations = async(req,res) => {
    const toCreator = req.query.toCreator;
    const from = req.session.loggedInUser;
    
    let data = await donationData.find({from, toCreator});
    res.send(data);

};