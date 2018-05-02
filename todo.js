let vm = new Vue({
  el: "#app",
  data: {
    todos: [
      { isSelected: false, title: "睡觉" },
      { isSelected: false, title: "吃饭" },
      { isSelected: false, title: "打球" },
      { isSelected: false, title: "游泳" }
    ],
    title: "",
    cur: "",
    hash: ""
  },
  created() {
    //ajax获取，初始化数据,如果localStorage中有数据，就用有的，否则就用默认的
    this.todos = JSON.parse(localStorage.getItem("data")) || this.todos;
    //监控哈希值的变化,如果页面已经又hash了，重新刷新页面，也要或许hash值
    this.hash = window.location.hash.slice(2) || "all";
    window.addEventListener(
      "hashchange",
      () => {
        //当hash值变化，重新操作记录的数据
        this.hash = window.location.hash.slice(2);
      },
      false
    );
  },
  watch: {
    //watch默认只监控一层的数据变化，深度监控
    todos: {
      handler() {
        //默认写成函数，就相当于写了个handler
        //localStorage默认存的是字符串
        localStorage.setItem("data", JSON.stringify(this.todos));
      },
      deep: true
    }
  },
  methods: {
    add() {
      this.todos.push({
        isSelected: false,
        title: this.title
      });
      this.title = "";
    },
    remove(todo) {
      this.todos = this.todos.filter(item => item !== todo);
    },
    remember(todo) {
      this.cur = todo;
    },
    cancel() {
      this.cur = "";
    }
  },
  computed: {
    count() {
      return this.todos.filter(item => !item.isSelected).length;
    },
    filterTodos() {
      if (this.hash === "all") {
        return this.todos;
      }
      if (this.hash === "finish") {
        return this.todos.filter(item => item.isSelected);
      }
      if (this.hash === "unfinish") {
        return this.todos.filter(item => !item.isSelected);
      }
      return this.todos;
    }
  },
  directives: {
    focus(el, bindings) {
      if (bindings.value) {
        //当cur==todo时,
        el.focus(); //内部输入框获取焦点
      }
    }
  }
});
