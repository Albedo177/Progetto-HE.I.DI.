const AuthServices = require('../services/authServices');

class AuthControllers {

    // POST autenticazione utente e generazione token JWT
    static login = async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const result = await AuthServices.login(email, password);
            if (result.status && result.status !== 200) {
                const err = new Error(result.message);
                err.statusCode = result.status;
                return next(err);
            }
            return res.status(201).json({ message: result.message, token: result.token });
        } catch (e) {
            if (e && e.status && !e.statusCode) e.statusCode = e.status;
            next(e);
        }
    };

    // POST registrazione nuovo utente o professionista
    static register = async (req, res, next) => {
        const { ruolo, id_ruolo_professionista, nome, cognome, email, password } = req.body;
        try {
            const result = await AuthServices.registration(ruolo, id_ruolo_professionista, nome, cognome, email, password);
            res.status(201).json({ success: true, data: result });
        } catch (e) {
            if (e && e.status && !e.statusCode) e.statusCode = e.status;
            next(e);
        }
    };

    // GET ruoli disponibili per gli specialisti
    static getRuoliProfessionisti = async (req, res, next) => {
        try {
            const result = await AuthServices.getRuoliProfessionisti();
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    };
}

module.exports = AuthControllers;