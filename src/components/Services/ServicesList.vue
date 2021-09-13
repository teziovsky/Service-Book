<template>
  <div class="servicesList">
    <div v-if="this.cars.length" class="text-center d-flex align-baseline">
      <v-subheader class="order-first">{{ formatString(actualCarName) }}</v-subheader>
      <v-dialog v-model="dialog" max-width="600px" persistent>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" absolute color="primary" dark right>Add service</v-btn>
        </template>
        <v-card @keyup.enter.native="addService" @keyup.esc.native="dialog = !dialog">
          <v-card-title>
            <span class="headline">Add service</span>
            <v-spacer></v-spacer>
            <v-icon color="blue darken-1" text @click="dialog = !dialog">mdi-close</v-icon>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model.lazy="title"
                    :error="$v.title.$dirty && $v.title.$invalid"
                    :rules="[rules.required, rules.title]"
                    label="Title of service*"
                    required
                    @input="$v.title.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model.lazy="description"
                    label="Description of service"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="4">
                  <v-text-field
                    v-model.lazy="price"
                    :error="$v.price.$dirty && $v.price.$invalid"
                    :rules="[rules.required]"
                    label="Price*"
                    required
                    type="number"
                    @input="$v.price.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="4">
                  <v-dialog
                    ref="dialog"
                    :return-value.sync="date"
                    transition="scale-transition"
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        v-on="on"
                        :error="$v.date.$dirty && $v.date.$invalid"
                        :rules="[rules.required]"
                        label="Date"
                        readonly
                        @input="$v.date.$touch()"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      :max="getCurrentDate"
                      no-title
                      scrollable
                      value="12-09-2020"
                      @input="$refs.dialog.save(date)"
                    ></v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12" md="4" sm="4">
                  <v-text-field
                    v-model.lazy="mileage"
                    :error="$v.mileage.$dirty && $v.mileage.$invalid"
                    :rules="[rules.required]"
                    label="Mileage*"
                    required
                    type="number"
                    @input="$v.mileage.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="$v.$invalid"
              center
              color="blue darken-1"
              outlined
              @click="addService"
            >
              Add service
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-alert v-if="!this.cars.length" type="warning">
      <strong>No cars in the database.</strong>
      Add the first car to your service book!
    </v-alert>
    <div v-else>
      <transition mode="out-in" name="fade-alert">
        <transition-group
          v-if="services.length"
          appear
          class="container--fluid"
          mode="out-in"
          name="fade"
          tag="div"
        >
          <Service
            v-for="(service, index) in services"
            :key="service.id"
            :index="index"
            :service="service"
          />
        </transition-group>
        <v-alert v-else key="nodata" class="mt-2" type="warning">
          <strong>No data.</strong>
          Add the first item to your service book!
        </v-alert>
      </transition>
    </div>
  </div>
</template>

<script>
import Service from './Service';
import { validationMixin } from 'vuelidate';
import { minLength, required } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
  name: 'ServicesList',
  mixins: [validationMixin],
  data() {
    return {
      dialog: false,
      title: '',
      description: '',
      price: null,
      date: this.getCurrentDate,
      mileage: null,
      rules: {
        required: (value) => !!value || 'Required.',
        title: (value) => value.length >= 3 || 'Min 3 characters.',
      },
    };
  },
  computed: {
    ...mapGetters(['services', 'cars', 'actualCarName']),
    getCurrentDate() {
      return new Date().toJSON().slice(0, 10);
    },
  },
  methods: {
    resetData() {
      this.title = '';
      this.description = '';
      this.price = null;
      this.date = '';
      this.mileage = null;
    },
    formatString(value) {
      return value.replace(/_/g, ' ').toUpperCase();
    },
    addService: function () {
      const newService = [
        {
          title: this.title,
          description: this.description,
          price: this.price,
          date: this.date,
          mileage: this.mileage,
        },
      ];
      this.$store.dispatch('addService', ...newService);
      this.dialog = !this.dialog;
      this.resetData();
    },
  },
  validations: {
    title: {
      required,
      minLength: minLength(3),
    },
    price: {
      required,
    },
    date: {
      required,
    },
    mileage: {
      required,
    },
  },
  components: {
    Service,
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-leave-active {
  position: absolute;
}

.fade-move {
  transition: transform 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-alert-enter-active,
.fade-alert-leave-active {
  transition: opacity 0.25s;
}

.fade-alert-enter,
.fade-alert-leave-to {
  opacity: 0;
}
</style>
