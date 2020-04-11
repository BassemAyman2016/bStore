<template>
  <div>
    <div class="row justify-center">
      <div class="">
        <ProductZoomer
          :base-images="images"
          :base-zoomer-options="zoomerOptions"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Testing",
  data() {
    return {
      images: {
        thumbs: [
          {
            id: 1,
            url:
              "https://psmedia.playstation.com/is/image/psmedia/ps2-hardware-two-column-01-ps4-eu-18nov15?$TwoColumn_Image$"
          },
          {
            id: 2,
            url:
              "https://imgix.ranker.com/collection_img/1/678/original/best-games-for-playstation-3-u5?w=751&h=271&fm=pjpg&fit=crop&q=50"
          }
        ],
        normal_size: [
          {
            id: 1,
            url:
              "https://psmedia.playstation.com/is/image/psmedia/ps2-hardware-two-column-01-ps4-eu-18nov15?$TwoColumn_Image$"
          },
          {
            id: 2,
            url:
              "https://imgix.ranker.com/collection_img/1/678/original/best-games-for-playstation-3-u5?w=751&h=271&fm=pjpg&fit=crop&q=50"
          }
        ]
      },
      zoomerOptions: {}
    };
  }
};
</script>

<style lang="scss">
.test {
  width: 300px;
}
</style>
