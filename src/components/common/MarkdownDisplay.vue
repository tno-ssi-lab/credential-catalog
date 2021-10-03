<template>
    <div v-html="processedMarkdown"></div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'

export default {
    computed: {
        processedMarkdown(){
            return marked(this.markdown, {
                highlight(md) {
                return highlight.highlightAuto(md).value
                }
            })
        }
    },
    props: {
        markdown: {
            default: "",
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>

</style>