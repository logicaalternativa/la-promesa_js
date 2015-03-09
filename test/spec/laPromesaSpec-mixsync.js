
var dumyfunctionAsync = function ( step ){
	
		var proms = new promise();

		var functionTimeOut = function(){

				proms.resolve( "resolve msg " + step );

			}

		setTimeout( functionTimeOut, 	1 );
				
		return proms;	
	};
	
	
var dumyfunctionSync = function ( step ){	

		var prom = new promise( "dumyfunction " +  step );

		prom.resolve( "resolve msg " + step );
				
		return prom;	
	};


describe("Test la-promesa_js mix sync async", function( ) {	
	
	var data1, data2;
	var date1, date2;

   beforeEach( function( done ) {
	 
		var prom1 = dumyfunctionSync(1)
			.then( 
				function ( data ) { 
					
					// Traza 
					
					console.log( "Ejecutada la función then se devuelve async 2" )
					
					// FIn de traza			

					data1 = data;
					date1 = ( new Date() ).getTime();
								
					return new  dumyfunctionAsync( 2 ) 

				} 
			)
			.then(
				
				function( data ){
					
					// Traza 
					
					console.log( "Ejecutada la función then se devuelve sync 3" )
					
					// FIn de traza
				
					return dumyfunctionSync( 3 )
					
				}
			
			)
			.then( 
			
				function( data ) {

					data2 = data;					
					date2 = ( new Date() ).getTime();	
					done();

				}

			)
			; 
	});
	
	
	it( "Test 2 functions 'then' ", function( done ) {		
		
		expect( data1 ).toEqual( "resolve msg 1" );
		expect( data2 ).toEqual( "resolve msg 3" );
		
		expect( date2 - date1 > 0 ).toEqual( true );
		
		done();

	});
	
	
});
