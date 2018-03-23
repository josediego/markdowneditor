<template>
    <div class="asd">
    </div>
</template>

<script>
export default {
  name: 'MarkdownShow',
  data () {
    return {
      markdown: {}
    }
  },
  created () {
    this.$http.get(`http://jsonplaceholder.typicode.com/posts`)
      .then(response => {
      // JSON responses are automatically parsed.
        this.markdown = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })

    // async / await version (created() becomes async created())
    //
    // try {
    //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
    //   this.posts = response.data
    // } catch (e) {
    //   this.errors.push(e)
    // }
  }
}
</script>
