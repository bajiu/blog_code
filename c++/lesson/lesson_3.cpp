#include <iostream>
#include <string>

int main(int argc, char const *argv[])
{
    using namespace std;
    int yam[3] = {1,2,3};
    // 全部初始化为0
    int total[500] = {0};


    // 以下将包含四个数组
    int things[] = {1,2,3,4};

    cout << yam << endl;
    
    char name[] = "bajiu";
    cout << name << endl;


    // int nameSize = 20;
    // char nameStr[nameSize];
    // cout << "Enter Name" << endl;
    // cin >> nameStr;
    // cout << "This is Name: " << nameStr << endl;
    

    string str1 = "string1";
    cout << str1 << endl;


    struct Obj1
    {
        string name;
    };

    Obj1 obj1 = {
        "bajiu"
    };

    // 共用体
    // 共用体是一种数据格式, 能存储不同的数据类型, 但是能只能同事存储其中一种

    union one4all {
        int int_val;
        long long_val;
        double double_val;
    };

    one4all pail;
    pail.int_val = 15;
    cout <<  pail.int_val << endl;
    pail.double_val = 11.2;
    cout <<  pail.double_val << endl;
    

    // 指针
    string dount = "this is dount";
    cout << dount << "\n" << &dount << endl;
    
    cout << "-----------------" << endl;
    int a = 123;
    int *p_a = &a;
   

    // delete 释放内存
    cout << &p_a << endl;
    cout << a << endl;
    // delete p_a;
    // cout << &p_a << endl;
    // cout << a << endl;



    /**
        - 不要用 delete 释放不是 new 分配的内存
        - 不要用 delete 释放同一个内存 2 次
        - 如果使用 new[] 为数组分配内存, 则应使用 delete[] 来释放
        - 如果使用 new[] 为一个实体分配内存, 则应使用 delete (无方括号) 来释放
        - 对空指针应用 delete 是安全的
     */


    
    // 指针计算

    double wags[3] = {1000.0, 2000.0, 3000.0};

    double *pw = wags;


    cout << "-------- point calc ---------" << endl;
    cout << *pw << endl;
    cout << pw << endl;
    pw = pw + 3;
    cout << *pw << endl;
    cout << pw << endl;



    return 0;
}
