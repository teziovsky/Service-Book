import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    services: {
      honda_civic_viii: [
        {
          id: 1,
          title: 'Kupno samochodu Honda Civic X 1.5 VTEC Turbo 2019r.',
          description: 'W skład ceny wchodzi wykonanie tzw. przeglądu 0.',
          price: 72900,
          date: '01.06.2021',
          mileage: 43500,
        },
        {
          id: 2,
          title: 'Spawanie uchwytu prawego tłumika',
          description: 'Również dolano 200 ml oleju silnikowego.',
          price: 50,
          date: '21.07.2021',
          mileage: 44000,
        },
      ],
      opel_astra_j: [
        {
          id: 1,
          title: 'Kupno samochodu Opel Astra J 2012r.',
          description: 'W skład ceny wchodzi wykonanie tzw. przeglądu 0.',
          price: 26500,
          date: '05.02.2020',
          mileage: 121694,
        },
      ],
      bmw_320i: [
        {
          id: 1,
          title: 'Kupno samochodu BMW 320i 2007r.',
          description: 'W skład ceny wchodzi kupno samochodu oraz wykonanie tzw. przeglądu 0.',
          price: 18700,
          date: '01.02.2018',
          mileage: 249500,
        },
      ],
    },
    cars: [
      {
        id: 1,
        name: 'honda_civic_viii',
      },
      {
        id: 2,
        name: 'opel_astra_j',
      },
      {
        id: 3,
        name: 'bmw_320i',
      },
    ],
    actualCarName: 'honda_civic_viii',
  },
  getters: {
    services: (state) => state.services[state.actualCarName].sort((a, b) => b.mileage - a.mileage),
    cars: (state) => state.cars,
    actualCarName: (state) => state.actualCarName,
  },
  actions: {
    addService({ commit }, service) {
      commit('handleAddService', service);
    },
    removeService({ commit }, id) {
      commit('handleRemoveService', id);
    },
    fetchCarNames({ commit }) {
      commit('setCarNames');
    },
    removeCar({ commit }, car_id) {
      commit('handleRemoveCar', car_id);

      if (this.state.cars.length < 1) commit('emptyCarArray');
    },
    addCar({ commit }, newCarName) {
      commit('handleAddCar', newCarName);
    },
  },
  mutations: {
    handleAddService: (state, service) => {
      const last_id = state.services[state.actualCarName].reduce((max, character) => (character.id > max ? character.id : max), state.services[state.actualCarName][0].id);
      const data = {
        id: last_id + 1,
        ...service,
      };
      state.services[state.actualCarName].push(data);
    },
    handleRemoveService: (state, id) => state.services[state.actualCarName].splice(id, 1),
    setActualCar: (state, actualCar) => state.actualCarName = actualCar,
    handleAddCar: (state, newCarName) => {
      const last_id = state.cars.reduce((max, character) => (character.id > max ? character.id : max), state.cars[0].id);
      state.cars.push({ id: last_id + 1, name: newCarName });
      state.services[newCarName] = [];
    },
    handleRemoveCar: (state, car_id) => {
      state.cars = state.cars.filter(item => item.id !== car_id);
    },

    emptyCarArray: (state) => (state.actualCarName = ' '),
  },
});
