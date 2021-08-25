const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {check, validationResult} = require('express-validator');

const User = require('../module/User')
const Contact = require('../module/Contact')


//@route    Get api/contacts
//@desc     Get all users contacts
//@access   Private
router.get("/",auth,async (req,res)=>{

    try {
        const contacts = await Contact.find({user:req.user.id}).sort({date:-1})
        res.json(contacts)
        console.log(contacts)
    }
    catch (e){
        console.error(e.message)
        res.status(500).send("Server Error")
    }
})



//@route    POST api/contacts
//@desc     add a new contacts
//@access   private

router.post("/",[auth,
    [
    check('name', "Name is required").not().isEmpty()
]], async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    const {name,email,phone,type}=req.body
    console.log(req)

    try{
        const newConacts = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })
        const contact = await newConacts.save()
        res.json(contact);
    }catch (e) {
        if(e){
            console.error(e.message)
            res.status(500).send("server ERROR")
        }

    }
})




//@route    Put api/contacts
//@desc     Update contacts
//@access   Private
router.put('/:id', auth, async (req, res) => {
    const {name, email, phone, type} = req.body;

    // Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        console.log(contact)

        if (!contact) return res.status(404).json({msg: 'Contact not found'});

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            {$set: contactFields},
            {new: true},
        );

        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route    DELETE api/contacts
//@desc     delete contacts
//@access   Private
router.delete("/:id",auth,async (req,res)=>{
    try {
        let contact = await Contact.findById(req.params.id);
        console.log(contact)

        if (!contact) return res.status(404).json({msg: 'Contact not found'});

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        await Contact.findByIdAndRemove(req.params.id)


        res.json({msg:"Contact removed"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



module.exports = router



