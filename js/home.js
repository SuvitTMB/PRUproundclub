var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var xCodeDate = "SellerCampaign";
var xProduct = "BALife";

$(document).ready(function () {
  var str ="";
  if(sessionStorage.getItem("EmpID_PRU")==null) { location.href = "index.html"; }
  if(sessionStorage.getItem("News")==null) {
    document.getElementById('id01').style.display='block';
    sessionStorage.setItem("News", "PRU Pound Point");
  }
  //str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  //str += '<div class="NameLine" style="color:#111; font-weight: 600;">'+ sessionStorage.getItem("EmpName_Seller")+'</div>';
  //$("#MyProfile").html(str);  
  Connect_DB();
  //dbPRUmember = firebase.firestore().collection("PRUmember");
  dbSellerCampaign = firebase.firestore().collection("SellerCampaign");
  dbPRURedeemPoint = firebase.firestore().collection("PRUredeempoint");
  dbSellerDate = firebase.firestore().collection("TNIdate");
  CheckDate();
});


function CheckDate() {
  var str = "";
  dbSellerDate.where('CodeName','==',xCodeDate)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sessionStorage.setItem("DataUpDate", doc.data().DateUpload);
    });
    CheckRedeemPoint();
    CheckMyPoint();
  });
}


function CheckRedeemPoint() {
  var xPointRedeem = 0;
  var xItemRedeem = 0;
  dbPRURedeemPoint.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID_PRU")))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xPointRedeem = xPointRedeem + parseFloat(doc.data().TotalPointRedeem);
      xItemRedeem = xItemRedeem + parseFloat(doc.data().TotalItemRedeem);
    });
    sessionStorage.setItem("TotalPointRedeem", xPointRedeem);
    sessionStorage.setItem("TotalItemRedeem", xItemRedeem);
  });
}


function CheckMyPoint() {
  var str = "";
  dbSellerCampaign.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID_PRU")))
  .where('Product','==',xProduct)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sessionStorage.setItem("EmpName", doc.data().EmpName);
      sessionStorage.setItem("EmpPosition", doc.data().EmpPosition);
      sessionStorage.setItem("YearAPE", doc.data().YearAPE);
      sessionStorage.setItem("YearPoint", doc.data().YearPoint);
      console.log(doc.data().YearPoint+"==="+sessionStorage.getItem("TotalPointRedeem"));
      sActivePoint = parseFloat(doc.data().YearPoint)-parseFloat(sessionStorage.getItem("TotalPointRedeem"));
      //sActivePoint = parseFloat(250000)-parseFloat(sessionStorage.getItem("TotalPointRedeem"));
      sessionStorage.setItem("ThisPoint", sActivePoint.toFixed(2));
      sessionStorage.setItem("ActivePoint", sActivePoint);
      str += '<center>';
      str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" style="margin:-70px auto 20px auto;"></div>';
      str += '<div style="color:#002d63; font-size: 14px; font-weight: 600;"><center>'+ sessionStorage.getItem("EmpName")+'</div>';
      str += '<div style="color:#0056ff; font-size: 14px;padding:2px;font-weight: 600;line-height: 1.3;margin-bottom: 10px;">'+ sessionStorage.getItem("EmpPosition")+'</div>';
      str += '<div style="font-size: 14px; color:#f68b1f; margin:25px auto 5px auto;font-weight: 600;">PRU Point สะสมคงเหลือ<br><font color="#002d63"><b>ข้อมูล ณ วันที่ '+ sessionStorage.getItem("DataUpDate") +'</b></font></div>';
      str += '<div class="clr"></div>';
      str += '<div style="margin-bottom:30px;"><img src="./img/coin.png" style="width:50px;"></div>';
      str += '<div class="border-timer-red" style="margin-top:-55px;">';
      str += ''+ addCommas(sessionStorage.getItem("ThisPoint"))+'</div>';
      str += '<div class="clr"></div>';
      //str += '<div style="font-size: 14px; color:#f68b1f; margin:25px auto 5px auto;font-weight: 600;">Point ที่คุณสามารถนำไปแลกเป็นของรางวัล<br>ตามความต้องการของคุณได้</div>';
      str += '<div class="btn-blue" style="margin-top:35px;" onclick="GotoRewards()">';
      str += '<div style="font-size: 13px; font-weight: 600;">คลิก เพื่อแลกของรางวัล</div></div>';
      //str += '<div style="font-size: 14px; font-weight: 600;">'+ addCommas(sessionStorage.getItem("ActivePoint"))+' Point</div></div>';
      str += '<div style="color:#888888; font-weight: 14px;margin:10px auto;">คลิกเพื่อไปแลกรางวัลกันเลย</div>';
      str += '<div class="clr" style="height: 20px;"></div>';
      str += '</center>';
    });
    $("#MyProfile").html(str);  
    document.getElementById('loading').style.display='none';
  });
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

function numberWithCommas(num) {
  var valueString=num; //can be 1500.0 or 1500.00 
  var amount=parseFloat(valueString).toFixed(2);
  return formattedString= amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function GotoRewards() {
  location.href = "rewards.html";
}

function CloseAll() {
  document.getElementById('id01').style.display='none';
}


