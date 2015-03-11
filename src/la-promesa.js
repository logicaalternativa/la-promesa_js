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

function promise() {	
	
	var bufferBeanFunct = [];
	
	var data;
	
	var error;
	
	var self;
	
	var nextPromise;
	
	var validateState = function (){
		
		if ( data ) {
			
			throw "The state is already resolved";
			
		} else if ( error ) {
			
			throw "The state is already rejected";
		}
		
	}
	
	var triggerFunc = function( type, aDataError, abufferBeanFunct ) {
		
		if ( ! aDataError ) {
		
			return null;
					
		}	
		
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
		
		var newPromise = functTrigger( aDataError );
		
		if ( ! newPromise
		      || ! newPromise.then ) {
					
			return {};
			
		}
		
		for ( i = ii + 1; i < abufferBeanFunct.length ; i++ ) {
			
			newPromise.then( abufferBeanFunct[i].resolve,  abufferBeanFunct[i].reject );		
			
		}
		
		return newPromise;
		
	}
	
	var triggerResolve = function( aData,  aBufferBeanFunct ){
		
		try {
			
			nextPromise = triggerFunc( "resolve", aData, aBufferBeanFunct );
				
		} catch( err ) {
			
			nextPromise = triggerFunc( "reject", err, aBufferBeanFunct );			
		}		
		
		return nextPromise;
		
	}
	
	
	var addBeanFunction = function ( aresolveFunc, arejectFunc, aBufferBeanFunct ) {
		
		var bean =  {"resolve" : aresolveFunc, "reject": arejectFunc } ;
		
		aBufferBeanFunct.push( bean );
		
	}
	
	var then = function( aresolveFunc, arejectFunc ) {	
		
		if ( typeof nextPromise !== "undefined" ) {
			
			if ( nextPromise.then ) {
			
				return nextPromise.then( aresolveFunc, arejectFunc );
				
			}  else {
			
				throw "This object is not a valid promise";
				
			}
			
		} 
		
		addBeanFunction( aresolveFunc, arejectFunc, bufferBeanFunct );
		
		if ( typeof data !== "undefined" ) {
			
			nextPromise = triggerResolve( data, bufferBeanFunct );
						
		} else if ( typeof error !== "undefined"  ) {
			
			nextPromise = triggerFunc( "reject", error, bufferBeanFunct );
			
		}
			
		if ( typeof nextPromise === "undefined"  ) {
			
			return self;
			
		} else if ( nextPromise.then ) {
			
			return nextPromise;
			
		}
		
	}	
	
	var catchFunction = function( arejectFunc ) {
		
		return then( null, arejectFunc );
		
	}

	var resolve = function( adata ) {
		
		validateState();
		
		data = adata;
		
		nextPromise = triggerResolve( data, bufferBeanFunct );
		
	}
	
	var reject = function( aerror ) {
		
		validateState();
		
		error = aerror;
		
		nextPromise = triggerFunc( "reject", error,  bufferBeanFunct );
		
	}
	
	self = {
		"then"    : then,
		"catch"   : catchFunction,
		"resolve" : resolve,
		"reject"  : reject
	}
	
	return self;
	
}



