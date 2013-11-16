

 /*
  * GET home page.
  */
 
 exports.index = function(req, res){
   res.render('index',{ title: 'Welcome, Nut' });
 };

 exports.search = function(req, res){
    res.send("Hi there");
};
    
 exports.triage = function(req, res) {   
        if (req.param('list')) {
           res.redirect("listNuts");
            res.location("listNuts"); // set header of form 
        } else if (req.param('add')) {   
           res.redirect("enroll");
           res.location("enroll"); // set form header
        } else {
            res.end("Must make choice!");
        }
};

    
 exports.enrollNutForm = function(req, res) {
   res.render('enrollNutForm', {title: "Add New Nut"});
 };
 
 exports.updateNut = function(mongo, db) {
	return function(req, res) {
		var collection = db.get('nuts')
        ,	BSON = mongo.BSONPure
		,   obj_id = new BSON.ObjectID(req.body.nut_ID);
			collection.update({"_id": obj_id},
				{"$set": { "Name":  req.body.Name,
					  "FName": req.body.FName,
					  "LName": req.body.LName,
					  "Loc" : [
									{
										"Addr": req.body.Addr1,
										"HomePh": req.body.HomePh1
									},
									{
										"Addr": req.body.Addr2,
										"HomePh": req.body.HomePh2
									},
									{
										"Addr": req.body.Addr3,
										"HomePh": req.body.HomePh3
									}
								],						
					  "Email": req.body.Email,
					  "CellPh": req.body.CellPh,
					  "Bday": req.body.Bday,
					  "Note": req.body.Note }}, function(error) {
							if (error) {
								console.log(error);
							}				  
							res.redirect("listNuts");		
							res.location("listNuts");			
						});
	};
};	

 exports.insertNut = function(db) {
    return function(req, res) {
        // Get our form values. These rely on the "name" attributes
        var sirName = req.body.Name
        , firstName = req.body.FName
        , lastName = req.body.LName
        , addr1 = req.body.Addr1
        , hphone1 = req.body.HomePh1
        , addr2 = req.body.Addr2
        , hphone2 = req.body.HomePh2
        , addr3 = req.body.Addr3
        , hphone3 = req.body.HomePh3
        , email = req.body.Email
        , cellphone = req.body.CellPh
        , bday = req.body.Bday
        , note = req.body.Note;        
         // Set our collection
        var collection = db.get('nuts');
        collection.insert({
            "Name" : sirName,
            "FName" : firstName,
            "LName" : lastName,
            "Loc" : [
                        {
                            "Addr" : addr1,
                            "HomePh" : hphone1
                        },
                        {
                            "Addr" : addr2,
                            "HomePh" : hphone2
                        },
                        {
                            "Addr" : addr3,
                            "HomePh" : hphone3
                        }
                    ],                       
            "Email": email,
            "CellPh": cellphone,
            "Bday": bday,
            "Note": note
        }, function(err, doc) {
            if (err) {
                res.send("Couldn't add nut to db");
            }else {
                // If it worked, forward to success page
                res.redirect("listNuts");
                // And set the header so the address bar doesn't still say /adduser
                res.location("listNuts");
            }
         });
     }
}     

exports.deleteNut = function(mongo, db) {
    return function(req, res) {
 
        var collection = db.get('nuts')
        ,    BSON = mongo.BSONPure    
        , obj_id = new BSON.ObjectID(req.param("target"));     
        collection.remove({"_id" : obj_id}, function(error) {
             if (!error) {  
                 // If it worked, forward to success page
                res.redirect("listNuts");
                // And set the header so the address bar doesn't still say wrong thing
                res.location("listNuts");
             } else {
                console.log(error);
                res.redirect("listNuts");
                // And set the header so the address bar doesn't still say wrong thing
                res.location("listNuts");
            }
        });
    };
};
 
exports.editNut = function(mongo, db) {
    return function(req, res) {
        var collection = db.get('nuts')
		,	BSON = mongo.BSONPure
		,   obj_id = new BSON.ObjectID(req.param("target"));
        collection.find({"_id": obj_id}, function(error, doc) {
            if (!error) {
			    var idHexStr = doc[0]._id.toString(); // get hex string val of obj id
                res.render('editNutForm', {"editDoc": doc, "editTitle": "Edit Nut", "idStr" : idHexStr});
            } else {
                console.log(error);
                res.redirect("listNuts");
                // And set the header so the address bar doesn't still say wrong thing
                res.location("listNuts");
            }
        });
    };
};
 

	
 exports.listNuts = function(db) {
     return function(req, res) {
         var collection = db.get('nuts');
         collection.find({},{},function(e,docs){
            if (e) throw error;
             res.render('listNuts', {"nutCollection" : docs, "listTitle": "Our Nuts"});
         });
     }
 }