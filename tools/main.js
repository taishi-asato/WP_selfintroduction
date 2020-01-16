

window.onload = load;


// 定数
var SCREEN_WIDTH	= 16;
var SCREEN_HEIGHT	= 16;

var MAIN_OBJ_RNO_0_INIT	= 0;
var MAIN_OBJ_RNO_0_MAIN	= 1;


// グローバル変数
var gMainObj	= null;
var gCharObjs	= null;
var gScreenData	= [];


/*=========================================
	HTML上のドットを配列データに変換して出力する
*=========================================*/
function OnButtonClick(){
//	■
	console.log("押されたよ！")
	
	var DotsNum		= SCREEN_WIDTH * SCREEN_HEIGHT;
	var ScreenDots = document.getElementById("ScreenDots");
	var tempCounter	= 0;
	var tempString	= "";
	var TextBoxValue	= "";

	var tempArray	= [];

	// テキストボックスの中身が■になっているやつを覚える
	for( var i=0; i<DotsNum; i++){
		tempStrig	=  "ScreenDots.text" + i + ".value";
		TextBoxValue	= eval(tempStrig);
		if( TextBoxValue == "■"){
			tempArray.push(i);
		}
	}

	
	// データ出力用の配列の準備
	var OutputScreenData	= [];
	for(var i=0; i<SCREEN_HEIGHT; i++){
		OutputScreenData[i]	= [];
		for(var j=0; j<SCREEN_WIDTH; j++){
			OutputScreenData[i][j]	= 0;
		}
	}

	// 出力する
	var indexX = 0;
	var indexY	= 0;
	for( var i=0; i<tempArray.length; i++){
		indexX	= tempArray[i] % SCREEN_WIDTH;
		indexY	= Math.floor(tempArray[i] / SCREEN_WIDTH );
		console.log("x..." +indexX + "  y..." +indexY );
		OutputScreenData[indexY][indexX]	= 1;
	}


	console.log( OutputScreenData );
}




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
//	document.getElementById("area1").innerText = tempOutput;

	gMainObj.MainLoop();

	// 0.1秒後に再度Loopを呼び出す
	setTimeout(Loop, 100);
}



/*=========================================
	あああ
*=========================================*/
MainObject	= function(){


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
		case MAIN_OBJ_RNO_0_MAIN: this.Rno0_Main();	break;
	}
	
};


/*=========================================
	初期化関連
*=========================================*/
MainObject.prototype.Rno0_Init = function(  ) {
	// 初期化あれば
	for(var i=0; i<SCREEN_HEIGHT; i++){
		gScreenData[i]	= [];
		for(var j=0; j<SCREEN_WIDTH; j++){
			gScreenData[i][j]	= 0;
		}
	}

	// 次の処理へ
	this.ChangeRno0( MAIN_OBJ_RNO_0_MAIN );
};

/*=========================================

*=========================================*/
MainObject.prototype.Rno0_Main = function(  ) {

	// 特に何もしない

};


/*=========================================
メイン処理を変更する
*=========================================*/
MainObject.prototype.ChangeRno0 = function( _Rno0 ) {
	this.Rno0	= _Rno0;
	this.Rno1	= 0;
	this.Rno2	= 0;
};




/*
安

0: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
1: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
2: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
3: (16) [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
4: (16) [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
5: (16) [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
6: (16) [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
7: (16) [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
8: (16) [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
9: (16) [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
10: (16) [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
11: (16) [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
12: (16) [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
13: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
14: (16) [0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
15: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


里
0: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
1: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
2: (16) [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
3: (16) [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0]
4: (16) [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
5: (16) [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0]
6: (16) [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0]
7: (16) [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
8: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
9: (16) [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
10: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
11: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
12: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
13: (16) [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
14: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
15: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


大
0: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
1: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
2: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
3: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
4: (16) [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
5: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
6: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
7: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
8: (16) [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
9: (16) [0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0]
10: (16) [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
11: (16) [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0]
12: (16) [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0]
13: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
14: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
15: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

志
0: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
1: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
2: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
3: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
4: (16) [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
5: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
6: (16) [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
7: (16) [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
8: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
9: (16) [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0]
10: (16) [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0]
11: (16) [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
12: (16) [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0]
13: (16) [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]
14: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
15: (16) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
*/

