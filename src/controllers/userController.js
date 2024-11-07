require("@babel/register");
const bcrypt = require("bcrypt");
const DbUserServices = require("../services/usersServices");

class UserController {

  async auth(req, res) {
    try {
      if (req.session.user) {
        res
          .status(200)
          .json({ name: req.session.user.name, email: req.session.user.email });
      } else {
        res.status(201).json({ msg: "Пользователь не авторизован" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Ошибка сервера при аутентификации" });
    }
  }

  async signIn(req, res) {
    const data = req.body;
    try {
      if (
        !Object.hasOwn(data, "sinEmail") ||
        !Object.hasOwn(data, "password")
      ) {
        res.status(401).json({ msg: "Отсутствует одно из полей" });
        return;
      }
      const email = data.sinEmail.toLowerCase();
      const user = await DbUserServices.findOneFromEmail(email);

      if (!user) {
        res.status(401).json({ msg: "Пользователь и/или пароль не найден" })
        return;
      }

      const isTrue = await bcrypt.compare(data.password, user.password);
      if (!isTrue) {
        res.status(401).json({ msg: "Пользователь и/или пароль не найден" });
        return;
      }

      req.session.user = {
        name: user.name,
        email: user.email,
      };
      res.status(200).json(req.session.user);
    } catch (error) {
      console.log("Error --> ", error.message);
      res.status(500).json({ msg: "Ошибка сервера" });
    }
  }

  async signUp(req, res) {
    const data = req.body;
    try {
      res.status(200).json("SignUp OK");
    } catch (error) {
      console.log("Error --> ", error.message);
    }
  }

  async logOut(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.log(err.message);
          res.status(401).json({ msg: "Не удалось выйти" });
        } else {
          res.status(200).end();
        }
      });
      res.clearCookie("user_sid");
    } catch (error) {
      console.log("Error --> ", error.message);
      res.status(500).json({ msg: "Ошибка сервера при деаутентификации" });
    }
  }
}

module.exports = new UserController();
