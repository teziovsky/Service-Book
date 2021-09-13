<template>
  <nav>
    <v-navigation-drawer v-model="drawer" absolute app bottom>
      <transition-group
        appear
        class="v-list v-sheet v-sheet---tile theme--light v-list--dense"
        mode="out-in"
        name="fade-adv"
        tag="div"
      >
        <v-list-item
          v-for="(car, index) in cars"
          :key="car.id"
          :index="index"
          link
          @click.prevent="updateActualCar(car.name)"
        >
          <v-list-item-action>
            <transition mode="out-in" name="fade">
              <v-icon v-if="editMode" key="delete" color="red" @click.stop="deleteCar(car.id)">
                mdi-delete
              </v-icon>
              <v-icon v-else key="car" color="indigo">mdi-car</v-icon>
            </transition>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ formatString(car.name) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="editMode" key="input">
          <v-text-field
            id="newCarInput"
            v-model="newCarName"
            :rules="[newCarRules.required, newCarRules.exist]"
            append-icon="mdi-plus"
            class="mt-1"
            dense
            placeholder="Name of new car"
            solo
            @keyup.enter.native="addCar(reversedFormatString(newCarName))"
            @click:append="addCar(reversedFormatString(newCarName))"
          ></v-text-field>
        </v-list-item>
        <v-list-item key="editMode" class="d-flex flex-column justify-center">
          <v-btn
            v-if="!editMode"
            class="mt-3"
            color="primary"
            small
            tile
            @click.prevent="editMode = !editMode"
          >
            Manage Cars
          </v-btn>
        </v-list-item>
      </transition-group>
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Service Book</v-toolbar-title>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Navigation',
  data() {
    return {
      drawer: false,
      editMode: false,
      newCarName: '',
      newCarRules: {
        required: (v) => !!v || 'Name is required',
        exist: (v) =>
          !this.cars.includes(this.reversedFormatString(v)) || 'This car already exists',
      },
    };
  },
  computed: {
    ...mapGetters(['cars']),
  },
  methods: {
    formatString(value) {
      return value.split('_').join(' ').toUpperCase();
    },
    reversedFormatString(value) {
      return value.split(' ').join('_').toLowerCase();
    },
    updateActualCar(carName) {
      this.$store.commit('setActualCar', carName);
      this.editMode = false;
    },
    deleteCar(car_id) {
      this.$store.dispatch('removeCar', car_id);
    },
    addCar(newCarName) {
      if (this.cars.includes(this.reversedFormatString(newCarName))) {
        document.querySelector('#newCarInput').focus();
      } else if (this.newCarName.length === 0) {
        document.querySelector('#newCarInput').focus();
      } else {
        this.$store.dispatch('addCar', newCarName);
        this.newCarName = '';
        this.editMode = false;
      }
    },
  },
};
</script>
