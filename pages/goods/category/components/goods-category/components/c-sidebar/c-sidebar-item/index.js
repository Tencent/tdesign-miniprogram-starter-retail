Component({
  relations: {
    '../../c-sidebar/index': {
      type: 'ancestor',
      linked(target) {
        this.parent = target;
      },
    },
  },

  externalClasses: ['custom-class'],
  properties: {
    title: String,
    disabled: Boolean,
  },

  methods: {
    setActive(selected) {
      return this.setData({ selected });
    },
    onClick() {
      const { parent } = this;

      if (!parent || this.properties.disabled) {
        return;
      }

      const index = parent.children.indexOf(this);

      parent.setActive(index).then(() => {
        this.triggerEvent('click', index);
        parent.triggerEvent('change', { index });
      });
    },
  }
})
