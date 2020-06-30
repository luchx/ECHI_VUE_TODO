export default {
  name: 'Container',
  render() {
    console.log(this)
    return (
      <section class="wrapper">
        {this.$slots.default}
      </section>
    )
  }
}