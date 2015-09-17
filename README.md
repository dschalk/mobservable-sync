Cows and horses.

The included index.html file is ready to go. Just load it into a browser as a file or with a web server.
If you modify the code, you will need to run the following code from your terminal:
```javascript
npm install
webpack
```
"npm install" installs a "node_modules" directory. After that, all you need to run is "webpack". Webpack loads everything you need into a file named "bundle.js" which is referenced in a script in "index.html". After that, you are good to go.

This demo is running online at [http://transcendent.ninja](http://transcendent.ninja).

If you move "index.html" to a new location, be sure to take "bundle.js" with it.

A development server is included in this repository, so you can view the buttons on port 8080 by entering:
```javascript
webpack-dev-server
```
Quite a bit of commentary is included with the online app at [http://schalk.ninja](http://schalk.ninja), where explanations can be seen next to running code.

The monads are instances of the following classes:
```javascript
class Monad {
  constructor(z) {

    this.x = mobservable.makeReactive(z);

    this.bnd = (func, ...args) => {
      return func(this.x(), ...args);
    };

    this.ret = (a) => {
      this.x(a);
      return this;
    };
  }
};

class MonadObject {
  constructor(ob) {

    this.x = mobservable.makeReactive(ob);

    this.bnd = (func, ...args) => {
      return func(this.x, ...args);
    };

    this.ret = w => {
      Object.assign(this.x, w);
      return this;
    }
  }
}

class MonadArray {
  constructor(z) {

    this.x = mobservable.makeReactive(z);

    this.bnd = (func, ...args) => {
      return func(this.x, ...args);
    };

    this.ret = (a) => {
      this.x.replace(a);
      return this;
    };
  }
};

```
The 'bnd' method's first argument, 'func', maps from the value of the calling monad to an instance of the calling monad's class. For example, 'obDouble' doubles the value of each element of its argument (or concatenates them with themselves if they are strings). monadObject.bnd(obDouble) applies obDouble to monadObjects value. The code is:
```javascript
obDouble = x => {
  for (let o in x) {
    x[o] = x[o] + x[o];
  }
  return new MonadObject(x);
}
```
The function 'obReplace' is more complex.
```javascript
obReplace = (x,y) => {
  for (let e in y) {
    x[e] = y[e];
  }
  return new MonadObject(x);
}
```
Here is 'Example 9' from the demonstration:
```javascript
onClick={() => {this.mo1.ret({a: 3, b: 3, c: 3}).bnd(this.mo2.ret).bnd(this.obCube).bnd(this.mo3.ret).bnd(this.obReplace, ({a: 'Done', b: 'b', c: 'c'}))}}
```
'ret' with an argument at the beginning gives 'mo1' a value of '{a: 3, b: 3, c: 3}'. 'ret' in '.bnd(this.mo2.ret)' shifts the target to the mo2 monad so '.bnd(this.obCube)' causes the value '{a: 27, b: 27, c: 27}' to be placed in monad 'mo2'.

In the Haskell programming language, bind is represented by '>>='. In order to be a member of the Monad type class, an entity must conform with the following three rules:
```javascript
return a >>= k             = k a
m >>= return               = m
m >>= (\x -> k x >>= h)    = (m >>= k) >>= h
```
In this demonstration, 'bnd' is the counterpart to '>>=' and 'ret' is counterpart to 'return'. The monad rules are obeyed in all of the examples. That means that the entities described herein have a certain degree of predictability and flexibility, and that code from other programming languages, such as Haskell, might be adapted to serve useful purposes in our coding endeavors.

Although I call them monads, the entities described herein are already a generalization of "monoids in the category of endofunctors"; i.e., the strict definition of monads. The "monads" defined in this demonstration have capabilities beyond those of standard Haskell monads. Haskell monads can bind to very complicated functions, but the functions are not subject to modification on the fly by giving bind supplemental arguments. In this demonstration, the 'bnd' method can accept arguments in addition to a function as we saw in obReplace above, or in the following function on monads with primitive values:
```javascript
mAdd = (z,w) => {
  this.m.x(z + w);
  return new Monad(this.m.x());
}
```
In the first example in the "Working With Numbers" section, the code
```javascript
this.m.bnd(this.mAdd,100)
```
increases the value of m by 100 every time the button is clicked. If these creations turn out to be useful, maybe it will be helpful to know that whenever 'bnd' has only one argument, they are likely to behave as monads.

The monad construct seems like a sensible base from which to create whatever turns out to be fun or useful. So, for what they are worth, here they are.
