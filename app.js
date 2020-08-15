const express = require("express")
const path=require('path');
const fs = require("fs");
const app =express();
const port =80;

// Express Specific stuff
app.use('/static',express.static('static'))//For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine','pug');// set the views directory 
app.set('views',path.join(__dirname,'views'))// set the views directory 

// our pug demo endpoint
app.get('/',(req,res)=>{
    const con="This is our gym website with backend"
    const params = {'title':'MyGymsite','content':con}
    res.status(200).render('index.pug',params);
})
app.post('/',(req,res)=>{
    // console.log(req.body);
    name=req.body.name
    gender=req.body.gender
    dob=req.body.dob
    address=req.body.address
    more=req.body.more
    let outputTowrite=`The Name of customer is  ${name}, ${gender} His/Her DOB :${dob}. residing at ${address}.More about him/her ${more}`
    fs.writeFileSync('gymContactform.txt',outputTowrite)


    const params={'message':'Your Form has been Submited Succesfully '}
    res.status(200).render('index.pug',params);

})

// START The SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
})