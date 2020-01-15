

window.onload = load;


// �萔
var SCREEN_WIDTH	= 16;
var SCREEN_HEIGHT	= 16;

var MAIN_OBJ_RNO_0_INIT	= 0;
var MAIN_OBJ_RNO_0_MAIN	= 1;


// �O���[�o���ϐ�
var gMainObj	= null;
var gCharObjs	= null;
var gScreenData	= [];


/*=========================================
	HTML��̃h�b�g��z��f�[�^�ɕϊ����ďo�͂���
*=========================================*/
function OnButtonClick(){
//	��
	console.log("�����ꂽ��I")
	
	var DotsNum		= SCREEN_WIDTH * SCREEN_HEIGHT;
	var ScreenDots = document.getElementById("ScreenDots");
	var tempCounter	= 0;
	var tempString	= "";
	var TextBoxValue	= "";

	var tempArray	= [];

	// �e�L�X�g�{�b�N�X�̒��g�����ɂȂ��Ă������o����
	for( var i=0; i<DotsNum; i++){
		tempStrig	=  "ScreenDots.text" + i + ".value";
		TextBoxValue	= eval(tempStrig);
		if( TextBoxValue == "��"){
			tempArray.push(i);
		}
	}

	
	// �f�[�^�o�͗p�̔z��̏���
	var OutputScreenData	= [];
	for(var i=0; i<SCREEN_HEIGHT; i++){
		OutputScreenData[i]	= [];
		for(var j=0; j<SCREEN_WIDTH; j++){
			OutputScreenData[i][j]	= 0;
		}
	}

	// �o�͂���
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

	// ���̏�����
	this.ChangeRno0( MAIN_OBJ_RNO_0_MAIN );
};

/*=========================================

*=========================================*/
MainObject.prototype.Rno0_Main = function(  ) {

	// ���ɉ������Ȃ�

};


/*=========================================
���C��������ύX����
*=========================================*/
MainObject.prototype.ChangeRno0 = function( _Rno0 ) {
	this.Rno0	= _Rno0;
	this.Rno1	= 0;
	this.Rno2	= 0;
};




