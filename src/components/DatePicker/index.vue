<template>
  <div v-click-outSide class="datePicker">
    <input type="text" :value="formDate">
    <div v-if="isVisiable" class="pannel">
      <div class="pannel-nav">
        <span @click="prevYear">&lt;</span>
        <span @click="prevMonth">&lt;&lt;</span>
        <span>{{ time.year }}年</span>
        <span>{{ time.month + 1 }}月</span>
        <span @click="nextMonth">&gt;&gt;</span>
        <span @click="nextYear">&gt;</span>
      </div>
      <div class="pannel-content">
        <div class="days">
          <span v-for="item in weekDays" :key="item" class="cell">
            {{ item }}
          </span>
          <div v-for="i in 6" :key="i">
            <span
              v-for="j in 7"
              :key="j"
              class="cell cell-days"
              :class="[
                {
                  'noCurrentMonth': isCurrentMonth(visibeDays[(i-1)*7+(j-1)]),
                  'today': isCurrentToday(visibeDays[(i-1)*7+(j-1)]),
                  'isChecked': isChecked(visibeDays[(i-1)*7+(j-1)])
                }
              ]"
              @click="chooseDate(visibeDays[(i-1)*7+(j-1)])"
            >
              {{ visibeDays[(i-1)*7+(j-1)].getDate() }}
            </span>
          </div>
        </div>
      </div>
      <div class="pannel-footer">footer</div>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    clickOutSide: { // 自定义指令利用冒泡判断当前点击的地方是否是日历里面
      bind(el, bindings, vnode) {
        function handler(e) {
          if (el.contains(e.target)) {
            if (!vnode.context.isVisiable) {
              vnode.context.focus()
            }
          } else {
            if (vnode.context.isVisiable) {
              vnode.context.blur()
            }
          }
        }
        el.handler = handler
        document.addEventListener('click', el.handler)
      },
      unbind(el) {
        document.removeEventListener('click', el.handler)
      }
    }
  },
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    const { year, month } = this.getYearMonthDay(new Date())
    return {
      time: {
        year,
        month
      },
      weekDays: ['日', '一', '二', '三', '四', '五', '六'],
      isVisiable: false
    }
  },
  computed: {
    visibeDays() {
      const { year, month } = this.getYearMonthDay(this.getDate(this.time.year, this.time.month, 1))

      // 获取每个月的第一天
      const currentFirstDays = this.getDate(year, month, 1)

      // 看看这个月的第一天是周几
      const week = currentFirstDays.getDay()

      // 周几就往前减几天就是日历的开头。比如周三就要往前减三天
      const startDay = currentFirstDays - week * 60 * 60 * 1000 * 24

      const arr = []
      // 日历每页一共可以显示42天
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24))
      }
      return arr
    },
    formDate() {
      const { year, month, day } = this.getYearMonthDay(this.value)
      return `${year}-${month + 1}-${day}`
    }
  },
  methods: {
    // 上一年。
    prevYear() {
      const d = this.getDate(this.time.year, this.time.month, 1)
      d.setYear(d.getFullYear() - 1)
      this.time = this.getYearMonthDay(d)
    },
    // 下一年。
    nextYear() {
      const d = this.getDate(this.time.year, this.time.month, 1)
      d.setYear(d.getFullYear() + 1)
      this.time = this.getYearMonthDay(d)
    },
    // 上一个月。
    prevMonth() {
      const d = this.getDate(this.time.year, this.time.month, 1)
      d.setMonth(d.getMonth() - 1)
      this.time = this.getYearMonthDay(d)
    },
    // 下一个月。
    nextMonth() {
      const d = this.getDate(this.time.year, this.time.month, 1)
      d.setMonth(d.getMonth() + 1)
      this.time = this.getYearMonthDay(d)
    },
    // 点击更换日期
    chooseDate(date) {
      this.time = this.getYearMonthDay(date)
      this.$emit('input', date)
      this.blur()
    },
    isChecked(date) {
      const { year, month, day } = this.getYearMonthDay(date)
      const { year: y, month: m, day: d } = this.getYearMonthDay(this.value)
      return year === y && month === m && day === d
    },
    isCurrentToday(date) {
      const { year, month, day } = this.getYearMonthDay(date)
      const { year: y, month: m, day: d } = this.getYearMonthDay(new Date())
      return year === y && month === m && day === d
    },
    isCurrentMonth(date) {
      const { year, month } = this.getYearMonthDay(this.getDate(this.time.year, this.time.month, 1))
      const { year: y, month: m } = this.getYearMonthDay(date)
      return year === y && month === m
    },
    getDate(year, month, day) {
      return new Date(year, month, day)
    },
    getYearMonthDay(date) {
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      return { year, month, day }
    },
    focus() {
      this.isVisiable = true
    },
    blur() {
      this.isVisiable = false
    }
  }
}
</script>

<style lang="scss" scoped>
.pannel {
    width: calc(32 * 7);
    position: absolute;
    color: gray;
    box-shadow: 0 0 2px #333;
    padding: 15px;
    .pannel-nav {
        display: flex;
        justify-content: space-around;
        height: 30px;
        user-select: none;
    }
    .pannel-content {
        .cell {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 32px;
            height: 32px;
            cursor: pointer;
            box-sizing: border-box;
        }
        .cell-days {
            &:hover {
                border: solid 1px red;
            }
        }
        .isChecked {
            border: solid 1px red;
        }
        .today {
            background: red;
            border-radius: 3px;
        }
        .noCurrentMonth {
            font-weight: bold;
            color: #333;
        }
    }
    .pannel-footer {
        text-align: center;
        line-height: 30px;
    }
}
</style>
