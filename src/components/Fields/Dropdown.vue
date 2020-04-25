<template>
  <div
    class="dropdown"
    v-if="options"
    :style="{ width: width + '%' }"
    :title="disabled ? hoverMessage : ''"
    :class="{ disableCursor: disabled }"
  >
    <!-- Dropdown Input -->
    <input
      class="dropdown-input no-padding"
      :name="name"
      @focus="showOptions()"
      @blur="exit()"
      @keyup="keyMonitor"
      v-model="searchFilter"
      :disabled="disabled"
      autocomplete="off"
      :style="{ height: height + 'px' }"
      :class="{ blueBorder: optionsShown, disableCursor: disabled }"
    />

    <!-- Dropdown Menu -->
    <div class="dropdown-content" v-show="optionsShown">
      <div
        class="dropdown-item"
        @mousedown="selectOption(option)"
        v-for="(option, index) in filteredOptions"
        :key="index"
      >
        {{ option[selectedDisplay] || option.id || "-" }}
      </div>
    </div>
    <label v-if="withLabel" :class="{ focus: labelFlag }" class="customLabel">
      {{ placeholder }}
      <span class="focus-border" :class="{ hidden: disabled }"></span>
    </label>
    <i
      class="fas fa-angle-down arrowDown"
      :class="{ blue: optionsShown, 'tour-operator': tourOperator }"
      @click="toggleDropdown"
    ></i>
    <span class="dropdown__message">{{ errorMessage }}</span>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
  name: "Dropdown",
  template: "Dropdown",
  props: {
    name: {
      type: String,
      required: false,
      default: "dropdown",
      note: "Input name"
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
      note: "Options of dropdown. An array of options with id and name"
    },
    placeholder: {
      type: String,
      required: false,
      default: "Please select an option",
      note: "Placeholder of dropdown"
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
      note: "Disable the dropdown"
    },
    maxItem: {
      type: Number,
      required: false,
      default: 6,
      note: "Max items showing"
    },
    outsideValue: {
      type: Object,
      required: false,
      default: null
    },
    intialValue: {
      type: String,
      required: false,
      default: null
    },
    clearData: {
      required: false,
      default: false
    },
    withLabel: {
      required: false,
      default: true
    },
    width: {
      required: false,
      default: 100
    },
    validationKey: {
      required: false,
      default: null
    },
    requiredInput: {
      required: false,
      default: false
    },
    tourOperator: {
      required: false,
      default: false
    },
    hoverMessage: {
      required: false,
      default: ""
    },
    height: {
      required: false,
      default: 40
    },
    activeLabelFontSize: {
      required: false,
      default: 13
    },
    selectedDisplay: {
      required: false,
      default: "name"
    }
  },
  data() {
    return {
      selected: {},
      optionsShown: false,
      searchFilter: "",
      labelFlag: false,
      errorMessage: ""
    };
  },
  computed: {
    filteredOptions() {
      const filtered = [];
      // var result = "";
      // // if (this.searchFilter) {
      // for (var i = 0; i < this.searchFilter.length; i++) {
      //   if (
      //     this.searchFilter.charAt(i) == "(".charAt(0) ||
      //     this.searchFilter.charAt(i) < ")".charAt(0) ||
      //     this.searchFilter.charAt(i) == "+".charAt(0) ||
      //     this.searchFilter.charAt(i) == "-".charAt(0)
      //   ) {
      //     result += "/" + this.searchFilter.charAt(i);
      //   } else {
      //     result += this.searchFilter.charAt(i);
      //   }
      // }
      // // }
      // this.searchFilter = result;
      // const regOption = new RegExp(this.searchFilter, "ig");
      for (const option of this.options) {
        if (typeof this.searchFilter != "undefined") {
          if (
            this.searchFilter.length < 1 ||
            option.name.toLowerCase().includes(this.searchFilter.toLowerCase())
          ) {
            if (filtered.length < this.maxItem) filtered.push(option);
          }
        }
      }
      return filtered;
    }
  },
  methods: {
    fillintailvalue() {
      if (this.intialValue) {
        this.searchFilter = this.intialValue;
        this.labelFlag = true;
      }
      if (this.outsideValue) {
        this.searchFilter = this.outsideValue.name;
        this.labelFlag = true;
      }
    },
    selectOption(option) {
      this.selected = option;
      this.optionsShown = false;
      this.searchFilter = this.selected.name;
      // this.$emit("selected", this.selected);
      // if (this.requiredInput) this.$emit("validEmit", true);
    },
    showOptions() {
      if (!this.disabled) {
        this.searchFilter = "";
        this.optionsShown = true;
        this.labelFlag = true;
        this.$emit("showOptions");
      }
    },
    exit() {
      if (!this.selected) {
        this.selected = {};
        this.searchFilter = "";
        this.labelFlag = false;
      } else {
        this.searchFilter = this.selected.name;
        if (this.validationKey)
          if (this.requiredInput) this.$emit("validEmit", true);
        // if (this.requiredInput) this.$emit("validEmit", false);
      }
      this.$emit("selected", this.selected);
      this.optionsShown = false;
      if (typeof this.selected.name == "undefined") {
        if (this.requiredInput) this.$emit("validEmit", false);
        this.labelFlag = false;
        if (this.validationKey) this.errorMessage = "";
      }
    },
    // Selecting when pressing Enter
    keyMonitor: function(event) {
      if (event.key === "Enter" && this.filteredOptions[0])
        this.selectOption(this.filteredOptions[0]);
    },
    toggleDropdown() {
      if (this.optionsShown) {
        this.exit();
      } else {
        this.showOptions();
      }
    }
  },
  watch: {
    searchFilter() {
      if (this.filteredOptions.length === 0) {
        this.selected = {};
      }
    },
    clearData(newValue) {
      if (newValue == true) {
        this.selected = {};
        this.searchFilter = "";
        this.labelFlag = false;
      }
    },
    outsideValue(newValue) {
      this.fillintailvalue();
    },
    intialValue(newValue) {
      this.fillintailvalue();
    }
  },
  created() {
    this.fillintailvalue();
  }
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: inline-block;
  .dropdown-input {
    cursor: pointer;
    border: 1px solid rgba(70, 70, 70, 0.4);
    border-radius: 3px;
    display: block;
    font-size: 16px;
    width: 100%;
    height: 40px;
    outline: none;
    text-indent: 5px;
  }
  label {
    color: #464646;
    // font-family: Helvetica;
    font-size: 15px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 7px;
    top: 50%;
    transform: translateY(-50%);
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  .focus {
    top: -2px !important;
    padding: 1px;
    font-size: 11px !important;
    // font-family: Helvetica;
    font-weight: bold;
    color: #1467ba;
    z-index: 2;
    height: 18px !important;
  }
  .blueBorder {
    border: 1px solid #1467ba;
  }
  .focus-border {
    z-index: -1;
    border-bottom: solid 3px white;
    position: absolute;
    width: 100%;
    top: 10px;
    left: 0px;
  }
  .hidden {
    border-bottom: solid 2px rgb(235, 235, 228) !important;
  }
  .dropdown-content {
    position: absolute;
    background-color: #fff;
    width: 100%;
    max-height: 150px;
    border: 1px solid #1467ba;
    overflow: auto;
    z-index: 5;
    border-radius: 3px;
    .dropdown-item {
      color: black;
      font-size: 0.85em;
      line-height: 1em;
      padding: 8px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      &:hover {
        background-color: #fafafa;
        color: #1467ba;
        font-weight: bold;
      }
    }
  }
  .dropdown:hover .dropdowncontent {
    display: block;
  }
  .arrowDown {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5%;
    &:hover {
      cursor: pointer;
    }
  }
  .blue {
    color: #1467ba !important;
  }
  .tour-operator {
    color: orange;
  }
  &__message {
    position: absolute;
    color: red;
    // font-family: Helvetica;
    font-size: 10px;
    // visibility: hidden;
    display: inline-block;
    width: 100%;
  }
  .disableCursor {
    &:hover {
      cursor: no-drop !important;
    }
  }
}
.disableCursor {
  &:hover {
    cursor: no-drop !important;
  }
}
</style>
