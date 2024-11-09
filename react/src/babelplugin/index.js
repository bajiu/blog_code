// 该插件的作用是为 JSX 元素添加一个 data-summer="auto-id" 的属性
module.exports = function ({ types: t }) {
    return {
        visitor: {
            // JSX 元素的开始
            JSXOpeningElement(path) {
                // 创建一个新的 JSX 属性: data-summer="auto-id"
                const testIdAttribute = t.jsxAttribute(
                    t.jsxIdentifier("data-summer"),
                    t.stringLiteral("auto-id")
                );

                // 向当前的 JSX 元素添加属性
                path.node.attributes.push(testIdAttribute);
            },
        },
    };
};