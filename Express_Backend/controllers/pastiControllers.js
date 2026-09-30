const PastiServices = require('../services/pastiServices');

class PastiControllers {

    // GET dammi tutti gli alimenti
    static getAlimenti = async (req, res, next) => {
        try {
            const alimenti = await PastiServices.getAllAlimenti();
            res.json(alimenti);
        } catch (e) {
            next(e);
        }
    };

    // GET restituiscimi un alimento dato il suo ID
    static getAlimentoById = async (req, res, next) => {
        try {
            const id_alimento = req.params.id_alimento;
            const alimento = await PastiServices.getAlimentoById(id_alimento);
            if (!alimento) {
                const err = new Error('Alimento non trovato');
                err.statusCode = 404;
                return next(err);
            }
            res.json(alimento);
        } catch (e) {
            next(e);
        }
    };

    // GET dammi tutti i pasti
    static getPasti = async (req, res, next) => {
        try {
            const pasti = await PastiServices.getAllPasti();
            res.json(pasti);
        } catch (e) {
            next(e);
        }
    };

    // GET dammi tutti i dettagli di tutti i pasti
    static getAlimentiPasti = async (req, res, next) => {
        try {
            const alimentiPasti = await PastiServices.getAllAlimentiPasti();
            res.json(alimentiPasti);
        } catch (e) {
            next(e);
        }
    };

    // GET dammi i dettagli di un singolo pasto dato il suo ID
    static getDettagliPasto = async (req, res, next) => {
        try {
            const id_pasto = req.params.id_pasto;
            const dettagliPasto = await PastiServices.getDettagliPasto(id_pasto);
            if (!dettagliPasto) {
                const err = new Error('Pasto non trovato');
                err.statusCode = 404;
                return next(err);
            }
            res.json(dettagliPasto);
        } catch (e) {
            next(e);
        }
    };

    // GET dammi un pasto dato il suo ID
    static getPastoById = async (req, res, next) => {
        try {
            const id_pasto = req.params.id_pasto;
            const pasto = await PastiServices.getPastoById(id_pasto);
            if (!pasto) {
                const err = new Error('Pasto non trovato');
                err.statusCode = 404;
                return next(err);
            }
            res.json(pasto);
        } catch (e) {
            next(e);
        }
    };

    // GET dammi tutti i pasti relativi all'utente autenticato
    static getPastiUtente = async (req, res, next) => {
        try {
            const user_id = req.user.id;
            const pastiUtente = await PastiServices.getPastiUtente(user_id);
            res.json(pastiUtente);
        } catch (e) {
            next(e);
        }
    };

    // GET dammi tutti i pasti programmati nel calendario dell'utente autenticato
    static getPastiProgrammati = async (req, res, next) => {
        try {
            const user_id = req.user.id;
            const pastiProgrammati = await PastiServices.getPastiProgrammati(user_id);
            res.json(pastiProgrammati);
        } catch (e) {
            next(e);
        }
    };

    // POST controlla se un pasto esiste già nel database per l'utente
    static checkPasto = async (req, res, next) => {
        try {
            const { nome, tipo } = req.body;
            const user_id = req.user.id;
            const exists = await PastiServices.checkPasto(user_id, nome, tipo);
            res.status(200).json({ exists });
        } catch (e) {
            next(e);
        }
    };

    // POST salva un nuovo pasto nel database
    static creaPasti = async (req, res, next) => {
        try {
            const { nome, tipo, data_creazione } = req.body;
            const user_id = req.user.id;
            const result = await PastiServices.creaPasti(user_id, nome, tipo, data_creazione);
            res.status(201).json({ message: 'Pasto creato con successo', id: result });
        } catch (e) {
            next(e);
        }
    };

    // POST aggiungi i dettagli di un determinato pasto nel database
    static riempiPasto = async (req, res, next) => {
        try {
            const { id_pasto, alimenti } = req.body;
            const result = await PastiServices.riempiPasto(id_pasto, alimenti);
            res.status(201).json({ message: 'Pasto riempito con successo', id: result });
        } catch (e) {
            next(e);
        }
    };

    // PUT/POST modifica i dettagli di un determinato pasto
    static modificaPasto = async (req, res, next) => {
        try {
            const { id_pasto, modifiche_pasto } = req.body;
            const result = await PastiServices.modificaPasto(id_pasto, modifiche_pasto);
            res.status(200).json({ message: 'Pasto modificato con successo', result });
        } catch (e) {
            next(e);
        }
    };

    // POST inserisci nel calendario un determinato pasto
    static programmaPasto = async (req, res, next) => {
        try {
            const { id_pasto, data_calendario } = req.body;
            const result = await PastiServices.programmaPasto(id_pasto, data_calendario);
            res.status(201).json({ result });
        } catch (e) {
            next(e);
        }
    };

    // POST clona un pasto della bacheca nei pasti utente
    static clonaPasto = async (req, res, next) => {
        try {
            const user_id = req.user.id;
            const { id_pasto } = req.body;
            const result = await PastiServices.clonaPasto(id_pasto, user_id);
            res.status(201).json({ message: 'Pasto clonato con successo', result });
        } catch (e) {
            next(e);
        }
    };

    // DELETE cancella un pasto dalla programmazione del calendario
    static disdiciPasto = async (req, res, next) => {
        try {
            const { id_pasto, data_calendario } = req.body;
            await PastiServices.disdiciPasto(id_pasto, data_calendario);
            res.status(200).json({ message: 'Pasto disdetto con successo' });
        } catch (e) {
            next(e);
        }
    };

    // DELETE elimina un pasto dato il suo ID
    static eliminaPasto = async (req, res, next) => {
        try {
            const { id_pasto } = req.params;
            await PastiServices.eliminaPasto(id_pasto);
            res.status(200).json({ message: 'Pasto eliminato con successo' });
        } catch (e) {
            next(e);
        }
    };

}

module.exports = PastiControllers;