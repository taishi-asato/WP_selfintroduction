
// 最初に呼ばれる関数
window.onload = load;

//=================================
// 定数
//=================================
var SCREEN_WIDTH	= 40;
var SCREEN_HEIGHT	= 20;

var MAIN_OBJ_RNO_0_INIT	= 0;
var MAIN_OBJ_RNO_0_WAIT	= 1;
var MAIN_OBJ_RNO_0_MAIN	= 2;



//=================================
// グローバル変数
//=================================
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
//	console.log(form);
	ScreenPlace.appendChild(form);

	var DotsNum		= SCREEN_WIDTH * SCREEN_HEIGHT;
	var tempArray	= new Array( DotsNum );
	var tempDomObj	= null;
	var inputFormName	= "";
	for(var i= 0; i<DotsNum; i++){
		inputFormName	= "text" + i;
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

	// Loop関数を起動する
	setTimeout(Loop, 100);
}


/*=========================================
	毎フレーム呼ばれる関数
*=========================================*/
function Loop() {
	gMainObj.MainLoop();

	// 0.1秒後に再度Loopを呼び出す
	setTimeout(Loop, 100);
}



/*=========================================
	あああ
*=========================================*/
MainObject	= function(){

	// 処理の分岐を制御するパラメータ
	this.Rno0	= 0;
	this.Rno1	= 0;
	this.Rno2	= 0;


	// 初期化処理へ
	this.ChangeRno0( MAIN_OBJ_RNO_0_INIT );
};

/*=========================================
	毎フレーム呼ばれる処理
*=========================================*/
MainObject.prototype.MainLoop = function(  ) {
	
	switch( this.Rno0 ){
		case MAIN_OBJ_RNO_0_INIT: this.Rno0_Init();	break;
		case MAIN_OBJ_RNO_0_WAIT: this.Rno0_Wait();	break;
		case MAIN_OBJ_RNO_0_MAIN: this.Rno0_Main();	break;
	}
	
};


/*=========================================
	初期化関連
*=========================================*/
MainObject.prototype.Rno0_Init = function(  ) {

	// スクリーンをgScreenData配列で表現する。gScreenDataの初期化処理。
	for(var i=0; i<SCREEN_HEIGHT; i++){
		gScreenData[i]	= [];
		for(var j=0; j<SCREEN_WIDTH; j++){
			gScreenData[i][j]	= 0;
		}
	}

	// スクリーンに表示する文字データを管理する配列
	gCharObjs	= new Array();

	// 次の処理へ 
	this.ChangeRno0( MAIN_OBJ_RNO_0_WAIT );
};

/*=========================================
	「名前」ボタン押されるのまち
*=========================================*/
MainObject.prototype.Rno0_Wait = function(  ) {
	// ボタン押されるのまち

}

/*=========================================
	「名前」ボタン押されたあとのループ処理
*=========================================*/
MainObject.prototype.Rno0_Main = function(  ) {

	// 文字データの位置更新
	for(var i=0; i<gCharObjs.length; i++){
		gCharObjs[i].pUpdateCharaPos();
	}
	
	// 描画処理
	this.DrawScreen();
	
};

/*=========================================
スクリーン上にドットを描画
*=========================================*/
MainObject.prototype.DrawScreen = function(  ) {

	// まず、スクリーンデータをクリアする
	for(var i=0; i<gScreenData.length; i++){
		for( var j=0; j<gScreenData[i].length; j++){
			gScreenData[i][j]	= 0;
		}
	}

	// 文字データの位置座標を元に、スクリーンデータを管理している配列を更新する
	var CharaDotData	= null;
	var ScreenPosX	= 0;
	var ScreenPosY	= 0;
	for( var i=0; i<gCharObjs.length; i++){
		CharaDotData	= gCharObjs[i].Dotsdata;
		for( var j=0; j<CharaDotData.length; j++){
			for( var k=0; k<CharaDotData[j].length; k++){
				ScreenPosX	= gCharObjs[i].PosX_Floor + k;
				ScreenPosY	= gCharObjs[i].PosY_Floor + j;
				if( ScreenPosX >=0 &&  ScreenPosX < SCREEN_WIDTH && ScreenPosY >=0 &&  ScreenPosY < SCREEN_HEIGHT){
//					console.log("ScreenPosX..." +ScreenPosX + " j..." +j +"  k..." +k);
					gScreenData[ScreenPosY][ScreenPosX]	= CharaDotData[j][k];
				}
			}
		}
	}

	// スクリーンデータ配列を元に、HTMLに描画
	var ScreenDots = document.getElementById("ScreenDots");
	var tempCounter	= 0;
	var tempString	= "";
	for(var i=0; i<gScreenData.length; i++){
		for( var j=0; j<gScreenData[i].length; j++){
			tempStrig	=  "ScreenDots.text" + tempCounter + ".value	=''; "
			if(gScreenData[i][j] == 1){
				tempStrig	=  "ScreenDots.text" + tempCounter + ".value	='■'; "
			}
			eval(tempStrig);
			tempCounter++;
		}
	}
}

/*=========================================
メイン処理を変更する
*=========================================*/
MainObject.prototype.ChangeRno0 = function( _Rno0 ) {
	this.Rno0	= _Rno0;
	this.Rno1	= 0;
	this.Rno2	= 0;
};


/*=========================================
	ボタンクリック時に呼ばれる関数たち
*=========================================*/
function OnButtonClick_ShowMyName(){
	gCharObjs	= [];
	gCharObjs.push( new CharaObject("AN", 40, 0, -1, 0) );
	gCharObjs.push( new CharaObject("SATO", 55, 0, -1, 0) );
	gCharObjs.push( new CharaObject("TAI", 70, 0, -1, 0) );
	gCharObjs.push( new CharaObject("SHI", 85, 0, -1, 0) );

	gMainObj.ChangeRno0( MAIN_OBJ_RNO_0_MAIN );
};


/*=========================================
	方向ボタン押されたとき
*=========================================*/
function OnButtonClick_Accelerate( _Direction ){

	var AddSpdX	= 0;
	var AddSpdY	= 0;

	switch( _Direction ){
		case "left":	AddSpdX = -0.5;	break;
		case "right":	AddSpdX = 0.5;	break;
		case "up":		AddSpdY = 0.5;	break;
		case "down":	AddSpdY = -0.5;	break;
	}

	for(var i=0; i<gCharObjs.length; i++){
		gCharObjs[i].pAddSpeed( AddSpdX, AddSpdY );
	}
};

/*=========================================
	止めるボタン押されたとき
*=========================================*/
function OnButtonClick_StopCharas( ){

	for(var i=0; i<gCharObjs.length; i++){
		gCharObjs[i].pSetSpeedValueZero();
	}
};

