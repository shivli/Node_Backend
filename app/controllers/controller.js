const my_model = require('../models/model.js');
const myenum1 = require('./roles')
const myenum2 = require('./status')

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!!req.body.content) {
        return res.status(400).send({
            message: "Data content can not be empty"
        });
    }

    const role = myenum1[req.body.role]
console.log(req.body)
    // Create a user
    const data1 = new my_model.a({
    
        name: req.body.name,
        email: req.body.email,
        role: role,
        password:req.body.password,
        phone:req.body.phone,
        skills:req.body.tags
        // location: req.body.location
    });

    // Save user in the database
    data1.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.json({
                message: err.message || "Some error occurred while creating the user."
            });
        });
};

exports.findOne = async (req, res) => {
    const data = my_model.a.findOne({ 'email': req.body.email,'password':req.body.password }, (err, response) => {
        if (err) {
            console.log(data)
            res.status(404).send({
                message: err.message || "Some error occured while Fetching Data From database"
            });
        }
        else {
            res.send(response)

        }
    })

};

// Retrieve and return all user from the database.
exports.findAll = (req, res) => {
    my_model.a.find()
        .then(path => {
            res.send(path);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        });
};

//update user
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }

    // Find user and update it with the request body
    my_model.a.findOneAndUpdate({ 'user_id': req.params.id }, { $set: req.body }, { new: true })
        .then(data1 => {
            if (!data1) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send(data1);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.id
            });
        });
};
// Delete user
exports.delete = (req, res) => {
    my_model.a.findByIdAndRemove(req.params.id)
        .then(data1 => {
            if (!data1) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send({ message: "user  deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "user  not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.id
            });
        });
};

//next db job
// Create and Save a new job
exports.create_job= (req, res) => {
    // Validate request
    if (!!req.body.content) {
        return res.status(400).send({
            message: "Data content can not be empty"
        });
    }
    // Create a job
    

    const data2 = new my_model.b({
        company_Name: req.body.company_Name,
        position: req.body.position,
        Experience: req.body.Experience,
        city: req.body.city,
        contact:req.body.contact,
        skills:req.body.tags
    });

     // Save user in the database
     data2.save()
     .then(data => {
         res.json(data);
     }).catch(err => {
         res.json({
             message: err.message || "Some error occurred while adding the job."
         });
     });
};




exports.company_jobs=(req,res)=>
{
    my_model.b.find({'company_Name':req.query.company_Name})
    .then((response)=>
    {
        res.send(response)

    }).catch((err)=>
    {
        res.status(404).send({
            message: err.message || "Some error occured while Fetching Data From database"
        });
    })
}

    // Save job in the database only admin and company can add a job
    // const response = await my_model.a.findOne({ 'user_id': req.body.id })
    // if (!response) {
    //     res.json({ 'error': 'no user exists with given id' })
    // }
    // console.log(response)
    // if (response.user_roles == myenum1.company) {
    //     data2.save()
    //         .then(data2 => {
    //             res.send(data2);
    //         }).catch(err => {
    //             res.status(500).send({
    //                 message: err.message || "Some error occurred while creating the job."
    //             });
    //         })

    // }
//     else if (response.user_roles == myenum1.admin) {
//         data2.save()
//             .then(data2 => {
//                 res.send(data2);
//             }).catch(err => {

//                 res.status(500).send({
//                     message: err.message || "Some error occurred while creating the job."
//                 });
//             })
//     }
//     else {
//         res.send({ message: 'user cannot add job' })
//     }

// }
// Retrieve and return all job from the database.
exports.findAll_jobs = (_req, res) => {
    my_model.b.find()
        .then(path => {
            res.send(path);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        });
};
//update job
exports.update = (req, res) => {
    if (!req.body) {
        return res.send({
            message: "content can not be empty"
        });
    }

    my_model.b.update({ '_id': req.body.id }, { $set: req.body }, { new: true }, (err, response) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(response);
        }
    });
}
// Delete job
exports.delete_jobs = (req, res) => {
    my_model.b.findByIdAndRemove(req.params.id)
        .then(data2 => {
            if (!data2) {
                return res.status(404).send({
                    message: "job not found with id " + req.params.id
                });
            }
            res.send({ message: "job deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "job not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete job with id " + req.params.id
            });
        });
};

//next db apply
exports.applyjobs = (req, res) => {
    // var status_flag = jobenum.jobstatus.applied;
    if (!req.body) {
        return res.send({ message: "Cannot be empty" });
    }
    else {
        const data = new my_model.c({
            user_id: req.body.user_id,
            job_id: req.body.job_id,
            company_name: req.body.company_name,
            job_designation: req.body.job_designation,
            city: req.body.location,
          
        })
        data.save((err, respo) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(respo);
            }
        })
    }
}
exports.findAll = (req, res) => {
    my_model.c.find(
      { company_name: req.params.companyname },
      (err, data) => {
        if (err) {
          console.log(err)
        } else {
          res.send(data)
        }
      }
    )
  }

exports.find_applies = (req, res) => {
    my_model.c.find({ 'user_id': req.params.user_id }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
}