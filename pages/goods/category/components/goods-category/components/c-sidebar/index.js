
Component({
  relations: {
    './c-sidebar-item/index': {
      type: 'descendant',
      linked(target) {
        this.children.push(target);
        this.setActive(this.properties.activeKey);
      },
      unlinked(target) {
        this.children = this.children.filter(item => item !== target);
        this.setActive(this.properties.activeKey);
      },
    },
  },

  externalClasses: ['custom-class'],

  properties: {
    activeKey: {
      type: Number,
      value: 0,
    },
  },
  observers: {
    activeKey(newVal) {
      this.setActive(newVal);
    },
  },

  created() {
    this.children = [];
    this.currentActive = -1;
  },

  methods: {
    setActive(activeKey) {
      const { children, currentActive } = this;

      if (!children.length) {
        return Promise.resolve();
      }

      this.currentActive = activeKey;

      const stack = []; // 任务列表，存放调用子组件的setActive后返回的一堆promise

      // 将旧的选中项改为false
      if (currentActive !== activeKey && children[currentActive]) {
        stack.push(children[currentActive].setActive(false));
      }

      // 将新的选中项改为true
      if (children[activeKey]) {
        stack.push(children[activeKey].setActive(true));
      }

      return Promise.all(stack);
    }
  }
})
