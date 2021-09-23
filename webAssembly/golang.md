## wasm golang 版


编辑 `main.go`
```
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go WebAssembly!")
}
```
把main.go build成WebAssembly(简写为wasm)二进制文件
```
GOOS=js GOARCH=wasm go build -o lib.wasm main.go
```
把JavaScript依赖拷贝到当前路径
```
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .
```
引入wasm_exec.js文件，调用刚才build的lib.wasm
```
<html>
    <head>
        <meta charset="utf-8">
        <script src="wasm_exec.js"></script>
        <script>
            const go = new Go();
            WebAssembly.instantiateStreaming(fetch("lib.wasm"), go.importObject).then((result) => {
                go.run(result.instance);
            });
        </script>
    </head>
    <body></body>
</html>
```
差不多就这么个基础

