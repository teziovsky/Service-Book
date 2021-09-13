<template>
  <v-footer app class="d-flex flex-column flex-md-row justify-center" color="indigo" dark tile>
    <span>&copy; 2020 - Designed by Jakub Soboczyński</span>
    <v-divider class="mx-4" vertical></v-divider>
    <v-divider class="d-md-none" width="300px"></v-divider>
    <div class="social">
      <v-tooltip v-for="icon in icons" :key="icon.name" top>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" :href="icon.link" class="mx-1" dark icon target="_blank">
            <v-icon size="24px">{{ icon.name }}</v-icon>
          </v-btn>
        </template>
        <span v-if="icon.name === 'mdi-linkedin'">Linkedin</span>
        <span v-if="icon.name === 'mdi-github'">GitHub</span>
        <span v-if="icon.name === 'mdi-facebook'">Facebook</span>
        <span v-if="icon.name === 'mdi-home-circle'">jakubsoboczynski.pl</span>
      </v-tooltip>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: 'Credits',
  data() {
    return {
      icons: [
        {
          name: 'mdi-linkedin',
          link: 'https://pl.linkedin.com/in/jakubsoboczynski',
        },
        {
          name: 'mdi-github',
          link: 'https://github.com/teziovsky',
        },
        {
          name: 'mdi-facebook',
          link: 'https://www.facebook.com/Teziovsky',
        },
        {
          name: 'mdi-home-circle',
          link: 'https://www.jakubsoboczynski.pl/',
        },
      ],
    };
  },
};
</script>
