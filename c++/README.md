## 开发环境

### 安装VScode
打开VScode，进入 `Extensions` 模块，搜索以下扩展并安装
```
C/C++
C/C++ Clang Command Adapter
C++ Intellisense
Code Runner
```
安装完成后，扩展将会自动激活。此时重启VScode。
```
#include <iostream>
int main() {
    std::cout << "hello, world\n";
    return 0;
}
```

保存为 .cpp 格式文件，点击 运行 按钮，观察 "Terminal" 中的输出
```
hello, world
```

## 调试运行

`g++ hello.cpp -o demo`




## 问题描述

- **Code is already running!**
> 上次运行程序的还没结束，需要等待其结束, 输出窗口 , 右键 ,`stop code run` 解决问题