MenuFooter();

function OpenPopMenu() {
  var xLine = "";

    xLine += '<div style="margin:20px 0 20px 0; height: 50px;">';
    xLine += '<div class="container" style="width:100%;padding:5px;height:50px;">';
    xLine += '<div style="width:95px;float: left;text-align: center;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img" style="margin-top:-10px;"></div>';
    xLine += '<div class="Profile-title"><b>'+ sessionStorage.getItem("EmpName") +'</b><br>'+ sessionStorage.getItem("LineName") +'</div>';
    xLine += '</div></div><div class="clr"></div>';
    xLine += '<div style="height: 70px;background-color: #ff0000; width:100%; padding-top:10px;">';
    xLine += '<div style="max-width:180px; height: 50px; margin:auto; width:100%;">';
    xLine += '<div style="width:30%; float: left; text-align: center;height: 50px; margin-right:3%;"><img src="./img/coin.png" style="width:50px;"></div>';
    xLine += '<div style="width:67%; float: right; text-align: left; padding-left:10px; height: 50px; font-size:20px; color:#fff; padding-top:5px;"><b>'+ addCommas(sessionStorage.getItem("ThisPoint")) +'</b><div style="font-size:12px;margin-top:-8px;color:#fff;"><b>PRU Point</b></div></div>';
    xLine += '</div>';
    xLine += '</div><div class="clr" style="height:3px;"></div>';


    xLine += '<div class="clr"></div>';
    xLine += '<div style="max-width:270px; margin:10px auto 15px 25px; width:100%;">';
    xLine += '<div class="clr" style="height: 25px;"></div>';
    xLine += '<div class="icon-left"><img src="./img/icon-04.png"></div>';
    xLine += '<div class="icon-right" onclick="ClickLink(1)">แลกของรางวัล<div class="icon-text">ทุก ๆ การขาย BA Life คุณจะได้รับ PRU Point และสะสมไว้แลกรางวัลจากเราได้ที่นี่</div></div>';
    xLine += '<div class="icon-left"><img src="./img/icon-13.png"></div>';
    xLine += '<div class="icon-right" onclick="ClickLink(2)">แคมเปญของเรา<div class="icon-text">คุณสามารถอ่านรายละเอียดเกี่ยวกับวิธีการได้มาซึ่ง PRU Point เพิ่มที่จะได้นำ Point มาแลกเป็นของรางวัล</div></div>';
    xLine += '<div class="icon-left"><img src="./img/icon-11.png"></div>';
    xLine += '<div class="icon-right" onclick="ClickLink(3)">ติดต่อเรา<div class="icon-text">หากคุณต้องการคำปรึกษา มีข้อแนะนำ/ข้อเสนอแนะต่าง ๆ สามารถใช้ช่องทางนี้เพื่อการติดต่อสื่อสารได้</div></div>';
    xLine += '<div class="clr"></div>';
    xLine += '</div>';

    xLine += '<div class="clr" style="height:10px;"></div>';
    xLine += '<center><div class="btn-t2" onclick="CloseMenu()">Close Menu</div></center>';
    xLine += '<div class="clr" style="height:30px;"> </div>';
    $("#MenuSociety").html(xLine); 
    document.getElementById('menu').style.display='block';
  
}



function MyPoint() {
  var xLine = "";
  var yLine = "";
  var zLine = "";
  yLine += '<div style="margin:10px 0 20px 0;">';
  yLine += '<div class="container" style="width:90%;padding:5px; max-width:450px;">';
  yLine += '<div style="width:95px;float: left;text-align: center;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img"></div>';
  yLine += '<div class="Profile-title"><b>'+ sessionStorage.getItem("EmpName_Society") +'</b><br>LineName : '+ sessionStorage.getItem("LineName") +'<br>Phone : '+ sessionStorage.getItem("EmpPhone_Society") +'</div>';
  yLine += '</div></div><div class="clr"></div>';
  $("#DisplayMember").html(yLine);  

  zLine += '<div style="height: 70px;background-color: #c2dfef; width:100%; max-width:450px; margin:auto;">';
  zLine += '<div class="box-reward1"> </div>';
  zLine += '<div class="box-reward"><div class="XPpoint">'+ parseFloat(sessionStorage.getItem("Level_Point")).toFixed(0) +'</div>ระดับ<br>ผู้แข่งขัน</div>';
  zLine += '<div class="box-reward"><div class="XPpoint">'+ parseFloat(sessionStorage.getItem("XP_Point")).toFixed(2) +'</div>คะแนน<br>ประสบการณ์</div>';
  zLine += '<div class="box-reward"><div class="XPpoint">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(2) +'</div>เหรียญ<br>แลกรางวัล</div>';
  zLine += '<div class="clr" style="height:3px;"></div>'
  var xRatio = (parseFloat(sessionStorage.getItem("XP_Point"))/parseFloat(xCal))*100;
  zLine += '<div class="progress2" style="width:'+ xRatio +'%;"></div>';
  zLine += '<div class="clr"style="height:30px;"></div>';
  zLine += '<div class="clr" style="height:40px;"></div></div>';
  $("#DisplayMyPoint").html(zLine);  


  xLine += '<div style="margin: -25px auto 20px auto; width: 100%; min-height:50px; max-width: 450px;">';
  xLine += '<div style="width:73%; float: left;">';
  xLine += '<div style="width:100%;"><div style="width:32%;float: left; text-align: center;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img"></div>';
  xLine += '<div class="Profile-title" style="padding-top:5px;"><b>'+ sessionStorage.getItem("EmpName_Society") +'</b><br>LineName : '+ sessionStorage.getItem("LineName") +'<br>Phone : '+ sessionStorage.getItem("EmpPhone_Society") +'</div>';
  xLine += '</div></div>';
  xLine += '<div style="width:24%; float: left; background-color :#c0d8fc; height:50px; text-align: center; border-radius: 8px;">';
  xLine += '<div class="box-reward" style="width:100%; padding-top:4px; font-size: 10px;"><div class="XPpoint">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(2) +'</div>เหรียญรางวัล</div>';

  //xLine += '</div>';
  xLine += '</div>';
  xLine += '';
  xLine += '';
  xLine += '';
  $("#DisplayRPPoint").html(xLine);  



}



function MenuFooter() {
  var str = "";
  str += '<div class="footer-top"><div class="container">';
  str += '<div class="row"><div class="col-lg-4 col-md-6 footer-newsletter">';
  //str += '<div class="font13" style="color:#ffffff;"><b>เมนูสำหรับเลือกใช้งาน</b></div>';
  //str += '<p>ไม่ว่าจะเป็นเรื่องที่ต้องการความช่วยเหลือ หรือการสนับสนุนจากผู้บริหาร คุณสามารถส่งเรื่องราวของคุณที่นี่</p>';

  str += '<div style="margin-top:0px;">';

  str += '<div class="menu-box1" onclick="window.location.href=\'home.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icon-01.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">หน้าแรก</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'rewards.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icon-04.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">แลกรางวัล</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'promotion.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icon-13.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">แคมเปญ</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'contact.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icon-11.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">ติดต่อเรา</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'telfriend.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icon-friends.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">บอกเพื่อน</div></div>';
  str += '</div>';


  //str += '<form action="" method="post"><input type="email" name="email"><input type="submit" value="ส่งเรื่องราว">';
  //str += '</form></div></div></div></div>';
  str += '</div></div></div></div>';
  str += '<div class="container d-md-flex py-4"><div class="mr-md-auto text-center text-md-left">';
  str += '<div class="copyright">@<span>LINE Retail Society</span></div></div></div>';
  $("#DisplayFooter").html(str);  
}






function ClickLink(x) {
  if(x==1) {
    location.href = "rewards.html";
  } else if(x==2) { 
    location.href = "promotion.html";
  } else if(x==3) { 
    location.href = "contact.html";
  }
}


function numberWithCommas(num) {
  var valueString=num; //can be 1500.0 or 1500.00 
  var amount=parseFloat(valueString).toFixed(2);
  return formattedString= amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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





function CloseMenu() {
  document.getElementById('menu').style.display='none';
}

