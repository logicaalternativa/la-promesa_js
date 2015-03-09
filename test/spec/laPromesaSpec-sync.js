
var dumyfunction = function ( step ){
	

		var prom = new promise( "dumyfunction " +  step );

		prom.resolve( "resolve msg " + step );
				
		return prom;	
	};


describe("Test la-promesa_js sync", function( ) {	
	
	var data1, data2;
	var date1, date2;

   beforeEach( function( done ) {
	 
		dumyfunction(1)
			.then( function ( data ) { 
				
					// Traza
					
					console.log( ":::::: paso por el primer then" )
					
					// Fin de traza

					data1 = data;
					date1 = ( new Date() ).getTime();
								
					return new  dumyfunction( 2 ) 

				} 
			)
			.then(			
			
			
				function( data ) {
					
					// Traza
					
					console.log( ":::::: paso por el 2 then" )
					
					// Fin de traza

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
