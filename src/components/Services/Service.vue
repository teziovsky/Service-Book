<template>
  <v-expansion-panels class="index-0">
    <v-expansion-panel class="my-1">
      <v-expansion-panel-header>
        <v-row class="d-flex justify-content-around align-center break-word" no-gutters>
          <v-col class="pr-5">
            <div class="caption grey--text">Title</div>
            <div>{{ service.title }}</div>
          </v-col>
          <v-col class="d-none d-md-block" style="max-width: 85px">
            <div class="caption grey--text">Price</div>
            <div>{{ service.price | formattedNumber }} zł</div>
          </v-col>
          <v-col class="d-none d-md-block" style="max-width: 110px">
            <div class="caption grey--text">Date</div>
            <div>{{ service.date }}</div>
          </v-col>
          <v-col class="d-none d-md-block" style="max-width: 110px">
            <div class="caption grey--text">Mileage</div>
            <div>{{ service.mileage | formattedNumber }} km</div>
          </v-col>
          <v-col align-self="center" style="max-width: 75px">
            <v-btn color="error" dark small @click.stop="deleteService(index)">DELETE</v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-divider class="py-1"></v-divider>
        <v-row class="justify-space-between d-flex d-md-none pb-2" no-gutters>
          <v-col style="max-width: 85px">
            <div class="caption grey--text">Price</div>
            <div>{{ service.price | formattedNumber }} zł</div>
          </v-col>
          <v-col style="max-width: 110px">
            <div class="caption grey--text">Date</div>
            <div>{{ service.date }}</div>
          </v-col>
          <v-col style="max-width: 110px">
            <div class="caption grey--text">Mileage</div>
            <div>{{ service.mileage | formattedNumber }} km</div>
          </v-col>
        </v-row>
        <v-row class="break-word" no-gutters>
          <v-col cols="12">
            <div class="caption grey--text">Description</div>
            <div
              v-if="service.description.length === 0"
              class="font-italic caption font-weight-light"
            >
              Brak opisu
            </div>
            <div v-else class="font-italic font-weight-light">
              {{ service.description }}
            </div>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'Service',
  props: ['service', 'index'],
  methods: {
    deleteService(id) {
      this.$store.dispatch('removeService', id);
    },
  },
  filters: {
    formattedNumber(value) {
      return new Intl.NumberFormat().format(value);
    },
  },
};
</script>

<style lang="scss">
.break-word {
  word-break: break-word;
}

.description--padding {
  padding-right: 125px;
}

.index-0 {
  z-index: 0 !important;
}
</style>
