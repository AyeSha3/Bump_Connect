
var createStatement = "CREATE TABLE IF NOT EXISTS tblReg(id INTEGER PRIMARY KEY AUTOINCREMENT, UNAME TEXT, EMAIL TEXT, PASSWORD TEXT)";

var insertStatement = "INSERT INTO tblReg(UNAME, EMAIL, PASSWORD) VALUES (?,?,?)";

var db = openDatabase("HybridApp", "1.0", "Hybrid", 200000);
 
var selectfrmDB = "SELECT * FROM tblReg WHERE EMAIL = ? AND PASSWORD = ?";

// Function cal when page is ready
function initDatabase () {
	try {

		if(!window.openDatabase()) {
			alert ('Database not supported by the browser.');
		}

		else {
			createTable();
		}
	}

	catch (e) {
		if (e == 2) {

			console.log("Invalid database version.");
		}

		else {
			console.log("Unknown error" + e + ".");
		}
			return;
	}


}

function createTable () {
	db.transaction(function (tx) {
	 tx.executeSql(createStatement, [], onError);
	});
}


function insert () {

	var username = $('input:text[id=txtusername]').val();
	var email = $('input:text[id=txtemail]').val();
	var pass = $('input:text[id=txtpassword]').val();
	
	db.transaction(function (tx) {
		tx.executeSql(insertStatement, [username, email, pass], onError);

	});
	 setTimeout( location="login.html", 1000);
}

function onError(tx, error) // Function for Handeling Error...
 
{
 
    alert(error.message);
 
}


$(document).ready(function () {

	initDatabase();
	$("#submitButton").click(insert);
	$("#login").click(login);

});




function login(){
	
	var email = $('input:text[id=txtemail]').val()
	var pass = $('input:text[id=txtpassword]').val();

	db.transaction(function(tx){
		tx.executeSql(selectfrmDB, [email, pass], function(tx, results){
			if(results.rows.length>0){
				alert("Welcome to Bump Connect");
			
			location="home.html";

		}else {
			alert("incorrect email or password");
		}
		}, onError)
}	)
	}

















