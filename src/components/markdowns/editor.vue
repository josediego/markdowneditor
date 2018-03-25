<template>
  <div id="app">
    <header>{{ markdownId || 'new_file'}}.md
        <div class="buttons"></div>
      </header>
    <div class="editor">
      <div class="alert" :class="{'open': openAlert}">
        <div class="text">
          Are you sure?
          <div class="options">
            <i class="fa fa-check success" @click="deleteMarkdown"></i>
            <i class="fa fa-times error" @click="openAlert = false"></i>
          </div>
        </div>
      </div>
      <textarea class="code" :value="content" @input="update"></textarea>
      <div class="result" v-html="compiledMarkdown"></div>
    </div>
    <footer >
      <div class="options">
        <i class="fa fa-trash 2x error" v-if="markdownId" @click="openAlert = true"></i>
        <a :href="getDownloadLink()" target="_blank" v-if="markdownId">
          <i class="fa fa-cloud-download"></i>
        </a>
        <i class="fa fa-circle-o-notch fa-spin" v-if="saving"></i>
        <i class="fa fa-save" :class="{'lookme': focusSave}" v-if="!markdownId" @click="createMarkdown()"></i>
      </div>
    </footer>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'MarkdownEditor',
  props: {
    markdownContent: {
      type: String,
      default: ''
    },
    markdownId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      focusSave: false,
      showCheck: false,
      saving: false,
      mustTriggerAutoSave: false,
      firstLoad: true,
      openAlert: false,
      errors: [],
      content: '# Welcome'
    }
  },
  computed: {
    compiledMarkdown () {
      return this.preview(this.content)
    }
  },
  methods: {
    preview (content = '') {
      return marked(content, { sanitize: true })
    },
    async update (e) {
      await this.$delay(500)
      this.content = e.target.value
    },
    triggerAutosave: _.debounce(async function (newValue) {
      try {
        this.saving = true
        await this.$http.put(`${this.$currentEnv.API_URL}/markdowns/${this.markdownId}`, { content: newValue })
        this.$emit('reRenderList')
      } catch (e) {
        this.errors.push(e)
      }
      this.saving = false
    }, 2000),
    getDownloadLink () {
      return `${this.$currentEnv.API_URL}/markdowns/${this.markdownId}/download`
    },
    async createMarkdown () {
      try {
        this.saving = true
        const response = await this.$http.post(`${this.$currentEnv.API_URL}/markdowns/${this.markdownId}`, { content: this.content })
        this.$router.push({name: 'markdowns', params: { id: response.data._id }})
      } catch (e) {
        this.errors.push(e)
      }
      this.saving = false
    },
    async deleteMarkdown () {
      try {
        this.saving = true
        await this.$http.delete(`${this.$currentEnv.API_URL}/markdowns/${this.markdownId}`)
        this.$router.push({name: 'markdowns'})
      } catch (e) {
        this.errors.push(e)
      }
      this.saving = false
      this.openAlert = false
    }
  },
  watch: {
    markdownId (newValue, oldValue) {
      this.firstLoad = (newValue !== oldValue)
      this.mustTriggerAutoSave = !!newValue
    },
    markdownContent () {
      this.content = this.markdownContent
    },
    content (newValue, oldValue) {
      if (this.markdownId && this.mustTriggerAutoSave && !this.firstLoad) {
        this.triggerAutosave(newValue)
      } else {
        this.firstLoad = false
      }
      this.focusSave = !this.mustTriggerAutoSave && (newValue !== '# Welcome' || !newValue) && newValue !== oldValue
    }
  }
}
</script>
