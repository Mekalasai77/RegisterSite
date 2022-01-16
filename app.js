const express=require("express")
const body=require("body-parser")
const https=require("https")

const app=express()

app.use(express.static("public"));
app.use(body.urlencoded({extended:true}));

app.get("/", function(req,res){

    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req,res){
    const firstName=req.body.fName
    const lastName=req.body.lName
    const email=req.body.email

    
    const data={
    	members:[{
    		email_address:email,
    		status:"subscribed",
    		merge_fields:{
    			FNAME:firstName,
    			LNAME:lastName
    		}
    	}]
    }

const jsondata=JSON.stringify(data)
const url="https://us20.api.mailchimp.com/3.0/lists/737d37cac0";
const options={
	method:"POST",
	auth:":98a7d54bbb1792241e06969435a910c6-us20"
}
const request=https.request(url,options,function(response){

	if (response.statusCode === 200){
		res.sendFile(__dirname+"/success.html")
	}else{
		res.sendFile(__dirname+"/failure.html")
	}
	response.on("data",function(data){
		console.log(JSON.parse(data))
	})
})

request.write(jsondata)
request.end()
})
app.post("/failure",function(req,res){
res.redirect("/");	
})


app.listen(process.env.PORT || 3000,function(){
    console.log("server is up and running")
})
