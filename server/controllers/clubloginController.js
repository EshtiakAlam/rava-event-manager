const ClubLogin = require('../models/clubloginModel');
const Club = require('../models/clubModel');

// Club login controller
const clubLogin = async (req, res) => {
    const { abbreviation, password } = req.body;

    try {
        // Find the club based on the provided abbreviation
        const club = await Club.findOne({ abbreviation });

        if (!club) {
            return res.status(404).json({ error: 'Club not found' });
        }

        // Create the club login with the retrieved club's ObjectId
        const clubLogin = await ClubLogin.create({
            abbreviation,
            password,
            club: club._id
        });

        res.status(200).json({ clubLogin });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Could not login' });
    }
};

// Club signup controller


const clubSignup = async (req, res) => {
    const { title, abbreviation, description, contactInformation, panel, advisor, events, members } = req.body;

    try {
        // Create the new club
        const club = await Club.create({
            title,
            abbreviation,
            description,
            contactInformation,
            panel,
            advisor,
            events,
            members
        });

        res.status(201).json({ club });
    } catch (error) {
        console.error('Error creating club:', error);
        res.status(500).json({ error: 'Could not create club' });
    }
};




module.exports = {
    clubLogin,
    clubSignup
};
