console.log("Loading wasm ...");

async function loadWasm()
{
    const response = await fetch("useless.wasm");
    const buffer = await response.arrayBuffer();
    const obj = await WebAssembly.instantiate(buffer);

    console.log("WASM has been loaded");
}

loadWasm();