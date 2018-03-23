<template>
    <div class="content">
        <header class="navbar has-shadow">
                <div class="columns">
                  <div class="is-4">
                    <div class="navbar-brand">
                        <a class="navbar-item has-text-weight-semibold" href="https://bulma.io">
                            Markdown Editor
                        </a>
                    </div>
                  </div>
                </div>
        </header>
        <div class="columns">
            <div>#aside component</div>
            <div>#preview component</div>
            <pre>{{ markdowns }}</pre>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MarkdownShow',
  data () {
    return {
      markdowns: {}
    }
  },
  async created () {    
    try {
      const response = await this.$http.get(`${this.$currentEnv.API_URL}/markdowns`)
      this.markdowns = response.data
    } catch (e) {
      this.errors.push(e)
    }
  }
}
</script>
