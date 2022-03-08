Component({
  codeList: [], // 由value（行政区划代码）拆分得出的各级行政区的代码
  options: {
    multipleSlots: true,
  },
  properties: {
    show: {
      type: Boolean,
      observer(show) {
        if (!show) return;
        this.setData({ pickerValue: [] }, () => {
          this.codeList = this.splitCode(this.data.value);
          this.updateDivisions();
        });
      },
    },
    title: {
      type: String,
      value: '选择地区',
    },
    value: {
      type: String,
      value: '',
    },
    areaData: {
      type: Array,
      value: [],
      observer() {
        if (!this.data.show) return;
        this.updateDivisions();
      },
    },
    columns: {
      type: Number,
      value: 3,
    },
    columnsName: {
      type: Array,
      value: ['省市/地区', '城市', '区'],
    },
    useLoadingSlot: Boolean,
  },
  data: {
    pickerValue: [],
    pickerColumnData: [],
    hightLightIndex: [],
    loading: false,
    scrollTop: 0,
  },
  methods: {
    splitCode(value) {
      const codeList = [];
      for (let i = 1; i <= this.data.columns; i++) {
        // 每级行政区代码由两位数字组成
        let code = value.slice(0, i * 2);
        if (code.length < i * 2) {
          // 如果新取到的code不足两位,则置为00
          code = value.slice(0, (i - 1) * 2) + '00';
        }
        // code补充到和properties.value一样长
        while (code.length < this.data.value.length) {
          code += '0';
        }
        codeList.push(code);
      }
      return codeList;
    },
    updateDivisions() {
      const { pickerValue } = this.data;
      const area = pickerValue[pickerValue.length - 1];
      let currentAreaData = [];
      if (pickerValue.length === 0) {
        currentAreaData = this.data.areaData;
      } else {
        if (area && area.children && area.children.length > 0) {
          currentAreaData = [...area.children];
        } else if (area && !area.children) {
          // 异步加载数据时，areaData中的数据更新了但是pickerValue中area的children也许仍没有，需要同步新数据
          const newArea = this.getNewAreaByPickerValue(pickerValue).area;
          if (newArea && newArea.children) {
            area.children = newArea.children; // 间接改变了pickerValue
            currentAreaData = [...area.children];
          }
        }
      }
      if (currentAreaData.length > 0) {
        // 防止传入的数据是未经分组的
        const pickerColumnData = currentAreaData[0].code
          ? [{ name: '', children: currentAreaData }]
          : currentAreaData;
        // codeList是通过解析传入的value得到的，即上次选择的省市区各级编码，这里如果匹配到了将其点亮
        let oldPickedIndexes = [-1, -1];
        if (this.codeList.length > pickerValue.length) {
          for (const gi in pickerColumnData) {
            for (const ai in pickerColumnData[gi].children) {
              if (
                pickerColumnData[gi].children[ai].code ===
                this.codeList[pickerValue.length]
              ) {
                oldPickedIndexes = [+gi, +ai];
                break;
              }
            }
            if (oldPickedIndexes[0] > -1) break;
          }
        }
        this.setData({ loading: false, pickerColumnData }, () => {
          new Promise() <
            number >
            ((resolve) => {
              if (oldPickedIndexes[0] > -1) {
                this.createSelectorQuery()
                  .select('#area-item-0-0')
                  .boundingClientRect()
                  .select('#area-item-' + oldPickedIndexes.join('-'))
                  .boundingClientRect()
                  .exec((res) => {
                    if (res[0] && res[1]) {
                      const offsetTop = res[1].top - res[0].top; // 点亮对象相对列表顶部的偏移量
                      const diff = res[1].height; // 滚动后保持的上边距
                      resolve(offsetTop > diff ? offsetTop - diff : 0);
                    } else {
                      resolve(0);
                    }
                  });
              } else resolve(0);
            }).then((scrollTop) => {
              this.setData({
                hightLightIndex: oldPickedIndexes,
                scrollTop,
              });
            });
        });
      } else {
        // 缺少子级地区数据则触发事件通知拉取数据，并显示loading
        this.setData({ loading: true, pickerColumnData: [] }, () => {
          if (area && area.code) {
            this.triggerEvent('pullchildren', { parentCode: area.code });
          } else {
            this.triggerEvent('pullchildren', {});
          }
        });
      }
    },
    // 异步加载地区数据时，可能地区数据更新了但是pickerValue中的地区children并未更新
    // 使用此方法主要用于更新pickerValue中的地区数据
    getNewAreaByPickerValue(pickerValue) {
      let { areaData } = this.data;
      const areas = [];
      for (const pickedArea of pickerValue) {
        // 防止传入的数据是未经分组的
        const _areaData =
          areaData.length > 0 && areaData[0].code
            ? [{ name: '', children: areaData }]
            : areaData;
        let newArea;
        for (const gi in _areaData) {
          for (const ai in _areaData[gi].children) {
            if (_areaData[gi].children[ai].code === pickedArea.code) {
              newArea = _areaData[gi].children[ai];
              break;
            }
          }
          if (newArea) break;
        }
        if (!newArea) break;
        areaData = newArea.children || [];
        areas.push(newArea);
      }
      return { area: areas[areas.length - 1], areas };
    },
    onChange(e) {
      const { gi, ai } = e.currentTarget.dataset;
      const area = this.data.pickerColumnData[gi].children[ai];
      const pickerValue = this.data.pickerValue.concat(area);
      if (pickerValue.length < this.data.columns) {
        this.setData({ pickerValue }, () => {
          this.updateDivisions();
        });
        this.triggerEvent('change', { value: area.code, areas: pickerValue });
      } else {
        this.setData({ show: false });
        this.triggerEvent('confirm', { value: area.code, areas: pickerValue });
      }
    },
    // 点击已选地区时触发，清除地区选择
    onPickerClick(e) {
      const { index } = e.currentTarget.dataset;
      if (index > this.data.pickerValue.length - 1) return;
      const pickerValue = this.data.pickerValue.slice(0, index);
      this.setData({ pickerValue }, () => {
        this.updateDivisions();
      });
      this.triggerEvent('change', {
        value: pickerValue[pickerValue.length - 1]?.code,
        areas: pickerValue,
      });
    },

    onClose() {
      this.setData({ show: false });
      this.triggerEvent('close');
    },
  },
});
