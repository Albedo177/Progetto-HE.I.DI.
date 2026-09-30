const BachecaServices = require('../services/bachecaServices');

class BachecaControllers {

    // GET pasti presenti in bacheca
    static getPastiBacheca = async (req, res, next) => {
        try {
            const result = await BachecaServices.getPastiBacheca();
            if (!result) {
                const err = new Error('Nessun pasto trovato in bacheca');
                err.statusCode = 404;
                return next(err);
            }
            res.json(result);
        } catch (e) {
            next(e);
        }
    };

    // GET allenamenti presenti in bacheca
    static getAllenamentiBacheca = async (req, res, next) => {
        try {
            const result = await BachecaServices.getAllenamentiBacheca();
            if (!result) {
                const err = new Error('Nessun allenamento trovato in bacheca');
                err.statusCode = 404;
                return next(err);
            }
            res.json(result);
        } catch (e) {
            next(e);
        }
    };

    // GET dettaglio di una singola attività in bacheca
    static getSingolaAttivitaBacheca = async (req, res, next) => {
        try {
            const user_id = req.user.id;
            const { id_attivita, tipologia_attivita } = req.query;
            const result = await BachecaServices.getSingolaAttivitaBacheca(user_id, id_attivita, tipologia_attivita);
            if (!result) {
                const err = new Error('Nessuna attività trovata');
                err.statusCode = 404;
                return next(err);
            }
            res.json({ result });
        } catch (e) {
            next(e);
        }
    };

    // GET elenco voti di una determinata attività
    static getVotiAttivita = async (req, res, next) => {
        try {
            const { id_attivita, tipologia_attivita } = req.query;
            const result = await BachecaServices.getVotiAttivita(id_attivita, tipologia_attivita);
            if (!result) {
                const err = new Error('Nessun voto trovato per questa attività');
                err.statusCode = 404;
                return next(err);
            }
            res.json(result);
        } catch (e) {
            next(e);
        }
    };

    // POST condivide un'attività (pasto o allenamento) sulla bacheca
    static condividiAttivita = async (req, res, next) => {
        try {
            const id_utente = req.user.id;
            const { id_attivita, tipologia_attivita } = req.body;
            const result = await BachecaServices.condividiAttivita(id_utente, id_attivita, tipologia_attivita);
            res.status(201).json({ message: 'Attività condivisa con successo', result });
        } catch (e) {
            next(e);
        }
    };

    // POST assegna un voto ad un'attività in bacheca
    static votaAttivita = async (req, res, next) => {
        try {
            const id_utente = req.user.id;
            const { attivita } = req.body;
            const result = await BachecaServices.votaAttivita(id_utente, attivita);
            res.status(201).json({ message: 'Voto inserito con successo', result });
        } catch (e) {
            if (e && e.status && !e.statusCode) e.statusCode = e.status;
            next(e);
        }
    };
}

module.exports = BachecaControllers;