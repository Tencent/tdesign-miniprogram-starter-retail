Component({
  codeList: [],
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
        let code = value.slice(0, i * 2);
        if (code.length < i * 2) {
          code = `${value.slice(0, (i - 1) * 2)}00`;
        }
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
          const newArea = this.getNewAreaByPickerValue(pickerValue).area;
          if (newArea && newArea.children) {
            area.children = newArea.children;
            currentAreaData = [...area.children];
          }
        }
      }
      if (currentAreaData.length > 0) {
        const pickerColumnData = currentAreaData[0].code
          ? [{ name: '', children: currentAreaData }]
          : currentAreaData;
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
          return new Promise((resolve) => {
            if (oldPickedIndexes[0] > -1) {
              this.createSelectorQuery()
                .select('#area-item-0-0')
                .boundingClientRect()
                .select(`#area-item-${oldPickedIndexes.join('-')}`)
                .boundingClientRect()
                .exec((res) => {
                  if (res[0] && res[1]) {
                    const offsetTop = res[1].top - res[0].top;
                    const diff = res[1].height;
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
        this.setData({ loading: true, pickerColumnData: [] }, () => {
          if (area && area.code) {
            this.triggerEvent('pullchildren', { parentCode: area.code });
          } else {
            this.triggerEvent('pullchildren', {});
          }
        });
      }
    },
    getNewAreaByPickerValue(pickerValue) {
      let { areaData } = this.data;
      const areas = [];
      for (const pickedArea of pickerValue) {
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
