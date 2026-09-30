const UserServices = require('../services/userServices');

class UserControllers {

    // GET tutti gli utenti
    static getUsers = async (req, res, next) => {
        try {
            const utenti = await UserServices.getAllUsers();
            res.json(utenti);
        } catch (e) {
            next(e);
        }
    };

    // GET utente dato il suo ID
    static getUtenteById = async (req, res, next) => {
        try {
            const { id_utente } = req.params;
            const dati = await UserServices.getUtenteById(id_utente);
            if (!dati) {
                const err = new Error('Utente non trovato');
                err.statusCode = 404;
                return next(err);
            }
            res.json(dati);
        } catch (e) {
            next(e);
        }
    };

    // GET informazioni utente dato il suo ID
    static getInfoUtenteById = async (req, res, next) => {
        try {
            const { id_utente } = req.params;
            const info = await UserServices.getInfoUtenteById(id_utente);
            if (!info) {
                const err = new Error('Informazioni utente non trovate');
                err.statusCode = 404;
                return next(err);
            }
            res.json(info);
        } catch (e) {
            next(e);
        }
    };

    // GET utenti filtrati per ruolo
    static getUtentiByRuolo = async (req, res, next) => {
        try {
            const { ruolo } = req.params;
            const result = await UserServices.getUtentiByRuolo(ruolo);
            if (!result) {
                const err = new Error('Utenti non trovati per il ruolo specificato');
                err.statusCode = 404;
                return next(err);
            }
            res.json(result);
        } catch (e) {
            next(e);
        }
    };

    // GET elenco albo professionisti
    static getAlbo = async (req, res, next) => {
        try {
            const result = await UserServices.getAlbo();
            if (!result) {
                const err = new Error('Albo non trovato');
                err.statusCode = 404;
                return next(err);
            }
            res.json(result);
        } catch (e) {
            next(e);
        }
    };

    // GET tutte le richieste
    static getRichieste = async (req, res, next) => {
        try {
            const result = await UserServices.getRichieste();
            if (!result) {
                const err = new Error('Richieste non trovate');
                err.statusCode = 404;
                return next(err);
            }
            res.json(result);
        } catch (e) {
            next(e);
        }
    };

    // GET ruolo di un determinato professionista
    static getRuoloProfessionista = async (req, res, next) => {
        try {
            const { id_professionista } = req.params;
            const result = await UserServices.getRuoloProfessionista(id_professionista);
            if (!result) {
                const err = new Error('Ruolo professionista non trovato');
                err.statusCode = 404;
                return next(err);
            }
            res.json(result);
        } catch (e) {
            next(e);
        }
    };

    // GET associazioni dell'utente autenticato
    static getAssociazioniUtente = async (req, res, next) => {
        try {
            const id_utente = req.user.id;
            const result = await UserServices.getAssociazioniUtente(id_utente);
            if (!result) {
                const err = new Error('Associazioni non trovate');
                err.statusCode = 404;
                return next(err);
            }
            res.json(result);
        } catch (e) {
            next(e);
        }
    };

    // GET associazioni del professionista autenticato
    static getAssociazioniProfessionista = async (req, res, next) => {
        try {
            const id_professionista = req.user.id;
            const result = await UserServices.getAssociazioniProfessionista(id_professionista);
            if (!result) {
                const err = new Error('Associazioni professionista non trovate');
                err.statusCode = 404;
                return next(err);
            }
            res.json(result);
        } catch (e) {
            next(e);
        }
    };

    // GET richieste inviate/ricevute dall'utente autenticato
    static getRichiesteUtente = async (req, res, next) => {
        try {
            const id_utente = req.user.id;
            const result = await UserServices.getRichiesteUtente(id_utente);
            if (!result) {
                const err = new Error('Richieste utente non trovate');
                err.statusCode = 404;
                return next(err);
            }
            res.json(result);
        } catch (e) {
            next(e);
        }
    };

    // GET richieste inviate/ricevute dal professionista autenticato
    static getRichiesteProfessionista = async (req, res, next) => {
        try {
            const id_professionista = req.user.id;
            const result = await UserServices.getRichiesteProfessionista(id_professionista);
            if (!result) {
                const err = new Error('Richieste professionista non trovate');
                err.statusCode = 404;
                return next(err);
            }
            res.json(result);
        } catch (e) {
            next(e);
        }
    };

    // GET associazioni in attesa (pending) dell'utente autenticato
    static getAssociazioniPending = async (req, res, next) => {
        try {
            const id_utente = req.user.id;
            const result = await UserServices.getAssociazioniPending(id_utente);
            if (!result) {
                const err = new Error('Associazioni pending non trovate');
                err.statusCode = 404;
                return next(err);
            }
            res.json(result);
        } catch (e) {
            next(e);
        }
    };

    // GET richieste in attesa (pending) dell'utente autenticato
    static getRichiestePending = async (req, res, next) => {
        try {
            const id_utente = req.user.id;
            const result = await UserServices.getRichiestePending(id_utente);
            if (!result) {
                const err = new Error('Richieste pending non trovate');
                err.statusCode = 404;
                return next(err);
            }
            res.json(result);
        } catch (e) {
            next(e);
        }
    };

    // GET feed delle attività degli utenti associati
    static getFeedAssociati = async (req, res, next) => {
        try {
            const user_id = req.user.id;
            const result = await UserServices.getFeedAssociati(user_id);
            if (!result) {
                const err = new Error('Feed non trovato');
                err.statusCode = 404;
                return next(err);
            }
            res.json(result);
        } catch (e) {
            next(e);
        }
    };

    // POST crea una nuova associazione
    static creaAssociazione = async (req, res, next) => {
        try {
            const id_utente = req.user.id;
            const { id_persona } = req.body;
            const result = await UserServices.creaAssociazione(id_utente, id_persona);
            res.status(201).json({ message: 'Associazione creata con successo', result });
        } catch (e) {
            next(e);
        }
    };

    // PUT/POST accetta una richiesta di associazione
    static accettaAssociazione = async (req, res, next) => {
        try {
            const { id_associazione } = req.body;
            const result = await UserServices.accettaAssociazione(id_associazione);
            res.status(201).json({ message: 'Associazione accettata con successo', result });
        } catch (e) {
            next(e);
        }
    };

    // POST crea una nuova richiesta di consulenza/revisione
    static creaRichiesta = async (req, res, next) => {
        try {
            const user_id = req.user.id;
            const { dati } = req.body;
            const result = await UserServices.creaRichiesta(user_id, dati);
            res.status(201).json({ message: 'Richiesta creata con successo', result });
        } catch (e) {
            next(e);
        }
    };

    // PUT/POST accetta una richiesta
    static accettaRichiesta = async (req, res, next) => {
        try {
            const { richiesta } = req.body;
            const result = await UserServices.accettaRichiesta(richiesta);
            res.status(201).json({ message: 'Richiesta accettata con successo', result });
        } catch (e) {
            next(e);
        }
    };

    // POST/PUT inserisce o aggiorna le informazioni del profilo
    static riempiInfo = async (req, res, next) => {
        try {
            const { info } = req.body;
            const result = await UserServices.riempiInfo(info);
            res.status(201).json({ message: 'Informazioni salvate con successo', result });
        } catch (e) {
            next(e);
        }
    };

    // PUT aggiorna la password utente
    static aggiornaPassword = async (req, res, next) => {
        try {
            const id_utente = req.user.id;
            const { vecchiaPassword, nuovaPassword } = req.body;
            const result = await UserServices.aggiornaPassword(id_utente, vecchiaPassword, nuovaPassword);
            res.status(201).json({ message: 'Password aggiornata con successo', result });
        } catch (e) {
            next(e);
        }
    };

    // DELETE annulla/elimina un'associazione
    static annullaAssociazione = async (req, res, next) => {
        try {
            const { id_associazione } = req.params;
            const result = await UserServices.annullaAssociazione(id_associazione);
            res.status(201).json({ message: 'Associazione annullata con successo', result });
        } catch (e) {
            next(e);
        }
    };

    // DELETE annulla/elimina una richiesta
    static annullaRichiesta = async (req, res, next) => {
        try {
            const { id_richiesta } = req.params;
            const result = await UserServices.annullaRichiesta(id_richiesta);
            res.status(201).json({ message: 'Richiesta annullata con successo', result });
        } catch (e) {
            next(e);
        }
    };
}

module.exports = UserControllers;