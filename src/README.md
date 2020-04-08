## Modules

<dl>
<dt><a href="#module_otto">otto</a></dt>
<dd><p>The main <code>otto</code> module containing object spying methods and varioys utility
functions. This module contains the <code>object</code> module in addition to the
static methods applied to <code>otto</code>.</p></dd>
<dt><a href="#module_decorateFunction">decorateFunction</a></dt>
<dd><p>Function decoration module.</p></dd>
<dt><a href="#module_decorateProperty">decorateProperty</a></dt>
<dd><p>Object property decoration module.</p></dd>
<dt><a href="#module_otto/object">otto/object</a></dt>
<dd><p>A module of JS object utility functions. Namespaced at <code>otto.object</code>.</p></dd>
<dt><a href="#module_otto">otto</a></dt>
<dd><p>The main <code>otto</code> module containing object spying methods and varioys utility
functions. This module contains the <code>object</code> module in addition to the
static methods applied to <code>otto</code>.</p></dd>
<dt><a href="#module_decorateFunction">decorateFunction</a></dt>
<dd><p>Function decoration module.</p></dd>
<dt><a href="#module_decorateProperty">decorateProperty</a></dt>
<dd><p>Object property decoration module.</p></dd>
<dt><a href="#module_otto/object">otto/object</a></dt>
<dd><p>A module of JS object utility functions. Namespaced at <code>otto.object</code>.</p></dd>
</dl>

## Classes

<dl>
<dt><a href="#Spy">Spy</a></dt>
<dd><p>Monitors and responds to object function calls and property value updates.</p></dd>
<dt><a href="#SpyOnModule">SpyOnModule</a></dt>
<dd><p>Chainable module that allows for configuration of a Spy after it has been
initially deployed. The self-referential property <code>and</code> can be used for
natural language chaining.</p></dd>
<dt><a href="#Spy">Spy</a></dt>
<dd><p>Monitors and responds to object function calls and property value updates.</p></dd>
<dt><a href="#SpyOnModule">SpyOnModule</a></dt>
<dd><p>Chainable module that allows for configuration of a Spy after it has been
initially deployed. The self-referential property <code>and</code> can be used for
natural language chaining.</p></dd>
</dl>

<a name="module_otto"></a>

## otto
<p>The main <code>otto</code> module containing object spying methods and varioys utility
functions. This module contains the <code>object</code> module in addition to the
static methods applied to <code>otto</code>.</p>

**See**: module:otto/object  

* [otto](#module_otto)
    * [.spyOn(obj, [propName])](#module_otto.spyOn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
    * [.resetSpy(obj, [propName])](#module_otto.resetSpy)
    * [.resetAllSpies(obj, [propName])](#module_otto.resetAllSpies)
    * [.spyOn(obj, [propName])](#module_otto.spyOn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
    * [.resetSpy(obj, [propName])](#module_otto.resetSpy)
    * [.resetAllSpies(obj, [propName])](#module_otto.resetAllSpies)

<a name="module_otto.spyOn"></a>

### otto.spyOn(obj, [propName]) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Spies on the requested object property.</p>

**Kind**: static method of [<code>otto</code>](#module_otto)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>Supports chaining of Spy configuration methods.</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| [propName] | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_otto.resetSpy"></a>

### otto.resetSpy(obj, [propName])
<p>Resets a spy on a given property or spies on an object.</p>

**Kind**: static method of [<code>otto</code>](#module_otto)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| [propName] | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_otto.resetAllSpies"></a>

### otto.resetAllSpies(obj, [propName])
<p>Resets all generated spies.</p>

**Kind**: static method of [<code>otto</code>](#module_otto)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| [propName] | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_otto.spyOn"></a>

### otto.spyOn(obj, [propName]) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Spies on the requested object property.</p>

**Kind**: static method of [<code>otto</code>](#module_otto)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>Supports chaining of Spy configuration methods.</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| [propName] | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_otto.resetSpy"></a>

### otto.resetSpy(obj, [propName])
<p>Resets a spy on a given property or spies on an object.</p>

**Kind**: static method of [<code>otto</code>](#module_otto)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| [propName] | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_otto.resetAllSpies"></a>

### otto.resetAllSpies(obj, [propName])
<p>Resets all generated spies.</p>

**Kind**: static method of [<code>otto</code>](#module_otto)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| [propName] | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_decorateFunction"></a>

## decorateFunction
<p>Function decoration module.</p>


* [decorateFunction](#module_decorateFunction)
    * [~decoratedFunctions](#module_decorateFunction..decoratedFunctions)
    * [~decoratedFunctions](#module_decorateFunction..decoratedFunctions)
    * [~decorateFunction(objOrFxn, [fxnNameOrConfig], [decoratorConfig])](#module_decorateFunction..decorateFunction) ⇒ <code>function</code>
    * [~isDecoratedFunction(func)](#module_decorateFunction..isDecoratedFunction) ⇒ <code>boolean</code>
    * [~revertDecoratedFunction(decoratedFunction)](#module_decorateFunction..revertDecoratedFunction) ⇒ <code>function</code>
    * [~decorateFunction(objOrFxn, [fxnNameOrConfig], [decoratorConfig])](#module_decorateFunction..decorateFunction) ⇒ <code>function</code>
    * [~isDecoratedFunction(func)](#module_decorateFunction..isDecoratedFunction) ⇒ <code>boolean</code>
    * [~revertDecoratedFunction(decoratedFunction)](#module_decorateFunction..revertDecoratedFunction) ⇒ <code>function</code>

<a name="module_decorateFunction..decoratedFunctions"></a>

### decorateFunction~decoratedFunctions
<p>Map of decorated function to original function for use in resetting
decorators.</p>

**Kind**: inner constant of [<code>decorateFunction</code>](#module_decorateFunction)  
**Todo**

- [ ] Be wary of this endlessly growing. Investigate ways to safely
remove without losing the ability to locate the original function for a
directly/indirectly decorated function.

<a name="module_decorateFunction..decoratedFunctions"></a>

### decorateFunction~decoratedFunctions
<p>Map of decorated function to original function for use in resetting
decorators.</p>

**Kind**: inner constant of [<code>decorateFunction</code>](#module_decorateFunction)  
**Todo**

- [ ] Be wary of this endlessly growing. Investigate ways to safely
remove without losing the ability to locate the original function for a
directly/indirectly decorated function.

<a name="module_decorateFunction..decorateFunction"></a>

### decorateFunction~decorateFunction(objOrFxn, [fxnNameOrConfig], [decoratorConfig]) ⇒ <code>function</code>
<p>Decorates a function. If a reference to a method is supplied
i.e. object['functionName'], the method will automatically be replaced with
the decorated version of the method. A reference to the decorated method
will still be returned.</p>

**Kind**: inner method of [<code>decorateFunction</code>](#module_decorateFunction)  
**Returns**: <code>function</code> - <p>The decorated function.</p>  

| Param | Type | Description |
| --- | --- | --- |
| objOrFxn | <code>Object</code> \| <code>function</code> | <p>Either the object containing a method to decorate or the function to decorate itself.</p> |
| [fxnNameOrConfig] | <code>string</code> \| <code>Object</code> | <p>The name of the method to decorate or configuration for function decoration if the function is passed as the first argument.</p> |
| [decoratorConfig] | <code>Object</code> | <p>Configuration for function decoration if the first two arguments are the object and name of function to decorate. <code>after</code>: A function to call after the function to be decorated. <code>before</code>: A function to call before the function to be decorated. <code>callThrough</code>: A boolean indicating whether to progresss through the function once called. Defaults to <code>true</code>. <code>fake</code>: A function to call in place of the function to be decorated. <code>thisArg</code>: The value to be passed as the <code>this</code> parameter to the target function(s) when the decorated function is called. Also applies to <code>after</code>, <code>before</code>, and <code>fake</code>. Defaults to <code>this</code> if decorating a prototype method or the <code>objOrFxn</code> argument pased to <code>decorateFunction</code>.</p> |

<a name="module_decorateFunction..isDecoratedFunction"></a>

### decorateFunction~isDecoratedFunction(func) ⇒ <code>boolean</code>
<p>Returns a boolean asserting whether a function has been decorated via
<code>decorateFunction</code>.</p>

**Kind**: inner method of [<code>decorateFunction</code>](#module_decorateFunction)  
**Returns**: <code>boolean</code> - <p><code>true</code> if the function has been decorated via
<code>decorateFunction</code>; otherwise <code>false</code>.</p>  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | <p>The function to test for decoration.</p> |

<a name="module_decorateFunction..revertDecoratedFunction"></a>

### decorateFunction~revertDecoratedFunction(decoratedFunction) ⇒ <code>function</code>
<p>Reverts function decoration. If a reference to a method had been originally
supplied i.e. object['functionName'], the decorated method will automatically
be reverted to the original method. A reference to the original method will
still be returned.</p>

**Kind**: inner method of [<code>decorateFunction</code>](#module_decorateFunction)  
**Returns**: <code>function</code> - <p>The original function.</p>  

| Param | Type | Description |
| --- | --- | --- |
| decoratedFunction | <code>function</code> | <p>The decorated function to revert.</p> |

<a name="module_decorateFunction..decorateFunction"></a>

### decorateFunction~decorateFunction(objOrFxn, [fxnNameOrConfig], [decoratorConfig]) ⇒ <code>function</code>
<p>Decorates a function. If a reference to a method is supplied
i.e. object['functionName'], the method will automatically be replaced with
the decorated version of the method. A reference to the decorated method
will still be returned.</p>

**Kind**: inner method of [<code>decorateFunction</code>](#module_decorateFunction)  
**Returns**: <code>function</code> - <p>The decorated function.</p>  

| Param | Type | Description |
| --- | --- | --- |
| objOrFxn | <code>Object</code> \| <code>function</code> | <p>Either the object containing a method to decorate or the function to decorate itself.</p> |
| [fxnNameOrConfig] | <code>string</code> \| <code>Object</code> | <p>The name of the method to decorate or configuration for function decoration if the function is passed as the first argument.</p> |
| [decoratorConfig] | <code>Object</code> | <p>Configuration for function decoration if the first two arguments are the object and name of function to decorate. <code>after</code>: A function to call after the function to be decorated. <code>before</code>: A function to call before the function to be decorated. <code>callThrough</code>: A boolean indicating whether to progresss through the function once called. Defaults to <code>true</code>. <code>fake</code>: A function to call in place of the function to be decorated. <code>thisArg</code>: The value to be passed as the <code>this</code> parameter to the target function(s) when the decorated function is called. Also applies to <code>after</code>, <code>before</code>, and <code>fake</code>. Defaults to <code>this</code> if decorating a prototype method or the <code>objOrFxn</code> argument pased to <code>decorateFunction</code>.</p> |

<a name="module_decorateFunction..isDecoratedFunction"></a>

### decorateFunction~isDecoratedFunction(func) ⇒ <code>boolean</code>
<p>Returns a boolean asserting whether a function has been decorated via
<code>decorateFunction</code>.</p>

**Kind**: inner method of [<code>decorateFunction</code>](#module_decorateFunction)  
**Returns**: <code>boolean</code> - <p><code>true</code> if the function has been decorated via
<code>decorateFunction</code>; otherwise <code>false</code>.</p>  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | <p>The function to test for decoration.</p> |

<a name="module_decorateFunction..revertDecoratedFunction"></a>

### decorateFunction~revertDecoratedFunction(decoratedFunction) ⇒ <code>function</code>
<p>Reverts function decoration. If a reference to a method had been originally
supplied i.e. object['functionName'], the decorated method will automatically
be reverted to the original method. A reference to the original method will
still be returned.</p>

**Kind**: inner method of [<code>decorateFunction</code>](#module_decorateFunction)  
**Returns**: <code>function</code> - <p>The original function.</p>  

| Param | Type | Description |
| --- | --- | --- |
| decoratedFunction | <code>function</code> | <p>The decorated function to revert.</p> |

<a name="module_decorateProperty"></a>

## decorateProperty
<p>Object property decoration module.</p>


* [decorateProperty](#module_decorateProperty)
    * [~decorateProperty(obj, propName)](#module_decorateProperty..decorateProperty) ⇒ <code>Object</code>
    * [~revertDecoratedProperty(obj, propName)](#module_decorateProperty..revertDecoratedProperty)
    * [~decorateProperty(obj, propName)](#module_decorateProperty..decorateProperty) ⇒ <code>Object</code>
    * [~revertDecoratedProperty(obj, propName)](#module_decorateProperty..revertDecoratedProperty)

<a name="module_decorateProperty..decorateProperty"></a>

### decorateProperty~decorateProperty(obj, propName) ⇒ <code>Object</code>
<p>Decorates a property's getter and setter to be spied upon.
NOTE: Immediately updates getter/setter methods to be spied. Returns a
reference to the original getter/setter so reset() can be defined in Spy.</p>

**Kind**: inner method of [<code>decorateProperty</code>](#module_decorateProperty)  
**Returns**: <code>Object</code> - <p>An object containing the original getter/setter if present.</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_decorateProperty..revertDecoratedProperty"></a>

### decorateProperty~revertDecoratedProperty(obj, propName)
<p>Reverts property getter and setter decoration.</p>

**Kind**: inner method of [<code>decorateProperty</code>](#module_decorateProperty)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to revert.</p> |
| propName | <code>string</code> | <p>The name of the property to revert.</p> |

<a name="module_decorateProperty..decorateProperty"></a>

### decorateProperty~decorateProperty(obj, propName) ⇒ <code>Object</code>
<p>Decorates a property's getter and setter to be spied upon.
NOTE: Immediately updates getter/setter methods to be spied. Returns a
reference to the original getter/setter so reset() can be defined in Spy.</p>

**Kind**: inner method of [<code>decorateProperty</code>](#module_decorateProperty)  
**Returns**: <code>Object</code> - <p>An object containing the original getter/setter if present.</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_decorateProperty..revertDecoratedProperty"></a>

### decorateProperty~revertDecoratedProperty(obj, propName)
<p>Reverts property getter and setter decoration.</p>

**Kind**: inner method of [<code>decorateProperty</code>](#module_decorateProperty)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to revert.</p> |
| propName | <code>string</code> | <p>The name of the property to revert.</p> |

<a name="module_otto/object"></a>

## otto/object
<p>A module of JS object utility functions. Namespaced at <code>otto.object</code>.</p>


* [otto/object](#module_otto/object)
    * [~clone(source)](#module_otto/object..clone) ⇒ <code>\*</code>
    * [~iterateAndCall(source, handler, [condition])](#module_otto/object..iterateAndCall) ⇒ <code>Object</code>
    * [~merge(target, ...sources)](#module_otto/object..merge) ⇒ <code>\*</code>
    * [~mirrorProperties(target, ...sources)](#module_otto/object..mirrorProperties) ⇒ <code>\*</code>
    * [~traverse(source, path)](#module_otto/object..traverse)
    * [~clone(source)](#module_otto/object..clone) ⇒ <code>\*</code>
    * [~iterateAndCall(source, handler, [condition])](#module_otto/object..iterateAndCall) ⇒ <code>Object</code>
    * [~merge(target, ...sources)](#module_otto/object..merge) ⇒ <code>\*</code>
    * [~mirrorProperties(target, ...sources)](#module_otto/object..mirrorProperties) ⇒ <code>\*</code>
    * [~traverse(source, path)](#module_otto/object..traverse)

<a name="module_otto/object..clone"></a>

### otto/object~clone(source) ⇒ <code>\*</code>
<p>Creates a deep copy clone of the source object.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>\*</code> - <p>A clone of the source object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>\*</code> | <p>The source to clone.</p> |

<a name="module_otto/object..iterateAndCall"></a>

### otto/object~iterateAndCall(source, handler, [condition]) ⇒ <code>Object</code>
<p>Iterates over source object and calls sets value of property to result of
calling a handler function on each property value. The handler function will
be called with the value of the current property. An optional condition
function can be passed to test the property value against to determine
whether to call the handler function on that property.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>Object</code> - <p>The updated source object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Object</code> | <p>The object to iterate over.</p> |
| handler | <code>function</code> | <p>The function to call on each property value. The value of the property will be updated if the handler function returns a result.</p> |
| [condition] | <code>function</code> | <p>An optional function to call before calling the handler function, where truthy results will initiate a call to the handler.</p> |

<a name="module_otto/object..merge"></a>

### otto/object~merge(target, ...sources) ⇒ <code>\*</code>
<p>Merges the contents of objects into the target object. Merging a primitive
type or function into the target will overwrite the target argument.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>\*</code> - <p>The merged object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>\*</code> | <p>The target object.</p> |
| ...sources | <code>Array.&lt;\*&gt;</code> | <p>Any number of additional objects to merge.</p> |

<a name="module_otto/object..mirrorProperties"></a>

### otto/object~mirrorProperties(target, ...sources) ⇒ <code>\*</code>
<p>Mirrors properties of objects onto the target object.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>\*</code> - <p>The mirrored object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>\*</code> | <p>The target object.</p> |
| ...sources | <code>Array.&lt;\*&gt;</code> | <p>Any number of additional objects to merge.</p> |

<a name="module_otto/object..traverse"></a>

### otto/object~traverse(source, path)
<p>Safely navigates to a nested object property.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>\*</code> | <p>An object that acts as the starting point for navigation.</p> |
| path | <code>string</code> | <p>The path to the nested object property not including the originating object.</p> |

<a name="module_otto/object..clone"></a>

### otto/object~clone(source) ⇒ <code>\*</code>
<p>Creates a deep copy clone of the source object.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>\*</code> - <p>A clone of the source object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>\*</code> | <p>The source to clone.</p> |

<a name="module_otto/object..iterateAndCall"></a>

### otto/object~iterateAndCall(source, handler, [condition]) ⇒ <code>Object</code>
<p>Iterates over source object and calls sets value of property to result of
calling a handler function on each property value. The handler function will
be called with the value of the current property. An optional condition
function can be passed to test the property value against to determine
whether to call the handler function on that property.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>Object</code> - <p>The updated source object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Object</code> | <p>The object to iterate over.</p> |
| handler | <code>function</code> | <p>The function to call on each property value. The value of the property will be updated if the handler function returns a result.</p> |
| [condition] | <code>function</code> | <p>An optional function to call before calling the handler function, where truthy results will initiate a call to the handler.</p> |

<a name="module_otto/object..merge"></a>

### otto/object~merge(target, ...sources) ⇒ <code>\*</code>
<p>Merges the contents of objects into the target object. Merging a primitive
type or function into the target will overwrite the target argument.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>\*</code> - <p>The merged object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>\*</code> | <p>The target object.</p> |
| ...sources | <code>Array.&lt;\*&gt;</code> | <p>Any number of additional objects to merge.</p> |

<a name="module_otto/object..mirrorProperties"></a>

### otto/object~mirrorProperties(target, ...sources) ⇒ <code>\*</code>
<p>Mirrors properties of objects onto the target object.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>\*</code> - <p>The mirrored object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>\*</code> | <p>The target object.</p> |
| ...sources | <code>Array.&lt;\*&gt;</code> | <p>Any number of additional objects to merge.</p> |

<a name="module_otto/object..traverse"></a>

### otto/object~traverse(source, path)
<p>Safely navigates to a nested object property.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>\*</code> | <p>An object that acts as the starting point for navigation.</p> |
| path | <code>string</code> | <p>The path to the nested object property not including the originating object.</p> |

<a name="module_otto"></a>

## otto
<p>The main <code>otto</code> module containing object spying methods and varioys utility
functions. This module contains the <code>object</code> module in addition to the
static methods applied to <code>otto</code>.</p>

**See**: module:otto/object  

* [otto](#module_otto)
    * [.spyOn(obj, [propName])](#module_otto.spyOn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
    * [.resetSpy(obj, [propName])](#module_otto.resetSpy)
    * [.resetAllSpies(obj, [propName])](#module_otto.resetAllSpies)
    * [.spyOn(obj, [propName])](#module_otto.spyOn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
    * [.resetSpy(obj, [propName])](#module_otto.resetSpy)
    * [.resetAllSpies(obj, [propName])](#module_otto.resetAllSpies)

<a name="module_otto.spyOn"></a>

### otto.spyOn(obj, [propName]) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Spies on the requested object property.</p>

**Kind**: static method of [<code>otto</code>](#module_otto)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>Supports chaining of Spy configuration methods.</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| [propName] | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_otto.resetSpy"></a>

### otto.resetSpy(obj, [propName])
<p>Resets a spy on a given property or spies on an object.</p>

**Kind**: static method of [<code>otto</code>](#module_otto)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| [propName] | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_otto.resetAllSpies"></a>

### otto.resetAllSpies(obj, [propName])
<p>Resets all generated spies.</p>

**Kind**: static method of [<code>otto</code>](#module_otto)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| [propName] | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_otto.spyOn"></a>

### otto.spyOn(obj, [propName]) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Spies on the requested object property.</p>

**Kind**: static method of [<code>otto</code>](#module_otto)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>Supports chaining of Spy configuration methods.</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| [propName] | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_otto.resetSpy"></a>

### otto.resetSpy(obj, [propName])
<p>Resets a spy on a given property or spies on an object.</p>

**Kind**: static method of [<code>otto</code>](#module_otto)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| [propName] | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_otto.resetAllSpies"></a>

### otto.resetAllSpies(obj, [propName])
<p>Resets all generated spies.</p>

**Kind**: static method of [<code>otto</code>](#module_otto)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| [propName] | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_decorateFunction"></a>

## decorateFunction
<p>Function decoration module.</p>


* [decorateFunction](#module_decorateFunction)
    * [~decoratedFunctions](#module_decorateFunction..decoratedFunctions)
    * [~decoratedFunctions](#module_decorateFunction..decoratedFunctions)
    * [~decorateFunction(objOrFxn, [fxnNameOrConfig], [decoratorConfig])](#module_decorateFunction..decorateFunction) ⇒ <code>function</code>
    * [~isDecoratedFunction(func)](#module_decorateFunction..isDecoratedFunction) ⇒ <code>boolean</code>
    * [~revertDecoratedFunction(decoratedFunction)](#module_decorateFunction..revertDecoratedFunction) ⇒ <code>function</code>
    * [~decorateFunction(objOrFxn, [fxnNameOrConfig], [decoratorConfig])](#module_decorateFunction..decorateFunction) ⇒ <code>function</code>
    * [~isDecoratedFunction(func)](#module_decorateFunction..isDecoratedFunction) ⇒ <code>boolean</code>
    * [~revertDecoratedFunction(decoratedFunction)](#module_decorateFunction..revertDecoratedFunction) ⇒ <code>function</code>

<a name="module_decorateFunction..decoratedFunctions"></a>

### decorateFunction~decoratedFunctions
<p>Map of decorated function to original function for use in resetting
decorators.</p>

**Kind**: inner constant of [<code>decorateFunction</code>](#module_decorateFunction)  
**Todo**

- [ ] Be wary of this endlessly growing. Investigate ways to safely
remove without losing the ability to locate the original function for a
directly/indirectly decorated function.

<a name="module_decorateFunction..decoratedFunctions"></a>

### decorateFunction~decoratedFunctions
<p>Map of decorated function to original function for use in resetting
decorators.</p>

**Kind**: inner constant of [<code>decorateFunction</code>](#module_decorateFunction)  
**Todo**

- [ ] Be wary of this endlessly growing. Investigate ways to safely
remove without losing the ability to locate the original function for a
directly/indirectly decorated function.

<a name="module_decorateFunction..decorateFunction"></a>

### decorateFunction~decorateFunction(objOrFxn, [fxnNameOrConfig], [decoratorConfig]) ⇒ <code>function</code>
<p>Decorates a function. If a reference to a method is supplied
i.e. object['functionName'], the method will automatically be replaced with
the decorated version of the method. A reference to the decorated method
will still be returned.</p>

**Kind**: inner method of [<code>decorateFunction</code>](#module_decorateFunction)  
**Returns**: <code>function</code> - <p>The decorated function.</p>  

| Param | Type | Description |
| --- | --- | --- |
| objOrFxn | <code>Object</code> \| <code>function</code> | <p>Either the object containing a method to decorate or the function to decorate itself.</p> |
| [fxnNameOrConfig] | <code>string</code> \| <code>Object</code> | <p>The name of the method to decorate or configuration for function decoration if the function is passed as the first argument.</p> |
| [decoratorConfig] | <code>Object</code> | <p>Configuration for function decoration if the first two arguments are the object and name of function to decorate. <code>after</code>: A function to call after the function to be decorated. <code>before</code>: A function to call before the function to be decorated. <code>callThrough</code>: A boolean indicating whether to progresss through the function once called. Defaults to <code>true</code>. <code>fake</code>: A function to call in place of the function to be decorated. <code>thisArg</code>: The value to be passed as the <code>this</code> parameter to the target function(s) when the decorated function is called. Also applies to <code>after</code>, <code>before</code>, and <code>fake</code>. Defaults to <code>this</code> if decorating a prototype method or the <code>objOrFxn</code> argument pased to <code>decorateFunction</code>.</p> |

<a name="module_decorateFunction..isDecoratedFunction"></a>

### decorateFunction~isDecoratedFunction(func) ⇒ <code>boolean</code>
<p>Returns a boolean asserting whether a function has been decorated via
<code>decorateFunction</code>.</p>

**Kind**: inner method of [<code>decorateFunction</code>](#module_decorateFunction)  
**Returns**: <code>boolean</code> - <p><code>true</code> if the function has been decorated via
<code>decorateFunction</code>; otherwise <code>false</code>.</p>  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | <p>The function to test for decoration.</p> |

<a name="module_decorateFunction..revertDecoratedFunction"></a>

### decorateFunction~revertDecoratedFunction(decoratedFunction) ⇒ <code>function</code>
<p>Reverts function decoration. If a reference to a method had been originally
supplied i.e. object['functionName'], the decorated method will automatically
be reverted to the original method. A reference to the original method will
still be returned.</p>

**Kind**: inner method of [<code>decorateFunction</code>](#module_decorateFunction)  
**Returns**: <code>function</code> - <p>The original function.</p>  

| Param | Type | Description |
| --- | --- | --- |
| decoratedFunction | <code>function</code> | <p>The decorated function to revert.</p> |

<a name="module_decorateFunction..decorateFunction"></a>

### decorateFunction~decorateFunction(objOrFxn, [fxnNameOrConfig], [decoratorConfig]) ⇒ <code>function</code>
<p>Decorates a function. If a reference to a method is supplied
i.e. object['functionName'], the method will automatically be replaced with
the decorated version of the method. A reference to the decorated method
will still be returned.</p>

**Kind**: inner method of [<code>decorateFunction</code>](#module_decorateFunction)  
**Returns**: <code>function</code> - <p>The decorated function.</p>  

| Param | Type | Description |
| --- | --- | --- |
| objOrFxn | <code>Object</code> \| <code>function</code> | <p>Either the object containing a method to decorate or the function to decorate itself.</p> |
| [fxnNameOrConfig] | <code>string</code> \| <code>Object</code> | <p>The name of the method to decorate or configuration for function decoration if the function is passed as the first argument.</p> |
| [decoratorConfig] | <code>Object</code> | <p>Configuration for function decoration if the first two arguments are the object and name of function to decorate. <code>after</code>: A function to call after the function to be decorated. <code>before</code>: A function to call before the function to be decorated. <code>callThrough</code>: A boolean indicating whether to progresss through the function once called. Defaults to <code>true</code>. <code>fake</code>: A function to call in place of the function to be decorated. <code>thisArg</code>: The value to be passed as the <code>this</code> parameter to the target function(s) when the decorated function is called. Also applies to <code>after</code>, <code>before</code>, and <code>fake</code>. Defaults to <code>this</code> if decorating a prototype method or the <code>objOrFxn</code> argument pased to <code>decorateFunction</code>.</p> |

<a name="module_decorateFunction..isDecoratedFunction"></a>

### decorateFunction~isDecoratedFunction(func) ⇒ <code>boolean</code>
<p>Returns a boolean asserting whether a function has been decorated via
<code>decorateFunction</code>.</p>

**Kind**: inner method of [<code>decorateFunction</code>](#module_decorateFunction)  
**Returns**: <code>boolean</code> - <p><code>true</code> if the function has been decorated via
<code>decorateFunction</code>; otherwise <code>false</code>.</p>  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | <p>The function to test for decoration.</p> |

<a name="module_decorateFunction..revertDecoratedFunction"></a>

### decorateFunction~revertDecoratedFunction(decoratedFunction) ⇒ <code>function</code>
<p>Reverts function decoration. If a reference to a method had been originally
supplied i.e. object['functionName'], the decorated method will automatically
be reverted to the original method. A reference to the original method will
still be returned.</p>

**Kind**: inner method of [<code>decorateFunction</code>](#module_decorateFunction)  
**Returns**: <code>function</code> - <p>The original function.</p>  

| Param | Type | Description |
| --- | --- | --- |
| decoratedFunction | <code>function</code> | <p>The decorated function to revert.</p> |

<a name="module_decorateProperty"></a>

## decorateProperty
<p>Object property decoration module.</p>


* [decorateProperty](#module_decorateProperty)
    * [~decorateProperty(obj, propName)](#module_decorateProperty..decorateProperty) ⇒ <code>Object</code>
    * [~revertDecoratedProperty(obj, propName)](#module_decorateProperty..revertDecoratedProperty)
    * [~decorateProperty(obj, propName)](#module_decorateProperty..decorateProperty) ⇒ <code>Object</code>
    * [~revertDecoratedProperty(obj, propName)](#module_decorateProperty..revertDecoratedProperty)

<a name="module_decorateProperty..decorateProperty"></a>

### decorateProperty~decorateProperty(obj, propName) ⇒ <code>Object</code>
<p>Decorates a property's getter and setter to be spied upon.
NOTE: Immediately updates getter/setter methods to be spied. Returns a
reference to the original getter/setter so reset() can be defined in Spy.</p>

**Kind**: inner method of [<code>decorateProperty</code>](#module_decorateProperty)  
**Returns**: <code>Object</code> - <p>An object containing the original getter/setter if present.</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_decorateProperty..revertDecoratedProperty"></a>

### decorateProperty~revertDecoratedProperty(obj, propName)
<p>Reverts property getter and setter decoration.</p>

**Kind**: inner method of [<code>decorateProperty</code>](#module_decorateProperty)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to revert.</p> |
| propName | <code>string</code> | <p>The name of the property to revert.</p> |

<a name="module_decorateProperty..decorateProperty"></a>

### decorateProperty~decorateProperty(obj, propName) ⇒ <code>Object</code>
<p>Decorates a property's getter and setter to be spied upon.
NOTE: Immediately updates getter/setter methods to be spied. Returns a
reference to the original getter/setter so reset() can be defined in Spy.</p>

**Kind**: inner method of [<code>decorateProperty</code>](#module_decorateProperty)  
**Returns**: <code>Object</code> - <p>An object containing the original getter/setter if present.</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="module_decorateProperty..revertDecoratedProperty"></a>

### decorateProperty~revertDecoratedProperty(obj, propName)
<p>Reverts property getter and setter decoration.</p>

**Kind**: inner method of [<code>decorateProperty</code>](#module_decorateProperty)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to revert.</p> |
| propName | <code>string</code> | <p>The name of the property to revert.</p> |

<a name="module_otto/object"></a>

## otto/object
<p>A module of JS object utility functions. Namespaced at <code>otto.object</code>.</p>


* [otto/object](#module_otto/object)
    * [~clone(source)](#module_otto/object..clone) ⇒ <code>\*</code>
    * [~iterateAndCall(source, handler, [condition])](#module_otto/object..iterateAndCall) ⇒ <code>Object</code>
    * [~merge(target, ...sources)](#module_otto/object..merge) ⇒ <code>\*</code>
    * [~mirrorProperties(target, ...sources)](#module_otto/object..mirrorProperties) ⇒ <code>\*</code>
    * [~traverse(source, path)](#module_otto/object..traverse)
    * [~clone(source)](#module_otto/object..clone) ⇒ <code>\*</code>
    * [~iterateAndCall(source, handler, [condition])](#module_otto/object..iterateAndCall) ⇒ <code>Object</code>
    * [~merge(target, ...sources)](#module_otto/object..merge) ⇒ <code>\*</code>
    * [~mirrorProperties(target, ...sources)](#module_otto/object..mirrorProperties) ⇒ <code>\*</code>
    * [~traverse(source, path)](#module_otto/object..traverse)

<a name="module_otto/object..clone"></a>

### otto/object~clone(source) ⇒ <code>\*</code>
<p>Creates a deep copy clone of the source object.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>\*</code> - <p>A clone of the source object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>\*</code> | <p>The source to clone.</p> |

<a name="module_otto/object..iterateAndCall"></a>

### otto/object~iterateAndCall(source, handler, [condition]) ⇒ <code>Object</code>
<p>Iterates over source object and calls sets value of property to result of
calling a handler function on each property value. The handler function will
be called with the value of the current property. An optional condition
function can be passed to test the property value against to determine
whether to call the handler function on that property.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>Object</code> - <p>The updated source object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Object</code> | <p>The object to iterate over.</p> |
| handler | <code>function</code> | <p>The function to call on each property value. The value of the property will be updated if the handler function returns a result.</p> |
| [condition] | <code>function</code> | <p>An optional function to call before calling the handler function, where truthy results will initiate a call to the handler.</p> |

<a name="module_otto/object..merge"></a>

### otto/object~merge(target, ...sources) ⇒ <code>\*</code>
<p>Merges the contents of objects into the target object. Merging a primitive
type or function into the target will overwrite the target argument.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>\*</code> - <p>The merged object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>\*</code> | <p>The target object.</p> |
| ...sources | <code>Array.&lt;\*&gt;</code> | <p>Any number of additional objects to merge.</p> |

<a name="module_otto/object..mirrorProperties"></a>

### otto/object~mirrorProperties(target, ...sources) ⇒ <code>\*</code>
<p>Mirrors properties of objects onto the target object.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>\*</code> - <p>The mirrored object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>\*</code> | <p>The target object.</p> |
| ...sources | <code>Array.&lt;\*&gt;</code> | <p>Any number of additional objects to merge.</p> |

<a name="module_otto/object..traverse"></a>

### otto/object~traverse(source, path)
<p>Safely navigates to a nested object property.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>\*</code> | <p>An object that acts as the starting point for navigation.</p> |
| path | <code>string</code> | <p>The path to the nested object property not including the originating object.</p> |

<a name="module_otto/object..clone"></a>

### otto/object~clone(source) ⇒ <code>\*</code>
<p>Creates a deep copy clone of the source object.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>\*</code> - <p>A clone of the source object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>\*</code> | <p>The source to clone.</p> |

<a name="module_otto/object..iterateAndCall"></a>

### otto/object~iterateAndCall(source, handler, [condition]) ⇒ <code>Object</code>
<p>Iterates over source object and calls sets value of property to result of
calling a handler function on each property value. The handler function will
be called with the value of the current property. An optional condition
function can be passed to test the property value against to determine
whether to call the handler function on that property.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>Object</code> - <p>The updated source object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Object</code> | <p>The object to iterate over.</p> |
| handler | <code>function</code> | <p>The function to call on each property value. The value of the property will be updated if the handler function returns a result.</p> |
| [condition] | <code>function</code> | <p>An optional function to call before calling the handler function, where truthy results will initiate a call to the handler.</p> |

<a name="module_otto/object..merge"></a>

### otto/object~merge(target, ...sources) ⇒ <code>\*</code>
<p>Merges the contents of objects into the target object. Merging a primitive
type or function into the target will overwrite the target argument.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>\*</code> - <p>The merged object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>\*</code> | <p>The target object.</p> |
| ...sources | <code>Array.&lt;\*&gt;</code> | <p>Any number of additional objects to merge.</p> |

<a name="module_otto/object..mirrorProperties"></a>

### otto/object~mirrorProperties(target, ...sources) ⇒ <code>\*</code>
<p>Mirrors properties of objects onto the target object.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  
**Returns**: <code>\*</code> - <p>The mirrored object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>\*</code> | <p>The target object.</p> |
| ...sources | <code>Array.&lt;\*&gt;</code> | <p>Any number of additional objects to merge.</p> |

<a name="module_otto/object..traverse"></a>

### otto/object~traverse(source, path)
<p>Safely navigates to a nested object property.</p>

**Kind**: inner method of [<code>otto/object</code>](#module_otto/object)  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>\*</code> | <p>An object that acts as the starting point for navigation.</p> |
| path | <code>string</code> | <p>The path to the nested object property not including the originating object.</p> |

<a name="Spy"></a>

## Spy
<p>Monitors and responds to object function calls and property value updates.</p>

**Kind**: global class  

* [Spy](#Spy)
    * [new Spy(obj, propName)](#new_Spy_new)
    * [new Spy(obj, propName)](#new_Spy_new)
    * _instance_
        * [.active](#Spy+active) : <code>boolean</code>
        * [.callThrough](#Spy+callThrough) : <code>boolean</code>
        * [.active](#Spy+active) : <code>boolean</code>
        * [.callThrough](#Spy+callThrough) : <code>boolean</code>
        * [.reset()](#Spy+reset) : <code>function</code>
        * [.initiate(obj, propName)](#Spy+initiate)
        * [.reset()](#Spy+reset) : <code>function</code>
        * [.initiate(obj, propName)](#Spy+initiate)
    * _static_
        * [.resetAllSpies()](#Spy.resetAllSpies)
        * [.resetAllSpies()](#Spy.resetAllSpies)
    * _inner_
        * [~decorateFunctionForSpy](#Spy..decorateFunctionForSpy) : <code>object</code>
        * [~decoratePropertyForSpy](#Spy..decoratePropertyForSpy) : <code>object</code>
        * [~decorateFunctionForSpy](#Spy..decorateFunctionForSpy) : <code>object</code>
        * [~decoratePropertyForSpy](#Spy..decoratePropertyForSpy) : <code>object</code>

<a name="new_Spy_new"></a>

### new Spy(obj, propName)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="new_Spy_new"></a>

### new Spy(obj, propName)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="Spy+active"></a>

### spy.active : <code>boolean</code>
<p>The active status of the spy.</p>

**Kind**: instance property of [<code>Spy</code>](#Spy)  
<a name="Spy+callThrough"></a>

### spy.callThrough : <code>boolean</code>
<p>Indicates whether the function call should be completed when spying
on object methods.</p>

**Kind**: instance property of [<code>Spy</code>](#Spy)  
<a name="Spy+active"></a>

### spy.active : <code>boolean</code>
<p>The active status of the spy.</p>

**Kind**: instance property of [<code>Spy</code>](#Spy)  
<a name="Spy+callThrough"></a>

### spy.callThrough : <code>boolean</code>
<p>Indicates whether the function call should be completed when spying
on object methods.</p>

**Kind**: instance property of [<code>Spy</code>](#Spy)  
<a name="Spy+reset"></a>

### spy.reset() : <code>function</code>
<p>Removes the spy on the object property.</p>

**Kind**: instance method of [<code>Spy</code>](#Spy)  
<a name="Spy+initiate"></a>

### spy.initiate(obj, propName)
<p>Initiates spying.</p>

**Kind**: instance method of [<code>Spy</code>](#Spy)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="Spy+reset"></a>

### spy.reset() : <code>function</code>
<p>Removes the spy on the object property.</p>

**Kind**: instance method of [<code>Spy</code>](#Spy)  
<a name="Spy+initiate"></a>

### spy.initiate(obj, propName)
<p>Initiates spying.</p>

**Kind**: instance method of [<code>Spy</code>](#Spy)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="Spy.resetAllSpies"></a>

### Spy.resetAllSpies()
<p>Resets all known instantiated spies.</p>

**Kind**: static method of [<code>Spy</code>](#Spy)  
<a name="Spy.resetAllSpies"></a>

### Spy.resetAllSpies()
<p>Resets all known instantiated spies.</p>

**Kind**: static method of [<code>Spy</code>](#Spy)  
<a name="Spy..decorateFunctionForSpy"></a>

### Spy~decorateFunctionForSpy : <code>object</code>
<p>Decorates a function to be spied upon.</p>

**Kind**: inner namespace of [<code>Spy</code>](#Spy)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the function to spy on.</p> |
| functionName | <code>string</code> | <p>The name of the function to spy on.</p> |

<a name="Spy..decoratePropertyForSpy"></a>

### Spy~decoratePropertyForSpy : <code>object</code>
<p>Decorates a property's getter/setter to be spied upon.</p>

**Kind**: inner namespace of [<code>Spy</code>](#Spy)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="Spy..decorateFunctionForSpy"></a>

### Spy~decorateFunctionForSpy : <code>object</code>
<p>Decorates a function to be spied upon.</p>

**Kind**: inner namespace of [<code>Spy</code>](#Spy)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the function to spy on.</p> |
| functionName | <code>string</code> | <p>The name of the function to spy on.</p> |

<a name="Spy..decoratePropertyForSpy"></a>

### Spy~decoratePropertyForSpy : <code>object</code>
<p>Decorates a property's getter/setter to be spied upon.</p>

**Kind**: inner namespace of [<code>Spy</code>](#Spy)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="SpyOnModule"></a>

## SpyOnModule
<p>Chainable module that allows for configuration of a Spy after it has been
initially deployed. The self-referential property <code>and</code> can be used for
natural language chaining.</p>

**Kind**: global class  
**See**: [Spy](#Spy)  

* [SpyOnModule](#SpyOnModule)
    * [new SpyOnModule(obj, propName, spies)](#new_SpyOnModule_new)
    * [new SpyOnModule(obj, propName, spies)](#new_SpyOnModule_new)
    * [.obj](#SpyOnModule+obj) : <code>Object</code>
    * [.propName](#SpyOnModule+propName) : <code>string</code> \| <code>undefined</code>
    * [.spies](#SpyOnModule+spies) : [<code>Array.&lt;Spy&gt;</code>](#Spy)
    * [.obj](#SpyOnModule+obj) : <code>Object</code>
    * [.propName](#SpyOnModule+propName) : <code>string</code> \| <code>undefined</code>
    * [.spies](#SpyOnModule+spies) : [<code>Array.&lt;Spy&gt;</code>](#Spy)
    * [.callAfter(afterFxn)](#SpyOnModule+callAfter) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
    * [.callBefore(beforeFxn)](#SpyOnModule+callBefore) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
    * [.callFake(fakeFxn)](#SpyOnModule+callFake) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
    * [.callAfter(afterFxn)](#SpyOnModule+callAfter) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
    * [.callBefore(beforeFxn)](#SpyOnModule+callBefore) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
    * [.callFake(fakeFxn)](#SpyOnModule+callFake) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)

<a name="new_SpyOnModule_new"></a>

### new SpyOnModule(obj, propName, spies)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |
| spies | [<code>Array.&lt;Spy&gt;</code>](#Spy) | <p>The instantiated spies.</p> |

<a name="new_SpyOnModule_new"></a>

### new SpyOnModule(obj, propName, spies)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |
| spies | [<code>Array.&lt;Spy&gt;</code>](#Spy) | <p>The instantiated spies.</p> |

<a name="SpyOnModule+obj"></a>

### spyOnModule.obj : <code>Object</code>
<p>The object being spied.</p>

**Kind**: instance property of [<code>SpyOnModule</code>](#SpyOnModule)  
<a name="SpyOnModule+propName"></a>

### spyOnModule.propName : <code>string</code> \| <code>undefined</code>
<p>The name of the object property being spied.</p>

**Kind**: instance property of [<code>SpyOnModule</code>](#SpyOnModule)  
<a name="SpyOnModule+spies"></a>

### spyOnModule.spies : [<code>Array.&lt;Spy&gt;</code>](#Spy)
<p>A list of spies deployed to the specified object location.</p>

**Kind**: instance property of [<code>SpyOnModule</code>](#SpyOnModule)  
<a name="SpyOnModule+obj"></a>

### spyOnModule.obj : <code>Object</code>
<p>The object being spied.</p>

**Kind**: instance property of [<code>SpyOnModule</code>](#SpyOnModule)  
<a name="SpyOnModule+propName"></a>

### spyOnModule.propName : <code>string</code> \| <code>undefined</code>
<p>The name of the object property being spied.</p>

**Kind**: instance property of [<code>SpyOnModule</code>](#SpyOnModule)  
<a name="SpyOnModule+spies"></a>

### spyOnModule.spies : [<code>Array.&lt;Spy&gt;</code>](#Spy)
<p>A list of spies deployed to the specified object location.</p>

**Kind**: instance property of [<code>SpyOnModule</code>](#SpyOnModule)  
<a name="SpyOnModule+callAfter"></a>

### spyOnModule.callAfter(afterFxn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Specifies a function to call after calling the spied function. The after
function will be called with the return result of the spied function.</p>

**Kind**: instance method of [<code>SpyOnModule</code>](#SpyOnModule)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>The current module instance.</p>  

| Param | Type | Description |
| --- | --- | --- |
| afterFxn | <code>function</code> | <p>A function to call after the spied function.</p> |

<a name="SpyOnModule+callBefore"></a>

### spyOnModule.callBefore(beforeFxn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Specifies a function to call before calling the spied function. The
before function will be called with the same arguments passed to the
spied function.</p>

**Kind**: instance method of [<code>SpyOnModule</code>](#SpyOnModule)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>The current module instance.</p>  

| Param | Type | Description |
| --- | --- | --- |
| beforeFxn | <code>function</code> | <p>A function to call before the spied function.</p> |

<a name="SpyOnModule+callFake"></a>

### spyOnModule.callFake(fakeFxn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Specifies a fake function to call when calling spied function.</p>

**Kind**: instance method of [<code>SpyOnModule</code>](#SpyOnModule)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>The current module instance.</p>  

| Param | Type | Description |
| --- | --- | --- |
| fakeFxn | <code>function</code> | <p>A fake function to call in place of the original function.</p> |

<a name="SpyOnModule+callAfter"></a>

### spyOnModule.callAfter(afterFxn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Specifies a function to call after calling the spied function. The after
function will be called with the return result of the spied function.</p>

**Kind**: instance method of [<code>SpyOnModule</code>](#SpyOnModule)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>The current module instance.</p>  

| Param | Type | Description |
| --- | --- | --- |
| afterFxn | <code>function</code> | <p>A function to call after the spied function.</p> |

<a name="SpyOnModule+callBefore"></a>

### spyOnModule.callBefore(beforeFxn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Specifies a function to call before calling the spied function. The
before function will be called with the same arguments passed to the
spied function.</p>

**Kind**: instance method of [<code>SpyOnModule</code>](#SpyOnModule)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>The current module instance.</p>  

| Param | Type | Description |
| --- | --- | --- |
| beforeFxn | <code>function</code> | <p>A function to call before the spied function.</p> |

<a name="SpyOnModule+callFake"></a>

### spyOnModule.callFake(fakeFxn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Specifies a fake function to call when calling spied function.</p>

**Kind**: instance method of [<code>SpyOnModule</code>](#SpyOnModule)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>The current module instance.</p>  

| Param | Type | Description |
| --- | --- | --- |
| fakeFxn | <code>function</code> | <p>A fake function to call in place of the original function.</p> |

<a name="Spy"></a>

## Spy
<p>Monitors and responds to object function calls and property value updates.</p>

**Kind**: global class  

* [Spy](#Spy)
    * [new Spy(obj, propName)](#new_Spy_new)
    * [new Spy(obj, propName)](#new_Spy_new)
    * _instance_
        * [.active](#Spy+active) : <code>boolean</code>
        * [.callThrough](#Spy+callThrough) : <code>boolean</code>
        * [.active](#Spy+active) : <code>boolean</code>
        * [.callThrough](#Spy+callThrough) : <code>boolean</code>
        * [.reset()](#Spy+reset) : <code>function</code>
        * [.initiate(obj, propName)](#Spy+initiate)
        * [.reset()](#Spy+reset) : <code>function</code>
        * [.initiate(obj, propName)](#Spy+initiate)
    * _static_
        * [.resetAllSpies()](#Spy.resetAllSpies)
        * [.resetAllSpies()](#Spy.resetAllSpies)
    * _inner_
        * [~decorateFunctionForSpy](#Spy..decorateFunctionForSpy) : <code>object</code>
        * [~decoratePropertyForSpy](#Spy..decoratePropertyForSpy) : <code>object</code>
        * [~decorateFunctionForSpy](#Spy..decorateFunctionForSpy) : <code>object</code>
        * [~decoratePropertyForSpy](#Spy..decoratePropertyForSpy) : <code>object</code>

<a name="new_Spy_new"></a>

### new Spy(obj, propName)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="new_Spy_new"></a>

### new Spy(obj, propName)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="Spy+active"></a>

### spy.active : <code>boolean</code>
<p>The active status of the spy.</p>

**Kind**: instance property of [<code>Spy</code>](#Spy)  
<a name="Spy+callThrough"></a>

### spy.callThrough : <code>boolean</code>
<p>Indicates whether the function call should be completed when spying
on object methods.</p>

**Kind**: instance property of [<code>Spy</code>](#Spy)  
<a name="Spy+active"></a>

### spy.active : <code>boolean</code>
<p>The active status of the spy.</p>

**Kind**: instance property of [<code>Spy</code>](#Spy)  
<a name="Spy+callThrough"></a>

### spy.callThrough : <code>boolean</code>
<p>Indicates whether the function call should be completed when spying
on object methods.</p>

**Kind**: instance property of [<code>Spy</code>](#Spy)  
<a name="Spy+reset"></a>

### spy.reset() : <code>function</code>
<p>Removes the spy on the object property.</p>

**Kind**: instance method of [<code>Spy</code>](#Spy)  
<a name="Spy+initiate"></a>

### spy.initiate(obj, propName)
<p>Initiates spying.</p>

**Kind**: instance method of [<code>Spy</code>](#Spy)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="Spy+reset"></a>

### spy.reset() : <code>function</code>
<p>Removes the spy on the object property.</p>

**Kind**: instance method of [<code>Spy</code>](#Spy)  
<a name="Spy+initiate"></a>

### spy.initiate(obj, propName)
<p>Initiates spying.</p>

**Kind**: instance method of [<code>Spy</code>](#Spy)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="Spy.resetAllSpies"></a>

### Spy.resetAllSpies()
<p>Resets all known instantiated spies.</p>

**Kind**: static method of [<code>Spy</code>](#Spy)  
<a name="Spy.resetAllSpies"></a>

### Spy.resetAllSpies()
<p>Resets all known instantiated spies.</p>

**Kind**: static method of [<code>Spy</code>](#Spy)  
<a name="Spy..decorateFunctionForSpy"></a>

### Spy~decorateFunctionForSpy : <code>object</code>
<p>Decorates a function to be spied upon.</p>

**Kind**: inner namespace of [<code>Spy</code>](#Spy)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the function to spy on.</p> |
| functionName | <code>string</code> | <p>The name of the function to spy on.</p> |

<a name="Spy..decoratePropertyForSpy"></a>

### Spy~decoratePropertyForSpy : <code>object</code>
<p>Decorates a property's getter/setter to be spied upon.</p>

**Kind**: inner namespace of [<code>Spy</code>](#Spy)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="Spy..decorateFunctionForSpy"></a>

### Spy~decorateFunctionForSpy : <code>object</code>
<p>Decorates a function to be spied upon.</p>

**Kind**: inner namespace of [<code>Spy</code>](#Spy)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the function to spy on.</p> |
| functionName | <code>string</code> | <p>The name of the function to spy on.</p> |

<a name="Spy..decoratePropertyForSpy"></a>

### Spy~decoratePropertyForSpy : <code>object</code>
<p>Decorates a property's getter/setter to be spied upon.</p>

**Kind**: inner namespace of [<code>Spy</code>](#Spy)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |

<a name="SpyOnModule"></a>

## SpyOnModule
<p>Chainable module that allows for configuration of a Spy after it has been
initially deployed. The self-referential property <code>and</code> can be used for
natural language chaining.</p>

**Kind**: global class  
**See**: [Spy](#Spy)  

* [SpyOnModule](#SpyOnModule)
    * [new SpyOnModule(obj, propName, spies)](#new_SpyOnModule_new)
    * [new SpyOnModule(obj, propName, spies)](#new_SpyOnModule_new)
    * [.obj](#SpyOnModule+obj) : <code>Object</code>
    * [.propName](#SpyOnModule+propName) : <code>string</code> \| <code>undefined</code>
    * [.spies](#SpyOnModule+spies) : [<code>Array.&lt;Spy&gt;</code>](#Spy)
    * [.obj](#SpyOnModule+obj) : <code>Object</code>
    * [.propName](#SpyOnModule+propName) : <code>string</code> \| <code>undefined</code>
    * [.spies](#SpyOnModule+spies) : [<code>Array.&lt;Spy&gt;</code>](#Spy)
    * [.callAfter(afterFxn)](#SpyOnModule+callAfter) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
    * [.callBefore(beforeFxn)](#SpyOnModule+callBefore) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
    * [.callFake(fakeFxn)](#SpyOnModule+callFake) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
    * [.callAfter(afterFxn)](#SpyOnModule+callAfter) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
    * [.callBefore(beforeFxn)](#SpyOnModule+callBefore) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
    * [.callFake(fakeFxn)](#SpyOnModule+callFake) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)

<a name="new_SpyOnModule_new"></a>

### new SpyOnModule(obj, propName, spies)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |
| spies | [<code>Array.&lt;Spy&gt;</code>](#Spy) | <p>The instantiated spies.</p> |

<a name="new_SpyOnModule_new"></a>

### new SpyOnModule(obj, propName, spies)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>The object containing the property to spy on.</p> |
| propName | <code>string</code> | <p>The name of the property to spy on.</p> |
| spies | [<code>Array.&lt;Spy&gt;</code>](#Spy) | <p>The instantiated spies.</p> |

<a name="SpyOnModule+obj"></a>

### spyOnModule.obj : <code>Object</code>
<p>The object being spied.</p>

**Kind**: instance property of [<code>SpyOnModule</code>](#SpyOnModule)  
<a name="SpyOnModule+propName"></a>

### spyOnModule.propName : <code>string</code> \| <code>undefined</code>
<p>The name of the object property being spied.</p>

**Kind**: instance property of [<code>SpyOnModule</code>](#SpyOnModule)  
<a name="SpyOnModule+spies"></a>

### spyOnModule.spies : [<code>Array.&lt;Spy&gt;</code>](#Spy)
<p>A list of spies deployed to the specified object location.</p>

**Kind**: instance property of [<code>SpyOnModule</code>](#SpyOnModule)  
<a name="SpyOnModule+obj"></a>

### spyOnModule.obj : <code>Object</code>
<p>The object being spied.</p>

**Kind**: instance property of [<code>SpyOnModule</code>](#SpyOnModule)  
<a name="SpyOnModule+propName"></a>

### spyOnModule.propName : <code>string</code> \| <code>undefined</code>
<p>The name of the object property being spied.</p>

**Kind**: instance property of [<code>SpyOnModule</code>](#SpyOnModule)  
<a name="SpyOnModule+spies"></a>

### spyOnModule.spies : [<code>Array.&lt;Spy&gt;</code>](#Spy)
<p>A list of spies deployed to the specified object location.</p>

**Kind**: instance property of [<code>SpyOnModule</code>](#SpyOnModule)  
<a name="SpyOnModule+callAfter"></a>

### spyOnModule.callAfter(afterFxn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Specifies a function to call after calling the spied function. The after
function will be called with the return result of the spied function.</p>

**Kind**: instance method of [<code>SpyOnModule</code>](#SpyOnModule)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>The current module instance.</p>  

| Param | Type | Description |
| --- | --- | --- |
| afterFxn | <code>function</code> | <p>A function to call after the spied function.</p> |

<a name="SpyOnModule+callBefore"></a>

### spyOnModule.callBefore(beforeFxn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Specifies a function to call before calling the spied function. The
before function will be called with the same arguments passed to the
spied function.</p>

**Kind**: instance method of [<code>SpyOnModule</code>](#SpyOnModule)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>The current module instance.</p>  

| Param | Type | Description |
| --- | --- | --- |
| beforeFxn | <code>function</code> | <p>A function to call before the spied function.</p> |

<a name="SpyOnModule+callFake"></a>

### spyOnModule.callFake(fakeFxn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Specifies a fake function to call when calling spied function.</p>

**Kind**: instance method of [<code>SpyOnModule</code>](#SpyOnModule)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>The current module instance.</p>  

| Param | Type | Description |
| --- | --- | --- |
| fakeFxn | <code>function</code> | <p>A fake function to call in place of the original function.</p> |

<a name="SpyOnModule+callAfter"></a>

### spyOnModule.callAfter(afterFxn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Specifies a function to call after calling the spied function. The after
function will be called with the return result of the spied function.</p>

**Kind**: instance method of [<code>SpyOnModule</code>](#SpyOnModule)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>The current module instance.</p>  

| Param | Type | Description |
| --- | --- | --- |
| afterFxn | <code>function</code> | <p>A function to call after the spied function.</p> |

<a name="SpyOnModule+callBefore"></a>

### spyOnModule.callBefore(beforeFxn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Specifies a function to call before calling the spied function. The
before function will be called with the same arguments passed to the
spied function.</p>

**Kind**: instance method of [<code>SpyOnModule</code>](#SpyOnModule)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>The current module instance.</p>  

| Param | Type | Description |
| --- | --- | --- |
| beforeFxn | <code>function</code> | <p>A function to call before the spied function.</p> |

<a name="SpyOnModule+callFake"></a>

### spyOnModule.callFake(fakeFxn) ⇒ [<code>SpyOnModule</code>](#SpyOnModule)
<p>Specifies a fake function to call when calling spied function.</p>

**Kind**: instance method of [<code>SpyOnModule</code>](#SpyOnModule)  
**Returns**: [<code>SpyOnModule</code>](#SpyOnModule) - <p>The current module instance.</p>  

| Param | Type | Description |
| --- | --- | --- |
| fakeFxn | <code>function</code> | <p>A fake function to call in place of the original function.</p> |

