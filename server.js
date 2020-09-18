const express = require ('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5000;

//Access to router:
const contactRoutes = express.Router();

//importing the model from the folder specified below:
let Contact = require('./contact.model');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb

mongoose.connect('mongodb://127.0.0.1:27017',{ useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open',function(){
    console.log("Mongo db connection is successfull")
})

function close(){
    return mongoose.disconnect();
}



//---------------End Points:

//--Get all contacts:

contactRoutes.route('/').get(function(req, res){
    Contact.find(function(err, contacts){
        if(err){
            console.log(err);
        }else{
            res.json(contacts)
        }
    });
});

//--Get Contact based on Id:

contactRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Contact.findById(id, function(err,contact){
        res.json(contact);
    });
});

//--ADD new Contact

contactRoutes.route('/add').post(function(req, res){
    let contact = new Contact(req.body);
    contact.save()
    .then(contact => {
        res.status(200).json({'contact' : 'contact added successfully'});
    })
    .catch(err =>{
        res.status(400).send('your attemp to create a new contact failed');
    });
});

//--Update contact

contactRoutes.route('/update/:id').post(function(req,res){
    Contact.findById(req.params.id, function(err, contact){
        if(!contact)
            res.status(404).send('the contact was not found');
            else
                contact.contact_fullname = req.body.contact_fullname;
                contact.contact_address = req.body.contact_address;
                contact.contact_mobile_phone = req.body.contact_mobile_phone;
                contact.contact_telephone = req.body.contact_telephone;
                contact.contact_city = req.body.contact_city;
                contact.contact_postal_code = req.body.contact_posta_code;
                contact.contact_country = req.body.contact_country;

                contact.save().then(contact => {
                    res.json('Contact has been updated')
                })
                .catch(err => {
                    res.status(400).send("Update was unsuccessful");
                });
    });
});

//--Delete a new Contact

contactRoutes.route('/delete/:id').post(function(req,res){

        let id = req.params.id;
        Contact.findOneAndDelete(id, function(err,contact){
            res.json(contact);
        });
   
});


//base route:
app.use('/contacts', contactRoutes);

app.listen(PORT, function(){
    console.log("Your server is running on port:" + PORT)
});

//swagger: 
const swaggerOptions = {
    swaggerDefinition : {
        info: {
            title:"phoneBook_Api",
            description: " API_info",
            contact: {
                name: "xxxx"
            },
            server: ["http://localhost:5000"]

        }
    },
    apis:["server.js"]
   
};
const swaggerDocs = swaggerJsDocs(swaggerOptions);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));