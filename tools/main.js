

window.onload = load;


// �萔
var SCREEN_WIDTH	= 40;
var SCREEN_HEIGHT	= 20;

var MAIN_OBJ_RNO_0_INIT	= 0;
var MAIN_OBJ_RNO_0_MAIN	= 1;


// �O���[�o���ϐ�
var gMainObj	= null;
var gCharObjs	= null;
var gScreenData	= [];



/*=========================================
	�R���e���c�N�����ɌĂ΂��֐�
*=========================================*/
function load() {

	// text�{�b�N�X����ׂăh�b�g�X�N���[�����쐬����
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
		
		// SCREEN_WIDTH���ׂ�����s����
		if(i%SCREEN_WIDTH == (SCREEN_WIDTH-1)){
			tempDomObj = document.createElement('br');
			form.appendChild( tempDomObj );
		}
	}

	gMainObj	= new MainObject();

	setTimeout(Loop, 100);
}


/*=========================================
	���t���[���Ă΂��֐�
*=========================================*/
function Loop() {
//	document.getElementById("area1").innerText = tempOutput;

	gMainObj.MainLoop();

	// 0.1�b��ɍēxLoop���Ăяo��
	setTimeout(Loop, 100);
}



/*=========================================
	������
*=========================================*/
MainObject	= function(){

	this.Hoge	= 123;
	
	this.Rno0	= 0;
	this.Rno1	= 0;
	this.Rno2	= 0;


	// ������������
	this.ChangeRno0( MAIN_OBJ_RNO_0_INIT );
};

/*=========================================
	���t���[���Ă΂�鏈��
*=========================================*/
MainObject.prototype.MainLoop = function(  ) {
	
	switch( this.Rno0 ){
		case MAIN_OBJ_RNO_0_INIT: this.Rno0_Init();	break;
		case MAIN_OBJ_RNO_0_MAIN: this.Rno0_Main();	break;
	}
	
};


/*=========================================
	�������֘A
*=========================================*/
MainObject.prototype.Rno0_Init = function(  ) {
	// �����������
	for(var i=0; i<SCREEN_HEIGHT; i++){
		gScreenData[i]	= [];
		for(var j=0; j<SCREEN_WIDTH; j++){
			gScreenData[i][j]	= 0;
		}
	}

	gCharObjs	= new Array();
	gCharObjs.push( new CharaObject("piyo", 40, 0, -0.7, 0) );
	gCharObjs.push( new CharaObject("hoge", 60, 10, -0.7, -0.1) );

	// ���̏�����
	this.ChangeRno0( MAIN_OBJ_RNO_0_MAIN );
};

/*=========================================

*=========================================*/
MainObject.prototype.Rno0_Main = function(  ) {

	for(var i=0; i<gCharObjs.length; i++){
		gCharObjs[i].pUpdateCharaPos();
	}
	this.DrawScreen();
	
};

/*=========================================
�X�N���[����Ƀh�b�g�I�u�W�F�N�g��`��
*=========================================*/
MainObject.prototype.DrawScreen = function(  ) {

	// �܂��A�X�N���[���f�[�^���N���A����
	for(var i=0; i<gScreenData.length; i++){
		for( var j=0; j<gScreenData[i].length; j++){
			gScreenData[i][j]	= 0;
		}
	}

	// �X�N���[���f�[�^���Ǘ����Ă���z��̍X�V
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

	// �X�N���[���f�[�^�z������ɁAHTML�ɕ`��
	var ScreenDots = document.getElementById("ScreenDots");
	var tempCounter	= 0;
	var tempString	= "";
	for(var i=0; i<gScreenData.length; i++){
		for( var j=0; j<gScreenData[i].length; j++){
			tempStrig	=  "ScreenDots.text" + tempCounter + ".value	=''; "
			if(gScreenData[i][j] == 1){
				tempStrig	=  "ScreenDots.text" + tempCounter + ".value	='��'; "
			}
			eval(tempStrig);
			tempCounter++;
		}
	}
}


/*=========================================
���C��������ύX����
*=========================================*/
MainObject.prototype.ChangeRno0 = function( _Rno0 ) {
	this.Rno0	= _Rno0;
	this.Rno1	= 0;
	this.Rno2	= 0;
};




