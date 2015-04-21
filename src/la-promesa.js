//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.


var laPrms = (

	function() {	
		
		var isValidPromise = function( futurPromise ) {
				
				return  futurPromise && futurPromise.then;
				
		}
		
		var emptyPromise = function() {
									
									return {};
			
								 }
		
		var triggerNextPromise = function ( prms, aresolveFunc, arejectFunc ) {
				
			var futurPromise =  prms.then( aresolveFunc, arejectFunc );
				
			if ( ! isValidPromise( futurPromise ) ) {
				
				futurPromise = emptyPromise() ;
				
			}
			
			return futurPromise;
			
		}
		
		var triggerFunc = function( type, aDataError, abufferBeanFunct ) {
				
				var ii = 0;		
				
				var functTrigger = null;
				
				for ( i = 0; i < abufferBeanFunct.length ; i++ ) {
					
					if ( abufferBeanFunct[i][ type ] )	{
						
						ii = i
						
						functTrigger = abufferBeanFunct[i][ type ];
						
						break;
						
					}
					
				}
				
				if ( ! functTrigger  ) {
				
					return null;
					
				}
				
				var futurPromise = functTrigger( aDataError );
				
				if ( ! isValidPromise( futurPromise ) ) {
							
					return emptyPromise() ;
					
				}
				
				for ( i = ii + 1; i < abufferBeanFunct.length ; i++ ) {
					
					futurPromise = triggerNextPromise ( futurPromise, abufferBeanFunct[i].resolve,  abufferBeanFunct[i].reject );		
					
					if ( ! isValidPromise( futurPromise ) ) {
							
						return futurPromise;
						
					}
					
				}
				
				return futurPromise;
				
			}
			
		var addBeanFunction = function ( aresolveFunc, arejectFunc, aBufferBeanFunct ) {
			
			var bean =  {"resolve" : aresolveFunc, "reject": arejectFunc } ;
			
			aBufferBeanFunct.push( bean );
			
		}
		
		var createBeanResult = function() {
				
				return { "flag": false, "msg": null };
				
		}
		
		function deferObject() {	
	
			var bufferBeanFunct = [];
			
			var beanResolve = createBeanResult();
			
			var beanReject = createBeanResult();
			
			var returnPromise;
			
			var nextPromise;
			
			var validateState = function (){
				
				if ( beanResolve.flag ) {
					
					throw "The promise is already resolved";
					
				} else if ( beanReject.flag ) {
					
					throw "The promise is already rejected";
					
				}
				
			}
			
			var then = function( aresolveFunc, arejectFunc ) {	
				
				if ( isValidPromise( nextPromise )  ) {
					
					nextPromise = triggerNextPromise( nextPromise, aresolveFunc, arejectFunc );
					
				} else if ( ! nextPromise ) {
				
					addBeanFunction( aresolveFunc, arejectFunc, bufferBeanFunct );
					
					if ( beanResolve.flag ) {
						
						_resolve();
						
					} else if ( beanReject.flag  ) {
						
						_reject();
						
					}
					
				}
				
				if ( isValidPromise( nextPromise ) ) {
					
					return nextPromise;
					
				} 
				
				return returnPromise;
				
			}	
			
			var catchFunction = function( arejectFunc ) {
				
				return then( null, arejectFunc );
				
			}
			
			var _resolve = function() {
				
				try{
							
					nextPromise = triggerFunc( "resolve", beanResolve.msg, bufferBeanFunct );
				
				} catch( err ) {
					
					beanResolve.flag = false;					
					
					reject( err );
					
				}
				
			}
			
			var _reject = function() {
				
				nextPromise = triggerFunc( "reject", beanReject.msg,  bufferBeanFunct );
				
			}

			var resolve = function( adata ) {
				
				validateState();
				
				beanResolve.flag = true;
				
				beanResolve.msg = adata;
				
				_resolve();				
				
			}
			
			var reject = function( aerror ) {
				
				validateState();
				
				beanReject.flag = true;
				
				beanReject.msg = aerror;
				
				_reject();
				
			}
			
			returnPromise = {
				"then"    : then,
				"catch"   : catchFunction
			}
			
			return {
				"promise" : returnPromise,
				"resolve" : resolve,
				"reject"  : reject
			}
			
		}
		
		var defer = function () {
		
			return new deferObject();
			
		}
		
		var createPromise = function ( afuncPrms ) {
			
			var deferedObject = defer();
			
			afuncPrms( deferedObject.resolve, deferedObject.reject );
			
			return deferedObject.promise;			
			
		}
		
		return {
		
			"defer"         : defer,
			"createPromise" : createPromise
			
		}
		
	}
) ();
