// dbPassword = 'mongodb+srv://YOUR_USERNAME_HERE:'+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true';

// Alternative 2
dbPassword = 'mongodb+srv://dbUser:'+ encodeURIComponent('dbUser123') + '@cluster0-kg7ic.azure.mongodb.net/local_library_prod?retryWrites=true&w=majority';
// dbPassword = 'mongodb+srv://dbUser:'+ encodeURIComponent(process.env.DB_PASS) + '@cluster0-kg7ic.azure.mongodb.net/local_library_prod?retryWrites=true&w=majority';


// Interesting is the syntax for the following module.exports:
module.exports = {
    mongoURI: dbPassword
};
