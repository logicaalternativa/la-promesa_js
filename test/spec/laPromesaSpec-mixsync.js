
var dumyFuncResolveAsync = function ( step ){
	
		var defer = laPrms.defer();

		var functionTimeOut = function(){

				defer.resolve( "resolve msg " + step );

			}

		setTimeout( functionTimeOut, 	1 );
				
		return defer.promise;	
	};
	
var dumyFuncRejectAsync = function ( step ){
	
		var defer = laPrms.defer();

		var functionTimeOut = function() {

				defer.reject( "reject msg " + step );

			}

		setTimeout( functionTimeOut, 	1 );
				
		return defer.promise;	
	};
	
var dumyFuncResolveSync = function ( step ){
	
		var defer = laPrms.defer();

		defer.resolve( "resolve msg " + step );

		return defer.promise;	
	};
	
var dumyFuncRejectSync = function ( step ){
	
		var defer = laPrms.defer();
		
		defer.reject( "reject msg " + step );

		return defer.promise;	
	};

describe("Test la-promesa_js mix. 2 'then' function => resolve I", function( ) {	
	
	var data1, data2;
	
   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolveAsync(1)
			.then( function ( data ) { 			

					data1 = data;
								
					return new  dumyFuncResolveSync( 2 ) 

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

describe("Test la-promesa_js mix. 2 'then' function => resolve II", function( ) {	
	
	var data1, data2;
	
   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolveSync(1)
			.then( function ( data ) { 			

					data1 = data;
								
					return new  dumyFuncResolveAsync( 2 ) 

				} 
			);
		
		prom1.then( 
			
				function( data ) {

					data2 = data;					
				
					//~ done();

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

describe("Test la-promesa_js mix. 2 'then' and catch function => reject last then I", function( ) {	
	
	var data1, data2, error3;
	
   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolveAsync(1)
			.then(   
					function ( data ) { 			

						data1 = data;
									
						return new  dumyFuncResolveSync( 2 ) 

					} 
			).then(  
					function ( data ) { 			

						data2 = data;
									
						return new  dumyFuncRejectAsync( 3 ) 

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


describe("Test la-promesa_js mix. 2 'then' and catch function => reject last then II", function( ) {	
	
	var data1, data2, error3;
	
   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolveSync(1)
			.then(   
					function ( data ) { 			

						data1 = data;
									
						return new  dumyFuncResolveAsync( 2 ) 

					} 
			).then(  
					function ( data ) { 			

						data2 = data;
									
						return new dumyFuncRejectSync( 3 ) 

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

describe("Test la-promesa_js mix. 2 'then' and catch function => reject first then I", function( ) {	
	
	var data1, data2, error3;
	
   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolveAsync(1)
			.then(   
					function ( data ) { 			

						data1 = data;
									
						return new  dumyFuncRejectSync( 2 ) 

					} 
			).then(  
					function ( data ) { 			

						data2 = data;
									
						return new  dumyFuncResolveAsync( 3 ) 

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

describe("Test la-promesa_js mix. 2 'then' and catch function => reject first then II", function( ) {	
	
	var data1, data2, error3;
	
   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolveSync(1)
			.then(   
					function ( data ) { 			

						data1 = data;
									
						return new  dumyFuncRejectAsync( 2 ) 

					} 
			).then(  
					function ( data ) { 			

						data2 = data;
									
						return new  dumyFuncResolveSync( 3 ) 

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

describe("Test la-promesa_js mix. 2 'then' and catch function => reject pricipal function I", function( ) {	
	
	var data1, data2, error3;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncRejectAsync( 1 )
			.then(   
					function ( data ) { 			

						data1 = data;
									
						return new  dumyFuncResolveSync( 2 ) 

					} 
			).then(  
					function ( data ) { 			

						data2 = data;
									
						return new  dumyFuncResolveAsync( 3 ) 

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

describe("Test la-promesa_js mix. 2 'then' and catch function => reject pricipal function II", function( ) {	
	
	var data1, data2, error3;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncRejectSync( 1 )
			.then(   
					function ( data ) { 			

						data1 = data;
									
						return new  dumyFuncResolveAsync( 2 ) 

					} 
			).then(  
					function ( data ) { 			

						data2 = data;
									
						return new  dumyFuncResolveSync( 3 ) 

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

describe("Test la-promesa_js mix. 3 'then' and catch function between I", function( ) {	
	
	var data1, data3;
	var error2;
	
   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolveAsync( 1 )
			.then(   
					function ( data ) { 			

						data1 = data;
									
						return new  dumyFuncResolveSync( 2 ) 

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

describe("Test la-promesa_js mix. 3 'then' and catch function between II", function( ) {	
	
	var data1, data3;
	var error2;
	
   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolveSync( 1 )
			.then(   
					function ( data ) { 			

						data1 = data;
									
						return new  dumyFuncResolveAsync( 2 ) 

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

describe("Test la-promesa_js mix. 3 'then' after reject => catch returns promise I", function( ) {	
	
	var data1, data3;
	var error2, error4;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncRejectAsync( 1 )
			.then(   
					function ( data ) { 			

						data1 = data;
									
						return new  dumyFuncResolveSync( 2 ) 

					} 
			).catch(  
					function ( error ) { 			

						error2 = error; 
						
						return new  dumyFuncResolveAsync( 3 ) 

					} 
			).then (  
				function( data ) { // <= // <= It has to exit here. It don't return a valid promise and stops chain.
					
					data3 = data; 

				}
			); 
			
			setTimeout ( function () { 
				
								try {
									
									 prom1 = prom1.then( function () {  new dumyFuncResolveSync( 3 ) }  );
									 
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
		expect( typeof error4 !== 'undefined' ).toEqual( true );
		
		done();

	});
	
});

describe("Test la-promesa_js mix. 3 'then' after reject => catch returns promise II", function( ) {	
	
	var data1, data3;
	var error2, error4;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncRejectSync( 1 )
			.then(   
					function ( data ) { 			

						data1 = data;
									
						return new  dumyFuncResolveAsync( 2 ) 

					} 
			).catch(  
					function ( error ) { 			

						error2 = error; 
						
						return new  dumyFuncResolveSync( 3 ) 

					} 
			).then (  
				function( data ) { // <= // <= It has to exit here. It don't return a valid promise and stops chain.
					
					data3 = data; 

				}
			); 
			
			setTimeout ( function () { 
				
								try {
									
									 prom1 = prom1.then( function () {  new dumyFuncResolveAsync( 3 ) }  );
									 
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
		expect( typeof error4 !== 'undefined' ).toEqual( true );
		
		done();

	});
	
	
});


describe("Test la-promesa_js mix. 3 'then' after reject => catch returns NO promise I", function( ) {	
	
	var data1, data3;
	var error2, error4;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncRejectAsync( 1 )
			.
			then(   
					function ( data ) { 			

						data1 = data;
									
						return new dumyFuncResolveSync( 2 );

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
					
					return  new dumyFuncResolveAsync( 3 );

				}
			)
			; 
			
			setTimeout ( function () { 
				
								try {
									
									 prom1 = prom1.then( function () {  new dumyFuncResolveSync( 3 ) }  );
									 
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

describe("Test la-promesa_js mix. 3 'then' after reject => catch returns NO promise II", function( ) {	
	
	var data1, data3;
	var error2, error4;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncRejectSync( 1 )
			.
			then(   
					function ( data ) { 			

						data1 = data;
									
						return new dumyFuncResolveAsync( 2 );

					} 
			)
			.catch(  
					function ( error ) { // <= It has to exit here. It don't return a valid promise and stops chain.

						error2 = error; 										

					} 
			)
			; 
			
			setTimeout ( function () { 
				
								try {
									
									 prom1 = prom1.then( function () {  new dumyFuncResolveAsync( 3 ) }  );
									 
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

describe("Test la-promesa_js mix. 2'then' and 2 'catch' one after the other => It fails second 'then' and error is caught in second 'catch' I", function( ) {	
	
	var data1, data3;
	var error2, error5;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolveAsync( 1 )
			.
			then(   
					function ( data ) { 			

						data1 = data;
									
						return new dumyFuncResolveSync( 2 );

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
					
					return  new dumyFuncRejectAsync( 4 );

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

describe("Test la-promesa_js mix. 2'then' and 2 'catch' one after the other => It fails second 'then' and error is caught in second 'catch' II", function( ) {	
	
	var data1, data3;
	var error2, error5;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolveSync( 1 )
			.
			then(   
					function ( data ) { 			

						data1 = data;
									
						return new dumyFuncResolveAsync( 2 );

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
					
					return  new dumyFuncRejectSync( 4 );

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

describe("Test la-promesa_js mix. 2'then' and 1 'catch' The 'throw error' in 'then' function  is been catching by 'catch' function I", function( ) {	
	
	var data1, data2;
	var error3;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolveAsync( 1 )
			.then(   
					function ( data ) { 			

						data1 = data;
						
						throw "ERROR dummy";
									
						return new dumyFuncResolveSync( 2 );

					} 
			)
			.then(   
					function ( data ) { 			

						data2 = data;
						
						return new dumyFuncResolveAsync( 3 );

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

describe("Test la-promesa_js mix. 2'then' and 1 'catch' The 'throw error' in 'then' function  is been catching by 'catch' function II", function( ) {	
	
	var data1, data2;
	var error3;

   beforeEach( function( done ) {
	 
		var prom1 = dumyFuncResolveSync( 1 )
			.then(   
					function ( data ) { 			

						data1 = data;
						
						throw "ERROR dummy";
									
						return new dumyFuncResolveAsync( 2 );

					} 
			)
			.then(   
					function ( data ) { 			

						data2 = data;
						
						return new dumyFuncResolveSync( 3 );

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
 
 
