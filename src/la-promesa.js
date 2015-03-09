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
	
	var beanFunc;
	
	var data;
	
	var self;
	
	var createBeanFunction = function ( aresolveFunc, arejectFunc ) {
		
		return {"resolve" : aresolveFunc, "reject": arejectFunc } 
		
	}
	
	var triggerResolveFunc = function( aData, aResolveFunc, abufferBeanFunct ) {
		
		if ( ! aData
				|| ! aResolveFunc ) {
		
			return null;
					
		}		
		
		var newPromise = aResolveFunc( aData );
		
		if ( ! newPromise
		      || ! newPromise.then ) {
					
			return {};
			
		}
		
		for ( i = 0; i < abufferBeanFunct.length ; i++ ) {
			
			newPromise.then( abufferBeanFunct[i].resolve,  abufferBeanFunct[i].reject );		
			
		}
		
		return newPromise;
		
	}
	
	var then = function( aresolveFunc, arejectFunc ) {	
		
		var nextPromise = null;
		
		if ( ! beanFunc )		{
			
			beanFunc = createBeanFunction( aresolveFunc, arejectFunc );
			
			nextPromise = triggerResolveFunc( data, beanFunc.resolve, bufferBeanFunct );
			
		} else if ( ! nextPromise ) {
			
			bufferBeanFunct.push( createBeanFunction( aresolveFunc, arejectFunc ) );
			
		}	
		
		if ( ! nextPromise ) {
			
			return self;
			
		} else if ( nextPromise
				&& nextPromise.then ) {
			
			return nextPromise;
			
		}
		
	}	

	var resolve = function( adata ) {
		
		data = adata;
		
		var resolveFunc =  beanFunc ? beanFunc.resolve : null;
		
		triggerResolveFunc( data, resolveFunc, bufferBeanFunct );
		
	} 	
	
	self = {
		"then"     : then,
		"resolve"  : resolve
	}
	
	return self;
	
}



