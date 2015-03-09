
var dumyfunction = function ( step ){
	
		var proms = new promise();

		var functionTimeOut = function(){

				proms.resolve( "resolve msg " + step );

			}

		setTimeout( functionTimeOut, 	1 );
				
		return proms;	
	};


describe("Test la-promesa_js async", function( ) {	
	
	var data1, data2;
	var date1, date2;

   beforeEach( function( done ) {
	 
		var prom1 = dumyfunction(1)
			.then( function ( data ) { 			

					data1 = data;
					date1 = ( new Date() ).getTime();
								
					return new  dumyfunction( 2 ) 

				} 
			);
		
		prom1.then( 
			
				function( data ) {

					data2 = data;					
					date2 = ( new Date() ).getTime();	
					done();

				}

			); 
	});
	
	
	it( "Test 2 functions 'then' ", function( done ) {		
		
		expect( data1 ).toEqual( "resolve msg 1" );
		expect( data2 ).toEqual( "resolve msg 2" );
		
		expect( date2 - date1 > 0 ).toEqual( true );
		
		done();

	});
	
	
});
