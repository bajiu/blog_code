package main

import (
    "fmt"
	"syscall/js"
    )


func fib(i int) int {
	if i == 0 || i == 1 {
		return 1
	}
	return fib(i-1) + fib(i-2)
}

func fibFunc(this js.Value, args []js.Value) interface{} {
	return js.ValueOf(fib(args[0].Int()))
}

func say(this js.Value, args []js.Value) interface{} {
//     fmt.Println("---------------------------\n")
//     fmt.Println(args[0].Length())
    s := make([]interface{} ,args[0].Length())
    for i := 0; i < len(s); i+=4 {
        s[i] = 30
        s[i + 1] = 255
        s[i + 2] = 255
        s[i + 3] = 255
    }
//     copy(args[0],s)
//     fmt.Println(s)
//     var numArray = [...]int{1, 2}
    return js.ValueOf(s)
}

func registerCallbacks() {
    js.Global().Set("say", js.FuncOf(say))
}

func main() {
    fmt.Println('a')
	done := make(chan int, 0)
	registerCallbacks();
// 	js.Global().Set("fibFunc", js.FuncOf(fibFunc))

	<-done
}
