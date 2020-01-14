/*=========================================

*=========================================*/
CharaObject	= function( _HashKey, _PosX, _PosY ){


	this.PosX	= 0;
	this.PosY	= 0;

	this.PosX_Floor	= 0;
	this.PosY_Floor	= 0;


	this.SpeedX	= 0;
	this.SpeedY	= 0;

	this.Dotsdata	= null;

	this.Height	= 0;
	this.width	= 0;

	this.InitCharaObj( _HashKey, _PosX, _PosY );
};


/*=========================================
	Ç†Ç†Ç†
*=========================================*/
CharaObject.prototype.InitCharaObj = function( _HashKey, _PosX, _PosY ) {

	// âºÅB
	this.PosX	= _PosX;
	this.PosY	= _PosY;

	this.PosX_Floor	= Math.floor(this.PosX);
	this.PosY_Floor	= Math.floor(this.PosY);

	this.SpeedX	= -0.7;
	this.SpeedY	= 0;

	this.Dotsdata	= gCharaDotData[_HashKey];
	this.Height	= this.Dotsdata.length;
	this.width	= this.Dotsdata[0].length;
};

/*=========================================
	Ç†Ç†Ç†
*=========================================*/
CharaObject.prototype.pUpdateCharaPos = function(  ) {
	this.PosX	+= this.SpeedX;
	this.PosY	-= this.SpeedY;

	this.PosX_Floor	= Math.floor(this.PosX);
	this.PosY_Floor	= Math.floor(this.PosY);

}

