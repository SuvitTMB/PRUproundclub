var i = 0;
var EidProfile = "";
var dateString = "";
var xProduct = "BALife";
var CheckFoundData = 0;



$(document).ready(function () {

/*
  sessionStorage.clear(); 
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
*/
  main();

});



async function main() {
  await liff.init({ liffId: "1657509542-xzVB4wyX" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  Connect_DB();
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbSellerCampaign = firebase.firestore().collection("SellerCampaign");
  dbPRUredeemPoint = firebase.firestore().collection("PRUredeempoint");
  dbPRUmember_log = firebase.firestore().collection("PRUmember_log");
  CheckData();
}


function CheckData() {

  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = 1;
      if(doc.data().statusconfirm==1) {
        EidProfile = doc.id;
        //sessionStorage.setItem("EmpID_PRU", doc.data().empID);
        sessionStorage.setItem("EmpID_PRU", "82301");
        sessionStorage.setItem("EmpName_PRU", doc.data().empName);
        CheckMember();
      } else {
	alert("111"+sessionStorage.getItem("LineID")+"\n"+sessionStorage.getItem("LineName")+"\n"+sessionStorage.getItem("LinePicture"));
        //location.href = "https://liff.line.me/1655966947-KxrAqdyp";
      }
    });
    if(CheckFoundData==0) {
	alert("222"+sessionStorage.getItem("LineID")+"\n"+sessionStorage.getItem("LineName")+"\n"+sessionStorage.getItem("LinePicture"));
      //location.href = "https://liff.line.me/1655966947-KxrAqdyp"; 
    }
  });

}


var EidUpdateLogin = "";
var CountLogin = 0;
var CheckFound = 0;
function CheckMember() {
  //console.log(sessionStorage.getItem("EmpID_Seller")+"==="+sessionStorage.getItem("EmpName_Seller"));
  //dbPRUmember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID_PRU")))
  dbSellerCampaign.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID_PRU")))
  .where('Product','==',xProduct)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFound = 1;
      UpdatePorfile();
      SaveBA_Log();
      CheckNewRedeemPoint();
      document.getElementById('loading').style.display='none';
      document.getElementById('OldSurvey').style.display='block';
    });
    console.log(CheckFound);
    if(CheckFound==0) {
      document.getElementById('loading').style.display='none';
      document.getElementById('NoService').style.display='block';
    }
  });
}


function UpdatePorfile() {
    dbProfile.doc(EidProfile).update({
      empPicture : sessionStorage.getItem("LinePicture"),
      linename : sessionStorage.getItem("LineName")
    });
}


function SaveBA_Log() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbPRUmember_log.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_PRU"),
    EmpName : sessionStorage.getItem("EmpName_PRU"),
    PageVisit : "PRU Pround",
    LogDateTime : dateString,
    LogTimeStamp : TimeStampDate
  });
}


var sCheckTNIapprove = 0;
function CheckNewRedeemPoint() {
  dbPRUredeemPoint.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID_PRU")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckTNIapprove = 1;
      sessionStorage.setItem("TotalPointRedeem", doc.data().TotalPointRedeem);
      sessionStorage.setItem("TotalItemRedeem", doc.data().TotalItemRedeem);
    });
    if(sCheckTNIapprove==0) {
      dbPRUredeemPoint.add({
        EmpID : parseFloat(sessionStorage.getItem("EmpID_PRU")),
        TotalPointRedeem : 0,
        TotalItemRedeem : 0,
        DateRedeem : ''
      });
      sessionStorage.setItem("TotalPointRedeem", 0);
      sessionStorage.setItem("TotalItemRedeem", 0);
    }
  });
}




function DisplayQRCode() {
  document.getElementById('id03').style.display='block';
}


function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}


function GotoWeb() {
  window.location.href = 'home.html';
}


function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}

function CloseAll() {
  //document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
}

