
var dumyFuncResolve = function ( step ){
	
		var defer = laPrms.defer();

		var functionTimeOut = function(){

				defer.resolve( "resolve msg " + step );

			}

		setTimeout( functionTimeOut, 	1 );
				
		return defer.promise;	
	};
	
var dumyFuncReject = function ( step ){
	
		var defer = laPrms.defer();

		var functionTimeOut = function() {

				defer.reject( "reject msg " + step );

			}

		setTimeout( functionTimeOut, 	1 );
				
		return defer.promise;	
	};

describe("Test la-promesa_js async. 2 'then' function => resolve", function( ) {	
	
	var data1, data2;
	var date1, date2;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolve(1)
			.then( function ( data ) { 			

					data1 = data;
					date1 = ( new Date() ).getTime();
								
					return new  dumyFuncResolve( 2 ) 

				} 
			);
		
		prom1.then( 
			
				function( data ) {

					data2 = data;					
					date2 = ( new Date() ).getTime();
					
					//~ done();

				}

			); 
			
		setTimeout ( function () { done(); }, 100);
			
	});
	
	
	it( "Test", function( done ) {		
		
		expect( data1 ).toEqual( "resolve msg 1" );
		expect( data2 ).toEqual( "resolve msg 2" );
		
		expect( date2 - date1 > 0 ).toEqual( true );
		
		done();

	});
	
	
});

describe("Test la-promesa_js async. 2 'then' and catch function => reject last then", function( ) {	
	
	var data1, data2, error3;
	var date1, date2;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolve(1)
			.then(   
					function ( data ) { 			

						data1 = data;
						date1 = ( new Date() ).getTime();
									
						return new  dumyFuncResolve( 2 ) 

					} 
			).then(  
					function ( data ) { 			

						data2 = data;
									
						return new  dumyFuncReject( 3 ) 

					} 
			).catch ( 
				function( error ) {

					error3 = error;					
					date2 = ( new Date() ).getTime();

				}
			); 
			
			setTimeout ( function () { done(); }, 100);
			
	});
	
	
	it( "Test", function( done ) {		
		
		expect( data1 ).toEqual( "resolve msg 1" );
		expect( data2 ).toEqual( "resolve msg 2" );
		expect( error3 ).toEqual( "reject msg 3" );
		
		expect( date2 - date1 > 0 ).toEqual( true );
		
		done();

	});
	
	
});

describe("Test la-promesa_js async. 2 'then' and catch function => reject first then", function( ) {	
	
	var data1, data2, error3;
	var date1, date2;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolve(1)
			.then(   
					function ( data ) { 			

						data1 = data;
						date1 = ( new Date() ).getTime();
									
						return new  dumyFuncReject( 2 ) 

					} 
			).then(  
					function ( data ) { 			

						data2 = data;
									
						return new  dumyFuncResolve( 3 ) 

					} 
			).catch ( 
				function( error ) {

					error3 = error;					
					date2 = ( new Date() ).getTime();

				}
			); 
			
			setTimeout ( function () { done(); }, 100);
			
	});
	
	
	it( "Test", function( done ) {		
		
		expect( data1 ).toEqual( "resolve msg 1" );
		expect( typeof data2 ).toEqual( "undefined" );
		expect( error3 ).toEqual( "reject msg 2" );
		
		expect( date2 - date1 > 0 ).toEqual( true );
		
		done();

	});
	
	
});

describe("Test la-promesa_js async. 2 'then' and catch function => reject pricipal function", function( ) {	
	
	var data1, data2, error3;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncReject( 1 )
			.then(   
					function ( data ) { 			

						data1 = data;
						date1 = ( new Date() ).getTime();
									
						return new  dumyFuncResolve( 2 ) 

					} 
			).then(  
					function ( data ) { 			

						data2 = data;
									
						return new  dumyFuncResolve( 3 ) 

					} 
			).catch ( 
				function( error ) {

					error3 = error;					
					date2 = ( new Date() ).getTime();

				}
			); 
			
			setTimeout ( function () { done(); }, 100);
	});
	
	
	it( "Test", function( done ) {		
		
		expect( typeof data1 ).toEqual( "undefined" );
		expect( typeof data2 ).toEqual( "undefined" );
		expect( error3 ).toEqual( "reject msg 1" );
		
		done();

	});
	
	
});

describe("Test la-promesa_js async. 3 'then' and catch function between", function( ) {	
	
	var data1, data3;
	var error2;
	var date1, date2;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolve( 1 )
			.then(   
					function ( data ) { 			

						data1 = data;
						date1 = ( new Date() ).getTime();
									
						return new  dumyFuncResolve( 2 ) 

					} 
			).catch(  
					function ( data ) { 			

						error2 = error; 

					} 
			).then ( 
				function( data ) {
					
					data3 = data;								
					date2 = ( new Date() ).getTime();
					
				}
			); 
			
			setTimeout ( function () { done(); }, 100);
	});
	
	
	it( "Test", function( done ) {		
		
		expect( data1 ).toEqual( "resolve msg 1" );
		expect( typeof error2 ).toEqual( "undefined" );
		expect( data3 ).toEqual( "resolve msg 2" );
		
		expect( date2 - date1 > 0 ).toEqual( true );
		
		done();

	});
	
	
});

describe("Test la-promesa_js async. 3 'then' after reject => catch returns promise", function( ) {	
	
	var data1, data3;
	var error2, error4;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncReject( 1 )
			.then(   
					function ( data ) { 			

						data1 = data;
									
						return new  dumyFuncResolve( 2 ) 

					} 
			).catch(  
					function ( error ) { 			

						error2 = error; 
						
						return new  dumyFuncResolve( 3 ) 

					} 
			).then (  
				function( data ) { // <= // <= It has to exit here. It don't return a valid promise and stops chain.
					
					data3 = data; 

				}
			); 
			
			setTimeout ( function () { 
				
								try {
									
									 prom1 = prom1.then( function () {  new dumyFuncResolve( 3 ) }  );
									 
								} catch( err ) {
								
									error4 = err;
									
								}
								done(); 
								
							}, 100 );
			
	});
	
	
	it( "Test", function( done ) {		
		
		expect( typeof data1 ).toEqual( "undefined" );
		expect( error2 ).toEqual( "reject msg 1" );
		expect( data3 ).toEqual( "resolve msg 3" );
		expect( data3 ).toEqual( "resolve msg 3" );
		//~ expect( typeof error4 !== 'undefined' ).toEqual( true );
		
		done();

	});
	
	
});

describe("Test la-promesa_js async. 3 'then' after reject => catch returns NO promise", function( ) {	
	
	var data1, data3;
	var error2, error4;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncReject( 1 )
			.
			then(   
					function ( data ) { 			

						data1 = data;
									
						return new dumyFuncResolve( 2 );

					} 
			)
			.catch(  
					function ( error ) { // <= It has to exit here. It don't return a valid promise and stops chain.

						error2 = error; 										

					} 
			)
			.then ( 
				function( data ) {
					
					data3 = data
					
					return  new dumyFuncResolve( 3 );

				}
			)
			; 
			
			setTimeout ( function () { 
				
								try {
									
									 prom1 = prom1.then( function () {  new dumyFuncResolve( 3 ) }  );
									 
								} catch( err ) {
								
									error4 = err;
									
								}
								done(); 
								
							}, 100 );
			
	});
	
	
	it( "Test", function( done ) {		
		
		expect( typeof data1 ).toEqual( "undefined" );
		expect( error2 ).toEqual( "reject msg 1" );
		expect( typeof  data3 ).toEqual( "undefined" );
		expect( typeof error4 !== 'undefined' ).toEqual( true );
		
		done();

	});
	
	
});

describe("Test la-promesa_js async. 2'then' and 2 'catch' one after the other => It fails second 'then' and error is caught in second 'catch'", function( ) {	
	
	var data1, data3;
	var error2, error5;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolve( 1 )
			.
			then(   
					function ( data ) { 			

						data1 = data;
									
						return new dumyFuncResolve( 2 );

					} 
			)
			.catch(  
					function ( error ) {

						error2 = error; 										

					} 
			)
			.then ( 
				function( data ) {
					
					data3 = data
					
					return  new dumyFuncReject( 4 );

				}
			).catch(  
					function ( error ) {

						error5 = error; 										

					} 
			)
			; 
			
			setTimeout ( function () { done(); }, 100);
			
	});
	
	
	it( "Test", function( done ) {		
		
		expect( data1 ).toEqual( "resolve msg 1" );
		expect( typeof error2 ).toEqual( "undefined" );
		expect( data3 ).toEqual( "resolve msg 2" );
		expect( error5 ).toEqual( "reject msg 4" );
		
		done();

	});
	
	
});

