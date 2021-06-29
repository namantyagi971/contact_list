const mongoose = require('mongoose');

// creating database schema

const ContactSchema = new mongoose.Schema({
      name : {
          type : String,
          required : true
      },
      phone : {
          type : String,
          required : true
      }
});

// collecting it from modals
// 'Contact'(is collecion) is name of contactlists (which is in index.js) from this name ,it is known in database
const Contact = mongoose.model('Contact',ContactSchema);

// exporting the schema

module.exports = Contact;