<template>
  <div
    @click="toggleDisplay"
    v-click-outside="CloseDisplay"
    class="container"
    :class="{ 'no-margin': expandedWidth }"
  >
    <div
      class="dynamic-dropdown"
      :class="{
        blueBorder: clicked,
        createSectionCustomWidth: expandedWidth,
        fullWidth: fullWidth,
        'editCustom-container': !withLabel
      }"
    >
      <div class="dynamic-dropdown__container row">
        <div
          class="dynamic-dropdown__container__option col-shrink"
          style="display:inline;"
          :class="{ 'editCustom-option': !withLabel }"
          v-for="option in selectedOptions"
          :key="option[selectedDisplay]"
        >
          {{ option[selectedDisplay] }}
          <i
            class="fas fa-times dynamic-dropdown__container__option__x"
            @click="deselectOption(option)"
          ></i>
        </div>
      </div>
      <label
        v-if="withLabel"
        class="dynamic-dropdown__label"
        :class="{ focus: labelFlag }"
      >
        {{ labelName }}
        <span
          class="label-border"
          :class="{ 'focus-border': labelFlag }"
        ></span>
      </label>
      <i
        class="dynamic-dropdown__arrow"
        :class="{
          'blue fas fa-angle-up': clicked,
          'fas fa-angle-down': !clicked,
          'editCustom-arrow': !withLabel
        }"
      ></i>
    </div>
    <div
      class="options row"
      @click="toggleDisplay"
      v-show="clicked"
      style="font-size:10px;"
    >
      <div class="col ">
        <div class="row " v-for="(option, index) in inputData" :key="index">
          <span
            class="options__title q-px-sm q-py-xs"
            @click="selectOption(option)"
            >{{ option[selectedDisplay] }}</span
          >
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DynamicDropdown",
  props: {
    labelName: {
      required: false,
      default: ""
    },
    clearData: {
      required: false,
      default: false
    },
    inputData: {
      required: true,
      default: []
    },
    singleOption: {
      required: false,
      default: false
    },
    expandedWidth: {
      required: false,
      default: false
    },
    initialData: {
      required: false,
      default: () => []
    },
    withLabel: {
      required: false,
      default: true
    },
    fullWidth: {
      required: false,
      default: false
    },
    selectedDisplay: {
      required: false,
      default: "name"
    }
  },
  data() {
    return {
      clicked: false,
      selectedOptions: [],
      labelFlag: false
    };
  },
  methods: {
    CloseDisplay() {
      if (this.clicked) {
        this.toggleDisplay();
      }
    },
    toggleDisplay() {
      this.clicked = !this.clicked;
      if (!this.clicked) {
        if (this.selectedOptions.length == 0) this.labelFlag = !this.labelFlag;
        else this.labelFlag = true;
      } else {
        this.labelFlag = true;
      }
    },
    selectOption(option) {
      var optionAlreadyAdded = false;
      this.selectedOptions.forEach(optionObject => {
        if (optionObject[this.selectedDisplay] === option[this.selectedDisplay])
          optionAlreadyAdded = true;
      });
      if (!optionAlreadyAdded) {
        if (this.singleOption) {
          if (this.selectedOptions.length == 0) {
            option.selected = true;
            this.selectedOptions.push(option);
            this.toggleDisplay()
          }
        } else {
          option.selected = true;
          this.selectedOptions.push(option);
        }
      }
      this.$emit("selectedOptions", this.selectedOptions);
    },
    deselectOption(option) {
      var optionIndex = -1;
      for (var i = 0; i < this.selectedOptions.length; i++) {
        if (
          this.selectedOptions[i][this.selectedDisplay] ==
          option[this.selectedDisplay]
        ) {
          this.selectedOptions[i].selected = false;
          optionIndex = i;
        }
      }
      this.selectedOptions.splice(optionIndex, 1);
      this.$emit("selectedOptions", this.selectedOptions);
    },
    clearField() {
      this.selectedOptions = [];
      this.labelFlag = false;
    },
    fillInitialData() {
      if (this.initialData) {
        this.initialData.forEach(option => {
          this.selectedOptions.push(option);
        });
        this.$emit("selectedOptions", this.selectedOptions);
      }
    }
  },
  created() {
    this.fillInitialData();
  },
  watch: {
    clearData(value) {
      if (value == true) {
        this.clearField();
      }
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          // eslint-disable-next-line no-unused-vars
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener("click", handler);
      },

      // eslint-disable-next-line no-unused-vars
      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  margin: 5px 0px;
  .dynamic-dropdown {
    position: relative;
    display: inline-block;
    border: 1px solid rgba(70, 70, 70, 0.4);
    min-height: 40px;
    border-radius: 3px;
    min-width: 200px;
    background-color: white;
    z-index: 1;
    &__container {
      margin-top: 2px;
      padding-right: 30px;
      &__option {
        display: inline;
        background-color: #eaeaea;
        border-radius: 3px;
        margin: 5px 2.5px;
        padding: 4px 9px;
        font-size: 11px;
        font-weight: bold;
        &__x {
          font-size: 9px;
          margin-left: 5px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    &__label {
      color: #464646;
      font-size: 15px;
      font-weight: normal;
      position: absolute;
      pointer-events: none;
      left: 7px;
      top: 4px;
      transition: 0.2s ease all;
      -moz-transition: 0.2s ease all;
      -webkit-transition: 0.2s ease all;
    }
    &__text-input {
      margin-bottom: 0;
      border: 0;
      height: 38px;
      outline: none;
    }

    .focus {
      top: -13px;
      padding: 1px;
      font-size: 12px;
      font-weight: bold;
      color: #1467ba;
      z-index: 2;
      height: 18px;
    }

    &__arrow {
      position: absolute;
      top: 11px;
      right: 15px;
      &:hover {
        cursor: pointer;
      }
    }
    .blue {
      color: #1467ba;
    }
    .orange {
    }
    .label-border {
      border-bottom: solid 2px white;
      position: absolute;
      width: 0px;
      top: 28px;
      left: 28px;
    }
    .focus-border {
      z-index: -1;
      border-bottom: solid 1.5px white;
      position: absolute;
      width: 100%;
      top: 12px;
      left: 0px;
    }
    &__message {
      position: absolute;
      color: red;
      font-family: Helvetica;
      font-size: 10px;
      // visibility: hidden;
      display: inline-block;
      width: 100%;
    }
  }
  .blueBorder {
    border: 1px solid #1467ba;
  }
  .createSectionCustomWidth {
    // min-width: 255px;
    width: 100%;
    min-height: 40px;

    border: 1px solid rgba(70, 70, 70, 0.4);
    border-radius: 3px;
  }
  .fullWidth {
    width: 100%;
  }
  .options {
    top: 40px;
    position: absolute;
    background-color: white;
    border: 1px solid #1467ba;
    border-radius: 3px;
    z-index: 3;
    max-height: 225px;
    min-width: 150px;
    right: 0;
    overflow: auto;
    &__title {
      font-size: 12px;
      font-weight: bold;
      padding: 5px 5px;
      width: 100%;
      &:hover {
        background-color: #eaeaea;
        cursor: pointer;
      }
    }
  }
  .editCustom-option {
    margin-top: 0px;
    margin-bottom: 2px;
    margin-right: 2.5px;
    margin-left: 2.5px;
    padding: 2px 9px;
  }
  .editCustom-container {
    min-height: 25px;
  }
  .editCustom-arrow {
    top: 5px;
  }
}
.no-margin {
  margin: 0 0 !important;
}
</style>
