console.log("Loading wasm2..." + new Date().getMilliseconds());

// const add = function(p1, p2) {
//     return p1 + p2;
// }
// const importObject = { math : { add }};

function loadWasm()
{
    const response =  fetch("mymath.wasm");
    const obj =  WebAssembly.instantiateStreaming(response).then((obj)=>{
        console.log(obj);
        console.log("WebAssembly object has been loaded");
        console.log(obj.instance.exports.add(100,200));
        // console.log(obj.instance.exports.add2(100, 200));

    });

}

function memoryTest(){
    const memory = new WebAssembly.Memory({initial:1});
    const importObject = {js: {mem: memory}};
    const response =  fetch("sharing_resources.wasm");

    function readNumber() {
        const bytes = new Uint32Array(memory.buffer, 0, 1);
        console.log('The number that was put here is:', bytes[0]);
    }
    function writeNumber(){
        const bytes = new Uint32Array(memory.buffer, 0, 1);
        bytes[0] = 200;
    }

    const obj =  WebAssembly.instantiateStreaming(response, importObject).then((obj)=>{
        obj.instance.exports.storeNumber();
        readNumber();
        writeNumber();
        console.log(obj.instance.exports.readNumber());
    });

}

function fizzBuzz(){
    const resource = fetch("fizzbuzz.wasm");
    const memory = new WebAssembly.Memory({initial: 1});
    const storeByte = new Int32Array(memory.buffer,0,1);
    function consoleLogString(offset, length){
        const bytes = new Uint8Array(memory.buffer, offset, length);
        const string = new TextDecoder('utf8').decode(bytes);
        console.log(string);
    }
    const importObject = { console: {log: consoleLogString}, js: {mem: memory}};
    WebAssembly.instantiateStreaming(resource, importObject).then( (obj) => {
        console.log(obj);
        return obj.instance.exports.fizzbuzz(10);
    });

}

fizzBuzz();