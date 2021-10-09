#include <iostream>
#include <cmath>

// function prototype for showNum
void showNum(int);

int main(int argc, char const *argv[])
{
    using namespace std;
    
    // cout 对象表示输出的一个流 属性是 iostream 中定义的
    // 包括一个插入运算符 << 它可以将其右侧信息插入到流中
    // 1. 控制符 endl
    // 2. 换行符 \n
    cout << "hello world " << endl;
    
    // C++程序应当为程序中使用的每个函数提供原型
    // 函数原型之于函数就像变量声明之于变量 —— 指出涉及的类型
    // sqrt() 的函数原型像这样( cmath 头文件定义了原型 )
    // double sqrt(double);  // function prototype

    double x;
    x = sqrt(6.25);
    cout << x << endl;

    // 计算 5 的 8 次方
    double answer;
    answer = pow(5.0, 8.0);
    cout << answer << endl;

    // 生成一个随机整数
    int guess;
    guess = rand();
    cout << guess << endl;


    // 自定义函数(定义在最上头)
    showNum(89);

    return 0;
}


void showNum (int n) {
    using namespace std;
    cout << "number is : " << n << endl;
}
