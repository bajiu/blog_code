#include <iostream>

// 定义
#define ZERO 0;


int main(int argc, char const *argv[])
{
    using namespace std;
    double zero = ZERO;
    cout << "zero is : " << zero << endl;


    // 初始化
    // 跟正常初始化又啥区别?
    int emus = {0};
    cout << "emus is : " << emus << endl;


    int chest = 42;
    int waist = 0x42;
    int inseam = 042;
    cout << "chest is : " << chest << endl;
    cout << "waist is : " << waist << endl;
    cout << "inseam is : " << inseam << endl;

    // 耽误debug
    // char ch;
    // cout << "Enter char" << endl;
    // cin >> ch;
    // cout << "this is my cin :" << ch << endl;


    // 替代 输出运算符
    char ch1 = 'M';

    cout.put(ch1) << endl;


    // 宽字符类型
    wchar_t ch2 = L'a';
    wcout << ch2 << endl;

    

    return 0;
}

