
var dumyFuncResolve = function ( step ) {
	
		var prmsFunc = function ( resolve, reject ) {
			
			resolve( "resolve msg " + step );
				
		}		
				
		return laPrms.createPromise( prmsFunc );	
		
	};
	
var dumyFuncReject = function ( step ){
	
		var prmsFunc = function ( resolve, reject ) {
			
			reject( "reject msg " + step );
			
		}		
				
		return laPrms.createPromise( prmsFunc );	
	};



describe("Test la-promesa_js sync-prms. 2 'then' function => resolve", function( ) {	
	
	var data1, data2;
	
	beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolve(1)
			.then( function ( data ) { 			

					data1 = data;
					
					return new  dumyFuncResolve( 2 ) 

				} 
			);
		
		prom1.then( 
			
				function( data ) {

					data2 = data;					

				}

			); 
			
		setTimeout ( function () { done(); }, 100);
			
	});
	
	
	it( "Test", function( done ) {		
		
		expect( data1 ).toEqual( "resolve msg 1" );
		expect( data2 ).toEqual( "resolve msg 2" );
		
		done();

	});
	
	
});

describe("Test la-promesa_js sync. 1 'then' and catch function", function( ) {	
	
	var data1, error3;
	
   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolve(1)
			.then(   
					function ( data ) { 			

						data1 = data;
						

					} 
			).catch ( 
				function( error ) {

					error3 = error;					
					
				}
			); 
			
			setTimeout ( function () { done(); }, 100);
			
	});
	
	it( "Test", function( done ) {		
		
		expect( "resolve msg 1" ).toEqual( data1 );
		expect( "undefined" ).toEqual( typeof error3 );
		
		done();

	});
	
});

describe("Test la-promesa_js sync-prms. 2 'then' and catch function => reject last then", function( ) {	
	
	var data1, data2, error3;
	
   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolve(1)
			.then(   
					function ( data ) { 			

						data1 = data;
						
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
					
				}
			); 
			
			setTimeout ( function () { done(); }, 100);
			
	});
	
	
	it( "Test", function( done ) {		
		
		expect( data1 ).toEqual( "resolve msg 1" );
		expect( data2 ).toEqual( "resolve msg 2" );
		expect( error3 ).toEqual( "reject msg 3" );
		
		done();

	});
	
	
});

describe("Test la-promesa_js sync-prms. 2 'then' and catch function => reject first then", function( ) {	
	
	var data1, data2, error3;
	

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolve(1)
			.then(   
					function ( data ) { 			

						data1 = data;
									
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

				}
			); 
			
			setTimeout ( function () { done(); }, 100);
			
	});
	
	
	it( "Test", function( done ) {		
		
		expect( data1 ).toEqual( "resolve msg 1" );
		expect( typeof data2 ).toEqual( "undefined" );
		expect( error3 ).toEqual( "reject msg 2" );
		
		done();

	});
	
	
});

describe("Test la-promesa_js sync-prms. 2 'then' and catch function => reject pricipal function", function( ) {	
	
	var data1, data2, error3;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncReject( 1 )
			.then(   
					function ( data ) { 			

						data1 = data;
									
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

describe("Test la-promesa_js sync-prms. 3 'then' and catch function between", function( ) {	
	
	var data1, data3;
	var error2;
	
   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolve( 1 )
			.then(   
					function ( data ) { 			

						data1 = data;
									
						return new  dumyFuncResolve( 2 ) 

					} 
			).catch(  
					function ( data ) { 			

						error2 = error; 

					} 
			).then ( 
				function( data ) {
					
					data3 = data;								
					
				}
			); 
			
			setTimeout ( function () { done(); }, 100);
	});
	
	
	it( "Test", function( done ) {		
		
		expect( data1 ).toEqual( "resolve msg 1" );
		expect( typeof error2 ).toEqual( "undefined" );
		expect( data3 ).toEqual( "resolve msg 2" );
		
		done();

	});
	
	
});

describe("Test la-promesa_js sync. 3 'then' after reject => catch returns promise", function( ) {	
	
	var data1, data3, data4;
	var error2, error5;

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
								prom1 = prom1
													.then( 
															function () {  
																data4 = 'Called';																
																return new dumyFuncResolve( 3 ) ;
															}  
														);
								done(); 
								
							}, 100 );
			
	});
	
	
	it( "Test", function( done ) {		
		
		expect( typeof data1 ).toEqual( "undefined" );
		expect( error2 ).toEqual( "reject msg 1" );
		expect( data3 ).toEqual( "resolve msg 3" );
		expect( data3 ).toEqual( "resolve msg 3" );
		expect( typeof data4 === 'undefined' ).toEqual( true );
		expect( typeof error5 === 'undefined' ).toEqual( true );
		
		done();

	});
	
	
});

describe("Test la-promesa_js sync. 3 'then' after reject => catch returns NO promise", function( ) {	
	
	var data1, data3, data4;
	var error2, error5;

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
			); 
			
			setTimeout ( function () { 
				
								try {
									
									 prom1 = prom1
													.then( 
															function () {  
																data4 = 'Called';																
																return new dumyFuncResolve( 3 ) ;
															}  
														);
									 
								} catch( err ) {
								
									error5 = err;
									
								}
								done(); 
								
							}, 100 );
			
	});
	
	
	it( "Test", function( done ) {		
		
		expect( typeof data1 ).toEqual( "undefined" );
		expect( error2 ).toEqual( "reject msg 1" );
		expect( typeof  data3 ).toEqual( "undefined" );
		expect( typeof data4 === 'undefined' ).toEqual( true );
		expect( typeof error5 === 'undefined' ).toEqual( true );
		
		done();

	});
	
	
});

describe("Test la-promesa_js sync-prms. 2'then' and 2 'catch' one after the other => It fails second 'then' and error is caught in second 'catch'", function( ) {	
	
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

describe("Test la-promesa_js sync. 2'then' and 1 'catch' The 'throw error' in 'then' function  is been catching by 'catch' function", function( ) {	
	
	var data1, data2;
	var error3;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolve( 1 )
			.then(   
					function ( data ) { 			

						data1 = data;
						
						throw "ERROR dummy";
									
						return new dumyFuncResolve( 2 );

					} 
			)
			.then(   
					function ( data ) { 			

						data2 = data;
						
						return new dumyFuncResolve( 3 );

					} 
			)
			.catch(  
					function ( error ) {

						error3 = error; 										

					} 
			)
			; 
			
			setTimeout ( function () { done(); }, 100);
			
	});
	
	
	it( "Test", function( done ) {		
		
		expect( data1 ).toEqual( "resolve msg 1" );
		expect( typeof data2 ).toEqual( "undefined" );
		expect( error3 ).toEqual( "ERROR dummy" );
		
		done();

	});
	
	
});


