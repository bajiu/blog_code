console.log('run this')
const go = new Go();
WebAssembly.instantiateStreaming(fetch("./lib.wasm"), go.importObject).then((result) => {
    go.run(result.instance);
});
