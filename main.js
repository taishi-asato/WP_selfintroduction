window.onload = load;

var SCREEN_WIDTH	= 40;
var SCREEN_HEIGHT	= 20;
var tempCounter	= 0;


var gMainObj	= null;
var gCharObjs	= null;
var gScreenData	= [];



/*=========================================
	コンテンツ起動時に呼ばれる関数
*=========================================*/
function load() {

	// textボックスを並べてドットスクリーンを作成する
	var ScreenPlace = document.getElementById("ScreenPlace");
	var form = document.createElement('form');
	form.setAttribute('id', 'ScreenDots' );
	console.log(form);
	ScreenPlace.appendChild(form);

	var DotsNum		= SCREEN_WIDTH * SCREEN_HEIGHT;
	var tempArray	= new Array( DotsNum );
	var tempDomObj	= null;
	var inputFormName	= "";
	for(var i= 0; i<DotsNum; i++){
		inputFormName	= "text" + i;
		console.log("inputFormName..." +inputFormName);
		tempDomObj = document.createElement('input');
		tempDomObj.setAttribute('type', 'text' );
		tempDomObj.setAttribute('name', inputFormName );
		tempDomObj.setAttribute('value' , "");
		tempDomObj.setAttribute("class","hoge");
		tempArray[i]	= tempDomObj;
		form.appendChild(	tempArray[i]);
		
		// SCREEN_WIDTH個並べたら改行する
		if(i%SCREEN_WIDTH == (SCREEN_WIDTH-1)){
			tempDomObj = document.createElement('br');
			form.appendChild( tempDomObj );
		}
	}

	gMainObj	= new MainObject();

	setTimeout(Loop, 100);
}


/*=========================================
	毎フレーム呼ばれる関数
*=========================================*/
function Loop() {
	tempCounter++;
	var tempOutput	= String(tempCounter );
	document.getElementById("area1").innerText = tempOutput;

	gMainObj.MainLoop();

	setTimeout(Loop, 100);
}


/*=========================================
	あああ
*=========================================*/
var MAIN_OBJ_RNO_0_INIT	= 0;
var MAIN_OBJ_RNO_0_MAIN	= 1;

/*=========================================
	あああ
*=========================================*/
MainObject	= function(){

	this.Hoge	= 123;
	
	this.Rno0	= 0;
	this.Rno1	= 0;
	this.Rno2	= 0;

};

/*=========================================
	あああ
*=========================================*/
MainObject.prototype.MainLoop = function(  ) {
	
	switch( this.Rno0 ){
		case MAIN_OBJ_RNO_0_INIT: this.Rno0_Init();	break;
		case MAIN_OBJ_RNO_0_MAIN: this.Rno0_Main();	break;
	}
	
};


/*=========================================
	あああ
*=========================================*/
MainObject.prototype.Rno0_Init = function(  ) {
	// 初期化あれば
	for(var i=0; i<SCREEN_HEIGHT; i++){
		gScreenData[i]	= [];
		for(var j=0; j<SCREEN_WIDTH; j++){
			gScreenData[i][j]	= 0;
		}
	}

	gCharObjs	= new Array();
	gCharObjs.push( new CharaObject("piyo", 40, 0) );
	gCharObjs.push( new CharaObject("hoge", 60, 10) );

	// 次の処理へ
	this.ChangeRno0( MAIN_OBJ_RNO_0_MAIN );
};

/*=========================================
	あああ
*=========================================*/
MainObject.prototype.Rno0_Main = function(  ) {

	// メイン処理
	for(var i=0; i<gCharObjs.length; i++){
		gCharObjs[i].pUpdateCharaPos();
	}
	this.DrawScreen();
	
};

MainObject.prototype.DrawScreen = function(  ) {


	for(var i=0; i<gScreenData.length; i++){
		for( var j=0; j<gScreenData[i].length; j++){
			gScreenData[i][j]	= 0;
		}
	}

	var CharaDotData	= null;
	var OffsetX	= 0;
	var OffsetY	= 0;
	for( var i=0; i<gCharObjs.length; i++){
		CharaDotData	= gCharObjs[i].Dotsdata;
		for( var j=0; j<CharaDotData.length; j++){
			for( var k=0; k<CharaDotData[j].length; k++){
				OffsetX	= gCharObjs[i].PosX_Floor + k;
				OffsetY	= gCharObjs[i].PosY_Floor + j;
				if( OffsetX >=0 &&  OffsetX < SCREEN_WIDTH && OffsetY >=0 &&  OffsetY < SCREEN_HEIGHT){
					console.log("OffsetX..." +OffsetX + " j..." +j +"  k..." +k);
					gScreenData[OffsetY][OffsetX]	= CharaDotData[j][k];
				}

			}
		}
	}

	
	// 借り
//	this.ChangeRno0( 5 );
	console.log("gScreenData...\n" +gScreenData);


	var ScreenDots = document.getElementById("ScreenDots");
	var tempCounter	= 0;
	var tempString	= "";
	for(var i=0; i<gScreenData.length; i++){
		for( var j=0; j<gScreenData[i].length; j++){
			tempStrig	=  "ScreenDots.text" + tempCounter + ".value	=''; "
			if(gScreenData[i][j] == 1){
				tempStrig	=  "ScreenDots.text" + tempCounter + ".value	='■'; "
//				console.log("i...."+i +"  j..." +j +"tempCounter..." +tempCounter);
			}
//			console.log("tempStrig  " +tempCounter)
			eval(tempStrig);
			tempCounter++;
		}
	}

}


MainObject.prototype.ChangeRno0 = function( _Rno0 ) {
	this.Rno0	= _Rno0;
	this.Rno1	= 0;
	this.Rno2	= 0;
};




