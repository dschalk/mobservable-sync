'use strict'
import React from'react';
import mobservable from 'mobservable';
// import {reactiveComponent} from 'mobservable-react';
let reactiveComponent = require('mobservable-react').reactiveComponent;
// let reactMixin = require('react-mixin');
export {B2};

let mouseHandlerx = {
    27: '#000',
    270: 'darkred',
    28: 'burlywood',
    37: '#000',
    370: 'darkred',
    38: 'burlywood',
    47: '#000',
    470: 'darkred',
    48: 'burlywood',
    57: '#000',
    570: 'darkred',
    58: 'burlywood',
    67: '#000',
    670: 'darkred',
    68: 'burlywood',
    77: '#000',
    770: 'darkred',
    78: 'burlywood',
    87: '#000',
    870: 'darkred',
    88: 'burlywood',
    97: '#000',
    970: 'darkred',
    98: 'burlywood',
    107: '#000',
    1070: 'darkred',
    108: 'burlywood',
    117: '#000',
    1170: 'darkred',
    118: 'burlywood',
    127: '#000',
    1270: 'darkred',
    128: 'burlywood',
    137: '#000',
    1370: 'darkred',
    138: 'burlywood'
};

let mouseHandler = mobservable.makeReactive(mouseHandlerx);

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

let fibData = {
  a: 1,
  b: 1,
  m3: new Monad(1)
};

fibData.m3.x.observe(function(m,k) {
  fibData.a = m;
  fibData.b = k;
});

@reactiveComponent class B2 extends React.Component {
  constructor(props) {
    super(props);
    this.mouse = mouseHandler;
    this.m = new Monad(1);
    this.m2 = new Monad(0);
    this.ma1 = new MonadArray([1,1,3]);
    this.ma2 = new MonadArray([0,0,0]);
    this.mo1 = new MonadObject({a: 1, b: 2, c: 3});
    this.mo2 = new MonadObject({a: 'one', b: 'two', c: 'three'});
    this.mo3 = new MonadObject({a: 'Waiting', b: 'b', c: 'c'});
    this.m3 = fibData.m3
    this.m.x.observe(function(a,b) {
      console.log('m changed from ' + b + ' to ' + a);
    });
  }

  fibo = x => {
    this.m3.x(fibData.a + fibData.b);
    return new Monad(this.m.x());
  }

  fibCalc = ([a,b,c]) => {
    this.ma1.x.replace([a+b,a,c+1]);
    return new MonadArray(this.ma1.x);
  }

  add1Calc = ([a,b,c]) => {
    this.ma2.x.replace([a+1,b+1,c+1]);
    return new MonadArray(this.ma2.x);
  }

  mult10Calc = ([a,b,c]) => {
    this.ma2.x.replace([a*10,b*10,c*10]);
    return new MonadArray(this.ma2.x);
  }

  add1_mult10_Calc = x => {
    let d = this.add1Calc(x);
    d.bnd(this.mult10Calc);
  }

  obDouble = x => {
    for (let o in x) {
      x[o] = x[o] + x[o];
    }
    return new MonadObject(x);
  }

  obTripple = x => {
    for (let c in x) {
      x[c] = 3*x[c];
    }
    return new MonadObject(x);
  }

  obCube = x => {
    for (let o in x) {
      x[o] = x[o]*x[o]*x[o];
    }
    return new MonadObject(x);
  }

  obReplace = (x,y) => {
    for (let e in y) {
      x[e] = y[e];
    }
    return new MonadObject(x);
  }

  obSixTimes = x => {
    let monadObject = this.obTripple(x);
    monadObject.bnd(this.obDouble);
    return monadObject;
  }

  mAdd = (z,w) => {
    this.m.x(z + w);
    return new Monad(this.m.x());
  }

  fmSubtract1 = w => {
    this.m.x(w - 1);
    return new Monad(this.m.x());
  }

  fmSquare = w => {
    this.m.x(w * w);
    return new Monad(this.m.x());
  }

  fmAdd_then_Square = w => {
    this.m.x(w + 1);
    let z = this.m.x();
    this.m.x(z * z);
    return new Monad(this.m.x());
  };

  reset_1 = () => {
    this.m.x(1);
    return new Monad(this.m.x());
  }

  reset_2 = () => {
    this.m2.x(0);
    return new Monad(this.m.x());
  }

  reset_3 = () => {
    this.m3.x(1);
    fibData.a = 1;
    fibData.b = 1;
    return new Monad(this.m.x());
  }

  style8 = (x,y,z) => {return {backgroundColor: x, textAlign: 'left', borderColor: y, outline: 0,
    color: z, borderRadius: 10, paddingTop: 1.1, paddingBottom: 0.9, marginRight: 3, marginLeft: 12, fontSize: 20 }};

  // style9 = (w,x,y,z) => {return {display: w, backgroundColor: x, textAlign: 'left', borderColor: y, outline: 0,
  // color: z, borderRadius: 10, paddingTop: 1.1, paddingBottom: 0.9, marginRight: 3, marginLeft: 12, fontSize: 20 }};

  render = () => {
    let cr27 = this.mouse[27];
    let cr270 = this.mouse[270];
    let cr28 = this.mouse[28];
    let cr37 = this.mouse[37];
    let cr370 = this.mouse[370];
    let cr38 = this.mouse[38];
    let cr47 = this.mouse[47];
    let cr470 = this.mouse[470];
    let cr48 = this.mouse[48];
    let cr57 = this.mouse[57];
    let cr570 = this.mouse[570];
    let cr58 = this.mouse[58];
    let cr67 = this.mouse[67];
    let cr670 = this.mouse[670];
    let cr68 = this.mouse[68];
    let cr77 = this.mouse[77];
    let cr770 = this.mouse[770];
    let cr78 = this.mouse[78];
    let cr87 = this.mouse[87];
    let cr870 = this.mouse[870];
    let cr88 = this.mouse[88];
    let cr97 = this.mouse[97];
    let cr970 = this.mouse[970];
    let cr98 = this.mouse[98];
    let cr107 = this.mouse[107];
    let cr1070 = this.mouse[1070];
    let cr108 = this.mouse[108];
    let cr117 = this.mouse[117];
    let cr1170 = this.mouse[1170];
    let cr118 = this.mouse[118];
    let cr127 = this.mouse[127];
    let cr1270 = this.mouse[1270];
    let cr128 = this.mouse[128];
    let cr137 = this.mouse[137];
    let cr1370 = this.mouse[1370];
    let cr138 = this.mouse[138];

    return (
      <div style={{ backgroundColor: '#000', height: 8800, width: '100%', color: '#FFE4C4', fontSize: 24 }}>
 <div style={{ width: '30%', fontSize: 24, position: 'fixed', top: 300, right: 5}}  >
   <span> Monad mo1 <button style={this.style8('blue','lightblue','yellow')} >{this.mo1.x.a}, {this.mo1.x.b}, {this.mo1.x.c}</button> </span> <br />
   <span> Monad mo2 <button style={this.style8('blue','lightblue','yellow')} >{this.mo2.x.a}, {this.mo2.x.b}, {this.mo2.x.c}</button> </span> <br />
   <span> Monad ma3 <button style={this.style8('blue','lightblue','yellow')} >{this.mo3.x.a}</button> </span> <br />

   <span> Monad m: <button  style={this.style8('blue','lightblue','yellow')} >{this.m.x()}</button> </span> <br />
   <span> Monad m2: <button style={this.style8('blue','lightblue','yellow')} >{this.m2.x()}</button> </span> <br />
   <span> Monad m3: <button style={this.style8('blue','lightblue','yellow')} >{this.m3.x()}</button> </span> <br />
   <span> Monad ma1 <button style={this.style8('blue','lightblue','yellow')} >{this.ma1.x[0]}, {this.ma1.x[1]}, {this.ma1.x[2]}</button> </span> <br />
   <span> Monad ma2 <button style={this.style8('blue','lightblue','yellow')} >{this.ma2.x[0]}, {this.ma2.x[1]}, {this.ma2.x[2]}</button> </span> <br />
 </div>
      <br /><br /><br />
        <h1 style={{textAlign: 'center'}} >Mobservable Monads</h1>
        <div style={{fontStyle: 'italic', textAlign: 'center' }}>
          If it walks like a duck, and quacks like a duck, it probably is a duck. </div>
  <div style={{ width: '65%', textAlign: 'left', marginLeft: 40, marginRight: 40 }} >
    <p> Mobservable reactive entities contain values. I added 'bind'(a/k/a '>>=') and 'return' and tested to see if reactive primitives obey the three monad laws, which are left identity, right identity, and associativity. They did. I then wrote the Monad class to encapsulate the value, and made the constructor's argument a reactive attribute of the class. This was necessary in order to make the primitive monad constructor class similar to the object and array monad constructors, with the thought that they might be consolidated in the future. In the tests below, the monads of all three types demonstrated adherence to the three monad laws mentioned above.  </p>
     <p>This demonstration does not contain formal proofs, but I'm calling these creations 'monads'. I will begin with a demonstration of object monads</p>
        <h2 style={{textAlign: 'center' }} >Working With Objects</h2>
          Instances of MonadObject seem to be behaving just like Haskell monads <br /><br />
          The functions used by 'bnd' are maps from values to MonadObject instances. If m be an instance of MonadObject with value a. Then m.bnd(f) returns a new instance of MonadObject with a new value determined by f(a). <br /><br />
          The result of this activity inside of m is that, for all practical purposes, m is no different than before, except that its value has changed. This is reminiscent of Haskell's MVar, which doesn't exactly get mutated although its value can be removed and replaced. <br /><br />
          'm.ret' is defined to take an argument and make it the new value of m. As we see in the first example below, binding 'ret' to mo1 has no effect.

    It would be inconvenient to show the code here since object brackets, even inside of quotation marks, are treated as code. The code is at <a href="https://github.com/dschalk/mobservable-monads" style={{color: '#f26d6d' }}>https://github.com/dschalk/mobservable-monads</a>. Instead of showing the precise code for objects, I will just write out what they contain.
    <br /><br />

Example 1, illustrating the right identity property of monads.<br />
    ".bnd(this.mo1.ret)" has no effect. The following code does exactly what "Example 4" does.
          <button style={this.style8(cr77,cr770,cr78)} onClick={() => {this.mo1.bnd(this.obDouble).bnd(this.mo1.ret).bnd(this.obTripple)}}
            onMouseEnter={() => {this.mouse[77] = 'blue', this.mouse[770] = 'lightblue', this.mouse[78] = 'yellow'}}
            onMouseLeave={() => {this.mouse[77] = '#000', this.mouse[770] = 'darkred', this.mouse[78] = 'burlywood'}}
            >
          Click to see "this.mo1.bnd(this.obDouble).bnd(this.mo1.ret).bnd(this.obTripple)".
          </button>
          <br /><br />

Example 2, illustrating the left identity property of monads in conjunction with Example 3..
          <button style={this.style8(cr87,cr870,cr88)} onClick={() => {this.mo1.ret({a: 10, b: 20, c: 30}).bnd(this.obDouble)}}
            onMouseEnter={() => {this.mouse[87] = 'blue', this.mouse[870] = 'lightblue', this.mouse[88] = 'yellow'}}
            onMouseLeave={() => {this.mouse[87] = '#000', this.mouse[870] = 'darkred', this.mouse[88] = 'burlywood'}}
            > Click to see this.mo1.ret(object containing 10, 20, and 30).bnd(this.obDouble)}
          </button>
          <br /><br />

Example 3, illustrating the left identity property of monads. This result is identical to the result in 'Example 2'.
  <br />
          Result of running "obDouble" on an object containing 10, 20, and 30:
          <button style={this.style8('blue','lightblue','yellow')}
            onMouseEnter={() => {this.mouse[87] = 'blue', this.mouse[870] = 'lightblue', this.mouse[88] = 'yellow'}}
            onMouseLeave={() => {this.mouse[87] = '#000', this.mouse[870] = 'darkred', this.mouse[88] = 'burlywood'}}
            > {this.obDouble({a: 10, b: 20, c: 30}).x.a} {this.obDouble({a: 10, b: 20, c: 30}).x.b}  {this.obDouble({a: 10, b: 20, c: 30}).x.c}
          </button>
          <br /><br />
Example 4, illustrating right identity in conjunction with 'Example 1', and <br />
          illustrating the associative property of MonadObject instances in conjucntion with 'Example 5'.
          <button style={this.style8(cr97,cr970,cr98)} onClick={() => {this.mo1.bnd(this.obDouble).bnd(this.obTripple)}}
            onMouseEnter={() => {this.mouse[97] = 'blue', this.mouse[970] = 'lightblue', this.mouse[98] = 'yellow'}}
            onMouseLeave={() => {this.mouse[97] = '#000', this.mouse[970] = 'darkred', this.mouse[98] = 'burlywood'}}
            > Click to see this.mo1.bnd(this.obDouble).bnd(this.obTripple)
          </button>
          <br /><br />
Example 5, illustrating the associative property of MonadObject instances. 'obSixTimes' is a composit function defined as follow:
  <br /><br />   let d = this.obTripple(x); <br />
    d.bnd(this.obDouble(d.x));
    <br /><br /> Compare this with 'Example 4' which first binds to 'obTripple' and subsequently binds to 'obDouble'..
          <button style={this.style8(cr107,cr1070,cr108)} onClick={() => {this.mo1.bnd(this.obSixTimes)}}
            onMouseEnter={() => {this.mouse[107] = 'blue', this.mouse[1070] = 'lightblue', this.mouse[108] = 'yellow'}}
            onMouseLeave={() => {this.mouse[107] = '#000', this.mouse[1070] = 'darkred', this.mouse[108] = 'burlywood'}}
            > Click to see this.mo1.bnd(this.obSixTimes)
          </button>
          <br /><br />
Example 6, reset mo1.
          <button style={this.style8(cr117,cr1170,cr118)} onClick={() => {this.mo1.ret({a: 1, b: 2, c: 3})}}
            onMouseEnter={() => {this.mouse[117] = 'blue', this.mouse[1170] = 'lightblue', this.mouse[118] = 'yellow'}}
            onMouseLeave={() => {this.mouse[117] = '#000', this.mouse[1170] = 'darkred', this.mouse[118] = 'burlywood'}}
            >
            Click to see "this.mo1.ret(object with values 1, 2, and 3)".
            <br />Note: using object notation confuses React.
          </button>
          <br /><br />
Example 7, set mo1 and mo2.
          <button style={this.style8(cr127,cr1270,cr128)} onClick={() => {this.mo2.ret({a: 1, b: 2, c: 3}).bnd(this.mo1.ret).bnd(this.obReplace,({a: 'one', b: 'two', c: 'three'}))}}
            onMouseEnter={() => {this.mouse[127] = 'blue', this.mouse[1270] = 'lightblue', this.mouse[128] = 'yellow'}}
            onMouseLeave={() => {this.mouse[127] = '#000', this.mouse[1270] = 'darkred', this.mouse[128] = 'burlywood'}}
            >
            Click to see "this.mo2.ret(object with values 1, 2, and 3).bind(this.mo1.ret).bnd(this.obReplace, object with 'one', 'two', 'three))}".
          </button>
            The object functions are usable by any object monad. The default target is the calling object. ".bnd(some_other_monad.ret)" shifts the target to "some_other_monad". This is illustrated in the next example.
          <br /><br />
Example 8, set mo1 and mo2.
          <button style={this.style8(cr137,cr1370,cr138)} onClick={() => {this.mo1.ret({a: 'one', b: 'two', c: 'three'}).bnd(this.mo2.ret).bnd(this.obReplace,({a: 'four', b: 'five', c: 'six'})).bnd(this.mo3.ret).bnd(this.obReplace, ({a: 'SEVEN', b: 'five', c: 'six'}))}}
            onMouseEnter={() => {this.mouse[137] = 'blue', this.mouse[1370] = 'lightblue', this.mouse[138] = 'yellow'}}
            onMouseLeave={() => {this.mouse[137] = '#000', this.mouse[1370] = 'darkred', this.mouse[138] = 'burlywood'}}
            >
            Click to see "this.mo1.ret(object with values 'one', 'two', and 'three').bnd(this.mo2.ret),bnd(this.obReplace,(object containing "a: 'four', b: 'five', c: 'six'")).bnd(this.mo3.ret).bnd(this.obReplace, (object containing 'SEVEN', 'b', and 'c'"))".
          </button>
          Notice the use of "obReplace". The syntax is ".bnd(this.obReplace, replacement_object)" This is an example of "bnd" taking more than one argument. The default first argument must be a function that maps a value (always the value of the calling monad) to a monad, sometimes (as here) in conjunction with other arguments.
          <br /><br />
Example 9, test.
          <button style={this.style8(cr37,cr370,cr38)} onClick={() => {this.mo1.ret({a: 3, b: 3, c: 3}).bnd(this.mo2.ret).bnd(this.obCube).bnd(this.mo3.ret).bnd(this.obReplace, ({a: 'Done', b: 'b', c: 'c'}))}}
            onMouseEnter={() => {this.mouse[37] = 'blue', this.mouse[370] = 'lightblue', this.mouse[38] = 'yellow'}}
            onMouseLeave={() => {this.mouse[37] = '#000', this.mouse[370] = 'darkred', this.mouse[38] = 'burlywood'}}
            >
            More usage of "this.monad.ret" to shift the target and ".bnd(this.obReplace, new_object" to insert objects into the monads..         
          </button>
          <br /><br /><br />

        <h2 style={{textAlign: 'center' }} >Working With Numbers</h2>

          <button style={this.style8(cr77,cr770,cr78)} onClick={() => {this.m.bnd(this.mAdd,100)}}
            onMouseEnter={() => {this.mouse[77] = 'blue', this.mouse[770] = 'lightblue', this.mouse[78] = 'yellow'}}
            onMouseLeave={() => {this.mouse[77] = '#000', this.mouse[770] = 'darkred', this.mouse[78] = 'burlywood'}}
            > Click to run "this.m.bnd(this.mAdd,100)".
          </button>
          <br /><br />
          <button style={this.style8(cr87,cr870,cr88)} onClick={() => {this.m.bnd(this.fmSubtract1)}}
            onMouseEnter={() => {this.mouse[87] = 'blue', this.mouse[870] = 'lightblue', this.mouse[88] = 'yellow'}}
            onMouseLeave={() => {this.mouse[87] = '#000', this.mouse[870] = 'darkred', this.mouse[88] = 'burlywood'}}
            > Click run m.this.m.bnd(this.fmSubtract1)".
          </button>
          <br /><br />
          <button style={this.style8(cr97,cr970,cr98)} onClick={() => {this.m.bnd(this.mAdd,1).bnd(this.mAdd,3).bnd(this.fmSquare).bnd(this.mAdd,1).bnd(this.fmSquare).bnd(this.mAdd,7)}}
            onMouseEnter={() => {this.mouse[97] = 'blue', this.mouse[970] = 'lightblue', this.mouse[98] = 'yellow'}}
            onMouseLeave={() => {this.mouse[97] = '#000', this.mouse[970] = 'darkred', this.mouse[98] = 'burlywood'}}
            > Click to run "bnd.this.m.bnd(this.mAdd,1).bnd(this.mAdd,3).bnd(this.fmSquare).bnd(this.mAdd,1).bnd(this.fmSquare).bnd(this.mAdd,7)"
          </button>
    Clicking runs "this.m.bnd(this.mAdd,1).bnd(this.mAdd,3).bnd(this.fmSquare).bnd(this.mAdd,1).bnd(this.fmSquare).bnd(this.mAdd,7)".

          <h3>Left Identity</h3>
          <button style={this.style8(cr107,cr1070,cr108)} onClick={() => {this.m.ret(42).bnd(this.m.x)}}
            onMouseEnter={() => {this.mouse[107] = 'blue', this.mouse[1070] = 'lightblue', this.mouse[108] = 'yellow'}}
            onMouseLeave={() => {this.mouse[107] = '#000', this.mouse[1070] = 'darkred', this.mouse[108] = 'burlywood'}}
            > Click to see "this.m.ret(42).bnd(this.m.x)".
          </button>
          <br /><br />
          <h3>Right Identity</h3>
          <button style={this.style8(cr127,cr1270,cr128)} onClick={() => {this.m.bnd(this.m.ret).bnd(this.m2.x)}}
            onMouseEnter={() => {this.mouse[127] = 'blue', this.mouse[1270] = 'lightblue', this.mouse[128] = 'yellow'}}
            onMouseLeave={() => {this.mouse[127] = '#000', this.mouse[1270] = 'darkred', this.mouse[128] = 'burlywood'}}
            > Click to run "this.m.bnd(this.m.ret).bnd(this.m2.x)".
          </button>
          <br /><br />
          <h3> Associativity </h3>
          <button style={this.style8(cr137,cr1370,cr138)} onClick={() => {this.m.bnd(this.mAdd,1).bnd(this.fmSquare)}}
            onMouseEnter={() => {this.mouse[137] = 'blue', this.mouse[1370] = 'lightblue', this.mouse[138] = 'yellow'}}
            onMouseLeave={() => {this.mouse[137] = '#000', this.mouse[1370] = 'darkred', this.mouse[138] = 'burlywood'}}
            > Click to run "this.m.bnd(this.mAdd,1).bnd(this.fmSquare)}".
          </button>
          <br /><br />
          <button style={this.style8(cr27,cr270,cr28)} onClick={() => {this.m.bnd(this.fmAdd_then_Square)}}
            onMouseEnter={() => {this.mouse[27] = 'blue', this.mouse[270] = 'lightblue', this.mouse[28] = 'yellow'}}
            onMouseLeave={() => {this.mouse[27] = '#000', this.mouse[270] = 'darkred', this.mouse[28] = 'burlywood'}}
            > Click to run "this.m.bnd(this.fmAdd_then_Square)".
          </button>
         <br /><br />
          <h3> Miscellaneous </h3>
          <button style={this.style8(cr77,cr770,cr78)} onClick={() => {this.m3.bnd(this.fibo)}}
            onMouseEnter={() => {this.mouse[77] = 'blue', this.mouse[770] = 'lightblue', this.mouse[78] = 'yellow'}}
            onMouseLeave={() => {this.mouse[77] = '#000', this.mouse[770] = 'darkred', this.mouse[78] = 'burlywood'}}
            > Click to run "this.m3.bnd(this.fibo)".
          </button>
          <br /><br />
          <button style={this.style8(cr47,cr470,cr48)} onClick={() => {this.m.bnd(this.reset_1)}}
            onMouseEnter={() => {this.mouse[47] = 'blue', this.mouse[470] = 'lightblue', this.mouse[48] = 'yellow'}}
            onMouseLeave={() => {this.mouse[47] = '#000', this.mouse[470] = 'darkred', this.mouse[48] = 'burlywood'}}
            > Click to run "this.m.bnd(this.reset_1)".
          </button>
          <br /><br />
          <button style={this.style8(cr57,cr570,cr58)} onClick={() => {this.m2.bnd(this.reset_2)}}
            onMouseEnter={() => {this.mouse[57] = 'blue', this.mouse[570] = 'lightblue', this.mouse[58] = 'yellow'}}
            onMouseLeave={() => {this.mouse[57] = '#000', this.mouse[570] = 'darkred', this.mouse[58] = 'burlywood'}}
            > Click to run "this.m2.bnd(this.reset_2)".
          </button>
          <br /><br />
          <button style={this.style8(cr67,cr670,cr68)} onClick={() => {this.m2.bnd(this.reset_3)}}
            onMouseEnter={() => {this.mouse[67] = 'blue', this.mouse[670] = 'lightblue', this.mouse[68] = 'yellow'}}
            onMouseLeave={() => {this.mouse[67] = '#000', this.mouse[670] = 'darkred', this.mouse[68] = 'burlywood'}}
            > Click to run "this.m2.bnd(this.reset_3)".
          </button>
          <br /><br />

    The code is at <a href="https://github.com/dschalk/mobservable-monads" style={{color: '#f26d6d' }}>https://github.com/dschalk/mobservable-monads</a>
    <br /><br />
    I don't know if manipulating mobservable reactive entities in this manner will have any practical value. Perhaps chaining, as in
    "this.m.bnd(this.mAdd,1).bnd(this.mAdd,3).bnd(this.fmSquare) .bnd(this.m2).bnd(this.mAdd,1).bnd(this.fmSquare).bnd(this.mAdd,7)"(see above), will be useful, perhaps as an alternative to promises for assuring that sychronous operations execute in a specified order.
    <br /><br />
    It was the realization that mobservable reactive primitives provide access their current as well as their previous values that got me started on this investigation. Some Haskell monads - notably the state monad - hold their current and previous values.     <br /><br />
    The monad laws are:
    <br /><br />
    return a >>= k             = k a <br />
    m >>= return               = m <br />
    m >>= (\x -> k x >>= h)    = (m >>= k) >>= h
        <br /><br /><br />
        <h2 style={{textAlign: 'center' }} >Working With Text</h2>
          <button style={this.style8(cr77,cr770,cr78)} onClick={() => {this.m.ret('Hello').bnd(this.m)}}
            onMouseEnter={() => {this.mouse[77] = 'blue', this.mouse[770] = 'lightblue', this.mouse[78] = 'yellow'}}
            onMouseLeave={() => {this.mouse[77] = '#000', this.mouse[770] = 'darkred', this.mouse[78] = 'burlywood'}}
            >
        Click to make "Hello" the value of m.
      </button>
      <br /><br />
      Clicking activates "this.m.ret('Hello').bnd(this.m)". "m.ret: is monad return for m. Because of the left identity property, binding m to m.ret("Hello") causes m to have the value "Hello", just as m("Hello") would do. "m.bnd" returns m which makes further chaining possible.
      <br /><br />
       The next button puts "World" in monad m2.
          <br /><br />
          <button style={this.style8(cr97,cr970,cr98)} onClick={() => {this.m2.ret(' World').bnd(this.m2)}}
            onMouseEnter={() => {this.mouse[97] = 'blue', this.mouse[970] = 'lightblue', this.mouse[98] = 'yellow'}}
            onMouseLeave={() => {this.mouse[97] = '#000', this.mouse[970] = 'darkred', this.mouse[98] = 'burlywood'}}
            >
            this.m2.ret(' World').bnd(this.m2)
      </button>
          <br /><br />
          Clicking the next button runs "bnd(this.mAdd, this.m2()) on m, then sends the result to m3 with ".bnd(this.m3)", and finally resets m1 with ".bnd(this.reset_1)".
          <br /><br />
          <button style={this.style8(cr87,cr870,cr88)} onClick={() => {this.m.bnd(this.mAdd, this.m2.x()).bnd(this.m3).bnd(this.reset_1)}}
            onMouseEnter={() => {this.mouse[87] = 'blue', this.mouse[870] = 'lightblue', this.mouse[88] = 'yellow'}}
            onMouseLeave={() => {this.mouse[87] = '#000', this.mouse[870] = 'darkred', this.mouse[88] = 'burlywood'}}
            >
            this.m.bnd(this.mAdd, m2()).bind(this.m3).bnd(this.reset_1)
      </button>
        <br /><br /><br />




        <h2 style={{textAlign: 'center' }} >Working With Arrays</h2>
          <button style={this.style8(cr37,cr370,cr38)} onClick={() => {this.ma1.bnd(this.fibCalc).bnd(this.ma1.ret)}}
            onMouseEnter={() => {this.mouse[37] = 'blue', this.mouse[370] = 'lightblue', this.mouse[38] = 'yellow'}}
            onMouseLeave={() => {this.mouse[37] = '#000', this.mouse[370] = 'darkred', this.mouse[38] = 'burlywood'}}
            >
            Click to run this.ma1.bnd(this.fibCalc).bind(this.ma1.ret).
      </button>
      <br /><br /> ".bind(this.ma1.ret)" at the end does not affect the result, confirming that the monad right identity law holds in this instance.
      <br /><br />
      THEOREM: Array monads conform to the monad right identity law.
      <br />
      <h2> Fibonacci number {this.ma1.x[2]} = {this.ma1.x[0]} </h2>
          <br />
          <button style={this.style8(cr47,cr470,cr48)} onClick={() => {this.ma1.ret([1,1,3]).bnd(this.fibCalc)}}
            onMouseEnter={() => {this.mouse[47] = 'blue', this.mouse[470] = 'lightblue', this.mouse[48] = 'yellow'}}
            onMouseLeave={() => {this.mouse[47] = '#000', this.mouse[470] = 'darkred', this.mouse[48] = 'burlywood'}}
            >Click to run this.ma1.x.ret([1,1,3]).bnd(this.fibCalc)
          </button>
          Return followed by bnd(function) produced the same result as merely running the function, as in the previous result.
          <br /><br />
          THEOREM: Array monads conform to the monad left identity law.

          <br /><br />
          <button style={this.style8(cr57,cr570,cr58)} onClick={() => {this.ma2.bnd(this.add1Calc).bnd(this.mult10Calc)}}
            onMouseEnter={() => {this.mouse[57] = 'blue', this.mouse[570] = 'lightblue', this.mouse[58] = 'yellow'}}
            onMouseLeave={() => {this.mouse[57] = '#000', this.mouse[570] = 'darkred', this.mouse[58] = 'burlywood'}}
            >
            Click to run "this.ma2.bnd(this.add1Calc).bnd(this.mult10Calc)".
          </button>
          <br /><br />
          <button style={this.style8(cr67,cr670,cr68)} onClick={() => {this.ma2.bnd(this.add1_mult10_Calc)}}
            onMouseEnter={() => {this.mouse[67] = 'blue', this.mouse[670] = 'lightblue', this.mouse[68] = 'yellow'}}
            onMouseLeave={() => {this.mouse[67] = '#000', this.mouse[670] = 'darkred', this.mouse[68] = 'burlywood'}}
            >
            Click to run "this.ma2.bnd(this.add1_mult10_Calc)".
          </button>
          <br /><br />
          Binding the composit function produces the same result as sequentially binding the two individual functions.
          <br /><br />
          THEOREM: Array monads conform to the monad associativity law.
        <br /><br /><br />







        <br /><br />
        The power of mobservable reactive buttons is showcased at <a href="http://schalk.ninja" style={{color: '#f26d6d' }} >http://schalk.ninja</a>
        </div>

</div>
    )}
  };

  // reactMixin(B2.prototype, require('./node_modules/react/lib/AutoFocusMixin'));

React.render(<B2 key='B2' />, document.getElementById('divSix'));
