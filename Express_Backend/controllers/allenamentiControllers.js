const AllenamentiServices = require('../services/allenamentiServices');

class AllenamentiControllers {

    // GET elenco completo esercizi
    static getEsercizi = async (req, res, next) => {
        try {
            const esercizi = await AllenamentiServices.getAllEsercizi();
            res.json(esercizi);
        } catch (e) {
            next(e);
        }
    };

    // GET singolo esercizio dato l'ID
    static getEsercizioById = async (req, res, next) => {
        try {
            const { id_esercizio } = req.params;
            const esercizio = await AllenamentiServices.getEsercizioById(id_esercizio);
            if (!esercizio) {
                const err = new Error('Esercizio non trovato');
                err.statusCode = 404;
                return next(err);
            }
            res.json(esercizio);
        } catch (e) {
            next(e);
        }
    };

    // GET elenco tutti gli allenamenti
    static getAllenamenti = async (req, res, next) => {
        try {
            const allenamenti = await AllenamentiServices.getAllAllenamenti();
            res.json(allenamenti);
        } catch (e) {
            next(e);
        }
    };

    // GET associazioni esercizi-allenamenti
    static getEserciziAllenamenti = async (req, res, next) => {
        try {
            const eserciziAllenamenti = await AllenamentiServices.getAllEserciziAllenamenti();
            res.json(eserciziAllenamenti);
        } catch (e) {
            next(e);
        }
    };

    // GET dettagli di un allenamento dato l'ID
    static getDettagliAllenamento = async (req, res, next) => {
        try {
            const { id_allenamento } = req.params;
            const dettagliAllenamento = await AllenamentiServices.getDettagliAllenamento(id_allenamento);
            if (!dettagliAllenamento) {
                const err = new Error('Dettagli allenamento non trovati');
                err.statusCode = 404;
                return next(err);
            }
            res.json(dettagliAllenamento);
        } catch (e) {
            next(e);
        }
    };

    // GET allenamento dato l'ID
    static getAllenamentoById = async (req, res, next) => {
        try {
            const { id_allenamento } = req.params;
            const allenamento = await AllenamentiServices.getAllenamentoById(id_allenamento);
            if (!allenamento) {
                const err = new Error('Allenamento non trovato');
                err.statusCode = 404;
                return next(err);
            }
            res.json(allenamento);
        } catch (e) {
            next(e);
        }
    };

    // GET allenamenti dell'utente autenticato
    static getAllenamentiUtente = async (req, res, next) => {
        try {
            const user_id = req.user.id;
            const allenamentiUtente = await AllenamentiServices.getAllenamentiUtente(user_id);
            res.json(allenamentiUtente);
        } catch (e) {
            next(e);
        }
    };

    // POST verifica esistenza allenamento per un dato giorno
    static checkAllenamento = async (req, res, next) => {
        try {
            const { giorno } = req.body;
            const user_id = req.user.id;
            const exists = await AllenamentiServices.checkAllenamento(user_id, giorno);
            res.status(201).json({ exists });
        } catch (e) {
            next(e);
        }
    };

    // POST crea una nuova scheda di allenamento
    static creaAllenamenti = async (req, res, next) => {
        try {
            const { nome, giorno, durata, data_creazione } = req.body;
            const user_id = req.user.id;
            const result = await AllenamentiServices.creaAllenamenti(user_id, nome, giorno, durata, data_creazione);
            res.status(201).json({ message: 'Allenamento creato con successo', id: result });
        } catch (e) {
            next(e);
        }
    };

    // POST inserisce gli esercizi all'interno di una scheda
    static riempiAllenamento = async (req, res, next) => {
        try {
            const { id_allenamento, esercizi } = req.body;
            const result = await AllenamentiServices.riempiAllenamento(id_allenamento, esercizi);
            res.status(201).json({ message: 'Allenamento riempito con successo', id: result });
        } catch (e) {
            next(e);
        }
    };

    // PUT/POST modifica una scheda di allenamento
    static modificaAllenamento = async (req, res, next) => {
        try {
            const { id_allenamento, modifiche_allenamento } = req.body;
            const result = await AllenamentiServices.modificaAllenamento(id_allenamento, modifiche_allenamento);
            res.status(201).json({ message: 'Allenamento modificato con successo', result });
        } catch (e) {
            next(e);
        }
    };

    // POST assegna un allenamento ad una data nel calendario
    static programmaAllenamento = async (req, res, next) => {
        try {
            const { id_allenamento, data_calendario } = req.body;
            const result = await AllenamentiServices.programmaAllenamento(id_allenamento, data_calendario);
            res.status(201).json({ message: 'Allenamento programmato con successo', result });
        } catch (e) {
            next(e);
        }
    };

    // POST duplica un allenamento dalla bacheca alla propria scheda
    static clonaAllenamento = async (req, res, next) => {
        try {
            const user_id = req.user.id;
            const { id_allenamento } = req.body;
            const result = await AllenamentiServices.clonaAllenamento(id_allenamento, user_id);
            res.status(201).json({ message: 'Allenamento clonato con successo', result });
        } catch (e) {
            next(e);
        }
    };

    // DELETE elimina una scheda allenamento dato l'ID
    static eliminaAllenamento = async (req, res, next) => {
        try {
            const { id_allenamento } = req.params;
            await AllenamentiServices.eliminaAllenamento(id_allenamento);
            res.status(201).json({ message: 'Allenamento eliminato con successo' });
        } catch (e) {
            next(e);
        }
    };

}

module.exports = AllenamentiControllers;