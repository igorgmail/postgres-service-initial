require("@babel/register");

class AppController {

  async start(req, res) {
    const myCookie = req.session?.user;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Origin', '*');
    res.send('HELLO33')
  }
}

module.exports = new AppController();
