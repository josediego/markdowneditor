<template>
    <div class="container">
      <div class="folder">
        <header>Markdowns<div class="buttons"></div></header>
          <div class="files-list">
            <div class="file create" @click="createNewMarkdown">
              <div class="file-new">
                <i class="fa fa-plus"></i> {{ selectedMarkdown._id ? 'New File' : 'Creating new file...' }}
              </div>
            </div>
            <div @click="goToMarkdown(markdown)" class="file" :class="[selectedMarkdown._id === markdown._id ? 'active' : '']" v-for="markdown in markdowns" v-bind:key="markdown._id">
              <div class="file-icon">
                <i class="fa fa-file-o fa-3x"></i>
              </div>
              <div class="file-detail">
                <div>
                  <div class="title">File name:</div>
                  <div class="value">{{getFileName(markdown)}}</div>
                </div>
                <div>
                  <div class="title">Last update:</div>
                  <div class="value">{{ moment(markdown.updatedAt) }}</div>
                </div>
              </div>
            </div>
          </div>
        <footer>
          <a href="//github.com/josediego" target="_blank">Made with ❤</a>
        </footer>
      </div>
      <app-editor :markdown-content="selectedMarkdown.content" :markdown-id="selectedMarkdown._id" @reRenderList="fetchData"></app-editor>
    </div>
</template>

<script>
import editor from './editor'

export default {
  name: 'Markdowns',
  data () {
    return {
      markdowns: {},
      selectedMarkdown: {},
      errors: []
    }
  },
  computed: {
    compiledMarkdown () {
      return this.preview(this.input)
    }
  },
  components: {
    'app-editor': editor
  },
  async created () {
    await this.queryData(this.$route)
  },
  methods: {
    moment (date) {
      return moment(date).fromNow()
    },
    getFileName (markdown) {
      return `...${markdown._id.substr(markdown._id.length - 15)}.md`
    },
    goToMarkdown (markdown) {
      this.$router.push({ name: 'markdowns', params: { id: markdown._id } })
    },
    createNewMarkdown () {
      this.$router.push({ name: 'markdowns' })
    },
    async fetchData () {
      try {
        const response = await this.$http.get(`${this.$currentEnv.API_URL}/markdowns`)
        this.markdowns = response.data
      } catch (e) {
        this.errors.push(e)
      }
    },
    async selectMarkdown (_id) {
      try {
        const response = await this.$http.get(`${this.$currentEnv.API_URL}/markdowns/${_id}`)
        this.selectedMarkdown = response.data
      } catch (e) {
        this.errors.push(e)
      }
    },
    async queryData (route) {
      const _id = route.params.id
      if (_id) {
        await this.selectMarkdown(_id)
        this.markdowns && await this.fetchData()
      } else {
        this.selectedMarkdown = { content: '# Welcome' }
        await this.fetchData()
      }
    }
  },
  async beforeRouteUpdate (to, from, next) {
    await this.queryData(to)
    next()
  }
}
</script>
