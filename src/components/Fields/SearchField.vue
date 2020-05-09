<template>
  <div class="search_field text-center">
    <input
      required
      class="input"
      type="text"
      v-model="searchValue"
      @input="$emit('searchEvent', searchValue)"
    />
    <label>
      {{ labelName }}
      <span class="border"></span>
    </label>
    <i class="fas fa-search"></i>
  </div>
</template>

<script>
export default {
  name: "SearchField",
  data() {
    return {
      searchValue: ""
    };
  },
  props: {
    labelName: {
      type: String,
      required: false
    },
    items: {
      type: Array,
      required: false,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.search_field {
  position: relative;
}
.input {
  font-size: 15px;
  padding: 10px 10px 10px 5px;
  display: block;
  height: 35px;
  border: 1px solid #dadada;
  margin-bottom: 0px;
  text-indent: 25px;
  border-radius: 3px;
}

.input:focus {
  outline: none;
  border: 1px solid #1467ba;
  -webkit-box-shadow: none;
  box-shadow: none;
}

/* LABEL ======================================= */
label {
  color: #464646;
  font-size: 11px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 35px;
  top: 8px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
i {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 11px;
}
.input:focus ~ i,
.input:valid ~ i {
  color: #0071aa;
}

.input:focus ~ label,
.input:valid ~ label {
  top: -11px;
  left: 28px;
  padding: 1px;
  font-size: 11px;
  font-weight: bold;
  color: #1467ba;
  z-index: 2;
}

.border {
  border-bottom: solid 2px white;
  position: absolute;
  top: 28px;
  left: 28px;
}
.input:focus ~ label .border,
.input:valid ~ label .border {
  border-bottom: solid 2px white;
  position: absolute;
  width: 100%;
  top: 11px;
  left: 0px;
  z-index: -1;
}
</style>
