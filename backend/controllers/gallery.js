const nedb = require("nedb-promise");

const photoDB = new nedb({ filename: "./database/album.db", autoload: true });
// User album

const album = async (req, res) => {
    const clientData = req.body;
    let allImages = []
    try {
            // Search for users imgs
            const allImg = await photoDB.find({ email: clientData.email })
            if (allImg.length >= 1) {
                // Save all img to array
                allImages.push(allImg[0].img)
                // Send all img form user
                res.json(allImg[0].img);
            } else {
                res.json(allImages)
            }
        
    } catch (error) {
        console.log('Album error USER', error)
    }
};
// Upload image to db
const upload = async (req, res) => {
    const clientData = req.body;
    const clientObj = {
        email: clientData.email,
        img: [clientData.img],
    };
    // Find user
    const findUser = await photoDB.find({
        email: clientData.email,
    });
    // Update users photo db
    if (findUser.length > 0) {
        const userId = findUser[0]._id;
        await photoDB.update(
            { _id: userId, }, { $push: { img: clientData.img, }, }
        );
        // Update photo db with new user
    } else {
        await photoDB.insert(clientObj);
    }
    res.json(clientObj);

}
// Delete photo
const deletephoto = async (req, res) => {
    const clientData = req.body;
    const responce = true
    try {
        const user = clientData.email
        // Search user
        const findUser = await photoDB.find({ email: user.email });

        if (findUser) {
            // Delete img from db
            await photoDB.update(
                { email: user, }, { $pull: { img: clientData.img }, })
        } res.json(responce)
    } catch (error) {
        console.log('Delete photo User', error)
    }
};
// Album for admin
const adminalbum = async (req, res) => {
    const clientData = req.body;
    let allImages = []

    try {
        // Check admin role
        const role = clientData.role
        if (role === 'admin') {
            // Search for all img
            const allImg = await photoDB.find({})
            allImg.forEach((email) => {
                const images = email.img;
                // Send all img to array
                images.forEach((img) => { allImages.push(img) })
            })
                res.json(allImages) 
        }
    } catch (error) {
        console.log('Album error ADMIN', error)
    }
}
// Admin can delete all images form db
const admindelete = async (req, res) => {
    const clientData = req.body;
    // Responce for refresh
    const responce = true
    let email
    try {
        //Find selected img
        const findUser = await photoDB.find({
            img: clientData.img,
        });
        //Find owner of img
        findUser.forEach((e) => {
            email = e.email
        })
        //Delete any img from db
        if (findUser)
            await photoDB.update(
                { email: email, }, { $pull: { img: clientData.img }, })
        res.json(responce)
    } catch (error) {
        console.log('Delete image Admin', error)
    }
}

module.exports = { upload, album, deletephoto, adminalbum, admindelete }
