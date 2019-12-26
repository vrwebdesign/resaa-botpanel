<template>
  <div class="form-group">
    <label for="">پاسخ ها</label>
    <div>
      <v-btn
        v-for="(answer, index) in answers"
        :key="index"
        color="secondary"
        class="mx-2"
        outline
        @click="setCorrect(index)"
      >
        <v-icon v-if="answer.is_correct">la-check-square</v-icon>
        {{ answer.text }}
        <v-icon @click="delete_answer(index)"> la-trash</v-icon>
      </v-btn>
      <v-btn color="info" outline @click="addNewAnswer">
        <v-icon>la-plus</v-icon>
        <span>
          افزودن پاسخ جدید
        </span>
      </v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: { value: {} },
  data() {
    return {
      answers: <any[]>this.value
    }
  },
  watch: {
    answers: {
      handler: function(val, old) {
        this.$emit('input', val)
      },
      deep: true
    },
    value: function(val) {
      this.answers = val
    }
  },
  methods: {
    async addNewAnswer() {
      try {
        // let answer = ''
        let answer = await this.$dialog.prompt()
        this.answers.push({ text: answer, is_correct: false })
      } catch (error) {}
    },
    setCorrect(index) {
      this.answers.map((answer, i) => {
        if (index == i) {
          answer.is_correct = true
        } else {
          answer.is_correct = false
        }
      })
    },
    delete_answer(index) {
      this.answers.splice(index, 1)
    }
  }
})
</script>
