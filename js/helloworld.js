// 当一个实例创建(new Vue)时, 向Vue响应系统加入data对象中所有属性,
//     一旦属性发生变化, 视图立刻响应
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Word!'
  }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: '页面加载于 ' + new Date().toLocaleString(),
        value: 'This is a value.'
    }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        // true or false
        seen: true
    }
});

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: '学习javascript' },
            { text: '学习vue' },
            { text: '整一个牛项目' },
        ],
        names: [
            { text: '郑碧峰' },
            { text: '狂想' },
            { text: '梦想' },
        ]
    }
});

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello beautiful girl'
    },
    // methods和compted的不同之处在于, message没有变化时, 后者使用缓存, 不会重复
    // 调用函数
    methods: {
        reverseMessage: function() {
            this.message = this.message.split('').reverse().join('');
        }
    },
    computed: {
        // 计算属性, 可是使用app5.reverseMessage访问
        // 默认方法: getter
        reverseMessage: function() {
            return this.message.split('').reverse().join('');
        },

        set: function(newValue) {
            var names = newValue.split('');
        }
    }
});

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: '输入'
    }
});

// 组件: 一个用于预定义选项的一个 Vue 实例
// 注册组件
Vue.component('todo-item', {
    // 接收自定义参数: prop, 属性名: todo
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
});
var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            { id: 0, text: '蔬菜' },
            { id: 1, text: '奶酪' },
            { id: 2, text: '随便其他' },
        ]
    }
});

// 根据组件, 在网站设计之初就可为整个应用程序划分各个区域组件, 便于开发和管理
// 自定义元素, 例如
// <div id="app">
//     <app-nav></app-nav>
//     <app-view>
//         <app-sidebar></app-sidebar>
//         <app-content></app-content>
//     </app-view>
// </div>


// 侦听器
var app8 = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'I cannot give you answer until you ask a question.',
    },
    watch: {
        question: function(newQuestion) {
            this.answer = 'Waitting for you stop typing';
            this.getAnswer();
        }
    },
    methods: {
        // 利用debounce来限制访问频率
        getAnswer: _.debounce(
            function() {
                if (this.question.indexOf('?') === -1) {
                    this.answer = 'Questions usually contain a quesion work.';
                    return;
                }
                this.answer = 'Thinking...';
                var vm = this;
                axios.get('https://yesno.wtf/api').then(
                    function(response) {
                        vm.answer = _.capitalize(response.data.answer);
                    }
                ).catch(
                    function(error) {
                        vm.answer = 'Error! Could not reach the API:' + error;
                    }
                );
            },
            500
        )
    }
});
